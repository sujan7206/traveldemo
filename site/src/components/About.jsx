import React from "react";
import Scene from "./Scene.jsx";
import { shell, Button, Check, Reveal, SectionHead } from "./ui.jsx";
import { useCountUp } from "../hooks/useMotion.js";

export default function About({ about }) {
  const counter = useCountUp(about?.yearsBadge ?? 12);

  return (
    <section style={{ background: "var(--canvas)", padding: "140px 0 96px" }}>
      <div
        style={{
          ...shell,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 56,
          alignItems: "center",
        }}
      >
        {/* image collage + counter badge */}
        <Reveal direction="left">
          <div style={{ position: "relative", paddingBottom: 56, paddingRight: 48 }}>
            <Scene src={about?.image} alt="Mountain village beneath the Himalayas" variant="forest" seed={1} ratio="5 / 4" style={{ borderRadius: 18 }} />
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: "52%",
                border: "8px solid var(--canvas)",
                borderRadius: 18,
                overflow: "hidden",
              }}
            >
              <Scene src={about?.secondaryImage} alt="Clear alpine lake and mountain ridge" variant="amber" seed={3} ratio="4 / 3" />
            </div>
            <div
              ref={counter.ref}
              style={{
                position: "absolute",
                left: 18,
                bottom: 28,
                width: 138,
                height: 138,
                borderRadius: "50%",
                background: "var(--forest)",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                textAlign: "center",
                padding: 16,
                border: "8px solid var(--canvas)",
              }}
            >
              <div>
                <strong className="display" style={{ fontSize: 34, display: "block" }}>
                  {counter.value}+
                </strong>
                <span style={{ fontSize: 11.5, lineHeight: 1.35, opacity: 0.85 }}>
                  {about?.badgeLabel ?? "Seasons guiding"}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* copy */}
        <div style={{ display: "grid", gap: 26 }}>
          <Reveal direction="right">
            <SectionHead
              eyebrow={about?.eyebrow}
              heading={about?.heading}
              blurb={about?.blurb}
              maxWidth={560}
            />
          </Reveal>

          <Reveal direction="right" delay={120}>
            <ul style={{ display: "grid", gap: 12 }}>
              {(about?.checklist ?? []).map((item) => (
                <Check key={item}>{item}</Check>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="right" delay={200}>
            <blockquote
              className="display"
              style={{
                margin: 0,
                paddingLeft: 20,
                borderLeft: "3px solid var(--accent)",
                fontSize: 21,
                color: "var(--forest)",
              }}
            >
              “{about?.quote}”
            </blockquote>
          </Reveal>

          <Reveal direction="right" delay={280}>
            <Button>More About Us</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
