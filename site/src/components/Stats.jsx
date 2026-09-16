import React from "react";
import { AnimatedHeading, shell, Reveal } from "./ui.jsx";
import { useCountUp } from "../hooks/useMotion.js";

function StatItem({ stat, index }) {
  const counter = useCountUp(stat.value);
  return (
    <div
      ref={counter.ref}
      style={{
        display: "grid",
        gap: 6,
        padding: "8px 20px",
        borderLeft: index === 0 ? "none" : "1px solid rgba(255,255,255,0.16)",
        textAlign: "center",
      }}
    >
      <strong
        className="display"
        style={{ fontSize: "clamp(30px, 3.2vw, 44px)", color: "#fff" }}
      >
        {counter.value}
        <span style={{ color: "var(--accent)" }}>{stat.suffix}</span>
      </strong>
      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.72)" }}>
        {stat.label}
      </span>
    </div>
  );
}

export default function Stats({ stats = [] }) {
  return (
    <section style={{ background: "var(--forest-deep)", padding: "72px 0" }}>
      <div style={{ ...shell, display: "grid", gap: 36 }}>
        <Reveal>
          <AnimatedHeading
            variant="words"
            className="display"
            style={{
              textAlign: "center",
              fontSize: "clamp(24px, 2.6vw, 32px)",
              color: "#fff",
            }}
          >Our seasons, counted up</AnimatedHeading>
        </Reveal>
        <Reveal delay={120}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 18,
            }}
          >
            {stats.map((stat, i) => (
              <StatItem key={stat.id} stat={stat} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
