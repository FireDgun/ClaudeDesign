import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { VARIANTS, useVariant } from "../context/VariantContext";

export default function VariantSwitcher() {
  const { variant, setVariant } = useVariant();
  const [open, setOpen] = useState(false);
  const active = VARIANTS.find((v) => v.id === variant)!;

  return (
    <div className="fixed bottom-5 left-5 md:bottom-6 md:left-6 z-[300]" dir="ltr">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.65, 0.05, 0.36, 1] }}
            className="absolute bottom-[calc(100%+10px)] left-0 w-[300px] rounded-2xl bg-black/85 backdrop-blur-2xl border border-white/15 p-2 shadow-2xl"
          >
            <div className="px-3 py-2 mb-1 text-[10px] uppercase tracking-[0.25em] text-white/40 font-mono flex items-center justify-between">
              <span>SELECT VARIANT</span>
              <span>{VARIANTS.findIndex((v) => v.id === variant) + 1}/5</span>
            </div>
            {VARIANTS.map((v, i) => (
              <button
                key={v.id}
                onClick={() => {
                  setVariant(v.id);
                  setOpen(false);
                }}
                className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors ${
                  v.id === variant ? "bg-white/15" : "hover:bg-white/5"
                }`}
              >
                <div className="flex gap-1">
                  {v.swatch.map((c, j) => (
                    <div
                      key={j}
                      className="w-3 h-6 rounded-sm border border-white/10"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <div className="flex-1">
                  <div className="text-white text-sm font-bold flex items-center gap-2">
                    <span className="font-mono text-[10px] text-white/50">0{i + 1}</span>
                    {v.name}
                    {v.id === variant && <span className="ml-1 text-[10px] text-emerald-300">● ACTIVE</span>}
                  </div>
                  <div className="text-white/50 text-[11px] font-mono uppercase tracking-wider">{v.tagline}</div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-3 px-4 py-3 rounded-full bg-black/85 backdrop-blur-2xl border border-white/20 shadow-2xl hover:border-white/40 transition-colors"
      >
        <div className="flex gap-1">
          {active.swatch.map((c, j) => (
            <div key={j} className="w-2.5 h-5 rounded-sm" style={{ background: c }} />
          ))}
        </div>
        <div className="text-left">
          <div className="text-[9px] text-white/50 font-mono uppercase tracking-[0.2em] leading-tight">
            VARIANT {VARIANTS.findIndex((v) => v.id === variant) + 1} / 5
          </div>
          <div className="text-white text-sm font-bold leading-tight">{active.name}</div>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className={`text-white/60 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.button>
    </div>
  );
}
