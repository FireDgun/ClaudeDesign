import { motion } from "framer-motion";
import SplitText from "../ui/SplitText";

const services = [
  {
    n: "01",
    title: "תכנון אדריכלי",
    body: "תכנון פרמטרי בעזרת AI, מודלים תלת-ממדיים אינטראקטיביים, וניתוח אקלימי בזמן אמת.",
    tag: "ARCHITECTURE",
    tools: ["Rhino", "Grasshopper", "Revit", "Twinmotion"],
  },
  {
    n: "02",
    title: "ניהול פרויקטים",
    body: "מערכת BIM משולבת עם IoT לניטור התקדמות, חומרים ואיכות בכל שניה.",
    tag: "MANAGEMENT",
    tools: ["BIM 360", "Procore", "Power BI", "Slack"],
  },
  {
    n: "03",
    title: "Smart Buildings",
    body: "תשתיות חכמות, חיישנים אוטונומיים, אופטימיזציית אנרגיה — בניינים שחושבים.",
    tag: "IOT",
    tools: ["Siemens", "Honeywell", "AWS IoT", "Tuya"],
  },
  {
    n: "04",
    title: "סריקות 3D",
    body: "LiDAR ופוטוגרמטריה ברזולוציית מילימטר. תאומים דיגיטליים לכל מבנה קיים.",
    tag: "SCAN",
    tools: ["Faro", "Leica", "Polycam", "Reality Capture"],
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30 grid-bg" />

      <div className="mx-auto max-w-[1500px] px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <div className="num-display text-[10px] uppercase tracking-[0.3em] text-accent mb-6">
              [ 02 ] השירותים
            </div>
            <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mb-8 leading-[0.95]">
              <span className="block overflow-hidden">
                <SplitText text="ארבעה תחומים." stagger={0.04} duration={1} />
              </span>
              <span className="block overflow-hidden text-stroke">
                <SplitText text="סטודיו אחד." stagger={0.04} duration={1} delay={0.08} />
              </span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              הכלים הכי חזקים בעולם — מ-Rhino ו-Grasshopper ועד AWS IoT —
              מאוחדים בתחת קורת גג אחת. אתם מקבלים סטודיו, לא סוכנות.
            </p>
          </div>

          <div className="lg:col-span-7 grid gap-5">
            {services.map((s, i) => (
              <motion.article
                key={s.n}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.65, 0.05, 0.36, 1] }}
                className="group relative p-6 md:p-9 rounded-3xl border border-white/10 bg-ink-700/30 hover:bg-ink-700/60 hover:border-accent/40 transition-colors overflow-hidden"
                data-cursor=""
              >
                <div className="absolute -top-px right-1/2 translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between gap-6 mb-5">
                  <div className="flex-1">
                    <div className="num-display text-[10px] text-accent/80 mb-3 uppercase tracking-widest">{s.tag}</div>
                    <h3 className="h-display text-2xl md:text-4xl mb-4 group-hover:text-accent transition-colors leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">{s.body}</p>
                  </div>
                  <div className="num-display text-4xl md:text-6xl text-white/10 group-hover:text-accent/40 transition-colors leading-none">
                    {s.n}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {s.tools.map((t) => (
                    <span
                      key={t}
                      className="num-display text-[10px] uppercase tracking-widest text-white/50 px-2.5 py-1 rounded-full border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
