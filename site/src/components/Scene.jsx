import React, { useState } from "react";

/**
 * Original layered-landscape artwork drawn in SVG.
 * `variant` picks a palette, `seed` shifts the ridge silhouettes so each
 * placement looks distinct without shipping any bitmap assets.
 */
const palettes = {
  forest: ["#0f2c22", "#1d4034", "#2f5a48", "#4a7c63", "#cfe0d3"],
  dusk: ["#1b2338", "#2d3a57", "#475a7d", "#7d6a84", "#e5d6c7"],
  amber: ["#3a2412", "#6b3f1a", "#a4682a", "#c8862a", "#f0dcb8"],
  lake: ["#10343a", "#18505a", "#2a7480", "#5aa3a8", "#d6ebe6"],
  sand: ["#3d3524", "#6d5c38", "#9c8752", "#c3ab74", "#f2e8d2"],
};

export default function Scene({
  variant = "forest",
  seed = 0,
  sun = true,
  style,
  className,
  ratio = "4 / 3",
  src,
  alt = "Mountain landscape",
}) {
  const [failed, setFailed] = useState(false);
  const c = palettes[variant] ?? palettes.forest;
  const o = (seed % 5) * 14;

  return (
    <div
      className={className}
      style={{
        aspectRatio: ratio,
        width: "100%",
        overflow: "hidden",
        background: c[0],
        ...style,
      }}
    >
      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: "block", width: "100%", height: "100%" }}
        role="img"
        aria-label="Stylised landscape illustration"
      >
        <defs>
          <linearGradient id={`sky-${variant}-${seed}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c[4]} />
            <stop offset="100%" stopColor={c[3]} />
          </linearGradient>
        </defs>

        <rect width="400" height="300" fill={`url(#sky-${variant}-${seed})`} />

        {sun && (
          <circle cx={120 + o} cy={78} r={30} fill={c[4]} opacity="0.75" />
        )}

        {/* far ridge */}
        <path
          d={`M0 ${168 + (o % 20)} L${70 + o} ${118} L${132 + o} ${172} L${210 - o} ${104} L${300 + o} ${176} L400 ${126} L400 300 L0 300 Z`}
          fill={c[2]}
          opacity="0.85"
        />
        {/* mid ridge */}
        <path
          d={`M0 ${212 - (o % 16)} L${92 - o} ${158} L${176 + o} ${216} L${268 + o} ${150} L400 ${208} L400 300 L0 300 Z`}
          fill={c[1]}
        />
        {/* near ridge */}
        <path
          d={`M0 ${262} L${108 + o} ${216} L${214 - o} ${268} L${320 + o} ${222} L400 ${262} L400 300 L0 300 Z`}
          fill={c[0]}
        />

        {/* conifer band */}
        {Array.from({ length: 13 }).map((_, i) => {
          const x = 14 + i * 30 + ((seed * 7 + i * 11) % 13);
          const h = 30 + ((seed * 5 + i * 17) % 26);
          const base = 276;
          return (
            <path
              key={i}
              d={`M${x} ${base} L${x + 9} ${base - h} L${x + 18} ${base} Z`}
              fill={c[0]}
              opacity="0.92"
            />
          );
        })}

        {/* tent silhouette */}
        <path
          d={`M${292 - (seed % 3) * 18} 282 L${312 - (seed % 3) * 18} 246 L${332 - (seed % 3) * 18} 282 Z`}
          fill={c[3]}
          opacity="0.9"
        />
        <rect y="282" width="400" height="18" fill={c[0]} />
      </svg>
      )}
    </div>
  );
}
