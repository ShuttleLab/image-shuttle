type Bilingual = { zh: string; en: string };
type HowTo = { id: string; name: Bilingual; steps: Bilingual[] };
type FaqItem = { q: Bilingual; a: Bilingual };
type UseCase = {
  scenario: Bilingual;
  before: Bilingual;
  after: Bilingual;
};

export const USE_CASES: UseCase[] = [
  {
    scenario: {
      zh: "WordPress 文章配图优化",
      en: "WordPress post image optimization",
    },
    before: {
      zh: "原图 5MB，首屏 LCP > 4 秒，Google PageSpeed 评分低",
      en: "5MB origin images, LCP > 4s, low Google PageSpeed score",
    },
    after: {
      zh: "压到 800KB，LCP 降至 1.5 秒，PageSpeed 评分提升 30+",
      en: "Compressed to 800KB, LCP drops to 1.5s, PageSpeed score improves by 30+",
    },
  },
  {
    scenario: {
      zh: "电商产品图批量处理",
      en: "E-commerce product image batch processing",
    },
    before: {
      zh: "200 张产品图共 1.2GB，上传到 CDN 耗时 30 分钟",
      en: "200 product images totaling 1.2GB, 30 minutes to upload to CDN",
    },
    after: {
      zh: "压缩后共 300MB，上传时间缩短到 8 分钟",
      en: "Compressed to 300MB total, upload time reduced to 8 minutes",
    },
  },
  {
    scenario: {
      zh: "邮件附件图片压缩",
      en: "Email attachment image compression",
    },
    before: {
      zh: "3 张照片共 15MB，超出邮件附件限制",
      en: "3 photos totaling 15MB, exceeding email attachment limits",
    },
    after: {
      zh: "压缩后共 3MB，顺利发送且视觉质量无明显差异",
      en: "Compressed to 3MB, sent successfully with no visible quality difference",
    },
  },
  {
    scenario: {
      zh: "将旧 PNG 图片转为现代 WebP 格式",
      en: "Converting legacy PNG images to modern WebP format",
    },
    before: {
      zh: "网站使用大量 PNG 格式截图，页面加载缓慢",
      en: "Website uses many PNG screenshots, slow page loads",
    },
    after: {
      zh: "转换为 WebP 后文件减少 35%，加载速度提升明显",
      en: "Converted to WebP with 35% size reduction, noticeably faster loading",
    },
  },
  {
    scenario: {
      zh: "社交媒体图片预处理",
      en: "Social media image preprocessing",
    },
    before: {
      zh: "手机拍摄的照片 8MB，Instagram 上传慢且被压缩",
      en: "Phone photos are 8MB, slow Instagram upload with server-side compression",
    },
    after: {
      zh: "预压缩到 1MB，上传快且画质由自己控制",
      en: "Pre-compressed to 1MB, fast upload with quality under your control",
    },
  },
];

