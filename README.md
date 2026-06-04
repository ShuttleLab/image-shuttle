# Image Shuttle

<div align="center">
  <h1>Image Shuttle</h1>
  <p>
    <strong>Free, Private & Browser-Based Image Studio</strong>
  </p>
  <p>
    Compress, edit, resize, collage and design images directly in your browser — no uploads, no servers, no watermark.
  </p>
</div>

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss)

</div>

## About

**Image Shuttle** is a privacy-first image studio — compressor, photo editor, collage maker and design studio in one that processes everything entirely within your browser using the Canvas API and WebAssembly. Unlike traditional online image tools that upload your files to remote servers, Image Shuttle keeps your images on your device — making it safe for personal photos, confidential designs, and sensitive business assets.

## Key Features

- **100% Private**: All processing happens client-side via Canvas API and WebAssembly. No file uploads to external servers.
- **Four Formats**: JPEG, PNG, WebP, and AVIF — compress within a format or convert between any of them.
- **WebAssembly PNG Quantization**: PNG compression uses `libimagequant-wasm` for 50-80% size reduction while preserving transparency.
- **Batch Processing**: Compress dozens of images in parallel using Web Workers (auto-tuned to your CPU core count).
- **Before/After Comparison**: Real-time visual comparison slider to verify quality before downloading.
- **Photo Editor**: FotoJet-style adjustments, 12 filters, crop with aspect presets, and exact-pixel Resize (type 512 → export 512×512).
- **Collage Maker**: 20 programmatic grid layouts, adjustable spacing/radius/background, per-cell pan & zoom.
- **Design Studio**: layered canvas with templates, gradients, and FREE custom sizes (64–4096 px).
- **Offline-Capable PWA**: Install to your home screen and compress images without an internet connection.
- **Bilingual UI**: Native English and Chinese interfaces with full SEO localization.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) primitives
- **Image Processing**:
  - Canvas API `toBlob()` for JPEG / WebP / AVIF
  - [`@fe-daily/libimagequant-wasm`](https://www.npmjs.com/package/@fe-daily/libimagequant-wasm) for PNG quantization
  - [`react-compare-slider`](https://github.com/nerdyman/react-compare-slider) for before/after visualization
- **i18n**: [next-intl](https://next-intl.dev/) with URL-based routing (`localePrefix: "as-needed"`)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) (System / Light / Dark)
- **Toasts**: [Sonner](https://sonner.emilkowal.ski/)
- **Fonts**: [Geist](https://vercel.com/font) + Geist Mono
- **PWA**: Custom Service Worker with offline precaching (including WASM modules)
- **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/) via [OpenNext](https://opennext.js.org/)

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ShuttleLab/image-shuttle.git
   cd image-shuttle
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   The `postinstall` script automatically copies the libimagequant WASM binary into `public/wasm/`.

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Compile and type-check for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Build with OpenNext and run locally via Wrangler |
| `npm run deploy` | Build with OpenNext and deploy to Cloudflare Workers |

## Deployment

Image Shuttle is deployed on Cloudflare Workers using OpenNext.

```bash
npm run deploy
```

The Service Worker (`public/sw.js`) precaches the application shell, all Layer 4 tool pages, both locales, and the libimagequant WASM module — enabling full offline operation after the first visit.

## Acknowledgments

PNG quantization is provided by [`@fe-daily/libimagequant-wasm`](https://www.npmjs.com/package/@fe-daily/libimagequant-wasm), a WebAssembly port of [libimagequant](https://github.com/ImageOptim/libimagequant).

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Built by <a href="https://github.com/ShuttleLab">ShuttleLab</a>
</div>
