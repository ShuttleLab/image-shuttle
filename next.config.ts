import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Static export (matches pdf-shuttle / nav-shuttle): `next build` prerenders every
// locale × route to static HTML in ./out, served by Cloudflare as pure static
// assets with zero Worker rendering — so there is no per-request CPU cost and no
// 1101 CPU-limit errors on the free tier. `scripts/postbuild.mjs` promotes
// out/en -> out and patches per-locale <html lang>. Security headers live in
// public/_headers (next.config `headers()` is unsupported under output:export).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default withNextIntl(nextConfig);