export const HOWTOS: HowTo[] = [
  {
    id: "compress-single-image",
    name: {
      zh: "如何压缩单张图片",
      en: "How to compress a single image",
    },
    steps: [
      {
        zh: "打开 Image Shuttle 网站（image.shuttlelab.org）",
        en: "Open the Image Shuttle website (image.shuttlelab.org)",
      },
      {
        zh: "将图片拖放到上传区域，或点击选择文件",
        en: "Drag and drop your image onto the upload area, or click to select a file",
      },
      {
        zh: "选择压缩质量预设（高质量 85%、均衡 70% 或最大压缩 50%）",
        en: "Choose a compression quality preset (High Quality 85%, Balanced 70%, or Maximum Compression 50%)",
      },
      {
        zh: "点击「应用」按钮开始压缩",
        en: "Click the 'Apply' button to start compression",
      },
      {
        zh: "使用滑块对比原图和压缩后的效果，满意后点击下载",
        en: "Use the slider to compare original and compressed results, then download when satisfied",
      },
    ],
  },
  {
    id: "batch-compress",
    name: {
      zh: "如何批量压缩多张图片",
      en: "How to batch-compress multiple images",
    },
    steps: [
      {
        zh: "在首页上传区域选择多张图片（支持拖放多选）",
        en: "Select multiple images in the upload area (supports drag-and-drop multi-select)",
      },
      {
        zh: "调整压缩设置（质量、格式、尺寸限制）",
        en: "Adjust compression settings (quality, format, size limits)",
      },
      {
        zh: "点击「应用」按钮，系统将自动并行处理所有图片",
        en: "Click 'Apply' — the system will automatically process all images in parallel",
      },
      {
        zh: "处理完成后，点击「全部下载」按钮一次性下载所有压缩文件",
        en: "Once processing is complete, click 'Download All' to download all compressed files at once",
      },
    ],
  },
  {
    id: "resize-exact",
    name: {
      zh: "如何把图片调整为精确尺寸（如 512×512）",
      en: "How to resize an image to exact dimensions (e.g. 512×512)",
    },
    steps: [
      {
        zh: "打开图片编辑器（image.shuttlelab.org/editor）并上传图片",
        en: "Open the Photo Editor (image.shuttlelab.org/editor) and upload your image",
      },
      {
        zh: "在「裁剪」中选择 1:1 等目标比例，拖动选框确定构图后应用",
        en: "In Crop, pick the target aspect ratio (e.g. 1:1), drag the selection to frame the image, then apply",
      },
      {
        zh: "打开「调整尺寸」，输入目标宽度 512 —— 高度会按锁定比例自动联动",
        en: "Open Resize and type the target width 512 — the height syncs automatically via the aspect-ratio lock",
      },
      {
        zh: "应用后底部状态栏会显示输出尺寸（512 × 512 px）",
        en: "After applying, the bottom status bar shows the output size (512 × 512 px)",
      },
      {
        zh: "点击「下载」，选择 PNG/JPG/WebP 格式与压缩质量后导出",
        en: "Click Download, choose PNG/JPG/WebP format and compression quality, and export",
      },
    ],
  },
  {
    id: "convert-format",
    name: {
      zh: "如何转换图片格式",
      en: "How to convert image format",
    },
    steps: [
      {
        zh: "上传需要转换的图片",
        en: "Upload the image you want to convert",
      },
      {
        zh: "在格式选择中选择目标格式（JPEG、PNG、WebP 或 AVIF）",
        en: "Select the target format in the format selector (JPEG, PNG, WebP, or AVIF)",
      },
      {
        zh: "根据需要调整质量参数",
        en: "Adjust quality parameters as needed",
      },
      {
        zh: "点击「应用」后下载转换后的文件",
        en: "Click 'Apply' and download the converted file",
      },
    ],
  },
];

