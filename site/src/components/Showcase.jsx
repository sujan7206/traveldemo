import React from "react";
import Scene from "./Scene.jsx";
import { shell, Button, Eyebrow, Reveal, Stars } from "./ui.jsx";
import { useCountUp } from "../hooks/useMotion.js";

export default function Showcase({ showcase }) {
  const guests = useCountUp(showcase?.happyGuests ?? 250);

  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ ...shell, display: "grid", gap: 40 }}>
        <Reveal>
          <div style={{ display: "grid", gap: 12, maxWidth: 680 }}>
            <Eyebrow>Our feature</Eyebrow>
            <h2 style={{ fontSize: "clamp(28px, 3.4vw, 42px)" }}>
              {showcase?.heading}
            </h2>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {/* large overlay card */}
          <Reveal direction="left" style={{ gridColumn: "span 1" }}>
            <div
              className="card"
              style={{
                position: "relative",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid var(--line)",
                height: "100%",
                minHeight: 380,
              }}
            >
              <Scene
                className="card-media"
                variant="dusk"
                seed={2}
                ratio="4 / 3"
                style={{ height: "100%" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(12,26,20,0.9) 12%, rgba(12,26,20,0.15) 70%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: 14,
                  padding: 28,
                }}
              >
                <h3 style={{ fontSize: 24, color: "#fff", maxWidth: 380 }}>
                  Routes we walked ourselves before selling a single night
                </h3>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", maxWidth: 420 }}>
                  {showcase?.blurb}
                </p>
                <div>
                  <Button variant="accent" style={{ padding: "12px 22px" }}>
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* right column: stat, rating, price */}
          <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
            <Reveal direction="right">
              <div
                ref={guests.ref}
                className="card"
                style={{
                  background: "var(--forest)",
                  borderRadius: 18,
                  padding: 28,
                  color: "#fff",
                  display: "grid",
                  gap: 6,
                }}
              >
                <strong className="display" style={{ fontSize: 40 }}>
                  {guests.value}K+
                </strong>
                <span style={{ fontSize: 14.5, color: "rgba(255,255,255,0.78)" }}>
                  Guests hosted since our first season
                </span>
              </div>
            </Reveal>

            <Reveal direction="right" delay={110}>
              <div
                className="card"
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 18,
                  padding: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                  background: "var(--canvas)",
                }}
              >
                <div style={{ display: "grid", gap: 8 }}>
                  <Stars rating={showcase?.rating ?? 4.8} />
                  <span style={{ fontSize: 14, color: "var(--ink-soft)" }}>
                    ({showcase?.rating}/{showcase?.ratingScale}) guest rating
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>From</span>
                  <strong className="display" style={{ display: "block", fontSize: 28 }}>
                    ${showcase?.priceFrom}
                  </strong>
                  <span style={{ fontSize: 13, color: "var(--ink-soft)" }}>per night</span>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" delay={200}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {(showcase?.tags ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="pill"
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: 999,
                      padding: "9px 16px",
                      fontSize: 13.5,
                      color: "var(--ink-soft)",
                      cursor: "default",
                      transition: "border-color 0.25s ease, color 0.25s ease",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
