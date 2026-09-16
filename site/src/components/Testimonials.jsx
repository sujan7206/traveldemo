import React, { useEffect, useState } from "react";
import { shell, Reveal, SectionHead, Stars } from "./ui.jsx";
import { useCountUp, prefersReduced } from "../hooks/useMotion.js";

function Avatar({ name }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      aria-hidden="true"
      style={{
        width: 48,
        height: 48,
        flex: "0 0 auto",
        borderRadius: "50%",
        background: "var(--forest)",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        fontSize: 15,
        fontWeight: 700,
      }}
    >
      {initials}
    </span>
  );
}

export default function Testimonials({ testimonials = [], reviewSummary }) {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const reviews = useCountUp(reviewSummary?.count ?? 2000);

  useEffect(() => {
    if (!count || prefersReduced()) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count]);

  if (!count) return null;

  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div
        style={{
          ...shell,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 56,
          alignItems: "center",
        }}
      >
        {/* left: heading + review counter */}
        <div style={{ display: "grid", gap: 26, maxWidth: 460 }}>
          <Reveal direction="left">
            <SectionHead
              eyebrow="Testimonials"
              heading="Real weeks, in the words of the people who booked them"
              maxWidth={440}
            />
          </Reveal>
          <Reveal direction="left" delay={140}>
            <div
              ref={reviews.ref}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                padding: 22,
                borderRadius: 18,
                background: "var(--canvas)",
                border: "1px solid var(--line)",
              }}
            >
              <strong className="display" style={{ fontSize: 38 }}>
                {reviews.value.toLocaleString("en-US")}
              </strong>
              <div style={{ display: "grid", gap: 4 }}>
                <Stars rating={reviewSummary?.rating ?? 5} />
                <span style={{ fontSize: 14, color: "var(--ink-soft)" }}>
                  verified guest reviews
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* right: carousel */}
        <Reveal direction="right">
          <div style={{ display: "grid", gap: 18 }}>
            <div style={{ overflow: "hidden", borderRadius: 20 }}>
              <div
                style={{
                  display: "flex",
                  transform: `translateX(-${index * 100}%)`,
                  transition: "transform 0.6s var(--reveal-ease)",
                }}
              >
                {testimonials.map((t) => (
                  <figure
                    key={t.id}
                    style={{
                      flex: "0 0 100%",
                      margin: 0,
                      padding: 30,
                      background: "var(--canvas)",
                      border: "1px solid var(--line)",
                      borderRadius: 20,
                      display: "grid",
                      gap: 18,
                    }}
                  >
                    <Stars rating={5} />
                    <blockquote
                      style={{
                        margin: 0,
                        fontSize: 17.5,
                        lineHeight: 1.65,
                        color: "var(--ink)",
                      }}
                    >
                      “{t.quote}”
                    </blockquote>
                    <figcaption
                      style={{ display: "flex", alignItems: "center", gap: 14 }}
                    >
                      <Avatar name={t.name} />
                      <div style={{ display: "grid" }}>
                        <strong style={{ fontSize: 15.5 }}>{t.name}</strong>
                        <span style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>
                          {t.role}
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <button
                aria-label="Previous testimonial"
                onClick={() => setIndex((i) => (i - 1 + count) % count)}
                className="btn-ghost"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "1px solid var(--line)",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                ←
              </button>
              <button
                aria-label="Next testimonial"
                onClick={() => setIndex((i) => (i + 1) % count)}
                className="btn-ghost"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  border: "1px solid var(--line)",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                →
              </button>
              <div style={{ display: "flex", gap: 7, marginLeft: 6 }}>
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className="dot"
                    style={{
                      height: 7,
                      width: i === index ? 26 : 7,
                      borderRadius: 999,
                      border: "none",
                      cursor: "pointer",
                      background:
                        i === index ? "var(--accent)" : "rgba(19,42,34,0.2)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
