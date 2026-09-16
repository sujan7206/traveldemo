import React from "react";
import { shell, Button, Eyebrow, Reveal } from "./ui.jsx";

export default function CtaBand({ badge = "Free", text, cta = "View All Trips" }) {
  return (
    <section style={{ background: "var(--forest)" }}>
      <div style={{ ...shell, paddingTop: 30, paddingBottom: 30 }}>
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  borderRadius: 999,
                  padding: "5px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {badge}
              </span>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.9)" }}>{text}</p>
            </div>
            <Button variant="ghostLight" style={{ padding: "11px 20px" }}>
              {cta}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FeatureSplit({ highlights = [] }) {
  return (
    <section style={{ background: "var(--canvas)", padding: "96px 0" }}>
      <div
        style={{
          ...shell,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div style={{ display: "grid", gap: 22, maxWidth: 520 }}>
          <Reveal direction="left">
            <Eyebrow>Your escape</Eyebrow>
          </Reveal>
          <Reveal direction="left" delay={100}>
            <h2 style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
              Step off the road and start a week that is actually yours
            </h2>
          </Reveal>
          <Reveal direction="left" delay={180}>
            <p style={{ fontSize: 17, color: "var(--ink-soft)" }}>
              Every trip is a story we help write rather than a schedule we hand
              you. Pick the landscape, and we will handle the rest of it.
            </p>
          </Reveal>
          <Reveal direction="left" delay={260}>
            <Button>Start Your Journey</Button>
          </Reveal>
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          {highlights.map((h, i) => (
            <Reveal key={h.id} direction="right" delay={i * 130}>
              <div
                className="card"
                style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: 18,
                  padding: 24,
                  display: "grid",
                  gap: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 12,
                      background: "var(--forest)",
                      color: "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 15,
                      fontWeight: 700,
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h3 style={{ fontSize: 19 }}>{h.title}</h3>
                </div>
                <p style={{ fontSize: 15, color: "var(--ink-soft)" }}>{h.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
