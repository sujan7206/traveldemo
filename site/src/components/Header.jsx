import React, { useState } from "react";
import { shell } from "./ui.jsx";
import { Button } from "./ui.jsx";
import { useScrolled } from "../hooks/useMotion.js";

const nav = [
  {
    label: "Home",
    children: ["Version One", "Version Two", "Version Three"],
  },
  { label: "About" },
  { label: "Stays" },
  { label: "Journal" },
  {
    label: "Pages",
    children: [
      "Stay Details",
      "Journal Entry",
      "Our Trips",
      "Trip Details",
      "Our Guides",
      "Pricing",
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
          <path d="M4 20 L12 5 L20 20 Z" fill="none" stroke="#fff" strokeWidth="1.8" />
        </svg>
      </span>
      <strong
        className="display"
        style={{
          fontSize: 21,
          color: light ? "#fff" : "var(--ink)",
          letterSpacing: "-0.01em",
        }}
      >
        Verdway
      </strong>
    </a>
  );
}

export default function Header() {
  const scrolled = useScrolled(70);
  const [open, setOpen] = useState(false);
  const light = !scrolled;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 80,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        borderBottom: `1px solid ${scrolled ? "var(--line)" : "rgba(255,255,255,0.18)"}`,
        backdropFilter: scrolled ? "blur(10px)" : "none",
        transition: "background-color 0.35s ease, border-color 0.35s ease",
      }}
    >
      <div
        style={{
          ...shell,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          height: scrolled ? 70 : 88,
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
            <Button variant="accent" style={{ padding: "12px 22px" }}>
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
