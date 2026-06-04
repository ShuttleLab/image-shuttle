# Image Shuttle - AGENTS.md

## Project Overview

Image Shuttle — a free, browser-based image studio: compression/conversion, FotoJet-style photo editor (/editor), collage maker (/collage) and design studio (/design). Built with Next.js 16 + React 19, deployed to Cloudflare Workers via OpenNext.

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build | `npm run build` |
| Lint | `npm run lint` |
| Preview (local CF) | `npm run preview` |
| Deploy to Cloudflare | `npm run deploy` |

- `npm run build` compiles and checks types.
- There is **no test suite** configured.

## Architecture

- `app/` — Next.js App Router
  - `app/layout.tsx` — Root layout (metadata, JSON-LD, ThemeProvider)
  - `app/page.tsx` — Redirects to `/en`
  - `app/[locale]/` — i18n routes
    - `layout.tsx` — Locale layout (NextIntlClientProvider, Header, Footer)
    - `page.tsx` — Homepage with ImageCompressor tool
    - `about/` — About page with FAQ schema
    - `privacy/` — Privacy policy
    - `terms/` — Terms of service
    - `tools/` — Layer 4 SEO landing pages
- `components/` — React components
  - `image-compressor.tsx` — Main compression tool component
  - `image-dropzone.tsx` — Drag-and-drop upload
  - `image-preview.tsx` — Before/after comparison (react-compare-slider)
  - `image-controls.tsx` — Quality/format/size controls
  - `AboutFaq.tsx` + `AboutFaqData.tsx` — FAQ data and rendering
  - `ui/` — shadcn components
- `lib/` — Shared utilities
  - `image-processor.ts` — Canvas API compression logic
  - `image-queue.ts` — Batch processing queue with concurrency control
  - `utils.ts` — `cn()` utility
- `i18n/` — next-intl configuration
  - `routing.ts` — Locale routing (`en`, `zh`, `as-needed`)
  - `request.ts` — Server-side translations
  - `navigation.ts` — Link, useRouter, etc.
- `messages/` — Translation files (en.json, zh.json)

## i18n

- URL-based with next-intl (`localePrefix: "as-needed"`)
- Default locale: `en` (served at `/`)
- Chinese: `zh` (served at `/zh`)
- Layer 4 pages: English only (`/tools/*`)
- Server components: `getTranslations({ locale, namespace })` 
- Client components: `useTranslations("namespace")`
- **Always add both `en` and `zh` entries** when adding UI text

## Image Processing

- JPEG/PNG/WebP/AVIF: Canvas API `toBlob()` with quality parameter
- PNG: Uses `@fe-daily/libimagequant-wasm` for WebAssembly quantization
- WASM file: Copied to `public/wasm/` via `postinstall` script
- Batch processing: `ImageQueue` class with `navigator.hardwareConcurrency` concurrency
- Comparison UI: `react-compare-slider` (3.4KB gzipped)

## UI Conventions

- Tailwind CSS v4 + shadcn/ui
- Geist + Geist Mono fonts
- Theme: System/Light/Dark (via `ThemeProvider`)
- Toast: sonner (top-center, richColors, 3s)
- Icons: lucide-react
- Path alias: `@/` maps to project root

## Cloudflare Deployment

- OpenNext adapter (`@opennextjs/cloudflare`)
- `wrangler.toml` configures Worker + static assets
- No Edge Runtime (not supported by OpenNext)
- No middleware (incompatible with OpenNext)
- `images.unoptimized: true` in next.config.ts

## SEO

- Layer 1: Homepage (500+ words + tool UI)
- Layer 3: About (FAQPage + HowTo schemas), Privacy, Terms
- Layer 4: 6 tool landing pages (800-1500 words each)
- All pages have proper metadata, canonical URLs, and hreflang
- See `SEO_OVERVIEW.md` for complete asset map

## License

MIT — inspired by Google's Squoosh project (Apache 2.0)
