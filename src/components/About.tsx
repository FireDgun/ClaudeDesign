import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    n: "01",
    title: "תכנון אדריכלי",
    body: "תכנון פרמטרי בעזרת AI, מודלים תלת-ממדיים אינטראקטיביים, וניתוח אקלימי בזמן אמת.",
    tag: "ARCHITECTURE",
  },
  {
    n: "02",
    title: "ניהול פרויקטים",
    body: "מערכת BIM משולבת עם IoT לניטור התקדמות, חומרים ואיכות בכל שניה.",
    tag: "MANAGEMENT",
  },
  {
    n: "03",
    title: "Smart Buildings",
    body: "תשתיות חכמות, חיישנים אוטונומיים, אופטימיזציית אנרגיה — בניינים שחושבים.",
    tag: "IOT",
  },
  {
    n: "04",
    title: "סריקות 3D",
    body: "LiDAR ופוטוגרמטריה ברזולוציית מילימטר. תאומים דיגיטליים לכל מבנה קיים.",
    tag: "SCAN",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="about" ref={ref} className="relative py-32 md:py-44 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 -z-10 opacity-40 grid-bg"
      />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="num-display text-xs uppercase tracking-[0.3em] text-accent mb-6"
            >
              [ 02 ] השירותים
            </motion.div>
            <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-8">
              <RevealText>חמישה תחומים.</RevealText>
              <RevealText delay={0.1}>
                <span className="text-stroke">סטודיו אחד.</span>
              </RevealText>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              משלבים את הכלים המתקדמים בעולם — מ-Rhino ו-Grasshopper ועד Unity ו-Twinmotion —
              כדי לתכנן, להציג ולבנות בלי טעויות.
            </p>
          </div>

          <div className="lg:col-span-7 grid gap-6">
            {services.map((s, i) => (
              <motion.article
                key={s.n}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.65, 0.05, 0.36, 1] }}
                className="group relative p-7 md:p-10 rounded-3xl border border-white/10 bg-ink-700/40 hover:border-accent/40 transition-colors overflow-hidden"
              >
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/0 via-accent/0 to-accent/0 group-hover:from-accent/20 group-hover:to-accent-warm/20 transition-all duration-700 -z-10" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="num-display text-xs text-accent/80 mb-3">{s.tag}</div>
                    <h3 className="h-display text-3xl md:text-4xl mb-4 group-hover:text-accent transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
                      {s.body}
                    </p>
                  </div>
                  <div className="num-display text-5xl md:text-6xl text-white/15 group-hover:text-accent/40 transition-colors">
                    {s.n}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 1,
          delay,
          ease: [0.65, 0.05, 0.36, 1],
        }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
