"use client";
import React, { useState } from "react";

function GameBoard({ data, connections, setConnections }: any) {
  const scale = 0.5;
  const [lastSelected, setLastSelected] = useState<string | null>(null);

  const handleCircleClick = (label: string) => {
    if (!lastSelected) {
      setLastSelected(label);
    } else if (lastSelected === label) {
      setLastSelected(null);
    } else {
      const newConnections: [string, string][] = [...connections, [lastSelected, label]];
      setConnections(newConnections); // update parent
      setLastSelected(label);
    }
  };

  return (
    <div className="relative border border-gray-400 w-[600px] h-[400px] overflow-hidden bg-gray-50">
      {/* SVG for lines */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {connections.map(([from, to], i) => {
          const fromPos = data.task[from];
          const toPos = data.task[to];
          if (!fromPos || !toPos) return null;
          return (
            <line
              key={i}
              x1={fromPos.x * scale}
              y1={fromPos.y * scale}
              x2={toPos.x * scale}
              y2={toPos.y * scale}
              stroke="black"
              strokeWidth="2"
            />
          );
        })}
      </svg>

      {/* Circles */}
      {Object.entries(data.task).map(([label, pos]) => (
        <div
          key={label}
          onClick={() => handleCircleClick(label)}
          className={`absolute flex items-center justify-center rounded-full cursor-pointer 
            ${lastSelected === label ? "bg-green-500" : "bg-red-500"} text-white`}
          style={{
            width: "40px",
            height: "40px",
            left: pos.x * scale,
            top: pos.y * scale,
            transform: "translate(-50%, -50%)",
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
