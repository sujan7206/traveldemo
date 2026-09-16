import React from "react";
import { AnimatedHeading, Button, Eyebrow, Reveal, shell } from "./ui.jsx";

export default function Hero() {
  return (
    <section id="top" className="editorial-hero">
      <img
        className="editorial-hero-image"
        src="/images/valley-panorama.jpg"
        alt="Turquoise mountain lake surrounded by alpine peaks"
      />
      <div className="editorial-hero-veil" />

      <div className="editorial-hero-shell" style={{ ...shell, maxWidth: 1500 }}>
        <div className="editorial-hero-copy">
          <Reveal>
            <div className="hero-kicker">
              <Eyebrow>Nepal awaits</Eyebrow>
              <span aria-hidden="true" />
            </div>
          </Reveal>

          <h1 className="editorial-hero-title" aria-label="Discover a Higher You">
            <AnimatedHeading as="span" variant="back">
              Discover
            </AnimatedHeading>
            <span className="hero-title-second-line">
              <AnimatedHeading as="span" variant="words">a Higher</AnimatedHeading>{" "}
              <Reveal as="span" delay={700}><em>You</em></Reveal>
            </span>
          </h1>

          <Reveal delay={420}>
            <p className="editorial-hero-subtitle">
              Majestic mountains. Timeless cultures.<br />
              Extraordinary journeys through Nepal.
            </p>
          </Reveal>

          <Reveal delay={560}>
            <Button variant="solid" className="reference-gradient-button" style={{ marginTop: 8 }}>
              Explore Nepal
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
