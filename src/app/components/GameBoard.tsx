"use client";
import React, { useState, useEffect, useMemo } from "react";

function GameBoard({ data, connections, setConnections }: any) {
  const containerWidth = 1000;
  const containerHeight = 600;
  const originalWidth = 1000;
  const originalHeight = 1000;
  const scaleX = containerWidth / originalWidth;
  const scaleY = containerHeight / originalHeight;

  const [lastSelected, setLastSelected] = useState<string | null>(null);
  const [clickedStars, setClickedStars] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (connections.length === 0) {
      setClickedStars(new Set());
      setLastSelected(null);
    }
  }, [connections]);

  const handleCircleClick = (label: string) => {
    setClickedStars((prev) => new Set(prev).add(label));
    if (!lastSelected) setLastSelected(label);
    else if (lastSelected === label) setLastSelected(null);
    else {
      const newConnections: [string, string][] = [...connections, [lastSelected, label]];
      setConnections(newConnections);
      setLastSelected(label);
    }
  };

  const starColors = [
    { core: "#ffffff", glow: "rgba(255,255,255,0.8)", glowDim: "rgba(255,255,255,0.3)" },
    { core: "#fff8e1", glow: "rgba(255,241,173,0.8)", glowDim: "rgba(255,241,173,0.3)" },
    { core: "#ffe0b2", glow: "rgba(255,180,100,0.8)", glowDim: "rgba(255,180,100,0.3)" },
  ];

  const stars = useMemo(() => {
    return Object.keys(data.task).map(() => {
      const duration = 1 + Math.random() * 1.5;
      const size = 12 + Math.random() * 10;
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      return { size, duration, color };
    });
  }, [data.task]);

  const starPositions = useMemo(() => {
    const padding = 20;
    return Object.entries(data.task).reduce((acc, [label, pos], index) => {
      const size = stars[index].size;
      const radius = size / 2;
      const left = Math.min(Math.max(pos.x * scaleX, padding + radius), containerWidth - padding - radius);
      const top = Math.min(Math.max(pos.y * scaleY, padding + radius), containerHeight - padding - radius);
      acc[label] = { left, top };
      return acc;
    }, {} as Record<string, { left: number; top: number }>);
  }, [data.task, stars, scaleX, scaleY]);

  return (
    <div style={{ width: containerWidth, height: containerHeight }} className="relative overflow-hidden bg-transparent">
      {/* Animated glowing lines */}
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <defs>
        {/* Solid glowing line base */}
        <linearGradient id="baseGlow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>

        {/* Moving glow gradient */}
        <linearGradient id="movingGlow">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            from="-1 0"
            to="2 0"
            dur="2s"
            repeatCount="indefinite"
          />
        </linearGradient>
      </defs>

      {connections.map(([from, to], i) => {
        const fromPos = starPositions[from];
        const toPos = starPositions[to];
        if (!fromPos || !toPos) return null;

        const dx = toPos.left - fromPos.left;
        const dy = toPos.top - fromPos.top;
        const length = Math.sqrt(dx * dx + dy * dy);

        return (
          <g key={i}>
            {/* Base glowing line (fades in with draw animation) */}
            <line
              x1={fromPos.left}
              y1={fromPos.top}
              x2={toPos.left}
              y2={toPos.top}
              stroke="url(#baseGlow)"
              strokeWidth={2}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 6px white)",
                strokeDasharray: length,
                strokeDashoffset: length,
                animation: "drawLine 0.5s forwards",
              }}
            />

            {/* Moving glow overlay */}
            <line
              x1={fromPos.left}
              y1={fromPos.top}
              x2={toPos.left}
              y2={toPos.top}
              stroke="url(#movingGlow)"
              strokeWidth={4}
              strokeLinecap="round"
              style={{
                filter: "drop-shadow(0 0 8px white)",
              }}
            />
          </g>
        );
      })}
    </svg>


      {/* Glowing stars */}
      {Object.entries(data.task).map(([label, pos], index) => {
        const { size, duration, color } = stars[index];
        const isClicked = clickedStars.has(label);
        const { left, top } = starPositions[label];

        return (
          <div
            key={label}
            className="absolute"
            style={{
              left,
              top,
              transform: "translate(-50%, -50%)", // wrapper is at star center
            }}
          >
            {/* Star (this is the exact anchor point for connections) */}
            <div
              onClick={() => handleCircleClick(label)}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${color.core} 40%, ${
                  isClicked ? color.glow : color.glowDim
                } 100%)`,
                boxShadow: isClicked
                  ? `0 0 15px 5px ${color.glow}, 0 0 30px 10px ${color.glow}`
                  : `0 0 10px 2px ${color.glowDim}, 0 0 20px 5px ${color.glowDim}`,
                animation: `twinkle ${duration}s infinite alternate`,
                transition: "background 0.5s ease, box-shadow 0.5s ease",
                cursor: "pointer",
                transform: "translate(-50%, -50%)", // centers star itself
                position: "absolute", // anchor in wrapper
                top: "0",
                left: "0",
              }}
            />

            {/* Label (placed below the star without shifting it) */}
            <span
              style={{
                position: "absolute",
                top: `${size / 2 + 6}px`, // just below star
                left: "0",
                transform: "translateX(-50%)",
                fontSize: "20px",
                fontWeight: "500",
                color: color.core,
                textShadow: `0 0 6px ${color.glow}`,
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          </div>
        );
      })}




      <style jsx>{`
        @keyframes twinkle {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.85; }
          50% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.9; }
        }

        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default GameBoard;
