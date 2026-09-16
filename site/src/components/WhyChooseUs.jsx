import React from "react";
import { shell, Glyph, Reveal, SectionHead } from "./ui.jsx";

const shapes = ["flame", "tent", "people", "compass"];

export default function WhyChooseUs({ reasons = [] }) {
  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ ...shell, display: "grid", gap: 44 }}>
        <Reveal>
          <SectionHead
            eyebrow="Why choose us"
            heading="What makes a Verdway week different from a hotel week"
            blurb="We keep the operation small on purpose. Fewer sites, more time in each one, and guides who are not reading the landscape for the first time."
            align="center"
            maxWidth={720}
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 24,
          }}
        >
          {reasons.map((reason, i) => (
            <Reveal key={reason.id} delay={i * 110}>
              <div
                className="card"
                style={{
                  height: "100%",
                  border: "1px solid var(--line)",
                  borderRadius: 18,
                  padding: 26,
                  display: "grid",
                  gap: 14,
                  alignContent: "start",
                  background: "var(--canvas)",
                }}
              >
                <Glyph shape={shapes[i % shapes.length]} tone="accent" size={52} />
                <h3 style={{ fontSize: 19 }}>{reason.title}</h3>
                <p style={{ fontSize: 15, color: "var(--ink-soft)" }}>
                  {reason.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
