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
    const cursor = document.querySelector(".magic-cursor");
    const dot = document.querySelector(".magic-cursor-dot");
    let x = -100;
    let y = -100;
    let tx = x;
    let ty = y;
    let frame;
    const move = (event) => {
      tx = event.clientX;
      ty = event.clientY;
      cursor.classList.add("has-moved");
      dot.classList.add("has-moved");
      dot.style.transform = `translate3d(${tx}px,${ty}px,0)`;
    };
    const tick = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      cursor.style.transform = `translate3d(${x}px,${y}px,0)`;
      frame = requestAnimationFrame(tick);
    };
    const hover = (event) => {
      if (event.target.closest("a, button, .card, .pill")) cursor.classList.add("is-active");
      else cursor.classList.remove("is-active");
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", hover, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", hover);
    };
  }, []);

  useEffect(() => {
    if (prefersReduced() || !window.matchMedia("(pointer: fine)").matches) return;
    let target = window.scrollY;
    let current = target;
    let frame;
    const wheel = (event) => {
      if (event.ctrlKey || event.target.closest("[role='dialog']")) return;
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
      <span className="magic-cursor" aria-hidden="true" />
      <span className="magic-cursor-dot" aria-hidden="true" />
    </>
  );
}
