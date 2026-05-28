import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Image Shuttle - Free Online Image Compressor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
            marginBottom: 32,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="12" width="48" height="40" rx="4" stroke="white" strokeWidth="3" fill="none" />
            <circle cx="22" cy="28" r="6" stroke="white" strokeWidth="2.5" fill="none" />
            <path d="M8 42 L22 32 L32 38 L44 26 L56 36" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#1e1b4b",
            letterSpacing: "-0.02em",
          }}
        >
          Image Shuttle
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#4c1d95",
            marginTop: 16,
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          Compress &amp; convert images in your browser — 100% private
        </div>
      </div>
    ),
    { ...size },
  );
}
