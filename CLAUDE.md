# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

`AGENTS.md` is the canonical project briefing and is kept current — read it too. This file adds the non-obvious architecture and gotchas. Where the two disagree, prefer this file (AGENTS.md still says license MIT and predates the Konva editor stack; the project is now **AGPL-3.0-only**).

## Commands

| Task | Command |
|------|---------|
| Dev server | `npm run dev` |
| Build + type-check | `npm run build` |
| Lint | `npm run lint` |
| Preview on local Cloudflare runtime | `npm run preview` |
| Deploy to Cloudflare Workers | `npm run deploy` |

- **No test suite exists.** Verification = `npm run build` (this is the only type-check) + manual browser testing.
- `postinstall` runs `scripts/copy-wasm.mjs`, copying the libimagequant WASM binary into `public/wasm/`. If PNG compression breaks, check that this ran.

### Deploy = static export (migrated off OpenNext, 2026-07)

`npm run build` = `next build` (`output: "export"`) + `node scripts/postbuild.mjs`, producing `./out`; `npm run deploy` runs that then `wrangler deploy` (assets-only, serving `./out`). There is **no OpenNext/Worker build step** — the old `@opennextjs/cloudflare` dep (and the `@ast-grep` native-binding / `--package-lock-only` lockfile gotcha it brought) has been removed. Why: OpenNext ran every RSC/navigation request through a Worker and hit the free-tier CPU limit (Error 1101) once the site went to 13 locales; static export removes all per-request rendering.

Note: dev's npm registry is `registry.npmmirror.com` (the committed lock uses these URLs); npmmirror is reachable from Cloudflare's build and works fine. Don't bother normalizing URLs to npmjs.org.

## Big-picture architecture

Everything runs **client-side in the browser** — there are no API routes, no server-side image handling, no database. The Cloudflare Worker only serves static assets + the Next.js shell. This privacy guarantee is the product, so do not introduce server-side processing of user images.

Two distinct image pipelines coexist:

### 1. Compressor pipeline (homepage + `/tools/*`)
`components/image-compressor.tsx` → `lib/image-queue.ts` (`ImageQueue`, concurrency = `navigator.hardwareConcurrency`) → `lib/image-processor.ts`.
- JPEG/WebP/AVIF: Canvas `toBlob()` with a quality param.
- PNG: routed to `@fe-daily/libimagequant-wasm` (`compressPngWithWasm`) — WASM quantization, preserves transparency.
- Before/after UI: `react-compare-slider`.

### 2. Konva editor stack (`/editor`, `/collage`, `/design`)
Three sibling apps share one foundation. Each `app/[locale]/<tool>/page.tsx` mounts a `components/editor/*-app.tsx`:
- `editor-app.tsx` — photo editor (filters, crop, resize, adjustments)
- `collage-app.tsx` — grid collage maker
- `design-app.tsx` — layered design studio
- `editor-shell.tsx` — shared chrome/layout for all three
- `overlay-nodes.tsx` / `overlay-types.ts` — Konva node rendering + the serializable scene model

Supporting `lib/editor/`:
- `use-history.ts` — **snapshot-based undo/redo in pure React state.** Snapshots are JSON-serializable *edit descriptions*, never pixel data; equality is `JSON.stringify`. Keep all editor scene state JSON-serializable or history breaks.
- `export.ts` — renders a Konva stage region to a Blob, piping through the same quality-controlled `toBlob` as the compressor (so editor exports get format + compression choice, and never a watermark — the explicit differentiator vs FotoJet).
- `filters.ts`, `collage-layouts.ts`, `design-presets.ts`, `assets.ts` — static data/transforms for each tool.

## i18n (next-intl)

- Locales: `en` (default, served at `/`) and `zh` (`/zh`). `localePrefix: "as-needed"` — config in `i18n/routing.ts`.
- **When adding any UI string, add both `en` and `zh` entries** in `messages/`.
- Server components: `getTranslations({ locale, namespace })`. Client components: `useTranslations("namespace")`.
- Import navigation primitives (`Link`, `useRouter`, …) from `i18n/navigation.ts`, not from `next`.
- `/tools/*` SEO landing pages live under `[locale]` and are localized (an earlier bug had them outside `[locale]` 404ing — don't move them out).

## Static-export constraints — these will bite

- **`output: "export"` + `trailingSlash`** — no server runtime, no API routes, no `headers()` in `next.config` (security headers live in `public/_headers`), **no middleware**. Everything is prerendered to `./out`.
- **Locale routing without middleware**: `[locale]` + `generateStaticParams`; `scripts/postbuild.mjs` promotes `out/en` → root and patches per-locale `<html lang>` (+ `dir="rtl"` for ar); `public/_redirects` sends `/en` → `/`.
- Metadata routes (`robots.ts`, `sitemap.ts`, `manifest.ts`, icon routes) must set `export const dynamic = "force-static"` or the export build fails.
- `images: { unoptimized: true }` in `next.config.ts` — the Next Image optimizer is off; don't rely on it.
- `app/[locale]/page.tsx` is the homepage; routing happens via the app router + next-intl, not middleware.

## PWA / offline

`public/sw.js` is a hand-written service worker that precaches the app shell, all tool pages, both locales, and the WASM module. If you add a tool route or change asset paths, update the precache list so offline mode stays correct.

## Conventions

- Path alias `@/` → project root.
- Tailwind CSS v4 + shadcn/ui primitives (`components/ui/`, config in `components.json`).
- Theming via `next-themes` (System/Light/Dark); toasts via `sonner`; icons via `lucide-react`.
