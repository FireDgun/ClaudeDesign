import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { brand } from "../data";

export default function Loader() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.random() * 14 + 8;
      if (v >= 100) { v = 100; clearInterval(id); }
      setPct(Math.floor(v));
    }, 70);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.65, 0.05, 0.36, 1] } }}
      className="fixed inset-0 z-[200] flex flex-col bg-black text-white"
    >
      <div className="flex-1 flex items-end p-8 md:p-14">
        <div>
          <div className="text-[10px] uppercase tracking-[0.4em] text-white/50 mb-4 font-mono">
            INITIALIZING · {brand.city.toUpperCase()} · {new Date().getFullYear()}
          </div>
          <div className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 font-mono">
            {brand.name}.
          </div>
          <div className="text-sm md:text-base text-white/60 max-w-md">{brand.tagline}</div>
        </div>
      </div>
      <div className="px-8 md:px-14 pb-8">
        <div className="flex justify-between text-[10px] uppercase tracking-[0.4em] text-white/50 mb-3 font-mono">
          <span>BOOTING SCENE GRAPH</span>
          <span>{String(pct).padStart(3, "0")} / 100</span>
        </div>
        <div className="h-px w-full bg-white/15">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: pct / 100 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            style={{ originX: 0 }}
            className="h-full bg-white"
          />
        </div>
      </div>
    </motion.div>
  );
}
