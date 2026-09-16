import React, { useEffect, useState } from "react";

const shell = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 24px",
};

function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--line)",
        background: "var(--surface)",
      }}
    >
      <div
        style={{
          ...shell,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          height: 68,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              background: "var(--accent)",
              color: "var(--accent-ink)",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            TD
          </span>
          <strong style={{ fontSize: 17, letterSpacing: "-0.01em" }}>
            Travel Demo
          </strong>
        </div>
        <nav
          style={{
            display: "flex",
            gap: 24,
            fontSize: 14,
            color: "var(--ink-soft)",
          }}
        >
          <span>Destinations</span>
          <span>Itineraries</span>
          <span>Guides</span>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ background: "var(--surface)" }}>
      <div
        style={{
          ...shell,
          paddingTop: 64,
          paddingBottom: 64,
          display: "grid",
          gap: 24,
          maxWidth: 1100,
        }}
      >
        <span
          style={{
            fontSize: 12,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--accent)",
            fontWeight: 600,
          }}
        >
          Small-group trips · 2025 season
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: 48,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            maxWidth: 680,
          }}
        >
          Six trips planned end to end, so you only pack a bag.
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: 18,
            color: "var(--ink-soft)",
            maxWidth: 620,
          }}
        >
          Flights, stays and the two or three things actually worth doing in
          each place. Prices are per person and include lodging.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            className="primary-button"
            style={{
              background: "var(--accent)",
              color: "var(--accent-ink)",
              border: "none",
              borderRadius: 10,
              padding: "12px 20px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Browse departures
          </button>
          <button
            style={{
              background: "transparent",
              color: "var(--ink)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: "12px 20px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Talk to a planner
          </button>
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ trip }) {
  return (
    <article
      className="card-link"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 14,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: 20, letterSpacing: "-0.01em" }}>
            {trip.name}
          </h3>
          <p style={{ margin: 0, fontSize: 14, color: "var(--ink-soft)" }}>
            {trip.country}
          </p>
        </div>
        <span style={{ fontSize: 14, color: "var(--warm)", fontWeight: 600 }}>
          {trip.rating.toFixed(1)} ★
        </span>
      </div>
      <p style={{ margin: 0, fontSize: 15, color: "var(--ink-soft)" }}>
        {trip.summary}
      </p>
      <p style={{ margin: 0, fontSize: 13, color: "var(--ink-soft)" }}>
        {trip.season}
      </p>
      <div
        style={{
          marginTop: "auto",
          paddingTop: 12,
          borderTop: "1px solid var(--line)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 14, color: "var(--ink-soft)" }}>
          {trip.nights} nights
        </span>
        <strong style={{ fontSize: 18 }}>
          ${trip.priceUsd.toLocaleString("en-US")}
        </strong>
      </div>
    </article>
  );
}

export default function App() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/destinations")
      .then((res) => {
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setTrips(data.destinations ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <main style={{ ...shell, paddingTop: 48, paddingBottom: 72 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 20,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 26, letterSpacing: "-0.02em" }}>
            Featured destinations
          </h2>
          <span style={{ fontSize: 14, color: "var(--ink-soft)" }}>
            {loading ? "Loading…" : `${trips.length} trips available`}
          </span>
        </div>

        {error && (
          <p
            style={{
              margin: 0,
              padding: 16,
              borderRadius: 12,
              border: "1px solid var(--line)",
              background: "var(--surface)",
              color: "var(--warm)",
              fontSize: 15,
            }}
          >
            Could not load destinations: {error}
          </p>
        )}

        {!error && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {trips.map((trip) => (
              <DestinationCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </main>
      <footer
        style={{
          borderTop: "1px solid var(--line)",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            ...shell,
            paddingTop: 24,
            paddingBottom: 24,
            fontSize: 14,
            color: "var(--ink-soft)",
          }}
        >
          Travel Demo · sample itinerary data served by the local API
        </div>
      </footer>
    </>
  );
}
