import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMagnetic } from "../hooks/useMagnetic";
import { useInViewSection } from "../hooks/useInViewSection";
import SplitText from "../ui/SplitText";

const HeroScene = lazy(() => import("./HeroScene"));

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewSection(ref, "200px");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const blur = useTransform(scrollYProgress, [0, 0.6], [0, 8]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.4);

  const [time, setTime] = useState("00:00:00");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const heroDelay = 1.2;

  return (
    <section id="hero" ref={ref} className="relative min-h-screen overflow-hidden grid-bg isolate">
      <div className="absolute inset-0 gradient-mesh" />

      <motion.div style={{ scale, filter }} className="absolute inset-0 z-0 pointer-events-auto">
        <Suspense fallback={<div className="w-full h-full" />}>
          <HeroScene active={inView} />
        </Suspense>
      </motion.div>

      {/* HUD top-left corner brackets */}
      <div className="absolute top-24 left-5 md:left-8 z-10 num-display text-[10px] uppercase tracking-[0.3em] text-accent/80 hidden md:block pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <span className="block w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          REC ⏺ NEXUS-OS · v4.0.26
        </div>
        <div>SCENE: HELIX-TOWER · CLUSTER 02</div>
        <div>RT: <span className="text-white">{time}</span> · UTC+3</div>
      </div>

      {/* HUD top-right */}
      <div className="absolute top-24 right-5 md:right-8 z-10 num-display text-[10px] uppercase tracking-[0.3em] text-white/50 hidden md:block pointer-events-none text-left">
        <div>LAT 32.0853°N</div>
        <div>LON 34.7818°E</div>
        <div className="text-accent">RT-WEBGL · 144FPS</div>
      </div>

      {/* Vertical edge marker — breaks the hero grid */}
      <div className="hidden lg:block absolute right-3 top-1/2 -translate-y-1/2 z-10 num-display text-[10px] uppercase tracking-[0.4em] text-accent/70 pointer-events-none" style={{ writingMode: "vertical-rl" }}>
        ↘ HELIX-TOWER · CLUSTER 02 · v4.0.26 · NEXUS-OS
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-[1500px] px-5 md:px-8 pt-40 md:pt-48 pb-24 pointer-events-none">
        <div className="flex items-center gap-3 mb-10 num-display text-[10px] uppercase tracking-[0.3em] text-white/50">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: heroDelay - 0.3, duration: 0.8 }}
            style={{ originX: 0 }}
            className="block w-16 h-px bg-accent"
          />
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: heroDelay - 0.1, duration: 0.6 }}
          >
            EST. 2024 — ARCHITECTURE × AI × IoT
          </motion.span>
        </div>

        <h1 className="h-display font-black mb-12 tracking-tighter">
          <span className="block overflow-hidden text-[18vw] md:text-[12vw] lg:text-[11vw] leading-[0.85]">
            <SplitText text="בונים את" trigger="mount" delay={heroDelay} stagger={0.04} duration={1.1} />
          </span>
          <span className="block overflow-hidden text-[18vw] md:text-[12vw] lg:text-[11vw] leading-[0.85]">
            <SplitText text="העתיד" trigger="mount" delay={heroDelay + 0.15} stagger={0.04} duration={1.1} className="text-stroke" />
          </span>
          <span className="block overflow-hidden text-[18vw] md:text-[12vw] lg:text-[11vw] leading-[0.85]">
            <span className="bg-gradient-to-r from-accent via-white to-accent-warm bg-clip-text text-transparent">
              <SplitText text="קומה אחר קומה" trigger="mount" delay={heroDelay + 0.3} stagger={0.04} duration={1.1} />
            </span>
          </span>
        </h1>

        <div className="grid md:grid-cols-12 gap-8 max-w-6xl pointer-events-auto">
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: heroDelay + 1.0, duration: 0.8 }}
            className="md:col-span-7 text-lg md:text-2xl text-white/75 leading-snug"
          >
            סטודיו אדריכלות שמשלב AI, סריקות תלת-ממד ו-IoT לבנייה חכמה.
            כל פרויקט נולד דיגיטלית — מוצג, מחושב, מאושר — לפני שאבן אחת מונחת באתר.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: heroDelay + 1.1, duration: 0.8 }}
            className="md:col-span-5 flex flex-col gap-4 items-start md:items-end"
          >
            <a
              ref={ctaRef}
              href="#cta"
              data-cursor="התחל"
              className="group inline-flex items-center gap-3 px-8 py-5 rounded-full bg-white text-ink-900 font-bold text-base relative overflow-hidden hover:bg-accent transition-colors"
            >
              <span className="relative z-10">בואו נתכנן יחד</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative z-10">
                <path d="M19 12L5 12M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#showcase" className="num-display text-[10px] uppercase tracking-widest text-white/60 hover:text-accent transition pr-1">
              ↓ צפו בעבודות
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom HUD */}
      <div className="absolute bottom-6 inset-x-0 z-10 mx-auto max-w-[1500px] px-5 md:px-8 num-display text-[10px] uppercase tracking-[0.3em] text-white/50 pointer-events-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-3 border-t border-white/10 pt-3">
          <Stat label="MOTION" value="LIVE · 144FPS" color="text-accent" />
          <Stat label="PARTICLES" value="600 / GPU" />
          <Stat label="LATENCY" value="< 16MS" />
          <Stat label="STATE" value="OPERATIONAL" color="text-emerald-300" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, color = "text-white" }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-white/40 text-[9px]">{label}</span>
      <span className={color}>{value}</span>
    </div>
  );
}
