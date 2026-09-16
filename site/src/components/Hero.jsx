import React from "react";
import { shell, Button, Eyebrow, Glyph, Reveal } from "./ui.jsx";

function HeroArt() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#203a52" />
          <stop offset="46%" stopColor="#4a6b70" />
          <stop offset="100%" stopColor="#c89a5e" />
        </linearGradient>
        <linearGradient id="hero-veil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(10,22,18,0.72)" />
          <stop offset="55%" stopColor="rgba(10,22,18,0.42)" />
          <stop offset="100%" stopColor="rgba(10,22,18,0.82)" />
        </linearGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#hero-sky)" />
      <circle cx="1120" cy="300" r="70" fill="#f3e2c2" opacity="0.32" />

      {Array.from({ length: 70 }).map((_, i) => (
        <circle
          key={i}
          cx={(i * 197) % 1440}
          cy={(i * 83) % 380}
          r={(i % 3) * 0.7 + 0.8}
          fill="#fff"
          opacity={0.18 + ((i % 5) * 0.1)}
        />
      ))}

      <path d="M0 560 L250 350 L430 560 L620 300 L860 585 L1080 400 L1290 585 L1440 470 L1440 900 L0 900 Z" fill="#2f4f52" opacity="0.9" />
      <path d="M0 660 L210 500 L420 672 L660 470 L900 690 L1150 520 L1440 668 L1440 900 L0 900 Z" fill="#1d3a34" />
      <path d="M0 780 L260 690 L520 792 L790 700 L1080 800 L1440 720 L1440 900 L0 900 Z" fill="#12261f" />

      {Array.from({ length: 40 }).map((_, i) => {
        const x = i * 38 + ((i * 13) % 17);
        const h = 70 + ((i * 29) % 90);
        return (
          <path
            key={i}
            d={`M${x} 900 L${x + 19} ${900 - h} L${x + 38} 900 Z`}
            fill="#0d1d17"
          />
        );
      })}

      <rect width="1440" height="900" fill="url(#hero-veil)" />
    </svg>
  );
}

const contactItems = [
  { shape: "phone", label: "Call us", value: "+(123) 456-789" },
  { shape: "mail", label: "Email us", value: "hello@verdway.example" },
  { shape: "clock", label: "Working hours", value: "Mon – Sat · 08:00 to 20:00" },
];

export default function Hero() {
  return (
    <section
      id="top"
      style={{ position: "relative", background: "var(--forest-deep)" }}
    >
      <div
        className="hero-bg"
        style={{
          position: "relative",
          minHeight: "min(100vh, 860px)",
          display: "flex",
          alignItems: "center",
          paddingTop: 120,
          paddingBottom: 190,
          overflow: "hidden",
        }}
      >
        <img
          src="/images/nepal-himalaya-hero.jpg"
          alt="Himalayan peaks in Nepal at sunrise"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(8,24,19,0.84) 0%, rgba(8,24,19,0.56) 52%, rgba(8,24,19,0.24) 100%)" }} />

        <div style={{ ...shell, position: "relative", zIndex: 2 }}>
          <div style={{ display: "grid", gap: 24, maxWidth: 760 }}>
            <Reveal delay={0}>
              <Eyebrow tone="light">Welcome to Verdway</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h1
                style={{
                  fontSize: "clamp(38px, 5.6vw, 72px)",
                  color: "#fff",
                }}
              >
                Sleep in wild places without giving up the good bed
              </h1>
            </Reveal>
            <Reveal delay={220}>
              <p
                style={{
                  fontSize: 18.5,
                  color: "rgba(255,255,255,0.8)",
                  maxWidth: 560,
                }}
              >
                Small-group glamping trips across ridgelines, river bends and
                dark-sky basins, run by guides who live where they lead.
              </p>
            </Reveal>
            <Reveal delay={320}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button variant="accent">Book Your Escape</Button>
                <Button variant="ghostLight">Watch the Film</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* contact strip overlapping the hero edge */}
      <div
        style={{
          ...shell,
          position: "relative",
          zIndex: 3,
          marginTop: -96,
          marginBottom: -70,
        }}
      >
        <Reveal>
          <div
            style={{
              background: "#fff",
              borderRadius: 18,
              border: "1px solid var(--line)",
              boxShadow: "0 30px 70px -45px rgba(19,42,34,0.55)",
              padding: "28px 8px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            }}
          >
            {contactItems.map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "8px 26px",
                  borderLeft: i === 0 ? "none" : "1px solid var(--line)",
                }}
              >
                <Glyph shape={item.shape} tone="accent" />
                <div style={{ display: "grid", gap: 2 }}>
                  <span
                    style={{
                      fontSize: 12.5,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--ink-soft)",
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </span>
                  <strong style={{ fontSize: 15.5 }}>{item.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
