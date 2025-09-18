"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import StartButton from "./StartButton";

interface HomeScreenProps {
  onData: (data: any) => void;
  onStart: () => void;
}

export default function HomeScreen({ onData, onStart }: HomeScreenProps) {
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
    } finally {
      setLoading(false);
      onStart();
    }
  };

  return (
    <motion.div
      key="home"
      className="flex flex-col items-center justify-center gap-6 text-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* Title */}
      <h1 className="font-starlight text-5xl font-bold text-white drop-shadow-lg">
        STAR-TRAILS
      </h1>

      {/* Instructions */}
      <p className="text-lg text-gray-200 max-w-md leading-relaxed">
        Connect the stars by clicking them one after another.  
        Each connection will draw a glowing line between stars.  
        Complete the constellation by linking them all!
      </p>

      {/* Start button (with loading state) */}
      <div className="mt-4">
        <StartButton onData={onData} onStart={handleStart} />
        {loading && (
          <p className="mt-2 text-sm text-gray-300 animate-pulse">
            Loading game data...
          </p>
        )}
      </div>
    </motion.div>
  );
}
