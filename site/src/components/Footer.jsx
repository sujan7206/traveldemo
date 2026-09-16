import React from "react";
import { shell, Glyph, Reveal } from "./ui.jsx";

function FooterArt() {
  return (
    <svg
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <rect width="1440" height="520" fill="#12261f" />
      <path d="M0 320 L240 220 L470 340 L720 230 L980 350 L1220 250 L1440 330 L1440 520 L0 520 Z" fill="#183027" opacity="0.9" />
      {Array.from({ length: 36 }).map((_, i) => {
        const x = i * 42 + ((i * 17) % 21);
        const h = 48 + ((i * 31) % 70);
        return (
          <path key={i} d={`M${x} 520 L${x + 21} ${520 - h} L${x + 42} 520 Z`} fill="#0e1f19" />
        );
      })}
    </svg>
  );
}

const socials = ["In", "Ig", "Fb", "Yt"];

export default function Footer({ brand, footerLinks }) {
  return (
    <footer style={{ position: "relative", overflow: "hidden" }}>
      <FooterArt />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ ...shell, paddingTop: 72, paddingBottom: 48 }}>
          {/* top info row */}
          <Reveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 24,
                paddingBottom: 40,
                borderBottom: "1px solid rgba(255,255,255,0.14)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Glyph shape="pin" tone="light" />
                <span style={{ color: "rgba(255,255,255,0.86)", fontSize: 15 }}>
                  {brand?.address}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Glyph shape="mail" tone="light" />
                <span style={{ color: "rgba(255,255,255,0.86)", fontSize: 15 }}>
                  {brand?.email}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Glyph shape="phone" tone="light" />
                <span style={{ color: "rgba(255,255,255,0.86)", fontSize: 15 }}>
                  {brand?.phone}
                </span>
              </div>
            </div>
          </Reveal>

          {/* main columns */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 40,
              paddingTop: 44,
            }}
          >
            <Reveal delay={0}>
              <div style={{ display: "grid", gap: 16, maxWidth: 320 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      background: "var(--accent)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M4 20 L12 5 L20 20 Z"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </span>
                  <strong className="display" style={{ fontSize: 21, color: "#fff" }}>
                    {brand?.name}
                  </strong>
                </div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)" }}>
                  Go further, sleep better and leave the ground the way you found
                  it. New departures open every season.
                </p>
                <div style={{ display: "flex", gap: 10 }}>
                  {socials.map((s) => (
                    <span
                      key={s}
                      className="pill"
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "rgba(255,255,255,0.86)",
                        display: "grid",
                        placeItems: "center",
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "border-color 0.25s ease, color 0.25s ease",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div style={{ display: "grid", gap: 14 }}>
                <h4 style={{ fontSize: 17, color: "#fff" }}>Quick links</h4>
                <ul style={{ display: "grid", gap: 10 }}>
                  {(footerLinks?.quick ?? []).map((l) => (
                    <li key={l}>
                      <a
                        className="nav-link"
                        href="#top"
                        style={{ fontSize: 15, color: "rgba(255,255,255,0.72)" }}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div style={{ display: "grid", gap: 14 }}>
                <h4 style={{ fontSize: 17, color: "#fff" }}>Our camps</h4>
                <ul style={{ display: "grid", gap: 10 }}>
                  {(footerLinks?.sites ?? []).map((l) => (
                    <li key={l}>
                      <a
                        className="nav-link"
                        href="#top"
                        style={{ fontSize: 15, color: "rgba(255,255,255,0.72)" }}
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div style={{ display: "grid", gap: 14 }}>
                <h4 style={{ fontSize: 17, color: "#fff" }}>Season updates</h4>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.72)" }}>
                  One email when new departures open. Nothing else.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                >
                  <label htmlFor="news" style={{ position: "absolute", left: -9999 }}>
                    Email address
                  </label>
                  <input
                    id="news"
                    type="email"
                    placeholder="you@example.com"
                    style={{
                      flex: "1 1 150px",
                      minWidth: 0,
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.28)",
                      background: "rgba(255,255,255,0.07)",
                      color: "#fff",
                      padding: "12px 16px",
                      fontSize: 14.5,
                      fontFamily: "inherit",
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-solid btn-accent"
                    style={{
                      borderRadius: 999,
                      border: "none",
                      background: "var(--accent)",
                      color: "#fff",
                      padding: "12px 20px",
                      fontSize: 14.5,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Join
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)" }}>
          <div
            style={{
              ...shell,
              paddingTop: 20,
              paddingBottom: 20,
              display: "flex",
              justifyContent: "space-between",
              gap: 14,
              flexWrap: "wrap",
              fontSize: 14,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            <span>© {new Date().getFullYear()} {brand?.name}. All rights reserved.</span>
            <span>Privacy · Terms · Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
