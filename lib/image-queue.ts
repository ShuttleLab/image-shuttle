import {
  compressImage,
  compressPngWithWasm,
  type CompressOptions,
  type CompressResult,
} from "./image-processor";

export interface QueueTask {
  id: string;
  file: File;
  options: CompressOptions;
}

export interface QueueResult {
  id: string;
  result: CompressResult;
  error?: string;
}

export type QueueCallback = (
  completed: number,
  total: number,
  currentResult?: QueueResult,
) => void;

const MAX_CONCURRENCY =
  typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 4 : 4;

export class ImageQueue {
  private queue: QueueTask[] = [];
  private running = 0;
  private completed = 0;
  private total = 0;
  private results: QueueResult[] = [];
  private onProgress?: QueueCallback;
  private resolveAll?: (results: QueueResult[]) => void;

  constructor(onProgress?: QueueCallback) {
    this.onProgress = onProgress;
  }

  add(task: QueueTask): void {
    this.queue.push(task);
    this.total = this.queue.length;
  }

  addMultiple(tasks: QueueTask[]): void {
    this.queue.push(...tasks);
    this.total = this.queue.length;
  }

  async process(): Promise<QueueResult[]> {
    return new Promise((resolve) => {
      this.results = [];
      this.completed = 0;
      this.running = 0;
      this.resolveAll = resolve;
      this.processNext();
    });
  }

  private processNext(): void {
    while (
      this.running < MAX_CONCURRENCY &&
      this.queue.length > 0
    ) {
      const task = this.queue.shift()!;
      this.running++;
      this.processTask(task);
    }

    if (this.running === 0 && this.queue.length === 0) {
      this.resolveAll?.(this.results);
    }
  }

  private async processTask(task: QueueTask): Promise<void> {
    try {
      let result: CompressResult;

      if (
        task.file.type === "image/png" &&
        task.options.format === "original"
      ) {
        result = await compressPngWithWasm(task.file, task.options);
      } else {
        result = await compressImage(task.file, task.options);
      }

      const queueResult: QueueResult = { id: task.id, result };
      this.results.push(queueResult);
      this.completed++;
      this.onProgress?.(this.completed, this.total, queueResult);
    } catch (error) {
      const queueResult: QueueResult = {
        id: task.id,
        result: {
          blob: new Blob(),
          width: 0,
          height: 0,
          originalSize: 0,
          compressedSize: 0,
          format: "",
          savings: 0,
        },
        error: error instanceof Error ? error.message : "Unknown error",
      };
      this.results.push(queueResult);
      this.completed++;
      this.onProgress?.(this.completed, this.total, queueResult);
    } finally {
      this.running--;
      this.processNext();
    }
  }

  clear(): void {
    this.queue = [];
    this.results = [];
    this.completed = 0;
    this.total = 0;
    this.running = 0;
  }

  getProgress(): { completed: number; total: number } {
    return { completed: this.completed, total: this.total };
  }
}
