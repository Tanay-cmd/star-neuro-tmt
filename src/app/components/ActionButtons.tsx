"use client";
import React from "react";
import Level from "./API_calls";

type ActionButtonProps = {
  endpoint: string;
  label?: string;
  payload?: any;   // new prop
  onData?: (data: any) => void;
  jsonsubmit?: any;
};

export default function ActionButton({ endpoint, label, payload, onData , jsonsubmit}: ActionButtonProps) {
  const handleClick = async () => {
    try {
      console.log(jsonsubmit)
      const data = await Level(endpoint,jsonsubmit);
      if (onData) onData(data);
    } catch (err) {
      console.error(`Error calling ${endpoint}:`, err);
    }
  };

  return (
    <button onClick={handleClick} className="p-2 bg-blue-500 text-white rounded">
      {label || endpoint}
    </button>
  );
}
