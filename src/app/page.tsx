'use client'
import { useState, useEffect } from "react";
import ActionButton from "./components/ActionButtons";
import GameBoard from "./components/GameBoard";

export default function Home() {
  const [gameData, setGameData] = useState<any>(null);
  const [connections, setConnections] = useState<[string, string][]>([]);
  const [jsonsubmit, setJsonSubmit] = useState<any>(null);

  // keep jsonsubmit in sync with connections
  useEffect(() => {
    setJsonSubmit({ connections });
  }, [connections]);

  return (
    <>
      <ActionButton endpoint="start" onData={setGameData} />
      <ActionButton endpoint="submit" jsonsubmit={jsonsubmit} />

      {/* Clear all just resets connections */}
      <ActionButton
        endpoint="clear_all"
        onData={() => {
          setConnections([]);
          setJsonSubmit(null);
        }}
      />

      {gameData && (
        <GameBoard
          data={gameData}
          connections={connections}
          setConnections={setConnections}
        />
      )}
    </>
  );
}
