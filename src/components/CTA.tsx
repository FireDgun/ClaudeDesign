import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useMagnetic } from "../hooks/useMagnetic";
import SplitText from "../ui/SplitText";

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.85, 1]);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.5);

  return (
    <section id="cta" ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <motion.div style={{ scale }} className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 border border-white/10 px-8 md:px-16 py-20 md:py-32">
          <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-accent/30 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-accent-warm/20 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute inset-0 grid-bg opacity-40" />

          <div className="relative text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="num-display text-[10px] uppercase tracking-[0.3em] text-accent mb-8"
            >
              [ 07 ] בואו נתחיל
            </motion.div>

            <h2 className="h-display text-5xl md:text-7xl lg:text-8xl mb-10 leading-[0.95]">
              <span className="block overflow-hidden">
                <SplitText text="יש לכם חזון." stagger={0.04} duration={1} />
              </span>
              <span className="block overflow-hidden">
                <span className="bg-gradient-to-r from-accent via-white to-accent-warm bg-clip-text text-transparent">
                  <SplitText text="נבנה אותו." stagger={0.04} duration={1} delay={0.1} />
                </span>
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
            >
              שיחה ראשונה — חינם, בלי התחייבות. נבין מה אתם רוצים להשיג, ונראה איך הטכנולוגיה הנכונה הופכת את זה למציאות.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                ref={ctaRef}
                href="mailto:hello@nexusbuild.io"
                data-cursor="שלח"
                className="group relative inline-flex items-center gap-3 px-9 py-5 rounded-full bg-white text-ink-900 font-bold text-lg overflow-hidden hover:bg-accent transition-colors"
              >
                <span className="relative z-10">קבע פגישה ראשונה</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="relative z-10">
                  <path d="M19 12L5 12M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="tel:+972-3-1234567" className="num-display text-sm uppercase tracking-widest text-white/60 hover:text-accent transition pr-2">
                או חייגו: 03-1234567
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
