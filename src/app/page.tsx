"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import StartButton from "./components/StartButton";
import GameBoard from "./components/GameBoard";
import ActionButton from "./components/ActionButtons";

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
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="/twinkle.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <AnimatePresence>
          {!started && (
            <StartButton
              key="start"
              onData={setGameData}
              onStart={() => setStarted(true)}
            />
          )}
        </AnimatePresence>

        {started && gameData && (
          <div className="flex flex-col gap-4 items-center">
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
          </div>
        )}
      </div>
    </div>
  );
}
