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

      <div className="editorial-hero-shell" style={{ ...shell, maxWidth: 1640 }}>
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
            <Button variant="solid" style={{ marginTop: 8 }}>
              Explore Nepal
            </Button>
          </Reveal>
        </div>

        <Reveal delay={760} style={{ width: "100%" }}>
          <div className="hero-bottom-meta">
            <span className="hero-journey-label"><i /> Journeys that stay with you</span>
            <span className="hero-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 10.2A3.2 3.2 0 1 1 12 5.8a3.2 3.2 0 0 1 0 6.4Z" />
              </svg>
              Alpine Lake, Nepal
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
