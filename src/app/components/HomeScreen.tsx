"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import StartButton from "./StartButton";

interface HomeScreenProps {
  onData: (data: any) => void;
  onStart: () => void;
}

// Adjustable max width for instructions
// const INSTRUCTION_MAX_WIDTH = 900; // change this number as needed

export default function HomeScreen({ onData, onStart }: HomeScreenProps) {
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
    try {
      // You can fetch or prepare game data here if needed
    } finally {
      setLoading(false);
      onStart();
    }
  };

  return (
    <motion.div
      key="home"
      className="mt-0 flex flex-col items-center justify-center gap-6 text-center "
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* Gradient animation for the title */}


      {/* Title */}
      <h1 className="font-genshin  text-8xl font-bold drop-shadow-lg mt-0 ">
        STAR TRAILS
      </h1>

      {/* Instructions */}
      <ol
        className="text-l text-gray-200 max-w-4xl text-left leading-rlist-decimal font-light"
        
      >
        <li className="text-center text-2xl mb-5"><strong>Objective</strong></li>
        <li>1. Complete a sequence by clicking or connecting items in the correct order, alternating between letters and numbers as quickly and accurately as possible.</li>
        <li>2. You will see 10 items on screen: A, B, C, D, E, 1, 2, 3, 4, 5.</li>
        <li>3. Your goal is to connect them in this exact sequence: A → 1 → B → 2 → C → 3 → D → 4 → E → 5</li>
        <li>4. Please use Desktop (mobile phones not recommended) and toggle fullscrenn (F11) for best expierence. it consume some time after clicking start because api is on "onrender"</li>
      </ol>

      {/* Start button (with loading state) */}
      <div className="mt-0">
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
