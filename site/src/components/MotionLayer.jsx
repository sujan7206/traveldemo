import React, { useEffect, useState } from "react";
import { prefersReduced } from "../hooks/useMotion.js";

/* Page preloader + sticky scroll progress indicator. */
export default function MotionLayer() {
  const [loading, setLoading] = useState(!prefersReduced());

  useEffect(() => {
    if (!loading) return undefined;
    const finish = () => window.setTimeout(() => setLoading(false), 380);
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, [loading]);

  return (
    <>
      <div
        className={`preloader${loading ? "" : " is-hidden"}`}
        aria-hidden="true"
      >
        <span className="preloader-mark">NORDKAPP</span>
        <span className="preloader-bar" />
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </>
  );
}
