import React from "react";
import { AnimatedHeading, Button, Eyebrow, Reveal, shell } from "./ui.jsx";

export default function Hero() {
  return (
    <section id="top" className="editorial-hero">
      <img
        className="editorial-hero-image"
        src="/images/nepal-himalaya-hero-hq.jpg"
        alt="Snow-covered Himalayan peaks and prayer flags in Nepal"
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

          <h1 className="editorial-hero-title" aria-label="Higher Trails, Deeper Stories">
            <AnimatedHeading as="span" variant="back">Higher Trails,</AnimatedHeading>
            <span className="hero-title-second-line">
              <Reveal as="span" delay={560}><em>Deeper</em></Reveal>{" "}
              <AnimatedHeading as="span" variant="words">Stories</AnimatedHeading>
            </span>
          </h1>

          <Reveal delay={420}>
            <p className="editorial-hero-subtitle">
              Authentic journeys through Nepal’s mountains,<br />
              cultures, and timeless landscapes.
            </p>
          </Reveal>

          <Reveal delay={560}>
            <Button variant="solid" className="hero-explore-button" style={{ marginTop: 8 }}>
              Explore Nepal
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
