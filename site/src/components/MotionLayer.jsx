import React, { useEffect, useState } from "react";
import { prefersReduced } from "../hooks/useMotion.js";

export default function MotionLayer() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const finish = () => window.setTimeout(() => setLoading(false), 450);
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, []);

  useEffect(() => {
    if (prefersReduced() || !window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("smooth-wheel");
    let target = window.scrollY;
    let current = target;
    let frame;
    const wheel = (event) => {
      const insideDialog = event.target instanceof Element && event.target.closest("[role='dialog']");
      if (event.ctrlKey || insideDialog) return;
      event.preventDefault();
      target = Math.max(0, Math.min(target + event.deltaY, document.documentElement.scrollHeight - innerHeight));
      if (!frame) frame = requestAnimationFrame(step);
    };
    const step = () => {
      current += (target - current) * 0.14;
      window.scrollTo(0, current);
      if (Math.abs(target - current) > 0.5) frame = requestAnimationFrame(step);
      else frame = null;
    };
    const sync = () => {
      if (!frame) target = current = window.scrollY;
    };
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("smooth-wheel");
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("scroll", sync);
    };
  }, []);

  return (
    <>
      <div className={`site-preloader${loading ? "" : " is-hidden"}`} aria-hidden="true">
        <span className="preloader-mark">△</span>
        <span className="preloader-name display">Verdway</span>
        <span className="preloader-line" />
      </div>
    </>
  );
}
