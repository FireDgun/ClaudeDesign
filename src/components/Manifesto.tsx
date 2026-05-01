import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const lines = [
  "אנחנו לא מציירים בניינים.",
  "אנחנו מקודדים אותם.",
  "כל קיר הוא נתון.",
  "כל חלון — החלטה אלגוריתמית.",
  "כל קומה רואה, חושבת, מגיבה.",
];

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative bg-white text-ink-900 py-32 md:py-44 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-5 md:px-8">
        <div className="flex items-center gap-4 mb-16 num-display text-[10px] uppercase tracking-[0.3em] text-ink-900/50">
          <span className="block w-12 h-px bg-ink-900" />
          <span>[ MANIFESTO — 2026 ]</span>
        </div>

        <div className="space-y-2 md:space-y-3">
          {lines.map((line, i) => (
            <Line key={i} text={line} index={i} progress={scrollYProgress} total={lines.length} />
          ))}
        </div>

        <div className="mt-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-ink-900/60 text-lg md:text-xl max-w-2xl leading-snug">
            כל פרויקט שאנחנו לוקחים — נולד עם תאום דיגיטלי משלו. הוא חי לפני שהוא נבנה,
            הוא מדבר אחרי שהוא נמסר. זה לא מותרות. זה התקן החדש.
          </div>
          <div className="num-display text-[10px] uppercase tracking-[0.3em] text-ink-900/50 shrink-0">
            <div>SIGNED · NEXUS BUILD STUDIO</div>
            <div className="mt-2">VERSION 04 · TLV.IL</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({
  text,
  index,
  progress,
  total,
}: {
  text: string;
  index: number;
  progress: any;
  total: number;
}) {
  const start = 0.05 + (index / total) * 0.7;
  const end = start + 0.18;
  const opacity = useTransform(progress, [start - 0.04, start, end, end + 0.05], [0.12, 1, 1, 0.12]);

  return (
    <motion.div style={{ opacity }} className="overflow-hidden">
      <h2 className="h-display text-[10vw] md:text-[7vw] lg:text-[6vw] leading-[1] tracking-tighter">
        {text}
      </h2>
    </motion.div>
  );
}
