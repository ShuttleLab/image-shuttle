import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
          borderRadius: "64px",
        }}
      >
        <svg width="260" height="260" viewBox="0 0 64 64" fill="none">
          <rect x="8" y="12" width="48" height="40" rx="4" stroke="white" strokeWidth="3" fill="none" />
          <circle cx="22" cy="28" r="6" stroke="white" strokeWidth="2.5" fill="none" />
          <path d="M8 42 L22 32 L32 38 L44 26 L56 36" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
