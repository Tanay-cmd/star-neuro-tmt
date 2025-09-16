"use client";
import { motion } from "framer-motion";
import ActionButton from "./ActionButtons";

export default function StartButton({ onData, onStart }: { onData: (data: any) => void; onStart: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center h-screen"
    >
      {/* ActionButton is reused here */}
      <ActionButton
        endpoint="start"
        onData={(data) => {
          onData(data);   
          onStart();      
        }}
      />
    </motion.div>
  );
}
