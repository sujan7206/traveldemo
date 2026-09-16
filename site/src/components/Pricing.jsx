import React from "react";
import { shell, Button, Check, Glyph, Reveal, SectionHead } from "./ui.jsx";

const shapes = ["tent", "compass", "star"];

export default function Pricing({ plans = [], guarantees = [] }) {
  return (
    <section style={{ background: "var(--canvas)", padding: "96px 0" }}>
      <div style={{ ...shell, display: "grid", gap: 44 }}>
        <Reveal>
          <SectionHead
            eyebrow="Pricing plans"
            heading="Three packages, priced by how much we carry for you"
            align="center"
            maxWidth={640}
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 24,
            alignItems: "stretch",
          }}
        >
          {plans.map((plan, i) => {
            const hot = plan.featured;
            return (
              <Reveal key={plan.id} delay={i * 120}>
                <div
                  className="card"
                  style={{
                    height: "100%",
                    background: hot ? "var(--forest)" : "#fff",
                    color: hot ? "#fff" : "var(--ink)",
                    border: `1px solid ${hot ? "var(--forest)" : "var(--line)"}`,
                    borderRadius: 20,
                    padding: 30,
                    display: "flex",
                    flexDirection: "column",
                    gap: 18,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <Glyph
                      shape={shapes[i % shapes.length]}
                      tone={hot ? "light" : "forest"}
                      size={50}
                    />
                    {hot && (
                      <span
                        style={{
                          background: "var(--accent)",
                          borderRadius: 999,
                          padding: "5px 12px",
                          fontSize: 11.5,
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        Most booked
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: 22, color: hot ? "#fff" : "var(--ink)" }}>
                    {plan.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 15,
                      color: hot ? "rgba(255,255,255,0.78)" : "var(--ink-soft)",
                    }}
                  >
                    {plan.blurb}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 8,
                      paddingBottom: 18,
                      borderBottom: `1px solid ${hot ? "rgba(255,255,255,0.2)" : "var(--line)"}`,
                    }}
                  >
                    <strong className="display" style={{ fontSize: 36 }}>
                      ${plan.priceUsd}
                    </strong>
                    <span
                      style={{
                        fontSize: 14,
                        color: hot ? "rgba(255,255,255,0.7)" : "var(--ink-soft)",
                      }}
                    >
                      / {plan.period}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: hot ? "rgba(255,255,255,0.7)" : "var(--ink-soft)",
                    }}
                  >
                    What's included
                  </span>
                  <ul style={{ display: "grid", gap: 11 }}>
                    {plan.includes.map((item) => (
                      <Check key={item} tone={hot ? "light" : "dark"}>
                        {item}
                      </Check>
                    ))}
                  </ul>

                  <div style={{ marginTop: "auto", paddingTop: 12 }}>
                    <Button
                      variant={hot ? "accent" : "ghost"}
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      Reserve This Plan
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={100}>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              justifyContent: "center",
            }}
          >
            {guarantees.map((g) => (
              <Check key={g}>{g}</Check>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