export const FAQS: FaqItem[] = [
  {
    q: {
      zh: "Image Shuttle 是免费的吗？",
      en: "Is Image Shuttle free?",
    },
    a: {
      zh: "是的，Image Shuttle 完全免费，没有任何隐藏费用。所有功能都可以无限制使用，无需注册账户。",
      en: "Yes, Image Shuttle is completely free with no hidden costs. All features can be used without limits and without creating an account.",
    },
  },
  {
    q: {
      zh: "我的图片会被上传到服务器吗？",
      en: "Are my images uploaded to a server?",
    },
    a: {
      zh: "不会。Image Shuttle 的所有处理都在您的浏览器中本地完成，使用 Canvas API、WebAssembly 和 Web Workers 技术。您的图片永远不会离开您的设备。",
      en: "No. All processing in Image Shuttle happens locally in your browser using Canvas API, WebAssembly, and Web Workers. Your images never leave your device.",
    },
  },
  {
    q: {
      zh: "支持哪些图片格式？",
      en: "What image formats are supported?",
    },
    a: {
      zh: "Image Shuttle 支持四种主流格式：JPEG、PNG、WebP 和 AVIF。您可以在这些格式之间自由转换。",
      en: "Image Shuttle supports four major formats: JPEG, PNG, WebP, and AVIF. You can freely convert between these formats.",
    },
  },
  {
    q: {
      zh: "压缩后的图片质量会下降吗？",
      en: "Will image quality decrease after compression?",
    },
    a: {
      zh: "这取决于您选择的压缩级别。使用「高质量」预设（85% 质量）时，肉眼几乎看不出差异。使用「最大压缩」预设时，可能会有轻微的质量损失，但文件大小会显著减小。对于 PNG 图片，使用 WebAssembly 量化算法，质量预设通过比例映射到量化器目标值（85% 映射到 target 60，70% 映射到 target 49，50% 映射到 target 35）。",
      en: "It depends on the compression level you choose. With the 'High Quality' preset (85% quality), differences are nearly invisible to the naked eye. With 'Maximum Compression', there may be slight quality loss but significantly smaller file sizes. For PNG images, WebAssembly quantization is used — the quality preset maps proportionally to the quantizer target (85% maps to target 60, 70% to target 49, 50% to target 35).",
    },
  },
  {
    q: {
      zh: "可以处理多大的图片？",
      en: "How large can the images be?",
    },
    a: {
      zh: "Image Shuttle 没有应用层面的尺寸限制。实际限制取决于您的浏览器和设备的可用内存。现代桌面浏览器通常支持最高 16,384 × 16,384 像素的图片。如果图片超出浏览器 Canvas 限制，处理会失败。建议对超大图片手动设置最大宽度/高度进行缩小。",
      en: "Image Shuttle has no application-level size limit. The actual limit depends on your browser and device's available memory. Modern desktop browsers typically support images up to 16,384 × 16,384 pixels. If an image exceeds the browser's Canvas limit, processing will fail. For very large images, manually set maximum width/height to scale them down.",
    },
  },
  {
    q: {
      zh: "为什么 PNG 压缩使用 WebAssembly？",
      en: "Why does PNG compression use WebAssembly?",
    },
    a: {
      zh: "PNG 是无损格式，普通的 Canvas API 压缩效果有限。Image Shuttle 使用 libimagequant-wasm（一个将高质量量化算法编译为 WebAssembly 的库）来实现更高效的 PNG 压缩，通常能将文件大小减少 50-80%。质量预设会按比例映射到量化器的目标值。",
      en: "PNG is a lossless format, and standard Canvas API compression has limited effectiveness. Image Shuttle uses libimagequant-wasm (a library compiled from a high-quality quantization algorithm to WebAssembly) for more efficient PNG compression, typically reducing file size by 50-80%. The quality preset maps proportionally to the quantizer's target value.",
    },
  },
  {
    q: {
      zh: "批量处理时有多少张图片可以同时处理？",
      en: "How many images can be processed simultaneously in batch mode?",
    },
    a: {
      zh: "Image Shuttle 使用智能并发控制，根据您设备的 CPU 核心数自动调整并行处理数量（默认为 navigator.hardwareConcurrency）。例如，8 核 CPU 可同时处理 8 张图片。",
      en: "Image Shuttle uses intelligent concurrency control, automatically adjusting the number of parallel processes based on your device's CPU cores (default: navigator.hardwareConcurrency). For example, an 8-core CPU can process 8 images simultaneously.",
    },
  },
  {
    q: {
      zh: "WebP 和 AVIF 格式有什么优势？",
      en: "What are the advantages of WebP and AVIF formats?",
    },
    a: {
      zh: "WebP 比 JPEG 小 25-35%，比 PNG 小 26%，支持透明度和动画。AVIF 是更新的格式，比 JPEG 小约 50%，支持 HDR 和更广的色域。两者都是现代网页的推荐格式。",
      en: "WebP is 25-35% smaller than JPEG and 26% smaller than PNG, supporting transparency and animation. AVIF is a newer format, approximately 50% smaller than JPEG, supporting HDR and wider color gamuts. Both are recommended formats for modern web.",
    },
  },
  {
    q: {
      zh: "可以把图片精确调整到指定尺寸吗（比如 512×512）？",
      en: "Can I resize an image to exact dimensions like 512×512?",
    },
    a: {
      zh: "可以。在图片编辑器中先用裁剪选择 1:1 等比例，再打开「调整尺寸」输入目标宽度（如 512），高度会按锁定比例自动联动，应用后导出即得到精确尺寸的图片。导出时还能选择 PNG/JPG/WebP 格式和压缩质量。",
      en: "Yes. In the Photo Editor, crop to the aspect ratio you need (e.g. 1:1), open Resize and type the target width (such as 512) — the height syncs automatically with the aspect-ratio lock. Apply and export to get exactly that size, with your choice of PNG/JPG/WebP format and compression quality.",
    },
  },
  {
    q: {
      zh: "图片编辑器支持哪些调整和滤镜？",
      en: "What adjustments and filters does the Photo Editor support?",
    },
    a: {
      zh: "调整项包括亮度、对比度、饱和度、色相、模糊、锐化、暗角和颗粒，外加黑白/怀旧/反色开关；另有 12 个一键滤镜（黑白、胶片黑、复古、暖调、冷调、褪色、浓郁、柔和、戏剧等）。还可以添加文字（9 种字体含中文）、96 个 emoji 贴纸和 6 种形状，全部支持拖拽变换与撤销重做。",
      en: "Adjustments cover brightness, contrast, saturation, hue, blur, sharpen, vignette and grain, plus grayscale/sepia/invert toggles — and 12 one-click filter presets (B&W, Noir, Vintage, Warm, Cool, Fade, Punch, Soft, Dramatic and more). You can also add text (9 font stacks including Chinese), 96 emoji stickers and 6 shape types, all draggable with full undo/redo.",
    },
  },
  {
    q: {
      zh: "拼图制作支持哪些布局？",
      en: "What layouts does the Collage Maker support?",
    },
    a: {
      zh: "内置 20 种程序化布局：规则网格（2×2 到 4×2）、主图+副图的焦点构图、不对称马赛克等，支持 6 种画布比例（1:1 到 9:16）。间距、外边距、圆角和背景色都可调，每个格子里的照片还能拖动平移和缩放，最终按 2000px 宽度高清导出。",
      en: "20 programmatic layouts are built in: regular grids (2×2 up to 4×2), feature-photo compositions and asymmetric mosaics, across 6 canvas ratios (1:1 to 9:16). Spacing, outer margin, corner radius and background color are all adjustable; photos can be panned and zoomed inside each cell, and the result exports at 2000px width.",
    },
  },
  {
    q: {
      zh: "设计工坊的自定义画布尺寸收费吗？",
      en: "Do custom canvas sizes in the Design Studio cost anything?",
    },
    a: {
      zh: "完全免费。任意 64–4096 像素的自定义宽高、8 种社交媒体尺寸预设（OG 图、YouTube 缩略图、Instagram、Story 等）、图层系统、渐变背景和 10 个起步模板都不收费，导出也没有水印 —— 这些在很多同类工具里都是付费功能。",
      en: "Completely free. Custom width/height from 64 to 4096 pixels, 8 social-media size presets (OG image, YouTube thumbnail, Instagram, Story and more), the layer system, gradient backgrounds and 10 starter templates cost nothing, and exports never carry a watermark — features many competitors paywall.",
    },
  },
  {
    q: {
      zh: "Image Shuttle 和 Squoosh 有什么区别？",
      en: "What's the difference between Image Shuttle and Squoosh?",
    },
    a: {
      zh: "Image Shuttle 受 Google 的 Squoosh 项目启发，但使用完全不同的技术栈。Squoosh 使用 Rollup 构建，而 Image Shuttle 使用 Next.js，更适合现代部署。两者都采用客户端处理理念，但 Image Shuttle 的批量处理和并发控制更完善。",
      en: "Image Shuttle is inspired by Google's Squoosh project but uses a completely different tech stack. Squoosh uses Rollup while Image Shuttle uses Next.js for modern deployment. Both embrace client-side processing, but Image Shuttle has more robust batch processing and concurrency control.",
    },
  },
];

