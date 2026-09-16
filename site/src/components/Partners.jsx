import React from "react";
import { Reveal, shell } from "./ui.jsx";

const partners = ["SUMMIT CO.", "NORTHSTAR", "WILD ROUTES", "CEDAR & STONE", "ALPINE CLUB", "FIELD NOTES"];

export default function Partners() {
  const loop = [...partners, ...partners];
  return (
    <section style={{ background: "#fff", borderBottom: "1px solid var(--line)" }} aria-label="Travel partners">
      <div style={{ ...shell, paddingTop: 28, paddingBottom: 28, overflow: "hidden" }}>
        <Reveal>
          <div className="partner-track">
            {loop.map((name, index) => (
              <span className="partner-logo display" key={`${name}-${index}`} aria-hidden={index >= partners.length}>
                <i aria-hidden="true">✦</i> {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
