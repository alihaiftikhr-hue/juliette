import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} · ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand-coloured social card. Uses ImageResponse's built-in font (flexbox only).
export default function Image() {
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
          background: "#43342a",
          color: "#f5efe2",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 40,
            letterSpacing: 12,
            textTransform: "uppercase",
            color: "#c9a6a0",
          }}
        >
          Juliette
        </div>
        <div
          style={{
            fontSize: 88,
            marginTop: 28,
            maxWidth: 880,
            textAlign: "center",
            lineHeight: 1.15,
          }}
        >
          The little details that make any outfit a fairytale.
        </div>
        <div
          style={{
            fontSize: 32,
            marginTop: 36,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "rgba(245,239,226,0.65)",
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size },
  );
}
