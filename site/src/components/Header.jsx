import React, { useState } from "react";
import { shell } from "./ui.jsx";
import { Button } from "./ui.jsx";
import { useScrolled } from "../hooks/useMotion.js";

const nav = [
  { label: "Destinations", children: ["Himalayas", "Kathmandu Valley", "Pokhara", "Terai"] },
  { label: "Experiences", children: ["Trekking", "Culture", "Wildlife", "Wellness"] },
  { label: "About Nepal" },
  { label: "Trip Planner" },
  {
    label: "More",
    children: [
      "Journey Details",
      "Journal Entry",
      "Our Trips",
      "Trip Details",
      "Our Guides",
      "Testimonials",
      "Gallery",
      "FAQs",
      {
        label: "Layouts",
        children: ["Header One", "Header Two", "Footer One", "Footer Two"],
      },
    ],
  },
  { label: "Contact" },
];

const submenuShell = {
  position: "absolute",
  top: "100%",
  left: 0,
  minWidth: 210,
  background: "#fff",
  border: "1px solid var(--line)",
  borderRadius: 12,
  padding: 8,
  boxShadow: "0 24px 50px -30px rgba(19,42,34,0.5)",
  zIndex: 60,
};

function SubMenu({ items, nested = false }) {
  return (
    <div
      className="submenu"
      style={{
        ...submenuShell,
        ...(nested ? { top: -8, left: "100%", marginLeft: 6 } : { marginTop: 10 }),
      }}
    >
      {items.map((item) => {
        const isGroup = typeof item !== "string";
        const label = isGroup ? item.label : item;
        return (
          <div
            key={label}
            className="submenu-item"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              padding: "9px 12px",
              borderRadius: 8,
              fontSize: 14.5,
              color: "var(--ink)",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <span>{label}</span>
            {isGroup && <span aria-hidden="true">›</span>}
            {isGroup && <SubMenu items={item.children} nested />}
          </div>
        );
      })}
    </div>
  );
}

function Logo({ light }) {
  return (
    <a
      href="#top"
      style={{ display: "flex", alignItems: "center", gap: 10 }}
      aria-label="Verdway home"
    >
      <span className="mountain-logo" style={{ color: "var(--forest-deep)" }}>
        <svg width="48" height="30" viewBox="0 0 60 36" fill="none" aria-hidden="true">
          <path d="M2 31 19 12l7 8L37 3l21 28" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="m31 12 6-9 7 10-5-3-3 5-2-5-3 2Z" fill="currentColor" />
        </svg>
        <span>
          <strong className="display">Verd<span>way</span></strong>
          <small>MORE THAN A JOURNEY</small>
        </span>
      </span>
    </a>
  );
}

export default function Header() {
  const scrolled = useScrolled(70);
  const [open, setOpen] = useState(false);
  const light = false;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 80,
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.08)",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "rgba(18,33,28,0.08)"}`,
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "background-color 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div
        style={{
          ...shell,
          maxWidth: 1640,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          height: scrolled ? 72 : 104,
          transition: "height 0.35s ease",
        }}
      >
        <Logo light={light} />

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            fontSize: 15,
            fontWeight: 500,
          }}
          className="desktop-nav"
        >
          {nav.map((item) => (
            <div
              key={item.label}
              className="nav-item"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 6,
                paddingBlock: 14,
                cursor: "pointer",
                color: light ? "rgba(255,255,255,0.92)" : "var(--ink)",
              }}
            >
              <span>{item.label}</span>
              {item.children && (
                <span aria-hidden="true" style={{ fontSize: 10 }}>
                  ▾
                </span>
              )}
              {item.children && <SubMenu items={item.children} />}
            </div>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            aria-label="Search"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `1px solid ${light ? "rgba(255,255,255,0.4)" : "var(--line)"}`,
              background: "transparent",
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={light ? "#fff" : "var(--ink)"}
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5 L21 21" />
            </svg>
          </button>

          <div className="header-cta">
              <Button variant="solid" style={{ padding: "13px 24px", border: "1px solid var(--accent)" }}>
                Plan a Trip
            </Button>
          </div>

          <button
            className="burger"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            style={{
              display: "none",
              width: 40,
              height: 40,
              borderRadius: 10,
              border: `1px solid ${light ? "rgba(255,255,255,0.4)" : "var(--line)"}`,
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke={light ? "#fff" : "var(--ink)"}
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10,20,16,0.55)",
          opacity: open ? 1 : 0,
          visibility: open ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          zIndex: 90,
        }}
        onClick={() => setOpen(false)}
      />
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(320px, 86vw)",
          background: "#fff",
          zIndex: 95,
          padding: 24,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s var(--reveal-ease)",
          overflowY: "auto",
        }}
        aria-hidden={!open}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Logo />
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              border: "1px solid var(--line)",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
        <ul style={{ display: "grid", gap: 4 }}>
          {nav.map((item) => (
            <li key={item.label}>
              <div
                style={{
                  padding: "12px 4px",
                  borderBottom: "1px solid var(--line)",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                {item.label}
              </div>
              {item.children && (
                <ul style={{ padding: "6px 0 6px 14px", display: "grid", gap: 6 }}>
                  {item.children.map((c) => (
                    <li
                      key={typeof c === "string" ? c : c.label}
                      style={{ fontSize: 14, color: "var(--ink-soft)" }}
                    >
                      {typeof c === "string" ? c : c.label}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        <div style={{ marginTop: 20 }}>
          <Button variant="accent" style={{ width: "100%", justifyContent: "center" }}>
            Plan a Trip
          </Button>
        </div>
      </aside>
    </header>
  );
}
