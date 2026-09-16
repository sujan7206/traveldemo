import React from "react";
import Scene from "./Scene.jsx";
import { shell, Reveal, SectionHead } from "./ui.jsx";

const variants = ["forest", "amber", "lake"];

const fmt = (iso) =>
  new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function Blog({ posts = [] }) {
  return (
    <section style={{ background: "var(--canvas)", padding: "96px 0" }}>
      <div style={{ ...shell, display: "grid", gap: 40 }}>
        <Reveal>
          <SectionHead
            eyebrow="Latest journal"
            heading="Notes from the field, written between seasons"
            align="center"
            maxWidth={620}
          />
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 24,
          }}
        >
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 120}>
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
                    src={post.image}
                    alt={post.title}
                    className="card-media"
                    variant={variants[i % variants.length]}
                    seed={i + 1}
                    ratio="16 / 10"
                  />
                  <span
                    style={{
                      position: "absolute",
                      bottom: 14,
                      left: 14,
                      background: "#fff",
                      borderRadius: 10,
                      padding: "7px 13px",
                      fontSize: 12.5,
                      fontWeight: 600,
                    }}
                  >
                    {fmt(post.date)}
                  </span>
                </div>
                <div
                  style={{
                    padding: 24,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                    }}
                  >
                    {post.category}
                  </span>
                  <h3 style={{ fontSize: 19.5 }}>{post.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--ink-soft)" }}>
                    {post.excerpt}
                  </p>
                  <a
                    className="link-arrow"
                    href="#top"
                    style={{
                      marginTop: "auto",
                      paddingTop: 10,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--forest)",
                      display: "inline-flex",
                      gap: 8,
                    }}
                  >
                    Read More <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
