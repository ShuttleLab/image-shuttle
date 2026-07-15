const CACHE_VERSION = "v4";
const APP_CACHE = `image-shuttle-${CACHE_VERSION}`;
const WASM_CACHE = `image-shuttle-wasm-${CACHE_VERSION}`;

// 19 items: 14 routes + 1 WASM + 4 metadata.
// Only en + zh are precached for offline-first-visit; the 11 other locales
// (ja ko es fr de zh-TW pt ar it id vi) are runtime-cached network-first on
// first navigation (see fetch handler), so they still work offline after one
// visit without bloating install with 165 extra URLs.
const PRECACHE_URLS = [
  // Layer 1 + Layer 3 (en)
  "/",
  "/en",
  "/en/about",
  "/en/privacy",
  "/en/terms",
  // Layer 1 + Layer 3 (zh)
  "/zh",
  "/zh/about",
  "/zh/privacy",
  "/zh/terms",
  // Editor / Collage / Design
  "/editor",
  "/zh/editor",
  "/collage",
  "/zh/collage",
  "/design",
  "/zh/design",
  "/svg-to-png",
  "/zh/svg-to-png",
  // Layer 4 (en-only)
  "/tools/compress-jpg",
  "/tools/compress-png",
  "/tools/convert-to-webp",
  "/tools/convert-to-avif",
  "/tools/resize-image",
  "/tools/batch-compress",
  // WASM
  "/wasm/libimagequant_wasm_bg.wasm",
  // Metadata
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  // Best-effort: cache each URL independently so one 404 doesn't block install
  event.waitUntil(
    caches.open(APP_CACHE).then((cache) =>
      Promise.allSettled(
        PRECACHE_URLS.map((url) =>
          fetch(url).then((response) => {
            if (response.ok) return cache.put(url, response);
            throw new Error(`${url} → ${response.status}`);
          }),
        ),
      ).then((results) => {
        const failed = results.filter((r) => r.status === "rejected");
        if (failed.length > 0) {
          console.warn(
            `[sw] ${failed.length}/${PRECACHE_URLS.length} precache URLs failed:`,
            failed.map((f) => f.reason?.message || "unknown"),
          );
        }
        console.log(
          `[sw] precached ${results.length - failed.length}/${PRECACHE_URLS.length} URLs`,
        );
      }),
    ),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== APP_CACHE && k !== WASM_CACHE)
          .map((k) => caches.delete(k)),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET") return;

  // WASM files — cache-first, long-lived
  if (url.pathname.startsWith("/wasm/")) {
    event.respondWith(
      caches.open(WASM_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          });
        }),
      ),
    );
    return;
  }

  // Next.js immutable static assets — cache-first
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(APP_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          if (cached) return cached;
          return fetch(request).then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          });
        }),
      ),
    );
    return;
  }

  // Navigation requests — network-first with cache fallback
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const clone = response.clone();
          caches.open(APP_CACHE).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match("/")),
        ),
    );
    return;
  }

  // Images, fonts, icons — stale-while-revalidate
  if (
    url.pathname.match(/\.(png|svg|woff2|woff|ttf|eot)$/) ||
    url.pathname.startsWith("/icon-")
  ) {
    event.respondWith(
      caches.open(APP_CACHE).then((cache) =>
        cache.match(request).then((cached) => {
          const fetching = fetch(request).then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          });
          return cached || fetching;
        }),
      ),
    );
    return;
  }
});
