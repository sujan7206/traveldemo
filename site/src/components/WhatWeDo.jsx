import React from "react";
import Scene from "./Scene.jsx";
import { shell, Button, Check, Glyph, Reveal, SectionHead } from "./ui.jsx";

const shapes = ["people", "flame", "leaf"];

export default function WhatWeDo({ whatWeDo }) {
  return (
    <section style={{ background: "var(--canvas)", padding: "96px 0" }}>
      <div style={{ ...shell, display: "grid", gap: 56 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(330px, 1fr))",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div style={{ display: "grid", gap: 24, maxWidth: 540 }}>
            <Reveal direction="left">
              <SectionHead
                eyebrow="What we do"
                heading="Adventure and comfort, held in the same week"
                blurb="We design trips that keep the thrill of being genuinely remote and still get you a hot meal and a dry bed at the end of the day."
                maxWidth={520}
              />
            </Reveal>
            <Reveal direction="left" delay={130}>
              <ul style={{ display: "grid", gap: 12 }}>
                {(whatWeDo?.checklist ?? []).map((item) => (
                  <Check key={item}>{item}</Check>
                ))}
              </ul>
            </Reveal>
            <Reveal direction="left" delay={220}>
              <Button>Start Your Journey</Button>
            </Reveal>
          </div>

          <Reveal direction="right">
            <Scene variant="lake" seed={4} ratio="4 / 3" style={{ borderRadius: 18 }} />
          </Reveal>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: 24,
          }}
        >
          {(whatWeDo?.cards ?? []).map((card, i) => (
            <Reveal key={card.id} delay={i * 120}>
              <div
                className="card"
                style={{
                  height: "100%",
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: 18,
                  padding: 26,
                  display: "grid",
                  gap: 14,
                  alignContent: "start",
                }}
              >
                <Glyph shape={shapes[i % shapes.length]} size={52} />
                <h3 style={{ fontSize: 19 }}>{card.title}</h3>
                <p style={{ fontSize: 15, color: "var(--ink-soft)" }}>{card.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
