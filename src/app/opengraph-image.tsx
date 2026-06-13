import { ImageResponse } from "next/og";

export const alt = "Le Grec Vivant — apprendre le grec ancien comme une langue vivante";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#F4EBD7",
          color: "#2A2018",
          fontFamily: "Georgia, serif",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "#9E2B25",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 84,
              border: "2px solid #B08A38",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9E2B25",
              fontSize: 38,
              fontWeight: 600,
            }}
          >
            ΓΖ
          </div>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#7A1E1A",
            }}
          >
            Le Grec Vivant
          </div>
        </div>

        <div
          style={{
            fontSize: 70,
            fontWeight: 600,
            lineHeight: 1.1,
            marginTop: 40,
            maxWidth: 980,
          }}
        >
          Apprendre le grec ancien comme une langue vivante.
        </div>

        <div
          style={{
            fontSize: 32,
            color: "#6B5A45",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          Méthode active &amp; input compréhensible — lire Homère et Platon sans
          traduire. Avec Thibault Wagret, agrégé de Lettres classiques.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 70,
            left: 80,
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            color: "#9E2B25",
          }}
        >
          <div style={{ width: 60, height: 2, background: "#B08A38" }} />
          Réservez un appel découverte
        </div>
      </div>
    ),
    { ...size },
  );
}
