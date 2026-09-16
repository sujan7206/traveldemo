import React, { useEffect, useState } from "react";
import { shell, Reveal, SectionHead } from "./ui.jsx";

function VideoArt() {
  return (
    <svg
      viewBox="0 0 1200 520"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vid-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2a3c" />
          <stop offset="100%" stopColor="#7a6a52" />
        </linearGradient>
      </defs>
      <rect width="1200" height="520" fill="url(#vid-sky)" />
      <circle cx="950" cy="140" r="58" fill="#f0dcb8" opacity="0.75" />
      <path d="M0 330 L200 210 L380 340 L560 200 L780 350 L980 240 L1200 330 L1200 520 L0 520 Z" fill="#1f3c38" />
      <path d="M0 420 L240 340 L470 440 L720 350 L960 450 L1200 390 L1200 520 L0 520 Z" fill="#12261f" />
      <rect width="1200" height="520" fill="rgba(10,22,18,0.5)" />
    </svg>
  );
}

export default function VideoSection() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event) => event.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <section style={{ background: "#fff", padding: "96px 0" }}>
      <div style={{ ...shell, display: "grid", gap: 36 }}>
        <Reveal>
          <SectionHead
            eyebrow="Watch"
            heading="Three minutes of what a Verdway week actually looks like"
            align="center"
            maxWidth={640}
          />
        </Reveal>

        <Reveal delay={120}>
          <div
            style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              minHeight: 420,
              display: "grid",
              placeItems: "center",
            }}
          >
            <img
              src="/images/valley-panorama.jpg"
              alt="A broad green valley surrounded by mountain peaks"
              loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(10,22,18,0.42)" }} />
            <button
              className="play-btn"
              onClick={() => setOpen(true)}
              aria-label="Play the film"
              style={{
                position: "relative",
                zIndex: 2,
                width: 84,
                height: 84,
                borderRadius: "50%",
                border: "none",
                background: "rgba(255,255,255,0.92)",
                cursor: "pointer",
                display: "grid",
                placeItems: "center",
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5 L19 12 L8 19 Z" fill="var(--forest)" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8,16,13,0.88)",
            zIndex: 120,
            display: "grid",
            placeItems: "center",
            padding: 24,
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "min(960px, 100%)",
              aspectRatio: "16 / 9",
              background: "#000",
              borderRadius: 14,
              display: "grid",
              placeItems: "center",
              color: "rgba(255,255,255,0.7)",
              fontSize: 15,
            }}
          >
            <iframe
              title="Verdway mountain journey"
              src="https://www.youtube-nocookie.com/embed/LXb3EKWsInQ?autoplay=1&rel=0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: 0, borderRadius: 14 }}
            />
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close video"
            style={{
              position: "fixed",
              top: 24,
              right: 24,
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.4)",
              background: "transparent",
              color: "#fff",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
