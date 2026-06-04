import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-sync";
import { ServiceWorkerRegister } from "@/components/service-worker-register";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ff" },
    { media: "(prefers-color-scheme: dark)", color: "#2a2540" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Image Shuttle",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  description:
    "Free online image studio: compress, convert, edit, resize to exact pixels, make collages and design graphics — entirely in your browser. No uploads, no watermark, 100% private.",
  url: "https://image.shuttlelab.org",
  featureList: [
    "Compress JPEG, PNG, WebP and AVIF images with quality control",
    "Convert images between JPEG, PNG, WebP and AVIF",
    "Batch compression with parallel processing",
    "Photo editor: brightness, contrast, saturation, hue, blur, sharpen, vignette and 12 one-click filters",
    "Crop with aspect-ratio presets and exact pixel dimensions",
    "Resize images to exact dimensions (e.g. 512x512) with aspect-ratio lock",
    "Add text, emoji stickers and shapes to photos",
    "Photo collage maker with 20 grid layouts and adjustable spacing",
    "Graphic design studio with free custom canvas sizes, layers, gradients and templates",
    "Export as PNG, JPG or WebP with compression quality control",
    "Works offline as an installable PWA",
    "No account, no watermark, all processing on-device",
  ],
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://image.shuttlelab.org/"),
  title: "Image Shuttle | Free Online Image Studio — Compress, Edit, Collage & Design",
  description:
    "Compress, convert, edit, resize, collage and design images entirely in your browser. Exact pixel resizing, filters, text, layers — no uploads, no watermark, 100% private and free.",
  manifest: "/manifest.webmanifest",
  // verification: {
  //   google: "<paste-google-search-console-verification-code-here>",
  // },
  openGraph: {
    title: "Image Shuttle | Free Online Image Compressor",
    description:
      "Compress and convert images directly in your browser. No uploads, no server — 100% private.",
    siteName: "Image Shuttle",
    type: "website",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image Shuttle | Free Online Image Compressor",
    description:
      "Compress and convert images directly in your browser. No uploads, no server — 100% private.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Image Shuttle",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <ServiceWorkerRegister />
          {children}
          <Toaster position="top-center" richColors closeButton duration={3000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
