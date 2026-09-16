import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import CtaBand, { FeatureSplit } from "./components/CtaBand.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import Trips from "./components/Trips.jsx";
import Showcase from "./components/Showcase.jsx";
import WhatWeDo from "./components/WhatWeDo.jsx";
import VideoSection from "./components/VideoSection.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Blog from "./components/Blog.jsx";
import Footer from "./components/Footer.jsx";
import MotionLayer from "./components/MotionLayer.jsx";
import Partners from "./components/Partners.jsx";

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/content")
      .then((res) => {
        if (!res.ok) throw new Error(`API returned ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <main
        style={{
          minHeight: "60vh",
          display: "grid",
          placeItems: "center",
          padding: 24,
          textAlign: "center",
        }}
      >
        <div style={{ display: "grid", gap: 10 }}>
          <h1 style={{ fontSize: 26 }}>Content unavailable</h1>
          <p style={{ color: "var(--ink-soft)" }}>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <MotionLayer />
      <Header />
      <Hero />
      {data && (
        <>
          <About about={data.about} />
          <CtaBand
            badge="Free"
            text="Tell us the landscape and the dates — a custom quote takes a day."
            cta="Request a Quote"
          />
          <FeatureSplit highlights={data.journeyHighlights} />
          <WhyChooseUs reasons={data.reasons} />
          <Trips trips={data.trips} />
          <CtaBand
            badge="New"
            text="Next season's guided journeys are now open for enquiries."
            cta="View All Trips"
          />
          <Showcase showcase={data.showcase} />
          <WhatWeDo whatWeDo={data.whatWeDo} />
          <VideoSection />
          <Partners />
          <Testimonials
            testimonials={data.testimonials}
            reviewSummary={data.reviewSummary}
          />
          <Blog posts={data.posts} />
          <Footer brand={data.brand} footerLinks={data.footerLinks} />
        </>
      )}
    </>
  );
}
