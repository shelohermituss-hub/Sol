import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon généré dynamiquement — reprend le mark du splash screen
// (carré noir arrondi, "$" vert). Cf. design-refs/01-onboarding/00-splash.png
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: 7,
        }}
      >
        <span style={{ color: "#00E010", fontSize: 20, fontWeight: 700 }}>$</span>
      </div>
    ),
    { ...size },
  );
}