export const COMPARISON = {
  zh: {
    heading: "Image Shuttle 与同类工具对比（截至 2026-05）",
    columns: ["功能", "Image Shuttle", "TinyPNG", "Squoosh"],
    rows: [
      ["100% 本地处理", "✓", "✗", "✓"],
      ["无需注册", "✓", "✗", "✓"],
      ["批量处理", "✓", "付费", "✗"],
      ["格式转换", "✓", "✗", "✓"],
      ["WebP/AVIF 支持", "✓", "✗", "✓"],
      ["WebAssembly PNG 压缩", "✓", "✗", "✗"],
      ["实时预览对比", "✓", "✗", "✓"],
      ["完全免费", "✓", "免费版有限制", "✓"],
    ],
  },
  en: {
    heading: "Image Shuttle vs Similar Tools (as of 2026-05)",
    columns: ["Feature", "Image Shuttle", "TinyPNG", "Squoosh"],
    rows: [
      ["100% Local Processing", "✓", "✗", "✓"],
      ["No Registration Required", "✓", "✗", "✓"],
      ["Batch Processing", "✓", "Paid", "✗"],
      ["Format Conversion", "✓", "✗", "✓"],
      ["WebP/AVIF Support", "✓", "✗", "✓"],
      ["WebAssembly PNG Compression", "✓", "✗", "✗"],
      ["Real-time Preview Comparison", "✓", "✗", "✓"],
      ["Completely Free", "✓", "Free tier limited", "✓"],
    ],
  },
};

export const HEADINGS = {
  whenUse: { zh: "何时使用 Image Shuttle？", en: "When should I use Image Shuttle?" },
  faq: { zh: "常见问题", en: "Frequently Asked Questions" },
};

export const aboutFaqData = { FAQS, HOWTOS, COMPARISON };
