import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#2C3E2D",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          color: "#D4A574",
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
