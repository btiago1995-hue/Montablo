import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: "#2C3E2D",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          color: "#D4A574",
          letterSpacing: -2,
        }}
      >
        MT
      </div>
    ),
    {
      ...size,
    }
  );
}
