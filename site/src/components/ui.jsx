import React from "react";
import { useReveal } from "../hooks/useMotion.js";

export const shell = {
  width: "100%",
  maxWidth: "var(--shell)",
  margin: "0 auto",
  padding: "0 24px",
};

export function Reveal({ direction = "up", delay = 0, style, children, as: As = "div" }) {
  const r = useReveal({ direction, delay });
  return (
    <As
      ref={r.ref}
      className={r.className}
      style={{ ...r.style, ...style }}
    >
      {children}
    </As>
  );
}

export function AnimatedHeading({ children, as: As = "h2", variant = "chars", style }) {
  const r = useReveal();
  const text = String(children ?? "");
  const words = text.split(" ");
  return (
    <As ref={r.ref} className={`${r.className} split-heading split-${variant}`} style={{ ...r.style, ...style }} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span className="split-word" aria-hidden="true" key={`${word}-${wordIndex}`}>
          {variant === "words" ? (
            <span className="split-unit" style={{ "--split-index": wordIndex }}>{word}</span>
          ) : (
            [...word].map((character, charIndex) => {
              const previous = words.slice(0, wordIndex).reduce((sum, item) => sum + item.length, 0);
              return <span className="split-unit" style={{ "--split-index": previous + charIndex }} key={`${character}-${charIndex}`}>{character}</span>;
            })
          )}
        </span>
      ))}
    </As>
  );
}

export function Eyebrow({ children, tone = "accent" }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: tone === "light" ? "rgba(255,255,255,0.82)" : "var(--accent)",
      }}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  heading,
  blurb,
  align = "left",
  tone = "dark",
  maxWidth = 620,
}) {
  const light = tone === "light";
  return (
    <div
      style={{
        display: "grid",
        gap: 14,
        justifyItems: align === "center" ? "center" : "start",
        textAlign: align,
        maxWidth,
        margin: align === "center" ? "0 auto" : undefined,
      }}
    >
      {eyebrow && <Eyebrow tone={light ? "light" : "accent"}>{eyebrow}</Eyebrow>}
      <AnimatedHeading
        variant="chars"
        style={{
          fontSize: "clamp(28px, 3.4vw, 42px)",
          color: light ? "#fff" : "var(--ink)",
        }}
      >{heading}</AnimatedHeading>
      {blurb && (
        <p
          style={{
            fontSize: 17,
            color: light ? "rgba(255,255,255,0.78)" : "var(--ink-soft)",
          }}
        >
          {blurb}
        </p>
      )}
    </div>
  );
}

const baseBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  borderRadius: 999,
  padding: "14px 26px",
  fontSize: 15,
  fontWeight: 600,
  cursor: "pointer",
  border: "1px solid transparent",
};

export function Button({ children, variant = "solid", style, ...rest }) {
  const variants = {
    solid: {
      className: "btn-solid",
      style: { background: "var(--forest)", color: "#fff" },
    },
    accent: {
      className: "btn-solid btn-accent",
      style: { background: "var(--accent)", color: "#fff" },
    },
    ghost: {
      className: "btn-ghost",
      style: {
        background: "transparent",
        color: "var(--ink)",
        borderColor: "var(--line)",
      },
    },
    ghostLight: {
      className: "btn-ghost",
      style: {
        background: "transparent",
        color: "#fff",
        borderColor: "rgba(255,255,255,0.45)",
      },
    },
  };
  const v = variants[variant] ?? variants.solid;
  return (
    <button className={`${v.className} motion-button`} style={{ ...baseBtn, ...v.style, ...style }} {...rest}>
      <span>{children}</span>
      <span className="arrow-window" aria-hidden="true"><span>→</span><span>→</span></span>
    </button>
  );
}

export function Check({ children, tone = "dark" }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        fontSize: 15.5,
        color: tone === "light" ? "rgba(255,255,255,0.86)" : "var(--ink)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flex: "0 0 auto",
          width: 20,
          height: 20,
          marginTop: 3,
          borderRadius: "50%",
          background: "var(--accent)",
          color: "#fff",
          display: "grid",
          placeItems: "center",
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        ✓
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Glyph({ shape = "tent", size = 48, tone = "forest" }) {
  const paths = {
    tent: "M4 20 L12 5 L20 20 Z M12 5 L12 20",
    flame: "M12 3 C15 8 17 10 17 14 A5 5 0 0 1 7 14 C7 10 9 8 12 3 Z",
    leaf: "M4 20 C4 10 12 4 20 4 C20 13 13 20 4 20 Z M4 20 L14 10",
    compass: "M12 2 A10 10 0 1 1 12 22 A10 10 0 1 1 12 2 Z M8 16 L14 14 L16 8 L10 10 Z",
    star: "M12 3 L14.6 9.3 L21 9.9 L16 14.2 L17.6 21 L12 17.4 L6.4 21 L8 14.2 L3 9.9 L9.4 9.3 Z",
    moon: "M16 3 A10 10 0 1 0 16 21 A8 8 0 0 1 16 3 Z",
    phone: "M5 4 h4 l2 5 l-2 2 a12 12 0 0 0 6 6 l2 -2 l5 2 v4 a2 2 0 0 1 -2 2 A18 18 0 0 1 3 6 a2 2 0 0 1 2 -2 Z",
    mail: "M3 6 h18 v12 h-18 Z M3 6 l9 7 l9 -7",
    clock: "M12 2 A10 10 0 1 1 12 22 A10 10 0 1 1 12 2 Z M12 7 v6 l4 2",
    pin: "M12 2 a7 7 0 0 1 7 7 c0 5 -7 13 -7 13 S5 14 5 9 a7 7 0 0 1 7 -7 Z M12 9 h0.01",
    water: "M12 3 C16 9 19 12 19 15.5 A7 7 0 0 1 5 15.5 C5 12 8 9 12 3 Z",
    peak: "M2 20 L9 8 L13 14 L16 10 L22 20 Z",
    people: "M8 11 a3 3 0 1 0 0 -6 a3 3 0 0 0 0 6 Z M2 20 c0 -4 3 -6 6 -6 s6 2 6 6 M17 8 a2.5 2.5 0 1 0 0 -5 M15 14 c3 0 7 1.5 7 6",
  };
  const tones = {
    forest: { bg: "rgba(29,64,52,0.08)", fg: "var(--forest)" },
    accent: { bg: "rgba(200,134,42,0.14)", fg: "var(--accent)" },
    light: { bg: "rgba(255,255,255,0.14)", fg: "#fff" },
  };
  const t = tones[tone] ?? tones.forest;
  return (
    <span
      style={{
        width: size,
        height: size,
        flex: "0 0 auto",
        borderRadius: 14,
        background: t.bg,
        display: "grid",
        placeItems: "center",
      }}
    >
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        fill="none"
        stroke={t.fg}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={paths[shape] ?? paths.tent} />
      </svg>
    </span>
  );
}

export function Stars({ rating = 5, size = 15, color = "var(--accent)" }) {
  return (
    <span style={{ display: "inline-flex", gap: 3 }} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 3 L14.6 9.3 L21 9.9 L16 14.2 L17.6 21 L12 17.4 L6.4 21 L8 14.2 L3 9.9 L9.4 9.3 Z"
            fill={i < Math.round(rating) ? color : "rgba(0,0,0,0.16)"}
          />
        </svg>
      ))}
    </span>
  );
}
