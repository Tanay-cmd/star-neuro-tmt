"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomeScreen from "./components/HomeScreen";
import GameBoard from "./components/GameBoard";
import ActionButton from "./components/ActionButtons";
import StarryBackground from "./components/StarryBackground";

export default  function Home() {
  
  
  const [gameData, setGameData] = useState<any>(null);
  const [connections, setConnections] = useState<[string, string][]>([]);
  const [jsonsubmit, setJsonSubmit] = useState<any>(null);
  const [started, setStarted] = useState(false);
  const [lastSelected, setLastSelected] = useState<string | null>(null);
  
  useEffect(() => {
    setJsonSubmit({ connections });
  }, [connections]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-1"
        src="/ForestStars.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Foreground content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
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
              className="relative flex flex-col items-center w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Game Board moved upward */}
              <div className="flex-grow flex items-center justify-center w-full mb-20">
                <GameBoard
                  data={gameData}
                  connections={connections}
                  setConnections={setConnections}
                  lastSelected={lastSelected}
                  setLastSelected={setLastSelected}
                />
              </div>

              {/* Buttons pinned at top corners */}
              <div className="absolute bottom-0 left-6">
                <ActionButton
                  label="Clear All"
                  endpoint="clear_all"
                  onData={() => {
                    setConnections([]);
                    setJsonSubmit(null);
                    setLastSelected(null);
                  }}
                />
              </div>

              <div className="absolute bottom-0 right-6">
                <ActionButton
                  label = "Clear Last"
                  endpoint="clear_last"
                  onData={() => {
                    if (connections.length > 0) {
                      const newConnections = connections.slice(0, -1);
                      setConnections(newConnections);
                      setJsonSubmit({ connections: newConnections });

                      // keep lastSelected at "to" of the last connection
                      if (newConnections.length > 0) {
                        setLastSelected(newConnections[newConnections.length - 1][1]);
                      } else {
                        setLastSelected(null);
                      }
                    }
                  }}
                />
              </div>

              {/* Submit stays at bottom center */}
              <div className="absolute bottom-6">
                <ActionButton label="Submit" endpoint="submit" jsonsubmit={jsonsubmit} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
