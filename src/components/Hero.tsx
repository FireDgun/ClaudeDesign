import { Suspense, lazy, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMagnetic } from "../hooks/useMagnetic";
import { useInViewSection } from "../hooks/useInViewSection";
import SplitText from "../ui/SplitText";

const HeroScene = lazy(() => import("./HeroScene"));

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewSection(ref, "200px");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const blur = useTransform(scrollYProgress, [0, 0.6], [0, 8]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.4);

  const heroDelay = 2.5;

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen overflow-hidden grid-bg isolate"
    >
      <div className="absolute inset-0 gradient-mesh" />

      <motion.div style={{ scale, filter }} className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={<div className="w-full h-full" />}>
          <HeroScene active={inView} />
        </Suspense>
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-[1500px] px-5 md:px-8 pt-40 md:pt-48 pb-24"
      >
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

        <div className="grid md:grid-cols-12 gap-8 max-w-6xl">
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

      <div className="absolute bottom-6 inset-x-0 z-10 flex justify-between items-end mx-auto max-w-[1500px] px-5 md:px-8 num-display text-[10px] uppercase tracking-[0.3em] text-white/40">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: heroDelay + 1.6 }} className="flex items-center gap-2">
          <span className="block w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          LIVE · TEL AVIV — 32.0853°N
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: heroDelay + 1.6 }} className="hidden md:block">
          ← SCROLL TO EXPLORE
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: heroDelay + 1.6 }}>
          [01 / 08]
        </motion.div>
      </div>
    </section>
  );
}
