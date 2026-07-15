import Link from "next/link";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ToolLanding } from "@/components/tool-landing";
import { getToolContent } from "@/lib/tool-content";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";

const PATH = "/tools/resize-image";
const SLUG = "resize-image" as const;
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

export default async function ResizeImagePage({ params }: Props) {
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
    headline: "How to Resize Images Online for Free",
    description:
      "A comprehensive guide to resizing images online using browser-based tools. Resize JPG, PNG, WebP, and other formats by pixel dimensions or percentage while maintaining aspect ratio.",
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: {
      "@type": "Organization",
      name: "ShuttleLab",
      url: "https://shuttlelab.org",
    },
    url: "https://image.shuttlelab.org/tools/resize-image",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Resize an Image Online",
    step: [
      { "@type": "HowToStep", position: 1, text: "Go to image.shuttlelab.org" },
      {
        "@type": "HowToStep",
        position: 2,
        text: "Drag and drop your image file or click to browse",
      },
      {
        "@type": "HowToStep",
        position: 3,
        text: "Enter your desired width and height in pixels, or use percentage scaling",
      },
      {
        "@type": "HowToStep",
        position: 4,
        text: "Click the Apply button to resize the image",
      },
      {
        "@type": "HowToStep",
        position: 5,
        text: "Preview the resized image and download it",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I resize an image without losing quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To resize an image with minimal quality loss, use a tool that employs high-quality resampling algorithms like Lanczos or bicubic interpolation. Image Shuttle uses advanced Canvas API scaling to maintain sharpness. Avoid enlarging images beyond their original dimensions, as this always reduces quality.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best image size for websites?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For hero images and banners, 1920 x 1080 pixels is a common size. For blog content images, 1200 x 630 pixels works well for social sharing. Thumbnails are typically 150 x 150 or 300 x 300 pixels. Always consider your specific layout and responsive design needs.",
        },
      },
      {
        "@type": "Question",
        name: "Can I resize multiple images at once?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Image Shuttle supports batch resizing. Select multiple images or drag them all onto the upload area, then set your desired dimensions. All images will be resized to the same dimensions using Web Workers for parallel processing.",
        },
      },
      {
        "@type": "Question",
        name: "What does 'maintain aspect ratio' mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Maintaining aspect ratio means the image's proportions stay the same when resized. If you change the width, the height adjusts automatically to prevent stretching or squishing. Image Shuttle locks aspect ratio by default to prevent distortion.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between resizing and cropping?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Resizing changes the overall dimensions of the entire image, scaling all content proportionally. Cropping removes parts of the image to change its dimensions or focus on a specific area. Image Shuttle focuses on resizing while preserving the full image content.",
        },
      },
      {
        "@type": "Question",
        name: "Can I resize images in pixels and percentage?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Image Shuttle supports both methods. You can enter exact pixel dimensions (e.g., 800 x 600) or scale by percentage (e.g., 50%). Both modes maintain aspect ratio by default to prevent image distortion.",
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
          Resize Image Online — Free Browser-Based Image Resizer with Aspect
          Ratio Lock
        </h1>
        <h1 className="text-4xl font-bold mb-4">Resize Images Online</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Change the dimensions of any image by pixels or percentage while
          preserving aspect ratio. Free, instant, and completely private — all
          resizing happens in your browser.
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
            How to Resize an Image Online
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
                  area. Supported formats include JPG, PNG, WebP, BMP, GIF, and
                  TIFF. You can select multiple files for batch resizing. All
                  processing happens locally — your images never leave your
                  browser.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                2
              </span>
              <div>
                <h3 className="font-semibold">Set Dimensions</h3>
                <p className="text-muted-foreground">
                  Enter your desired width and height in pixels, or use
                  percentage scaling (e.g., 50% to halve the size). The aspect
                  ratio lock is enabled by default to prevent distortion. You
                  can unlock it if you need to set width and height
                  independently for specific use cases.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                3
              </span>
              <div>
                <h3 className="font-semibold">Resize and Download</h3>
                <p className="text-muted-foreground">
                  Click Apply to resize your image. Preview the result to ensure
                  it meets your requirements. Download the resized image in your
                  preferred format. The Canvas API handles the scaling with
                  high-quality interpolation for sharp, clean results.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Why Resize Images Online?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Optimize for Web</h3>
              <p className="text-sm text-muted-foreground">
                Resizing images to the exact dimensions needed by your website
                layout prevents browsers from downloading oversized images,
                significantly improving page load speed and reducing bandwidth
                consumption.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Social Media Ready</h3>
              <p className="text-sm text-muted-foreground">
                Different social platforms require specific image sizes. Resize
                your images to fit Instagram (1080 x 1080), Twitter (1200 x
                675), Facebook (1200 x 630), and other platform requirements
                for maximum engagement.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Reduce File Size</h3>
              <p className="text-sm text-muted-foreground">
                Smaller dimensions mean fewer pixels, which directly translates
                to smaller file sizes. Resizing a 4000px image to 1200px can
                reduce file size by over 70%, making it much faster to share
                and store.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">100% Private</h3>
              <p className="text-sm text-muted-foreground">
                All resizing happens directly in your browser using the Canvas
                API. Your images are never uploaded to any server, ensuring
                complete privacy and data security. Safe for personal photos
                and confidential business images.
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
                Preparing Profile Pictures for Social Media
              </h3>
              <p className="text-muted-foreground">
                Every social media platform has different profile picture size
                requirements. LinkedIn recommends 400 x 400 pixels, Twitter
                wants 400 x 400, and Instagram uses 320 x 320. Instead of
                uploading a massive photo and letting the platform crop it
                unpredictably, resize your image to the exact dimensions first.
                This gives you full control over how your profile picture looks
                and ensures nothing important gets cut off.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Resizing Images for Email Signatures
              </h3>
              <p className="text-muted-foreground">
                Email signature logos and headshots need to be small enough to
                load quickly in email clients but large enough to look
                professional. Resizing to 150-200 pixels wide typically works
                well. Using an oversized image in an email signature forces
                recipients to download unnecessary data and can make your emails
                look unprofessional on mobile devices where space is limited.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Creating Thumbnails for Blog Posts
              </h3>
              <p className="text-muted-foreground">
                Blog platforms like WordPress, Medium, and Ghost display
                thumbnail images in article listings and related post sections.
                These thumbnails are typically 300 x 200 or 400 x 250 pixels.
                Resizing your featured images to these exact dimensions ensures
                they display correctly without awkward cropping and reduces the
                bandwidth needed to load your blog index page.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Scaling Down Camera Photos for Web Use
              </h3>
              <p className="text-muted-foreground">
                Modern cameras and smartphones produce images with resolutions
                of 4000-12000 pixels — far larger than any website needs.
                Resizing these photos to 1200-1920 pixels wide before uploading
                reduces file sizes by 80-90% while maintaining excellent visual
                quality on screens. This makes your website load dramatically
                faster and saves significant storage and bandwidth.
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
                Never Enlarge Images Beyond Original Size
              </h3>
              <p className="text-muted-foreground">
                Enlarging an image beyond its original dimensions always results
                in quality loss because the software has to invent new pixel
                data. If you need a larger image, start with a higher-resolution
                source. Downscaling is always safe; upscaling is always
                lossy.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Keep Aspect Ratio Locked for Most Use Cases
              </h3>
              <p className="text-muted-foreground">
                The aspect ratio lock prevents your images from looking
                stretched or squished. Only unlock it when you specifically need
                non-proportional dimensions, such as creating a square crop from
                a rectangular image. For most resizing tasks, keeping the lock
                on produces the best results.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Resize Before Compressing for Best Results
              </h3>
              <p className="text-muted-foreground">
                If you need to both resize and compress an image, resize it
                first. Starting with the correct dimensions means the
                compression algorithm works with fewer pixels, producing a
                smaller final file. Image Shuttle lets you resize and compress
                in separate steps for maximum control.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Use Percentage Mode for Batch Consistency
              </h3>
              <p className="text-muted-foreground">
                When resizing multiple images that have different original
                dimensions, using percentage mode (e.g., 50%) ensures all images
                are scaled proportionally. This is useful when you want to
                reduce an entire collection of images by the same factor without
                calculating individual pixel dimensions for each one.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Know Your Target Platform Requirements
              </h3>
              <p className="text-muted-foreground">
                Before resizing, check the exact dimensions your target platform
                recommends. WordPress featured images work best at 1200 x 628,
                Shopify product images at 2048 x 2048, and eBay listing images
                at 1600 x 1600. Resizing to the exact recommended dimensions
                prevents the platform from doing its own resizing, which can
                produce unpredictable results.
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
              Canva&apos;s image resizer and similar online tools like
              PicResize offer convenient browser-based resizing with preset
              dimensions for common use cases like social media posts and
              profile pictures. These tools are user-friendly and great for
              quick one-off resizes. However, they upload your images to remote
              servers for processing, which may not be acceptable for
              confidential photos. They also typically limit free users to a
              certain number of resizes per day and may add watermarks. Image
              Shuttle processes everything locally with no limits and no
              watermarks.
            </p>
            <p className="text-muted-foreground mb-4">
              Adobe Photoshop and Affinity Photo are professional tools that
              offer the highest quality resizing algorithms, including Lanczos
              resampling and AI-powered super-resolution. They are unmatched for
              professional photography and print production. However, they
              require paid subscriptions, significant learning curves, and
              powerful hardware. For web-focused resizing where you need to
              quickly scale images to specific pixel dimensions, Image Shuttle
              provides comparable quality through the Canvas API with a much
              simpler workflow that takes seconds instead of minutes.
            </p>
            <p className="text-muted-foreground mb-4">
              macOS Preview and Windows Photos both include basic image resizing
              functionality built into the operating system. They are convenient
              because they require no additional software, but they lack batch
              processing capabilities and offer limited control over resampling
              quality. Image Shuttle combines the convenience of a built-in tool
              with batch processing, aspect ratio locking, and the ability to
              resize and compress in the same workflow. The privacy advantage is
              also equivalent since everything runs locally in your browser.
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
                How do I resize an image without losing quality?
              </h3>
              <p className="text-muted-foreground">
                Use a tool with high-quality resampling algorithms. Image Shuttle
                uses advanced Canvas API scaling to maintain sharpness. The key
                rule is to avoid enlarging images beyond their original
                dimensions — always downscale, never upscale, for the best
                results.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What is the best image size for websites?
              </h3>
              <p className="text-muted-foreground">
                For hero images, 1920 x 1080 pixels is common. Blog content
                images work well at 1200 x 630 pixels for social sharing.
                Thumbnails are typically 150 x 150 or 300 x 300 pixels. Always
                match your layout requirements and consider responsive design
                breakpoints.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Can I resize multiple images at once?
              </h3>
              <p className="text-muted-foreground">
                Yes! Select multiple images or drag them all onto the upload
                area. All images will be resized to the same dimensions using
                Web Workers for parallel processing. This is much faster than
                resizing images one by one.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What does &apos;maintain aspect ratio&apos; mean?
              </h3>
              <p className="text-muted-foreground">
                Maintaining aspect ratio means the image&apos;s proportions stay
                the same when resized. If you change the width, the height
                adjusts automatically to prevent stretching or squishing. This
                is enabled by default in Image Shuttle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What is the difference between resizing and cropping?
              </h3>
              <p className="text-muted-foreground">
                Resizing changes the overall dimensions of the entire image,
                scaling all content proportionally. Cropping removes parts of the
                image to change its dimensions or focus on a specific area.
                Image Shuttle focuses on resizing while preserving the full
                image content.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Can I resize images in pixels and percentage?
              </h3>
              <p className="text-muted-foreground">
                Yes, Image Shuttle supports both methods. Enter exact pixel
                dimensions (e.g., 800 x 600) or scale by percentage (e.g.,
                50%). Both modes maintain aspect ratio by default to prevent
                image distortion.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <div className="text-center p-8 bg-muted rounded-lg">
          <h2 className="text-xl font-bold mb-2">
            Ready to Resize Your Images?
          </h2>
          <p className="text-muted-foreground mb-4">
            Free, fast, and 100% private. No registration required.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Resizing Now
          </Link>
        </div>
      </div>
    </>
  );
}
