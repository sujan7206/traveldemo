import React from "react";
import Scene from "./Scene.jsx";
import { shell, Reveal, SectionHead, Button } from "./ui.jsx";

const variants = ["dusk", "sand", "lake", "forest"];

export default function Trips({ trips = [] }) {
  return (
    <section style={{ background: "var(--canvas)", padding: "96px 0" }}>
      <div style={{ ...shell, display: "grid", gap: 40 }}>
        <Reveal>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <SectionHead
              eyebrow="Browse trips"
              heading="Departures across four very different landscapes"
              maxWidth={560}
            />
            <Button variant="ghost">See All Departures</Button>
          </div>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: 24,
          }}
        >
          {trips.map((trip, i) => (
            <Reveal key={trip.id} delay={i * 110}>
              <article
                className="card"
                style={{
                  height: "100%",
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: 18,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "relative" }}>
                  <Scene
                    className="card-media"
                    variant={variants[i % variants.length]}
                    seed={i + 4}
                    ratio="16 / 11"
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      background: "var(--accent)",
                      color: "#fff",
                      borderRadius: 999,
                      padding: "5px 13px",
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {trip.category}
                  </span>
                </div>

                <div
                  style={{
                    padding: 22,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    flex: 1,
                  }}
                >
                  <h3 style={{ fontSize: 19 }}>{trip.name}</h3>
                  <p style={{ fontSize: 14, color: "var(--accent)", fontWeight: 600 }}>
                    {trip.location}
                  </p>
                  <p style={{ fontSize: 15, color: "var(--ink-soft)" }}>
                    {trip.excerpt}
                  </p>
                  <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>
                    {trip.duration} · min age {trip.minAge}
                  </p>
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: 16,
                      borderTop: "1px solid var(--line)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                    }}
                  >
                    <strong style={{ fontSize: 18 }}>
                      ${trip.priceUsd.toLocaleString("en-US")}
                    </strong>
                    <a
                      className="link-arrow"
                      href="#top"
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--forest)",
                        display: "inline-flex",
                        gap: 8,
                      }}
                    >
                      Explore Trip <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
