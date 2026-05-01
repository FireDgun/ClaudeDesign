import { motion, useScroll, useVelocity, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useEffect } from "react";

const items = [
  "תכנון פרמטרי",
  "★",
  "סריקות לייזר 3D",
  "★",
  "הדמיות AI",
  "★",
  "BIM אינטגרטיבי",
  "★",
  "IoT לבניינים",
  "★",
  "אופטימיזציית אנרגיה",
  "★",
  "Smart City",
  "★",
];

export default function Marquee() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollV = useVelocity(scrollY);
  const smoothV = useSpring(scrollV, { damping: 50, stiffness: 400 });
  const skew = useTransform(smoothV, [-2000, 0, 2000], [-12, 0, 12], { clamp: false });
  const speed = useTransform(smoothV, [-2000, 0, 2000], [-3, 1, 3]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const delta = (now - last) / 1000;
      last = now;
      const moveBy = -50 * delta * (0.4 + Math.abs(speed.get()) * 0.5);
      let next = baseX.get() + moveBy;
      if (next < -50) next = 0;
      if (next > 0) next = -50;
      baseX.set(next);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [baseX, speed]);

  const x = useTransform(baseX, (v) => `${v}%`);

  return (
    <section className="relative py-12 md:py-16 border-y border-white/5 overflow-hidden marquee-mask bg-ink-800/40">
      <motion.div style={{ skewX: skew }} className="will-change-transform">
        <motion.div style={{ x }} className="flex gap-12 whitespace-nowrap will-change-transform">
          {[...items, ...items, ...items, ...items].map((it, i) => (
            <span
              key={i}
              className={`h-display text-3xl md:text-5xl font-black ${
                it === "★" ? "text-accent" : "text-white/85"
              }`}
            >
              {it}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
