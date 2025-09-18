"use client";
import { motion } from "framer-motion";
import ActionButton from "./ActionButtons";

export default function StartButton({
  onData,
  onStart,
}: {
  onData: (data: any) => void;
  onStart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* ActionButton is reused here */}
      <ActionButton
        label="Start"
        endpoint="start"
        onData={(data) => {
          onData(data);
          onStart();
        }}
      />
    </motion.div>
  );
}
