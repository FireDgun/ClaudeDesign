import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 12 + 6;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
      }
      setPct(Math.floor(v));
    }, 90);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900"
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 gradient-mesh" />

      <div className="relative flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 h-display text-3xl md:text-5xl"
        >
          <span className="text-accent">[</span>
          <span>NEXUS</span>
          <em className="not-italic text-accent">BUILD</em>
          <span className="text-accent">]</span>
        </motion.div>

        <div className="w-[280px] md:w-[400px] h-[2px] bg-white/10 overflow-hidden relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: pct / 100 }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            style={{ originX: 0 }}
            className="h-full bg-gradient-to-r from-accent via-white to-accent-warm"
          />
        </div>

        <div className="flex justify-between w-[280px] md:w-[400px] num-display text-xs text-white/60 uppercase tracking-widest">
          <span>{String(pct).padStart(3, "0")}%</span>
          <span>מאתחל מערכות תלת-ממד</span>
        </div>
      </div>
    </motion.div>
  );
}
