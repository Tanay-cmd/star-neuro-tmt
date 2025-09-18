"use client";
import React, { useEffect, useState } from "react";
import "./starry.css";

interface Star {
  cx: string;
  cy: string;
  r: number;
}

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    cx: `${Math.random() * 100}%`,
    cy: `${Math.random() * 100}%`,
    r: +(Math.random() + 0.5).toFixed(1),
  }));
}

export default function StarryBackground() {
  const [stars, setStars] = useState<Star[][]>([]);

  useEffect(() => {
    // only runs on client, avoids SSR mismatch
    setStars([
      generateStars(200),
      generateStars(200),
      generateStars(200),
    ]);
  }, []);

  if (stars.length === 0) {
    // render empty container until stars are ready
    return <div className="stars-wrapper" />;
  }

  return (
    <div className="stars-wrapper">
      {stars.map((layer, idx) => (
        <svg
          key={idx}
          className="stars"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        >
          {layer.map((star, i) => (
            <circle
              key={i}
              className="star"
              cx={star.cx}
              cy={star.cy}
              r={star.r}
            />
          ))}
        </svg>
      ))}

      {/* Comets */}
      <svg className="extras" width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <radialGradient id="comet-gradient" cx="0" cy=".5" r="0.5">
            <stop offset="0%" stopColor="rgba(255,255,255,.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        <g transform="rotate(-135)">
          <ellipse className="comet comet-a" fill="url(#comet-gradient)" cx="0" cy="0" rx="150" ry="2" />
        </g>
        <g transform="rotate(20)">
          <ellipse className="comet comet-b" fill="url(#comet-gradient)" cx="100%" cy="0" rx="150" ry="2" />
        </g>
        <g transform="rotate(300)">
          <ellipse className="comet comet-c" fill="url(#comet-gradient)" cx="40%" cy="100%" rx="150" ry="2" />
        </g>
      </svg>
    </div>
  );
}
