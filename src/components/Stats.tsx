import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
  { value: 187, suffix: "+", label: "פרויקטים שהושלמו", desc: "מנתב\"ג ועד אילת" },
  { value: 42, suffix: "M³", label: "סריקות 3D מבוצעות", desc: "ברזולוציית מילימטר" },
  { value: 98, suffix: "%", label: "שביעות רצון לקוחות", desc: "על פי סקרים פנימיים" },
  { value: 12, suffix: "Yr", label: "שנות ניסיון בתעשייה", desc: "צוות של 24 מומחים" },
];

export default function Stats() {
  return (
    <section id="stats" className="relative py-32 md:py-44 overflow-hidden bg-ink-800/30">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="max-w-3xl mb-20">
          <div className="num-display text-xs uppercase tracking-[0.3em] text-accent mb-6">
            [ 05 ] המספרים
          </div>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.65, 0.05, 0.36, 1] }}
                className="block"
              >
                המספרים מספרים
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1, ease: [0.65, 0.05, 0.36, 1] }}
                className="block text-stroke"
              >
                את הסיפור.
              </motion.span>
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-3xl overflow-hidden">
          {stats.map((s, i) => (
            <Stat key={i} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  suffix,
  label,
  desc,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  desc: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView) {
      const ctrl = animate(count, value, {
        duration: 2.4,
        ease: [0.16, 1, 0.3, 1],
      });
      return ctrl.stop;
    }
  }, [inView, count, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="group bg-ink-900 p-8 md:p-10 hover:bg-ink-700/40 transition-colors relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative">
        <div className="num-display text-[10px] text-accent/80 mb-3">[ 0{index + 1} ]</div>
        <div className="flex items-baseline gap-1 mb-4">
          <motion.span className="num-display text-5xl md:text-6xl font-black">
            {display}
          </motion.span>
          <span className="num-display text-3xl md:text-4xl text-accent">{suffix}</span>
        </div>
        <div className="text-white font-bold mb-1">{label}</div>
        <div className="text-white/50 text-sm">{desc}</div>
      </div>
    </motion.div>
  );
}
