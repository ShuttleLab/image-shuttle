import Link from "next/link";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ToolThinZh } from "@/components/tool-thin-zh";

const PATH = "/tools/convert-to-avif";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const zh = locale === "zh";
  return {
    title: zh
      ? "图片转 AVIF — 免费在线 AVIF 转换器 | Image Shuttle"
      : "Convert Image to AVIF — Free Online AVIF Converter | Image Shuttle",
    description: zh
      ? "免费在线把 JPG、PNG、WebP 转成 AVIF，借助新一代 AVIF 压缩，体积比 JPG 小约 50%。无需上传，100% 私密。"
      : "Convert JPG, PNG, and WebP images to AVIF format online for free. Get 50% smaller files than JPG with next-generation AVIF compression. No upload, 100% private.",
    alternates: {
      canonical: zh ? `/zh${PATH}` : PATH,
      languages: { en: PATH, zh: `/zh${PATH}`, "x-default": PATH },
    },
  };
}

export default async function ConvertToAvifPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale !== "en") {
    return (
      <ToolThinZh
        title="图片转 AVIF（免费在线）"
        lead="把 JPG、PNG、WebP 转成 AVIF，借助新一代压缩，体积可比 JPG 小约 50%。全程在你的浏览器本地完成，图片不上传任何服务器。"
        guideHref={PATH}
      />
    );
  }
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Convert Images to AVIF Online for Free",
    description:
      "A comprehensive guide to converting JPG, PNG, and WebP images to AVIF online. Achieve 50% smaller file sizes than JPG with next-generation AVIF compression.",
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: {
      "@type": "Organization",
      name: "ShuttleLab",
      url: "https://shuttlelab.org",
    },
    url: "https://image.shuttlelab.org/tools/convert-to-avif",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert an Image to AVIF Online",
    step: [
      { "@type": "HowToStep", position: 1, text: "Go to image.shuttlelab.org" },
      {
        "@type": "HowToStep",
        position: 2,
        text: "Drag and drop your image file (JPG, PNG, or WebP) or click to browse",
      },
      {
        "@type": "HowToStep",
        position: 3,
        text: "Select AVIF as the output format and configure quality settings",
      },
      {
        "@type": "HowToStep",
        position: 4,
        text: "Click the Apply button to convert the image to AVIF",
      },
      {
        "@type": "HowToStep",
        position: 5,
        text: "Preview the result and download your AVIF image",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is AVIF format?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AVIF (AV1 Image File Format) is a next-generation image format based on the AV1 video codec. It delivers superior compression efficiency, producing images that are 50% smaller than JPG and 20% smaller than WebP at comparable quality levels. AVIF supports HDR, wide color gamut, transparency, and animation.",
        },
      },
      {
        "@type": "Question",
        name: "Is AVIF supported by all browsers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AVIF is supported by Chrome (since version 85), Firefox (since version 93), Edge, and Safari (since version 16.4). Browser support continues to grow rapidly. For older browsers, consider providing WebP or JPG fallbacks using the picture element.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between AVIF and WebP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AVIF generally provides better compression than WebP, especially for high-quality images and HDR content. AVIF images are typically 20% smaller than WebP at the same quality. However, WebP has broader browser support and faster encoding times. Both support transparency and animation.",
        },
      },
      {
        "@type": "Question",
        name: "Does AVIF support transparency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, AVIF supports 8-bit and 10-bit alpha channel transparency, similar to PNG but with much better compression. This makes AVIF suitable for logos, icons, and images requiring transparent backgrounds.",
        },
      },
      {
        "@type": "Question",
        name: "Why is AVIF conversion slower than WebP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AVIF encoding is more computationally intensive because it uses the AV1 video codec, which employs advanced compression techniques. Despite slower encoding, the resulting files are significantly smaller. Image Shuttle uses Web Workers to keep the interface responsive during conversion.",
        },
      },
      {
        "@type": "Question",
        name: "Can I convert PNG to AVIF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can convert PNG, JPG, WebP, BMP, and other formats to AVIF using Image Shuttle. The conversion preserves transparency from PNG files while dramatically reducing file size through AVIF's superior compression.",
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
          Convert Image to AVIF Online — Free Next-Generation Image Format
          Converter
        </h1>
        <h1 className="text-4xl font-bold mb-4">Convert Images to AVIF</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Transform your JPG, PNG, and WebP images into AVIF format for up to
          50% smaller file sizes. Free, private, and runs entirely in your
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
            How to Convert Image to AVIF Online
          </h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold">Upload Your Image</h3>
                <p className="text-muted-foreground">
                  Go to Image Shuttle and drag your image file onto the upload
                  area. Supported input formats include JPG, PNG, WebP, BMP,
                  GIF, and TIFF. Batch conversion is supported — select multiple
                  files to convert them all at once. Your images never leave
                  your device during the process.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                2
              </span>
              <div>
                <h3 className="font-semibold">Select AVIF Format</h3>
                <p className="text-muted-foreground">
                  Choose AVIF as your output format. Adjust the quality slider
                  to control the balance between file size and visual quality.
                  AVIF excels at maintaining quality even at lower settings
                  thanks to the advanced AV1 codec. A quality level of 60-70%
                  often produces results comparable to JPG at 85%.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                3
              </span>
              <div>
                <h3 className="font-semibold">Convert and Download</h3>
                <p className="text-muted-foreground">
                  Click Apply to start the AVIF conversion. Use the before/after
                  slider to compare the original and converted image. Download
                  your AVIF file when satisfied with the result. Note that AVIF
                  encoding takes slightly longer than WebP due to the more
                  complex compression algorithm.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Convert to AVIF?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Best-in-Class Compression</h3>
              <p className="text-sm text-muted-foreground">
                AVIF delivers 50% smaller files than JPG and 20% smaller than
                WebP at the same visual quality. This is the most efficient
                image format available today, backed by the AV1 video codec
                used by Netflix and YouTube.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                HDR and Wide Color Support
              </h3>
              <p className="text-sm text-muted-foreground">
                AVIF supports HDR10, 10-bit color depth, and wide color gamut
                (Rec. 2020). This means richer, more accurate colors for
                photography and professional imaging where color fidelity is
                critical.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Future-Proof Your Website
              </h3>
              <p className="text-sm text-muted-foreground">
                AVIF adoption is growing rapidly. By converting to AVIF now, you
                ensure your website delivers the smallest possible images to
                modern browsers while staying ahead of the competition in page
                speed and user experience.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">100% Private Conversion</h3>
              <p className="text-sm text-muted-foreground">
                All conversion happens directly in your browser using Web
                Workers and the Canvas API. Your images are never uploaded to
                any server, ensuring complete privacy and data security
                throughout the entire process.
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
                Maximizing Performance for E-Commerce Sites
              </h3>
              <p className="text-muted-foreground">
                Online stores with hundreds or thousands of product images can
                dramatically reduce page load times by serving AVIF to modern
                browsers. A product catalog that currently takes 3 seconds to
                load with JPG images might load in under 1.5 seconds with AVIF.
                Faster product pages directly correlate with higher conversion
                rates and increased revenue. Using the picture element with AVIF
                and JPG fallbacks ensures all visitors get the best possible
                experience.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Serving High-Quality Photography Portfolios
              </h3>
              <p className="text-muted-foreground">
                Photographers need to showcase their work in the highest quality
                possible while keeping load times reasonable. AVIF&apos;s
                superior compression means you can display stunning,
                high-resolution portfolio images that load quickly even on mobile
                connections. The format&apos;s support for 10-bit color depth
                and wide color gamut also ensures that the subtle gradients and
                rich tones in professional photography are faithfully preserved.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Optimizing Hero Images and Banners
              </h3>
              <p className="text-muted-foreground">
                Hero images and banner graphics are typically the largest assets
                on a web page, often exceeding 500 KB as JPG files. Converting
                these to AVIF can reduce their size to 200-250 KB without any
                visible quality loss. Since hero images are the first thing
                visitors see, making them load instantly creates a strong first
                impression and reduces the chance of visitors bouncing before
                the page fully renders.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Reducing Bandwidth for Image-Heavy Blogs
              </h3>
              <p className="text-muted-foreground">
                Blog posts with multiple embedded images can accumulate
                significant bandwidth costs, especially on high-traffic sites.
                Converting all blog images to AVIF reduces per-page bandwidth by
                40-50% compared to JPG, which translates directly into lower
                hosting bills and faster page loads for readers. This is
                particularly valuable for blogs hosted on metered platforms like
                Vercel or Netlify where bandwidth limits apply.
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
                Use Lower Quality Settings Than You Would for JPG
              </h3>
              <p className="text-muted-foreground">
                AVIF&apos;s advanced codec maintains visual quality at lower
                quality percentages than JPG or WebP. A quality setting of 50-65%
                for AVIF often looks as good as 80-85% for JPG. Experiment with
                lower settings to find the sweet spot for your specific images.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Always Provide JPG or WebP Fallbacks
              </h3>
              <p className="text-muted-foreground">
                While AVIF browser support is growing, some users on older
                Safari versions or legacy browsers cannot view AVIF files. Use
                the HTML picture element to serve AVIF to supported browsers
                while falling back to WebP or JPG for everyone else. This
                ensures universal compatibility.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Be Patient with Encoding Time
              </h3>
              <p className="text-muted-foreground">
                AVIF encoding is slower than WebP or JPG because the AV1 codec
                performs more complex calculations to achieve better compression.
                A single image might take a few seconds to convert. Image
                Shuttle uses Web Workers to keep the interface responsive, so
                you can continue browsing while conversion runs in the
                background.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Use AVIF for Hero Images and Large Photos
              </h3>
              <p className="text-muted-foreground">
                AVIF provides the most dramatic size savings on large,
                high-resolution photographs. For small icons and thumbnails, the
                difference between AVIF and WebP is minimal. Focus your AVIF
                conversion efforts on the largest images on your page where the
                bandwidth savings are most impactful.
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
              Squoosh from Google was one of the first browser-based tools to
              support AVIF conversion, and it remains a powerful option for
              developers who want fine-grained control over encoding parameters
              like speed, chroma subsampling, and tile configuration. However,
              Squoosh processes one image at a time with a complex interface
              that requires technical knowledge to use effectively. Image
              Shuttle provides batch AVIF conversion with sensible defaults,
              making it accessible to designers, content creators, and anyone
              who needs to convert multiple images without understanding codec
              internals.
            </p>
            <p className="text-muted-foreground mb-4">
              Cloud-based converters like CloudConvert and FreeConvert support
              AVIF output and handle many input formats. They are convenient for
              occasional use but upload your images to remote servers, which
              raises privacy concerns and introduces dependency on third-party
              infrastructure. Free tiers typically limit file sizes and the
              number of daily conversions. Image Shuttle processes everything
              locally using Web Workers, so there are no file size limits, no
              conversion limits, and no privacy risks. Your images never leave
              your browser.
            </p>
            <p className="text-muted-foreground mb-4">
              The libavif command-line tool offers the fastest AVIF encoding and
              the most control over compression settings. It is the gold standard
              for server-side AVIF conversion in build pipelines and CI/CD
              workflows. However, it requires installation, command-line
              expertise, and is not practical for users who simply want to
              convert a few images quickly. Image Shuttle bridges this gap by
              providing high-quality AVIF conversion through an intuitive web
              interface. The visual before/after comparison is particularly
              valuable for AVIF since the format can achieve surprisingly good
              quality at very low quality settings that might seem too aggressive
              on paper.
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
              <h3 className="font-semibold mb-2">What is AVIF format?</h3>
              <p className="text-muted-foreground">
                AVIF (AV1 Image File Format) is a next-generation image format
                based on the AV1 video codec. It produces images 50% smaller
                than JPG and 20% smaller than WebP at comparable quality levels,
                with support for HDR, wide color gamut, transparency, and
                animation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Is AVIF supported by all browsers?
              </h3>
              <p className="text-muted-foreground">
                AVIF is supported by Chrome (version 85+), Firefox (version
                93+), Edge, and Safari (version 16.4+). Over 90% of global
                browser users can view AVIF images. For older browsers, provide
                WebP or JPG fallbacks using the picture element.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What is the difference between AVIF and WebP?
              </h3>
              <p className="text-muted-foreground">
                AVIF generally provides better compression than WebP, producing
                files 20% smaller at the same quality. However, WebP has broader
                browser support and faster encoding times. Both support
                transparency and animation. Use AVIF for maximum compression and
                WebP for broader compatibility.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Does AVIF support transparency?
              </h3>
              <p className="text-muted-foreground">
                Yes, AVIF supports 8-bit and 10-bit alpha channel transparency,
                similar to PNG but with much better compression. Ideal for
                logos, icons, and images requiring transparent backgrounds on
                modern websites.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Why is AVIF conversion slower?
              </h3>
              <p className="text-muted-foreground">
                AVIF encoding uses the AV1 codec which employs advanced
                compression techniques. Despite slower encoding, the resulting
                files are significantly smaller. Image Shuttle uses Web Workers
                to keep the interface responsive during conversion so the
                experience remains smooth.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Can I convert PNG to AVIF?
              </h3>
              <p className="text-muted-foreground">
                Yes! You can convert PNG, JPG, WebP, BMP, and other formats to
                AVIF. The conversion preserves transparency from PNG files while
                dramatically reducing file size through AVIF&apos;s superior
                compression algorithm.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <div className="text-center p-8 bg-muted rounded-lg">
          <h2 className="text-xl font-bold mb-2">
            Ready to Convert Your Images to AVIF?
          </h2>
          <p className="text-muted-foreground mb-4">
            Free, fast, and 100% private. No registration required.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Converting Now
          </Link>
        </div>
      </div>
    </>
  );
}
