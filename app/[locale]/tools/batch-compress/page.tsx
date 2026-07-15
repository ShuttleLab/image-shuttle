import Link from "next/link";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ToolLanding } from "@/components/tool-landing";
import { getToolContent } from "@/lib/tool-content";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";

const PATH = "/tools/batch-compress";
const SLUG = "batch-compress" as const;
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = getToolContent(locale, SLUG);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: canonicalUrl(locale, PATH),
      languages: hreflangAlternates(PATH),
    },
  };
}

export default async function BatchCompressPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale !== "en") {
    return (
      <ToolLanding
        locale={locale}
        slug={SLUG}
        content={getToolContent(locale, SLUG)}
      />
    );
  }
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Batch Compress Images Online for Free",
    description:
      "A comprehensive guide to batch compressing multiple images online at once. Compress dozens of JPG, PNG, and WebP files simultaneously using browser-based parallel processing.",
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: {
      "@type": "Organization",
      name: "ShuttleLab",
      url: "https://shuttlelab.org",
    },
    url: "https://image.shuttlelab.org/tools/batch-compress",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Batch Compress Images Online",
    step: [
      { "@type": "HowToStep", position: 1, text: "Go to image.shuttlelab.org" },
      {
        "@type": "HowToStep",
        position: 2,
        text: "Select multiple image files or drag them all onto the upload area",
      },
      {
        "@type": "HowToStep",
        position: 3,
        text: "Choose your compression quality preset (High, Balanced, or Maximum Compression)",
      },
      {
        "@type": "HowToStep",
        position: 4,
        text: "Click the Apply button to compress all images at once",
      },
      {
        "@type": "HowToStep",
        position: 5,
        text: "Review the compression results and download individual files or all as a ZIP",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How many images can I compress at once?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Image Shuttle has no hard limit on the number of images you can batch compress. The practical limit depends on your browser's available memory. Most devices can easily handle 50-100 images at once. The tool uses Web Workers for parallel processing to maximize throughput.",
        },
      },
      {
        "@type": "Question",
        name: "Can I compress different image formats at the same time?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can mix JPG, PNG, WebP, BMP, GIF, and TIFF files in a single batch. Image Shuttle detects each format automatically and applies the appropriate compression algorithm. All output files will be compressed in their original format unless you specify otherwise.",
        },
      },
      {
        "@type": "Question",
        name: "How does batch compression work in the browser?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Image Shuttle uses Web Workers to process multiple images in parallel. Each image is compressed on a separate thread, utilizing your device's full CPU power. All processing happens locally in your browser — no files are uploaded to external servers.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download all compressed images at once?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! After batch compression is complete, you can download individual files or use the Download All button to get all compressed images as a single ZIP archive. This saves time when working with large numbers of files.",
        },
      },
      {
        "@type": "Question",
        name: "Is batch compression slower than single file compression?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Batch compression is actually more efficient than compressing files one by one. Web Workers process multiple images simultaneously, so compressing 10 images does not take 10 times as long. The total time depends on your device's CPU and the number of cores available.",
        },
      },
      {
        "@type": "Question",
        name: "What quality setting should I use for batch compression?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For web use, the Balanced preset (70% quality) offers the best compromise between file size and visual quality. For print or archival purposes, use High Quality (85%). For maximum file size reduction where quality is less critical, use Maximum Compression (50%).",
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
          Batch Image Compression — Compress Multiple Images at Once Online
          for Free
        </h1>
        <h1 className="text-4xl font-bold mb-4">Batch Image Compression</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Compress dozens of images at once with parallel Web Worker processing.
          Supports JPG, PNG, WebP, and more. Free, fast, and entirely private —
          everything runs in your browser.
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
            How to Batch Compress Images Online
          </h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold">Upload Multiple Images</h3>
                <p className="text-muted-foreground">
                  Go to Image Shuttle and select multiple image files from your
                  device. You can drag and drop a group of files or click to
                  browse and select them. JPG, PNG, WebP, BMP, GIF, and TIFF
                  formats are all supported. All files stay on your device —
                  nothing is uploaded to any server.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                2
              </span>
              <div>
                <h3 className="font-semibold">Choose Compression Settings</h3>
                <p className="text-muted-foreground">
                  Select a quality preset that applies to all images — High
                  Quality (85%), Balanced (70%), or Maximum Compression (50%).
                  You can also use the slider for a custom quality value. The
                  same setting is applied uniformly to ensure consistent results
                  across your entire batch.
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
                  Click Apply to compress all images at once. View the file size
                  reduction for each image individually. Download individual
                  files or use Download All to get everything as a ZIP archive.
                  Web Workers process images in parallel using your
                  device&apos;s full CPU power.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Why Batch Compress Images?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Save Hours of Manual Work
              </h3>
              <p className="text-sm text-muted-foreground">
                Instead of compressing images one by one, batch processing
                handles dozens of files simultaneously. What used to take an
                hour now takes seconds with parallel Web Worker processing that
                utilizes all available CPU cores.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Consistent Quality Across Files
              </h3>
              <p className="text-sm text-muted-foreground">
                Apply the same compression settings to all images at once. This
                ensures consistent file sizes and visual quality across your
                entire image library or website, creating a polished and
                professional appearance.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Massive Storage Savings</h3>
              <p className="text-sm text-muted-foreground">
                Batch compressing 100 images can save gigabytes of storage
                space. This reduces hosting costs, speeds up backups, and frees
                up disk space on your devices. Cloud storage providers charge
                per gigabyte, so smaller files mean real cost savings.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                100% Private and Secure
              </h3>
              <p className="text-sm text-muted-foreground">
                All compression happens directly in your browser using Web
                Workers. Your images are never uploaded to any server, ensuring
                complete privacy even when processing large batches of
                confidential or personal photos.
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
                Compressing an Entire Photo Library
              </h3>
              <p className="text-muted-foreground">
                Photographers and content creators accumulate thousands of
                images over time. Batch compressing your entire photo library
                before backing it up to cloud storage can reduce storage
                requirements by 50-70%, saving significant money on services
                like Google Drive, Dropbox, or iCloud. The process is fast
                enough that you can compress hundreds of images in a single
                session without waiting around.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Preparing Product Images for an E-Commerce Store
              </h3>
              <p className="text-muted-foreground">
                Online stores often have hundreds of product photos that need to
                be optimized for web display. Batch compressing all product
                images at the Balanced preset (70%) ensures consistent visual
                quality across your catalog while dramatically reducing page
                load times. Faster product pages lead to lower bounce rates and
                higher conversion rates, directly impacting your revenue.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Optimizing Images Before a Website Migration
              </h3>
              <p className="text-muted-foreground">
                When migrating a website to a new platform or redesigning it,
                batch compressing all existing images ensures the new site
                launches with optimal performance from day one. Export your
                current images, run them through batch compression, and upload
                the optimized versions. This can reduce total page weight by
                40-60%, giving your new site an immediate speed advantage.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Processing Screenshots and Documentation Assets
              </h3>
              <p className="text-muted-foreground">
                Technical documentation, user guides, and knowledge bases often
                contain dozens of screenshots that are saved as large PNG files.
                Batch compressing these images makes documentation pages load
                faster and reduces the storage footprint of your help center.
                This is especially valuable for SaaS companies that maintain
                extensive documentation with hundreds of annotated screenshots.
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
                Use the Balanced Preset for Most Batches
              </h3>
              <p className="text-muted-foreground">
                The 70% quality preset is the sweet spot for batch compression.
                It provides significant file size reductions (typically 50-65%)
                while maintaining visual quality that is indistinguishable from
                the original at normal viewing distances. Only use higher
                quality settings when images will be printed or viewed at full
                resolution.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Sort Files by Format Before Compressing
              </h3>
              <p className="text-muted-foreground">
                While Image Shuttle handles mixed format batches automatically,
                grouping files by format can help you review results more
                efficiently. JPG files typically compress differently than PNG
                files, so having them grouped makes it easier to verify that
                each format looks acceptable at your chosen quality setting.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Check a Few Samples Before Downloading All
              </h3>
              <p className="text-muted-foreground">
                After batch compression completes, spot-check a few images using
                the before/after slider before downloading the entire batch.
                This quick quality check ensures the compression settings
                produced acceptable results across different types of images in
                your collection.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Use ZIP Download for Large Batches
              </h3>
              <p className="text-muted-foreground">
                When compressing more than 10-15 images, use the Download All
                button to get everything as a single ZIP archive. This is much
                faster than downloading files individually and keeps your
                download folder organized. The ZIP file preserves the original
                filenames for easy identification.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Consider Your Device&apos;s Capabilities
              </h3>
              <p className="text-muted-foreground">
                Batch compression uses Web Workers to process multiple images in
                parallel. On devices with more CPU cores, compression completes
                faster. If your device feels slow during batch processing, try
                closing other browser tabs and applications to free up
                resources. Most modern devices handle 50-100 images without any
                issues.
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
              TinyPNG is the most well-known online image compression service
              and supports batch uploads. Its compression quality is excellent,
              and the interface is clean and simple. However, TinyPNG uploads
              your images to their servers for processing, which raises privacy
              concerns for sensitive content. The free tier limits you to 20
              images per batch and 5 MB per file. Image Shuttle processes
              everything locally with no batch size limits and no file size
              restrictions. For users who need to compress large volumes of
              images regularly, the lack of limits makes Image Shuttle a more
              practical choice.
            </p>
            <p className="text-muted-foreground mb-4">
              ImageOptim for macOS and FileOptimizer for Windows are powerful
              desktop batch compression tools that produce excellent results.
              They run locally on your machine, so privacy is equivalent to
              Image Shuttle. The main advantage of desktop tools is speed — they
              can be faster for very large batches because they have direct
              access to system resources without browser overhead. The
              disadvantage is that they require installation, are
              platform-specific (ImageOptim is macOS-only), and lack the
              visual before/after comparison that Image Shuttle provides. They
              also cannot run on mobile devices or Chromebooks.
            </p>
            <p className="text-muted-foreground mb-4">
              WordPress plugins like ShortPixel, Imagify, and Smush offer
              automatic batch compression that integrates directly with your
              media library. These are convenient for WordPress users but add
              weight to your site, require API keys, and often have monthly
              compression limits on free plans. They also compress images on
              external servers. Image Shuttle works as a pre-processing step —
              compress your images before uploading them to WordPress, and you
              avoid plugin overhead entirely. This approach works with any CMS
              or static site generator, not just WordPress.
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
                How many images can I compress at once?
              </h3>
              <p className="text-muted-foreground">
                There is no hard limit. The practical limit depends on your
                browser&apos;s available memory. Most devices can handle 50-100
                images at once. Web Workers enable parallel processing for
                maximum throughput, utilizing all available CPU cores.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Can I compress different formats at the same time?
              </h3>
              <p className="text-muted-foreground">
                Yes! Mix JPG, PNG, WebP, BMP, GIF, and TIFF files in a single
                batch. Image Shuttle detects each format and applies the
                appropriate compression algorithm automatically. All output
                files maintain their original format.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                How does batch compression work in the browser?
              </h3>
              <p className="text-muted-foreground">
                Image Shuttle uses Web Workers to process multiple images in
                parallel. Each image is compressed on a separate thread,
                utilizing your device&apos;s full CPU power. No files leave your
                browser — everything is processed locally for complete privacy.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Can I download all compressed images at once?
              </h3>
              <p className="text-muted-foreground">
                Yes! After compression, download individual files or use
                Download All to get everything as a single ZIP archive. This
                saves time when working with large batches and keeps files
                organized.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Is batch compression slower than single file compression?
              </h3>
              <p className="text-muted-foreground">
                No, it is more efficient. Web Workers process multiple images
                simultaneously, so compressing 10 images does not take 10 times
                as long. Total time depends on your device&apos;s CPU and the
                number of cores available.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What quality setting should I use?
              </h3>
              <p className="text-muted-foreground">
                For web use, Balanced (70%) is ideal — it offers the best
                compromise between file size and visual quality. For print or
                archival purposes, use High Quality (85%). For maximum size
                reduction where quality is less critical, use Maximum
                Compression (50%).
              </p>
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <div className="text-center p-8 bg-muted rounded-lg">
          <h2 className="text-xl font-bold mb-2">
            Ready to Batch Compress Your Images?
          </h2>
          <p className="text-muted-foreground mb-4">
            Free, fast, and 100% private. No registration required.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Batch Compressing Now
          </Link>
        </div>
      </div>
    </>
  );
}
