import type { ToolContentMap } from "./types";

// English is the fallback source for every locale (used by getToolContent when a
// translation is missing). The English /tools/* routes render their own richer
// long-form articles; this map mirrors that content in the shared structured
// shape so translators have a precise template to localize from.
export const en: ToolContentMap = {
  "compress-jpg": {
    metaTitle: "Compress JPG Online — Free JPEG Compressor | Image Shuttle",
    metaDescription:
      "Compress JPG/JPEG images online for free. Reduce file size by up to 80% with an adjustable quality slider — no upload, 100% private, processed in your browser.",
    h1: "Compress JPG Images",
    lead: "Shrink JPG/JPEG photos by up to 80% with a quality slider. Free, fast and fully private — everything runs in your browser with no uploads.",
    steps: [
      { title: "Upload your JPG", desc: "Drag and drop your JPG/JPEG files onto the upload area, or click to browse. You can select many files at once." },
      { title: "Choose quality", desc: "Pick a quality preset or fine-tune the slider, then preview the before/after to strike the right size-vs-quality balance." },
      { title: "Download", desc: "Apply the compression and download your smaller JPG. Everything happens locally — your images never leave your device." },
    ],
    faqs: [
      { q: "How much smaller will my JPG be?", a: "Typically 40–80% smaller, depending on the photo and the quality you choose. Detailed photos compress less than simple graphics." },
      { q: "Will compressing reduce image quality?", a: "JPEG compression is lossy, but at high-quality settings the difference is hard to see. Use the before/after slider to confirm before downloading." },
      { q: "Are my images uploaded to a server?", a: "No. All compression runs in your browser via the Canvas API, so your photos stay on your device — 100% private." },
      { q: "Is there a file size or count limit?", a: "There is no app-level limit; only your browser's memory. You can batch-compress many files at once." },
      { q: "Can I convert JPG to WebP or AVIF instead?", a: "Yes. Choose WebP or AVIF as the output format for even smaller files at similar quality." },
    ],
  },
  "compress-png": {
    metaTitle: "Compress PNG Online — Free PNG Compressor | Image Shuttle",
    metaDescription:
      "Compress PNG images online for free. Cut PNG file size by 30–70% while preserving transparency — no upload, 100% private, browser-based WebAssembly compression.",
    h1: "Compress PNG Images",
    lead: "Reduce PNG file sizes by 30–70% while keeping transparency intact. Free, fast and entirely private — powered by in-browser WebAssembly with no uploads.",
    steps: [
      { title: "Upload your PNG", desc: "Drag and drop your PNG files or click to browse. Batch selection is supported for many files at once." },
      { title: "Compress", desc: "The WebAssembly quantizer reduces the color palette while keeping the alpha channel, so transparency is preserved." },
      { title: "Download", desc: "Compare with the before/after slider and download your smaller PNG. Nothing is uploaded — it all runs locally." },
    ],
    faqs: [
      { q: "Does compressing PNG keep transparency?", a: "Yes. The alpha channel is fully preserved, so transparent and semi-transparent areas stay intact." },
      { q: "How much can I shrink a PNG?", a: "Usually 30–70%, depending on content. Graphics, logos and screenshots with limited colors compress the most." },
      { q: "Is it lossless or lossy?", a: "It uses WebAssembly quantization (lossy palette reduction) for big savings while keeping images visually sharp." },
      { q: "Do my files get uploaded?", a: "No. Compression happens entirely in your browser, so your PNGs never leave your device." },
      { q: "Should I use WebP for the web instead?", a: "For websites, WebP is often ~26% smaller than PNG at similar quality and also supports transparency — you can convert here too." },
    ],
  },
  "convert-to-webp": {
    metaTitle: "Convert to WebP Online — Free JPG/PNG to WebP | Image Shuttle",
    metaDescription:
      "Convert JPG and PNG images to WebP online for free. Get 25–35% smaller files with transparency support — no upload, 100% private, in your browser.",
    h1: "Convert Images to WebP",
    lead: "Convert JPG and PNG to WebP for 25–35% smaller files with full transparency support. Free, private and instant — right in your browser.",
    steps: [
      { title: "Upload images", desc: "Drop your JPG or PNG files onto the upload area, or click to browse. Multiple files are supported." },
      { title: "Select WebP", desc: "Choose WebP as the output format and set the quality to balance size and clarity." },
      { title: "Download", desc: "Convert and download your WebP files. All processing is local — nothing is uploaded." },
    ],
    faqs: [
      { q: "Why convert to WebP?", a: "WebP files are typically 25–35% smaller than JPG/PNG at similar quality, which speeds up your site and improves Core Web Vitals." },
      { q: "Does WebP support transparency?", a: "Yes, WebP supports an alpha channel like PNG, so transparent images convert cleanly." },
      { q: "Do all browsers support WebP?", a: "All modern browsers support WebP, making it a safe choice for web delivery." },
      { q: "Are my images uploaded?", a: "No. Conversion runs in your browser via the Canvas API — your files stay private on your device." },
      { q: "Can I convert many images at once?", a: "Yes. Batch conversion is supported with parallel processing." },
    ],
  },
  "convert-to-avif": {
    metaTitle: "Convert to AVIF Online — Free JPG/PNG to AVIF | Image Shuttle",
    metaDescription:
      "Convert images to AVIF online for free. Get files up to ~50% smaller than JPG at similar quality — no upload, 100% private, browser-based.",
    h1: "Convert Images to AVIF",
    lead: "Convert JPG and PNG to AVIF for files up to ~50% smaller than JPG at similar quality. Free, private and processed entirely in your browser.",
    steps: [
      { title: "Upload images", desc: "Drag and drop your JPG or PNG files, or click to browse. Multiple files can be converted at once." },
      { title: "Select AVIF", desc: "Choose AVIF as the output format and adjust the quality to your needs." },
      { title: "Download", desc: "Convert and download your AVIF files. Everything runs locally — no uploads." },
    ],
    faqs: [
      { q: "Why choose AVIF?", a: "AVIF offers the best compression of the common web formats — often ~50% smaller than JPG at similar quality — ideal for fast-loading sites." },
      { q: "Does AVIF support transparency?", a: "Yes, AVIF supports an alpha channel, so transparent images are preserved." },
      { q: "Is AVIF widely supported?", a: "All current major browsers support AVIF. For older browsers, keep a JPG/WebP fallback." },
      { q: "Are my images sent to a server?", a: "No. Conversion happens in your browser, so your files remain private." },
      { q: "Can I batch-convert to AVIF?", a: "Yes. Select multiple files and convert them in parallel." },
    ],
  },
  "resize-image": {
    metaTitle: "Resize Image Online — Free Exact-Pixel Resizer | Image Shuttle",
    metaDescription:
      "Resize images online for free. Set exact pixel dimensions or scale by percentage with aspect-ratio lock — no upload, 100% private, in your browser.",
    h1: "Resize Images",
    lead: "Resize photos to exact pixel dimensions (e.g. 512×512) or by percentage, with aspect-ratio lock. Free, private and instant in your browser.",
    steps: [
      { title: "Upload your image", desc: "Drag and drop your image or click to browse. JPG, PNG, WebP and AVIF are all supported." },
      { title: "Set dimensions", desc: "Enter an exact width and height in pixels, or scale by percentage. Lock the aspect ratio to avoid distortion." },
      { title: "Download", desc: "Apply and download your resized image. All processing is local — nothing is uploaded." },
    ],
    faqs: [
      { q: "Can I resize to an exact size like 512×512?", a: "Yes. Type the exact width and height in pixels and export at those dimensions." },
      { q: "Will resizing keep the aspect ratio?", a: "Turn on the aspect-ratio lock and the other dimension adjusts automatically to prevent stretching." },
      { q: "Does resizing reduce quality?", a: "Downscaling stays sharp. Upscaling enlarges existing pixels, so extreme enlargement can look soft." },
      { q: "Are my images uploaded?", a: "No. Resizing runs entirely in your browser — your images stay on your device." },
      { q: "Which formats can I resize?", a: "JPG, PNG, WebP and AVIF. You can also change the output format while resizing." },
    ],
  },
  "batch-compress": {
    metaTitle: "Batch Compress Images Online — Free Bulk Compressor | Image Shuttle",
    metaDescription:
      "Batch compress many images at once for free. Compress or convert dozens of JPG/PNG/WebP/AVIF files in parallel — no upload, 100% private, in your browser.",
    h1: "Batch Compress Images",
    lead: "Compress or convert dozens of images at once with parallel processing. Free, private and fast — everything runs locally in your browser.",
    steps: [
      { title: "Upload many images", desc: "Drag and drop a whole folder of images or select multiple files. JPG, PNG, WebP and AVIF are supported." },
      { title: "Set options", desc: "Choose a single quality and output format to apply to every file at once." },
      { title: "Download all", desc: "Process the batch in parallel and download your compressed images. Nothing is uploaded." },
    ],
    faqs: [
      { q: "How many images can I compress at once?", a: "There is no app-level limit — only your browser's memory. The queue processes files in parallel across your CPU cores." },
      { q: "Can I mix formats in one batch?", a: "Yes. You can add JPG, PNG, WebP and AVIF together and apply consistent settings to all." },
      { q: "Are my files uploaded anywhere?", a: "No. Every file is processed in your browser, so your images stay private." },
      { q: "Can I convert while batch-compressing?", a: "Yes. Pick an output format (e.g. WebP) to convert every file as it compresses." },
      { q: "Does batch processing slow down my browser?", a: "It uses Web Workers tuned to your CPU core count, keeping the interface responsive while it works." },
    ],
  },
};
