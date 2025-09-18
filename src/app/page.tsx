"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeScreen from "./components/HomeScreen";
import GameBoard from "./components/GameBoard";
import ActionButton from "./components/ActionButtons";
import StarryBackground from "./components/StarryBackground";
export default function Home() {
  const [gameData, setGameData] = useState<any>(null);
  const [connections, setConnections] = useState<[string, string][]>([]);
  const [jsonsubmit, setJsonSubmit] = useState<any>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    setJsonSubmit({ connections });
  }, [connections]);

  return (
  <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
    {/* Starry Background (fixed, unaffected by re-renders) */}
    <div className="absolute inset-0 -z-10">
      <StarryBackground />
    </div>
      {/* Background video */}
      {/* <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/twinkle.mp4"
        autoPlay
        loop
        muted
        playsInline
      /> */}
      
    
      

     

      {/* Foreground content */}
      {/* Foreground content */}
    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-transparent">
      <AnimatePresence mode="wait">
        {!started && (
          <HomeScreen
            key="home-screen"
            onData={setGameData}
            onStart={() => setStarted(true)}
          />
        )}

        {started && gameData && (
          <motion.div
            key="game"
            className="flex flex-col gap-4 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex gap-2">
              <ActionButton endpoint="submit" jsonsubmit={jsonsubmit} />
              <ActionButton
                endpoint="clear_all"
                onData={() => {
                  setConnections([]);
                  setJsonSubmit(null);
                }}
              />
            </div>

            <GameBoard
              data={gameData}
              connections={connections}
              setConnections={setConnections}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  );
}
