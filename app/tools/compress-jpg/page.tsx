import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress JPG Online — Free Image Compressor | Image Shuttle",
  description:
    "Compress JPG and JPEG images online for free. Reduce file size by up to 80% while maintaining visual quality. No upload, no registration, 100% private browser-based compression.",
  alternates: {
    canonical: "/tools/compress-jpg",
  },
};

export default function CompressJpgPage() {
  const techArticleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "How to Compress JPG Images Online for Free",
    description:
      "A comprehensive guide to compressing JPG and JPEG images online using browser-based tools. Reduce file size by up to 80% while maintaining quality.",
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: {
      "@type": "Organization",
      name: "ShuttleLab",
      url: "https://shuttlelab.org",
    },
    url: "https://image.shuttlelab.org/tools/compress-jpg",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Compress a JPG Image Online",
    step: [
      { "@type": "HowToStep", position: 1, text: "Go to image.shuttlelab.org" },
      {
        "@type": "HowToStep",
        position: 2,
        text: "Drag and drop your JPG file or click to browse",
      },
      {
        "@type": "HowToStep",
        position: 3,
        text: "Select your desired quality preset (High, Balanced, or Maximum Compression)",
      },
      {
        "@type": "HowToStep",
        position: 4,
        text: "Click the Apply button to compress the image",
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
        name: "How much can I compress a JPG file?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JPG compression typically reduces file size by 50-80% depending on the quality setting. At 70% quality (Balanced preset), most photos see a 60-70% reduction with minimal visible quality loss.",
        },
      },
      {
        "@type": "Question",
        name: "Does compressing JPG reduce quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JPG is a lossy format, so some quality is always lost during compression. However, at quality levels above 70%, the difference is virtually invisible to the naked eye. Image Shuttle lets you compare before and after to find the perfect balance.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a file size limit for JPG compression?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Image Shuttle has no application-level file size limit. The only limitation is your browser's memory. Modern browsers can handle images up to 16,384 x 16,384 pixels (approximately 268 megapixels).",
        },
      },
      {
        "@type": "Question",
        name: "Does JPG compression affect image quality?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "JPG is a lossy format, so some quality reduction is inevitable. However, at high quality settings (85%+), the loss is imperceptible. Image Shuttle uses Canvas API's toBlob() method with configurable quality for optimal results.",
        },
      },
      {
        "@type": "Question",
        name: "Can I batch compress multiple JPG files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Image Shuttle supports batch compression. Simply select multiple JPG files or drag them all onto the upload area. The tool uses Web Workers for parallel processing, so it can handle many files simultaneously.",
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
          Compress JPG Online — Free JPEG Image Compressor with Quality
          Control
        </h1>
        <h1 className="text-4xl font-bold mb-4">Compress JPG Images</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Reduce your JPG and JPEG file sizes by up to 80% without noticeable
          quality loss. Free, fast, and entirely private — all processing
          happens in your browser.
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
            How to Compress JPG Online
          </h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                1
              </span>
              <div>
                <h3 className="font-semibold">Upload Your JPG</h3>
                <p className="text-muted-foreground">
                  Go to Image Shuttle and drag your JPG file onto the upload
                  area, or click to browse your files. You can select multiple
                  files for batch compression. The tool accepts both .jpg and
                  .jpeg extensions, and all files stay on your device — nothing
                  is sent to any server.
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
                  the slider for custom quality.
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
                  to compare quality. Download your compressed JPG when
                  satisfied. The entire process runs locally using the Canvas
                  API, so your photos never leave your browser.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Compress JPG Files?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Faster Website Loading</h3>
              <p className="text-sm text-muted-foreground">
                Compressed images load faster, improving user experience and SEO
                rankings. Google considers page speed as a ranking factor, and
                every millisecond counts when visitors decide whether to stay on
                your site or bounce.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Save Storage Space</h3>
              <p className="text-sm text-muted-foreground">
                Reduce storage requirements by 50-80%. This is especially useful
                for cloud storage, email attachments, and mobile devices where
                space is limited and every megabyte matters.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Better User Experience</h3>
              <p className="text-sm text-muted-foreground">
                Smaller images mean less bandwidth usage and faster loading,
                especially important for mobile users on slower connections. A
                compressed hero image can mean the difference between a visitor
                staying or leaving.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">100% Private</h3>
              <p className="text-sm text-muted-foreground">
                All compression happens in your browser. Your JPG files are never
                uploaded to any server, ensuring complete privacy. This makes it
                safe to compress personal photos, confidential documents, and
                sensitive business images.
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
                Compressing Photos Before WordPress Upload
              </h3>
              <p className="text-muted-foreground">
                WordPress sites often struggle with large image files slowing
                down page loads. Before uploading photos to your media library,
                compress them with Image Shuttle to reduce file size by 60-70%.
                This dramatically improves your site&apos;s Core Web Vitals
                scores, reduces server bandwidth consumption, and helps your
                pages rank higher in Google search results. Most WordPress
                hosting plans have storage limits, so smaller images also mean
                you can store more content without upgrading your plan.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Preparing Images for Email Marketing
              </h3>
              <p className="text-muted-foreground">
                Email clients like Gmail and Outlook have strict size limits for
                embedded images. Compressing your JPG photos before adding them
                to newsletters ensures faster delivery, higher open rates, and
                prevents your emails from being flagged as too large. A
                compressed product photo that loads instantly in an email is far
                more effective than one that takes several seconds to appear,
                especially on mobile devices where most emails are read today.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Optimizing Product Photos for E-Commerce
              </h3>
              <p className="text-muted-foreground">
                Online stores need high-quality product images that load quickly.
                Compressing product photos with the Balanced preset (70%)
                maintains visual appeal while reducing file sizes significantly.
                Faster product pages lead to lower bounce rates, higher
                conversion rates, and better customer satisfaction. Platforms
                like Shopify, WooCommerce, and Etsy all benefit from optimized
                images that load instantly on both desktop and mobile devices.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Reducing File Sizes for Cloud Storage
              </h3>
              <p className="text-muted-foreground">
                Services like Google Drive, Dropbox, and iCloud have storage
                limits. Compressing your JPG photo library before syncing can
                save gigabytes of space, allowing you to store more memories
                without paying for additional storage tiers. This is especially
                valuable for photographers and content creators who accumulate
                thousands of high-resolution images over time.
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
                Use the Balanced Preset for Web
              </h3>
              <p className="text-muted-foreground">
                The 70% quality preset is the sweet spot for most web images. It
                reduces file size by 60-70% while keeping photos sharp and clear
                for typical screen viewing. Only use higher quality settings when
                the image will be viewed at full resolution or printed.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Always Compare Before and After
              </h3>
              <p className="text-muted-foreground">
                Use the built-in before/after slider to check that compression
                has not introduced visible artifacts. Pay special attention to
                areas with fine detail like hair, text overlays, and sharp
                edges. If the quality is not acceptable, increase the quality
                setting and try again.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Batch Compress for Consistency
              </h3>
              <p className="text-muted-foreground">
                When preparing multiple images for a website or project, compress
                them all with the same quality setting. This ensures consistent
                visual quality across your entire collection and makes your site
                look polished and professional.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Avoid Re-Compressing Already Compressed Files
              </h3>
              <p className="text-muted-foreground">
                Each time you compress a JPG, some quality is lost. Avoid
                compressing an already-compressed file multiple times, as this
                accumulates artifacts. If possible, always start with the
                original uncompressed image for the best results.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Consider Converting to WebP for Even Smaller Files
              </h3>
              <p className="text-muted-foreground">
                If your target audience uses modern browsers, consider converting
                your JPG images to WebP format instead of just compressing them.
                WebP achieves 25-35% smaller file sizes than JPG at the same
                visual quality, giving you an extra performance boost for your
                website.
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
              When it comes to compressing JPG images online, several tools are
              available. TinyPNG is one of the most well-known options, offering
              a simple drag-and-drop interface with solid compression results.
              However, TinyPNG uploads your images to their servers for
              processing, which raises privacy concerns for sensitive photos.
              It also limits free users to 20 images per batch and caps file
              sizes at 5 MB on the free tier. Image Shuttle processes everything
              locally in your browser, so there are no file size limits, no
              batch limits, and no privacy worries.
            </p>
            <p className="text-muted-foreground mb-4">
              Google&apos;s Squoosh is another popular choice, particularly
              among developers. Squoosh offers excellent compression quality and
              supports many formats, but its interface is designed for
              single-image processing and can feel overwhelming for casual
              users. Image Shuttle provides a cleaner, more intuitive workflow
              with batch processing support, making it faster when you need to
              compress multiple photos at once.
            </p>
            <p className="text-muted-foreground mb-4">
              Desktop applications like ImageOptim (macOS) and FileOptimizer
              (Windows) offer powerful compression without requiring an internet
              connection. However, they require installation, consume disk
              space, and lack the convenience of a browser-based tool that works
              on any device. Image Shuttle combines the privacy of a desktop app
              with the accessibility of a web tool — no installation needed,
              works on Windows, macOS, Linux, ChromeOS, and mobile devices. The
              before/after comparison slider is also something most desktop
              compressors do not offer out of the box.
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
                How much can I compress a JPG file?
              </h3>
              <p className="text-muted-foreground">
                JPG compression typically reduces file size by 50-80% depending
                on the quality setting. At 70% quality (Balanced preset), most
                photos see a 60-70% reduction with minimal visible quality loss.
                Images with lots of uniform areas like skies and backgrounds
                compress more than images with complex textures.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Does JPG compression affect image quality?
              </h3>
              <p className="text-muted-foreground">
                JPG is a lossy format, so some quality reduction is inevitable.
                However, at high quality settings (85%+), the loss is
                imperceptible. Image Shuttle lets you compare before and after to
                find the perfect balance between file size and visual quality for
                your specific needs.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Is there a file size limit?</h3>
              <p className="text-muted-foreground">
                Image Shuttle has no application-level file size limit. The only
                limitation is your browser&apos;s memory. Modern browsers can
                handle images up to 16,384 x 16,384 pixels, which covers
                virtually any photo from modern cameras and smartphones.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Can I batch compress multiple JPG files?
              </h3>
              <p className="text-muted-foreground">
                Yes! Image Shuttle supports batch compression. Simply select
                multiple JPG files or drag them all onto the upload area. The
                tool uses Web Workers for parallel processing, compressing
                several images simultaneously for maximum speed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                What&apos;s the difference between JPG and JPEG?
              </h3>
              <p className="text-muted-foreground">
                JPG and JPEG are the same format. The shorter .jpg extension was
                used in older Windows systems that limited file extensions to
                three characters. Both refer to the Joint Photographic Experts
                Group format and produce identical results when compressed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Is my data safe when compressing images?
              </h3>
              <p className="text-muted-foreground">
                Absolutely. All compression happens entirely within your browser
                using the Canvas API. Your images are never transmitted over the
                internet or stored on any server. This makes Image Shuttle safe
                for compressing personal photos, business documents, and any
                other sensitive images.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <div className="text-center p-8 bg-muted rounded-lg">
          <h2 className="text-xl font-bold mb-2">
            Ready to Compress Your JPG Files?
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
