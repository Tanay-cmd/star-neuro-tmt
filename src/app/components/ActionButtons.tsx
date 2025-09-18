"use client";
import React from "react";
import Level from "./API_calls";
import "./actionButton.css"; // import the fancy CSS we built earlier

type ActionButtonProps = {
  endpoint: string;
  label?: string;
  payload?: any;
  onData?: (data: any) => void;
  jsonsubmit?: any;
};

export default function ActionButton({
  endpoint,
  label,
  payload,
  onData,
  jsonsubmit,
}: ActionButtonProps) {
  const handleClick = async () => {
    try {
      console.log("Submitting payload:", jsonsubmit);
      const data = await Level(endpoint, jsonsubmit);
      if (onData) onData(data);
    } catch (err) {
      console.error(`Error calling ${endpoint}:`, err);
    }
  };

  return (
    <button className="button" onClick={handleClick}>
      {/* animated star cluster */}
      <span className="stars" aria-hidden="true">
        <span className="star __big"></span>
        <span className="star __middle"></span>
        <span className="star __small"></span>
      </span>
      {label || endpoint}
    </button>
  );
}
