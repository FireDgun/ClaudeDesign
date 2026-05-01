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
      exit={{
        clipPath: "inset(0 0 100% 0)",
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-[100] flex flex-col bg-ink-900"
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 gradient-mesh" />

      <div className="relative flex-1 flex flex-col justify-between p-8 md:p-12">
        <div className="flex justify-between items-start num-display text-[10px] uppercase tracking-[0.3em] text-white/50">
          <span>NEXUS BUILD</span>
          <span>2026 · TLV</span>
        </div>

        <div className="flex flex-col items-start gap-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0.05, 0.36, 1] }}
            className="num-display text-[10px] uppercase tracking-[0.3em] text-accent"
          >
            [ 00 ] INITIALIZING
          </motion.div>

          <h1 className="h-display text-[18vw] md:text-[12vw] leading-[0.85] tracking-tighter">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.65, 0.05, 0.36, 1] }}
              className="block overflow-hidden"
            >
              <span className="block">בונים</span>
            </motion.span>
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.65, 0.05, 0.36, 1] }}
              className="block overflow-hidden"
            >
              <span className="block text-stroke">את העתיד.</span>
            </motion.span>
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between num-display text-[10px] uppercase tracking-[0.3em] text-white/50">
            <span>LOADING SCENE · {String(pct).padStart(3, "0")}%</span>
            <span>RT-WEBGL · 144FPS</span>
          </div>
          <div className="h-[2px] w-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: pct / 100 }}
              transition={{ ease: "easeOut", duration: 0.3 }}
              style={{ originX: 0 }}
              className="h-full bg-gradient-to-r from-accent via-white to-accent-warm"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
