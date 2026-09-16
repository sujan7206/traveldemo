import React from "react";
import Scene from "./Scene.jsx";
import { shell, Glyph, Reveal, SectionHead } from "./ui.jsx";

const sceneVariants = ["forest", "lake", "sand", "dusk"];

export default function Services({ services = [] }) {
  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ ...shell, display: "grid", gap: 44 }}>
        <Reveal>
          <SectionHead
            eyebrow="Our stays"
            heading="Four kinds of camp, each built for a different landscape"
            align="center"
            maxWidth={680}
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(258px, 1fr))",
            gap: 24,
          }}
        >
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 110}>
              <article
                className="card"
                style={{
                  height: "100%",
                  border: "1px solid var(--line)",
                  borderRadius: 18,
                  overflow: "hidden",
                  background: "#fff",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Scene
                  src={service.image}
                  alt={service.title}
                  className="card-media"
                  variant={sceneVariants[i % sceneVariants.length]}
                  seed={i + 2}
                  ratio="16 / 10"
                />
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                  <Glyph shape={["tent", "water", "peak", "moon"][i % 4]} />
                  <h3 style={{ fontSize: 20 }}>{service.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--ink-soft)" }}>
                    {service.blurb}
                  </p>
                  <a
                    className="link-arrow"
                    href="#top"
                    style={{
                      marginTop: "auto",
                      paddingTop: 6,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--forest)",
                      display: "inline-flex",
                      gap: 8,
                    }}
                  >
                    Read More <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
