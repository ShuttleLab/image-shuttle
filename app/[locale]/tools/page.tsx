import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BASE_URL = "https://image.shuttlelab.org";
const PATH = "/tools";

// The six image tools, with inline bilingual labels (these pages are English
// long-form articles + zh thin pages; they don't carry toolPages i18n keys).
const TOOLS = [
  {
    slug: "compress-jpg",
    title: { en: "Compress JPG", zh: "压缩 JPG" },
    desc: { en: "Reduce JPG/JPEG file size by up to 80% in your browser.", zh: "在浏览器里把 JPG/JPEG 体积最多减小 80%。" },
  },
  {
    slug: "compress-png",
    title: { en: "Compress PNG", zh: "压缩 PNG" },
    desc: { en: "Shrink PNG files 30–70% while keeping transparency.", zh: "压缩 PNG 体积 30–70%，并保留透明度。" },
  },
  {
    slug: "convert-to-webp",
    title: { en: "Convert to WebP", zh: "转 WebP" },
    desc: { en: "Convert JPG/PNG to WebP for 25–35% smaller files.", zh: "把 JPG/PNG 转成 WebP，体积小 25–35%。" },
  },
  {
    slug: "convert-to-avif",
    title: { en: "Convert to AVIF", zh: "转 AVIF" },
    desc: { en: "Convert images to AVIF for ~50% smaller files than JPG.", zh: "把图片转成 AVIF，体积比 JPG 小约 50%。" },
  },
  {
    slug: "resize-image",
    title: { en: "Resize Image", zh: "调整图片尺寸" },
    desc: { en: "Resize by pixels or percentage with aspect-ratio lock.", zh: "按像素或百分比调整尺寸，可锁定宽高比。" },
  },
  {
    slug: "batch-compress",
    title: { en: "Batch Compress", zh: "批量压缩" },
    desc: { en: "Compress dozens of images at once, then download a ZIP.", zh: "一次压缩几十张图片，可打包 ZIP 下载。" },
  },
] as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const zh = locale === "zh";
  const canonical = locale === routing.defaultLocale ? PATH : `/${locale}${PATH}`;
  return {
    title: zh
      ? "图片工具 — 免费在线图片处理 | Image Shuttle"
      : "Image Tools — Free Online Image Utilities | Image Shuttle",
    description: zh
      ? "Image Shuttle 的全部免费图片工具：压缩 JPG/PNG、转 WebP/AVIF、调整尺寸、批量压缩——全部在你的浏览器本地完成。"
      : "All of Image Shuttle's free image tools — compress JPG/PNG, convert to WebP/AVIF, resize, and batch-compress — all in your browser.",
    alternates: {
      canonical,
      languages: { en: PATH, zh: `/zh${PATH}`, "x-default": PATH },
    },
  };
}

export default async function ToolsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const zh = locale === "zh";
  const base = locale === routing.defaultLocale ? "" : `/${locale}`;
  const toolHref = (slug: string) => `${base}/tools/${slug}/`;

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: zh ? "图片工具" : "Image Tools",
    itemListElement: TOOLS.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.title[zh ? "zh" : "en"],
      url: `${BASE_URL}${toolHref(tool.slug)}`,
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: zh ? "首页" : "Home", item: `${BASE_URL}${base}/` },
      { "@type": "ListItem", position: 2, name: zh ? "工具" : "Tools", item: `${BASE_URL}${base}${PATH}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {zh ? "图片工具" : "Image Tools"}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {zh
            ? "Image Shuttle 的全部免费图片工具，全部在你的浏览器本地完成，无需上传、无需注册。"
            : "Every free image tool from Image Shuttle — all running locally in your browser, with no upload and no sign-up."}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <Link
              key={tool.slug}
              href={toolHref(tool.slug)}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/40 hover:bg-accent/40"
            >
              <h2 className="flex items-center gap-1 font-semibold text-foreground">
                {tool.title[zh ? "zh" : "en"]}
                <ArrowRight className="size-4 shrink-0 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{tool.desc[zh ? "zh" : "en"]}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
