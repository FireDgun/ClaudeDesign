import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SplitText from "../ui/SplitText";

const steps = [
  { n: "01", title: "אבחון וברייף", body: "פגישה ראשונה, סריקה של השטח, מיפוי צרכים — מה אתם רוצים שהבניין שלכם יהיה.", duration: "שבוע 1" },
  { n: "02", title: "תכנון פרמטרי", body: "מודלים תלת-ממדיים, אלגוריתמים שמייצרים מאות אפשרויות, אופטימיזציה לאור, אקלים ועלות.", duration: "שבועות 2-6" },
  { n: "03", title: "הדמיה אינטראקטיבית", body: "סיור VR בבניין שלכם — לפני שהוא קיים. כל קיר, כל חלון, כל גרגיר אור.", duration: "שבועות 7-8" },
  { n: "04", title: "הפקה וביצוע", body: "BIM משולב עם IoT — ניטור התקדמות, איכות וחומרים בזמן אמת. אתם רואים הכל.", duration: "חודשים 3-24" },
  { n: "05", title: "מסירה חכמה", body: "המבנה נמסר עם תאום דיגיטלי מלא, חיישנים פעילים ומערכת ניהול חכמה.", duration: "מסירה" },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 70%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative py-32 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8">
        <div className="max-w-3xl mb-20 md:mb-28">
          <div className="num-display text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
            [ 04 ] התהליך
          </div>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl leading-[0.95]">
            <span className="block overflow-hidden">
              <SplitText text="חמישה שלבים." stagger={0.04} duration={1} />
            </span>
            <span className="block overflow-hidden">
              <span className="bg-gradient-to-r from-accent to-accent-warm bg-clip-text text-transparent">
                <SplitText text="שקיפות מלאה." stagger={0.04} duration={1} delay={0.1} />
              </span>
            </span>
          </h2>
        </div>

        <div ref={containerRef} className="relative">
          <div className="absolute right-[31px] md:right-1/2 md:translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute right-[31px] md:right-1/2 md:translate-x-1/2 top-0 w-px bg-gradient-to-b from-accent via-white to-accent-warm origin-top"
          />

          <div className="space-y-20 md:space-y-32">
            {steps.map((s, i) => (
              <Step key={s.n} step={s} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ step, reverse }: { step: typeof steps[number]; reverse: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.65, 0.05, 0.36, 1] }}
      className={`relative grid md:grid-cols-2 gap-8 md:gap-16 items-center ${reverse ? "md:[direction:rtl]" : ""}`}
    >
      <div className="absolute right-[24px] md:right-1/2 md:translate-x-1/2 top-3 w-4 h-4 rounded-full bg-accent ring-4 ring-ink-900 z-10 shadow-[0_0_30px_rgba(124,249,255,0.6)]" />
      <div className={`pr-16 md:pr-0 ${reverse ? "md:[direction:ltr] md:text-left md:order-2 md:pl-16" : "md:text-right md:pl-16"}`}>
        <div className="num-display text-[10px] text-accent mb-3 uppercase tracking-widest">{step.duration}</div>
        <div className="num-display text-7xl md:text-9xl text-white/10 leading-none mb-2">{step.n}</div>
      </div>
      <div className={`pr-16 md:pr-0 ${reverse ? "md:[direction:ltr] md:order-1 md:pr-16" : "md:pl-16"}`}>
        <h3 className="h-display text-3xl md:text-4xl mb-4">{step.title}</h3>
        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-md">{step.body}</p>
      </div>
    </motion.div>
  );
}
