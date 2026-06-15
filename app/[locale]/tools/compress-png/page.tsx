import Link from "next/link";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ToolThinZh } from "@/components/tool-thin-zh";

const PATH = "/tools/compress-png";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const zh = locale === "zh";
  return {
    title: zh
      ? "在线压缩 PNG — 免费 PNG 压缩器 | Image Shuttle"
      : "Compress PNG Online — Free PNG Image Compressor | Image Shuttle",
    description: zh
      ? "免费在线压缩 PNG 图片，体积减小 30–70% 并保留透明度。无需上传、无需注册，全程在浏览器本地完成，100% 私密。"
      : "Compress PNG images online for free. Reduce PNG file size by 30-70% while preserving transparency. No upload, no registration, 100% private browser-based compression.",
    alternates: {
      canonical: zh ? `/zh${PATH}` : PATH,
      languages: { en: PATH, zh: `/zh${PATH}`, "x-default": PATH },
    },
  };
}

export default async function CompressPngPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale !== "en") {
    return (
      <ToolThinZh
        title="在线压缩 PNG（免费）"
        lead="免费压缩 PNG 图片，体积减小 30–70%，并完整保留透明通道。全程在你的浏览器本地完成，图片不上传任何服务器。"
        guideHref={PATH}
      />
    );
  }
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Compress PNG Images Online for Free",
    description:
      "A comprehensive guide to compressing PNG images online using browser-based tools. Reduce PNG file size while preserving transparency and visual quality.",
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: {
      "@type": "Organization",
      name: "ShuttleLab",
      url: "https://shuttlelab.org",
    },
    url: "https://image.shuttlelab.org/tools/compress-png",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Compress a PNG Image Online",
    step: [
      { "@type": "HowToStep", position: 1, text: "Go to image.shuttlelab.org" },
      {
        "@type": "HowToStep",
        position: 2,
        text: "Drag and drop your PNG file or click to browse",
      },
      {
        "@type": "HowToStep",
        position: 3,
        text: "Select your desired quality preset (High, Balanced, or Maximum Compression)",
      },
      {
        "@type": "HowToStep",
        position: 4,
        text: "Click the Apply button to compress the PNG image",
      },
      {
        "@type": "HowToStep",
        position: 5,
        text: "Use the before/after slider to compare results and download",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much can I compress a PNG file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PNG compression can reduce file size by 30-70% depending on the image content. Images with large solid-color areas and simple graphics compress more than complex photographs. Image Shuttle uses advanced algorithms to find the optimal balance between size and quality.",
        },
      },
      {
        "@type": "Question",
        name: "Does compressing PNG remove transparency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Image Shuttle preserves PNG transparency during compression. Unlike converting to JPG, PNG compression retains the alpha channel so your transparent backgrounds and semi-transparent elements remain intact.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between lossy and lossless PNG compression?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lossless PNG compression reduces file size without any quality loss by optimizing how data is stored. Lossy compression achieves greater reductions by removing some image data. Image Shuttle supports both approaches, letting you choose the best option for your needs.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a file size limit for PNG compression?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Image Shuttle has no application-level file size limit. The only limitation is your browser's available memory. Modern browsers can handle images up to 16,384 x 16,384 pixels (approximately 268 megapixels).",
        },
      },
      {
        "@type": "Question",
        name: "Can I batch compress multiple PNG files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Image Shuttle supports batch PNG compression. Select multiple PNG files or drag them all onto the upload area. The tool uses Web Workers for parallel processing, handling many files simultaneously without slowing down.",
        },
      },
      {
        "@type": "Question",
        name: "Why are PNG files so large?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PNG files are large because they use lossless compression and store transparency data (alpha channel). This makes them ideal for graphics, logos, and screenshots but results in bigger file sizes compared to lossy formats like JPG. Compressing PNG files helps reduce this overhead.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="sr-only">
          Compress PNG Online — Free PNG Compressor That Preserves Transparency
        </h1>
        <h1 className="text-4xl font-bold mb-4">Compress PNG Images</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Reduce your PNG file sizes by 30-70% while keeping transparency
          intact. Free, fast, and entirely private — everything runs in your
          browser with no file uploads.
        </p>

        {/* CTA */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Try It Now — It&apos;s Free
          </Link>
        </div>

        {/* How It Works */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            How to Compress PNG Online
          </h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold">Upload Your PNG</h3>
                <p className="text-muted-foreground">
                  Go to Image Shuttle and drag your PNG file onto the upload
                  area, or click to browse your files. You can select multiple
                  files for batch compression. All processing happens locally in
                  your browser, so your images never leave your device.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                2
              </span>
              <div>
                <h3 className="font-semibold">Choose Quality Settings</h3>
                <p className="text-muted-foreground">
                  Select from preset quality levels — High Quality (85%),
                  Balanced (70%), or Maximum Compression (50%). You can also use
                  the slider for custom quality control. Note: PNG uses
                  WebAssembly quantization which applies a fixed algorithm; the
                  quality preset primarily affects JPEG, WebP, and AVIF output.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                3
              </span>
              <div>
                <h3 className="font-semibold">Compress and Download</h3>
                <p className="text-muted-foreground">
                  Click Apply to start compression. Use the before/after slider
                  to compare quality and ensure transparency is preserved.
                  Download your compressed PNG when satisfied. The WebAssembly
                  engine applies lossy quantization to reduce the color palette
                  while keeping the alpha channel fully intact.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Why Compress PNG Files?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Preserve Transparency</h3>
              <p className="text-sm text-muted-foreground">
                Unlike JPG, PNG compression preserves your transparent
                backgrounds. Compress logos, icons, and graphics without losing
                the alpha channel. This is essential for web design elements that
                need to layer over different background colors.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Faster Page Load Times</h3>
              <p className="text-sm text-muted-foreground">
                Smaller PNG files load faster on your website. This improves
                Core Web Vitals scores and boosts your SEO rankings on Google
                and other search engines. Every kilobyte saved contributes to a
                better user experience.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Save Bandwidth and Storage</h3>
              <p className="text-sm text-muted-foreground">
                Reduce PNG file sizes by 30-70% to save bandwidth costs and
                storage space. Ideal for web hosting, CDNs, and cloud storage
                services where every gigabyte of transfer counts toward your
                monthly bill.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">100% Private and Secure</h3>
              <p className="text-sm text-muted-foreground">
                All compression happens directly in your browser using
                WebAssembly. Your PNG files are never uploaded to any server,
                ensuring complete privacy and data security. This makes it safe
                for confidential graphics and proprietary designs.
              </p>
            </div>
          </div>
        </section>

        {/* Common Scenarios */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Common Scenarios</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Optimizing Logo Files for Websites
              </h3>
              <p className="text-muted-foreground">
                Website logos are almost always PNG files because they need
                transparent backgrounds to layer over hero images or colored
                sections. Compressing your logo PNG reduces its file size without
                affecting the sharp edges and clean lines that make logos look
                professional. A compressed logo loads instantly, giving visitors
                a polished first impression the moment they land on your site.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Reducing Screenshot File Sizes
              </h3>
              <p className="text-muted-foreground">
                Screenshots from operating systems and applications are saved as
                PNG by default, often resulting in files over 1 MB. Compressing
                screenshots before including them in documentation, bug reports,
                or tutorials makes them easier to share via email, Slack, or
                project management tools. The text in screenshots remains
                perfectly readable after compression.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Preparing Game Assets and UI Elements
              </h3>
              <p className="text-muted-foreground">
                Game developers and UI designers work with many PNG sprites,
                icons, and interface elements that require transparency.
                Compressing these assets reduces the overall size of the game or
                application, leading to faster load times and lower bandwidth
                consumption. Batch compression is especially useful when dealing
                with hundreds of sprite sheet components.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Compressing Infographics and Diagrams
              </h3>
              <p className="text-muted-foreground">
                Infographics and technical diagrams with large areas of solid
                color are ideal candidates for PNG compression. These images
                often contain text, charts, and vector-like graphics that
                compress very efficiently. Reducing their size makes them faster
                to share on social media, embed in blog posts, and include in
                presentations without sacrificing readability.
              </p>
            </div>
          </div>
        </section>

        {/* Tips and Best Practices */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Tips and Best Practices
          </h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Understand PNG vs JPG for Your Use Case
              </h3>
              <p className="text-muted-foreground">
                Use PNG for images that need transparency, contain text, or have
                sharp edges like logos and screenshots. Use JPG for photographs
                and images without transparency. Choosing the right format from
                the start gives you better compression results than trying to
                force the wrong format.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                PNG Compression Works Best on Simple Graphics
              </h3>
              <p className="text-muted-foreground">
                PNG compression achieves the best results on images with large
                areas of solid color, limited color palettes, and clean edges.
                Photographs saved as PNG will not compress as well because they
                have millions of unique colors. For photos, consider converting
                to JPG or WebP instead.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Preserve Transparency by Staying in PNG
              </h3>
              <p className="text-muted-foreground">
                If your image has transparency and you need to keep it, compress
                as PNG rather than converting to JPG. JPG does not support
                transparency and will replace transparent areas with white or
                black. Image Shuttle preserves the alpha channel during PNG
                compression.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Use WebAssembly Quantization for Best Results
              </h3>
              <p className="text-muted-foreground">
                Image Shuttle uses a WebAssembly-based quantization engine for
                PNG compression. This reduces the number of colors in the image
                while maintaining visual quality. The algorithm is particularly
                effective for graphics, icons, and illustrations with limited
                color palettes.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Consider WebP for Web Delivery
              </h3>
              <p className="text-muted-foreground">
                If you are compressing PNG files specifically for website use,
                consider converting to WebP format instead. WebP supports
                transparency like PNG but achieves 26% smaller file sizes at
                comparable quality. Modern browsers all support WebP, making it
                a superior choice for web delivery.
              </p>
            </div>
          </div>
        </section>

        {/* Compared to Alternatives */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Compared to Alternatives
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              TinyPNG is the most recognized name in online PNG compression. It
              uses smart lossy compression to reduce PNG file sizes effectively,
              and many designers swear by its results. However, TinyPNG processes
              your images on their servers, which means your files leave your
              device. For confidential designs, client work, or proprietary
              graphics, this may not be acceptable. Image Shuttle provides
              comparable compression quality using WebAssembly in your browser,
              keeping your files completely private. TinyPNG also limits free
              users to 20 images per batch and 5 MB per file, while Image
              Shuttle has no such restrictions.
            </p>
            <p className="text-muted-foreground mb-4">
              Squoosh from Google is a developer-focused tool that offers
              granular control over PNG compression settings. It excels at
              single-image optimization and lets you tweak advanced parameters
              like color quantization and dithering. The downside is that
              Squoosh is designed for one image at a time, making it impractical
              when you need to compress dozens of PNG files. Image Shuttle
              handles batch compression with parallel Web Worker processing,
              making it significantly faster for large projects.
            </p>
            <p className="text-muted-foreground mb-4">
              Desktop tools like PNGGauntlet and PNGWin offer excellent
              compression without requiring an internet connection. They are
              great for developers who compress images regularly. However, they
              are Windows-only, require installation, and lack the convenience
              of working on any device with a browser. Image Shuttle works
              identically on Windows, macOS, Linux, and mobile devices with no
              installation required. The visual before/after comparison is also
              something most desktop PNG compressors do not provide.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">
                How much can I compress a PNG file?
              </h3>
              <p className="text-muted-foreground">
                PNG compression can reduce file size by 30-70% depending on
                image content. Images with large solid-color areas and limited
                color palettes compress more than complex photographs. Image
                Shuttle uses advanced WebAssembly algorithms to find the optimal
                balance between size and quality.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Does compressing PNG remove transparency?
              </h3>
              <p className="text-muted-foreground">
                No. Image Shuttle preserves PNG transparency during compression.
                Your transparent backgrounds and semi-transparent elements
                remain fully intact. Unlike converting to JPG, the alpha channel
                is always retained.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What is the difference between lossy and lossless PNG
                compression?
              </h3>
              <p className="text-muted-foreground">
                Lossless compression reduces file size without any quality loss
                by optimizing data storage. Lossy compression achieves greater
                reductions by removing some image data. Image Shuttle uses
                WebAssembly quantization for lossy PNG compression that
                dramatically reduces file sizes while keeping images looking
                sharp.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a file size limit?</h3>
              <p className="text-muted-foreground">
                Image Shuttle has no application-level file size limit. The only
                limitation is your browser&apos;s available memory. Modern
                browsers can handle images up to 16,384 x 16,384 pixels.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Can I batch compress multiple PNG files?
              </h3>
              <p className="text-muted-foreground">
                Yes! Select multiple PNG files or drag them all onto the upload
                area. The tool uses Web Workers for parallel processing, handling
                many files simultaneously without slowing down your browser.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Why are PNG files so large?
              </h3>
              <p className="text-muted-foreground">
                PNG files are large because they use lossless compression and
                store transparency data (alpha channel). This makes them ideal
                for graphics and logos but results in bigger file sizes than JPG.
                Compressing PNG files with Image Shuttle helps reduce this
                overhead significantly.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <div className="text-center p-8 bg-muted rounded-lg">
          <h2 className="text-xl font-bold mb-2">
            Ready to Compress Your PNG Files?
          </h2>
          <p className="text-muted-foreground mb-4">
            Free, fast, and 100% private. No registration required.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Compressing Now
          </Link>
        </div>
      </div>
    </>
  );
}
