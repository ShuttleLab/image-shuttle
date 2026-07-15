import Link from "next/link";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ToolLanding } from "@/components/tool-landing";
import { getToolContent } from "@/lib/tool-content";
import { canonicalUrl, hreflangAlternates } from "@/lib/seo";

const PATH = "/tools/convert-to-webp";
const SLUG = "convert-to-webp" as const;
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

export default async function ConvertToWebpPage({ params }: Props) {
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
    headline: "How to Convert Images to WebP Online for Free",
    description:
      "A comprehensive guide to converting JPG, PNG, and other image formats to WebP online. Reduce file size by 25-35% compared to JPG while maintaining visual quality.",
    author: { "@type": "Organization", name: "ShuttleLab" },
    publisher: {
      "@type": "Organization",
      name: "ShuttleLab",
      url: "https://shuttlelab.org",
    },
    url: "https://image.shuttlelab.org/tools/convert-to-webp",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Convert an Image to WebP Online",
    step: [
      { "@type": "HowToStep", position: 1, text: "Go to image.shuttlelab.org" },
      {
        "@type": "HowToStep",
        position: 2,
        text: "Drag and drop your image file (JPG, PNG, BMP, or GIF) or click to browse",
      },
      {
        "@type": "HowToStep",
        position: 3,
        text: "Select WebP as the output format and choose your quality settings",
      },
      {
        "@type": "HowToStep",
        position: 4,
        text: "Click the Apply button to convert the image to WebP",
      },
      {
        "@type": "HowToStep",
        position: 5,
        text: "Preview the result and download your WebP image",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is WebP format?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WebP is a modern image format developed by Google that provides superior lossy and lossless compression for images on the web. WebP images are typically 25-35% smaller than equivalent JPG files and 26% smaller than PNG files at comparable quality levels.",
        },
      },
      {
        "@type": "Question",
        name: "Is WebP supported by all browsers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WebP is supported by all major modern browsers including Chrome, Firefox, Edge, Safari (since version 14), and Opera. Over 97% of global browser users can view WebP images. For older browsers, you can provide JPG or PNG fallbacks using the picture element.",
        },
      },
      {
        "@type": "Question",
        name: "Does WebP support transparency?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, WebP supports transparency (alpha channel) just like PNG, but with significantly smaller file sizes. This makes WebP an excellent replacement for PNG files on websites where transparency is needed.",
        },
      },
      {
        "@type": "Question",
        name: "Does WebP support animation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, WebP supports animation similar to GIF but with much better compression. Animated WebP files are typically 20-30% smaller than equivalent animated GIFs while supporting 24-bit color and alpha transparency.",
        },
      },
      {
        "@type": "Question",
        name: "How do I convert JPG to WebP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Upload your JPG file to Image Shuttle, select WebP as the output format, adjust the quality slider if desired, and click Apply. The conversion happens instantly in your browser with no file upload to external servers.",
        },
      },
      {
        "@type": "Question",
        name: "Is the conversion from JPG to WebP lossless?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Since JPG is already a lossy format, converting to WebP involves re-encoding. However, at quality settings of 80% or higher, the visual difference is negligible. Image Shuttle lets you compare before and after to ensure you are happy with the result.",
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
          Convert Image to WebP Online — Free Browser-Based WebP Converter
        </h1>
        <h1 className="text-4xl font-bold mb-4">Convert Images to WebP</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Transform your JPG, PNG, BMP, and GIF images into WebP format for
          25-35% smaller file sizes. Free, instant, and completely private —
          all conversion happens in your browser.
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
            How to Convert Image to WebP Online
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
                  area. Supported formats include JPG, PNG, BMP, GIF, and TIFF.
                  You can select multiple files for batch conversion. Everything
                  stays on your device — no files are sent to external servers.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center size-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">
                2
              </span>
              <div>
                <h3 className="font-semibold">Select WebP Format</h3>
                <p className="text-muted-foreground">
                  Choose WebP as your output format. Adjust the quality slider
                  to balance file size and visual quality. Higher quality values
                  produce larger files but better visual fidelity. For most web
                  use, a quality setting between 70-80% provides excellent
                  results with significant size savings.
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
                  Click Apply to convert your image to WebP. Use the
                  before/after slider to compare the original and converted
                  image. Download your WebP file when satisfied. The conversion
                  uses the Canvas API toBlob() method for reliable,
                  high-quality output.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* Benefits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Convert to WebP?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Smaller File Sizes</h3>
              <p className="text-sm text-muted-foreground">
                WebP images are 25-35% smaller than JPG and 26% smaller than
                PNG at comparable quality. This means faster loading websites and
                reduced bandwidth costs for both you and your visitors.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Improved SEO Rankings</h3>
              <p className="text-sm text-muted-foreground">
                Google uses page speed as a ranking factor. Converting to WebP
                reduces load times, which improves Core Web Vitals and helps
                your site rank higher in search results. Faster sites also have
                lower bounce rates.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Transparency and Animation
              </h3>
              <p className="text-sm text-muted-foreground">
                WebP supports both transparency (like PNG) and animation (like
                GIF) with superior compression. One format replaces multiple
                legacy formats on your website, simplifying your image delivery
                pipeline.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">100% Private Conversion</h3>
              <p className="text-sm text-muted-foreground">
                All conversion happens directly in your browser using the Canvas
                API. Your images are never uploaded to any server, ensuring
                complete privacy and data security throughout the entire
                process.
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
                Modernizing a Legacy Website
              </h3>
              <p className="text-muted-foreground">
                Many older websites still serve JPG and PNG images from years
                ago. Converting these images to WebP can reduce total page
                weight by 25-35%, resulting in dramatically faster load times.
                Using the HTML picture element, you can serve WebP to modern
                browsers while keeping JPG or PNG fallbacks for older ones. This
                progressive approach ensures no visitor is left behind while
                most users enjoy a faster experience.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Optimizing Images for Progressive Web Apps
              </h3>
              <p className="text-muted-foreground">
                Progressive Web Apps (PWAs) need to load quickly and work
                offline. Converting images to WebP reduces the amount of data
                that needs to be cached by service workers, making your PWA
                faster to install and more responsive. Smaller image assets also
                reduce the storage footprint on users&apos; devices, which is
                especially important for mobile users with limited space.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Reducing CDN Costs for High-Traffic Sites
              </h3>
              <p className="text-muted-foreground">
                Content delivery networks charge based on bandwidth usage. For
                high-traffic websites serving millions of images per month,
                switching from JPG to WebP can reduce CDN bills by 25-35%. This
                cost savings adds up quickly for e-commerce sites, news outlets,
                and social platforms that serve large volumes of user-generated
                image content.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Replacing GIF Animations with WebP
              </h3>
              <p className="text-muted-foreground">
                Animated GIFs are notoriously large. Converting them to animated
                WebP reduces file sizes by 20-30% while supporting 24-bit color
                and alpha transparency. This is ideal for websites that use
                animated icons, loading spinners, or instructional animations
                where every kilobyte of savings improves the user experience.
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
                Use Quality 70-80% for Web Images
              </h3>
              <p className="text-muted-foreground">
                For most web images, a WebP quality setting between 70-80%
                provides the best balance of file size and visual quality. Below
                70%, you may start to notice compression artifacts in areas with
                fine detail. Above 80%, file sizes increase rapidly with minimal
                visual improvement.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Provide Fallbacks for Older Browsers
              </h3>
              <p className="text-muted-foreground">
                While 97% of browsers support WebP, some users on older systems
                may not. Use the HTML picture element with a JPG or PNG fallback
                to ensure everyone can see your images. This is a simple
                one-line change that maintains backward compatibility.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Convert from the Original Source
              </h3>
              <p className="text-muted-foreground">
                Always convert to WebP from the highest-quality original image
                available. Converting an already-compressed JPG to WebP involves
                two rounds of lossy encoding, which can compound quality loss.
                Starting from the original ensures the best possible output.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">
                Use WebP for Both Photos and Graphics
              </h3>
              <p className="text-muted-foreground">
                WebP works well for both photographic content (lossy mode) and
                graphics with transparency (lossless mode). It is versatile
                enough to replace JPG for photos and PNG for icons and logos,
                simplifying your image format strategy across your entire
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
              Squoosh from Google is one of the most powerful WebP conversion
              tools available. It offers granular control over compression
              parameters and produces excellent results. However, Squoosh is
              designed for single-image processing with a complex interface that
              can overwhelm non-technical users. Image Shuttle provides a
              streamlined experience with batch conversion support, letting you
              convert dozens of images to WebP simultaneously with consistent
              settings. Both tools process images locally in the browser, so
              privacy is equivalent.
            </p>
            <p className="text-muted-foreground mb-4">
              CloudConvert and Convertio are popular online converters that
              support WebP output. They handle many formats and offer API access
              for developers. The main drawback is that they upload your images
              to remote servers for processing, which raises privacy concerns
              and exposes your files to potential data breaches. Free tiers
              typically limit the number of conversions per day and the maximum
              file size. Image Shuttle has no such limits and never sends your
              files anywhere.
            </p>
            <p className="text-muted-foreground mb-4">
              Command-line tools like cwebp from Google&apos;s WebP library
              offer the fastest conversion speeds and the most control over
              encoding parameters. They are ideal for developers who integrate
              WebP conversion into build scripts and CI/CD pipelines. However,
              they require installation, command-line knowledge, and are not
              accessible to designers or content creators. Image Shuttle
              delivers comparable conversion quality through a visual interface
              that anyone can use, with no technical setup required. The
              before/after comparison slider also makes it easy to verify
              quality before committing to the converted file.
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
              <h3 className="font-semibold mb-2">What is WebP format?</h3>
              <p className="text-muted-foreground">
                WebP is a modern image format developed by Google that provides
                superior compression for web images. WebP files are typically
                25-35% smaller than equivalent JPG files at comparable quality
                levels, making it the preferred format for performance-focused
                websites.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Is WebP supported by all browsers?
              </h3>
              <p className="text-muted-foreground">
                WebP is supported by all major modern browsers including Chrome,
                Firefox, Edge, Safari (since version 14), and Opera. Over 97%
                of global browser users can view WebP images without any issues.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Does WebP support transparency?
              </h3>
              <p className="text-muted-foreground">
                Yes, WebP supports transparency (alpha channel) just like PNG,
                but with significantly smaller file sizes. It is an excellent
                replacement for PNG files on websites where transparency is
                needed for logos, icons, and overlays.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                How do I convert JPG to WebP?
              </h3>
              <p className="text-muted-foreground">
                Upload your JPG to Image Shuttle, select WebP as the output
                format, adjust quality if desired, and click Apply. Conversion
                happens instantly in your browser with no file upload to
                external servers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Does WebP support animation?
              </h3>
              <p className="text-muted-foreground">
                Yes, WebP supports animation similar to GIF but with much better
                compression. Animated WebP files are typically 20-30% smaller
                than equivalent animated GIFs while supporting 24-bit color and
                alpha transparency.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Is the conversion from JPG to WebP lossless?
              </h3>
              <p className="text-muted-foreground">
                Since JPG is already lossy, converting to WebP involves
                re-encoding. At quality settings of 80% or higher, the visual
                difference is negligible. You can compare before and after in
                the tool to verify quality meets your standards.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Bottom */}
        <div className="text-center p-8 bg-muted rounded-lg">
          <h2 className="text-xl font-bold mb-2">
            Ready to Convert Your Images to WebP?
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
