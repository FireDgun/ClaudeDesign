import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services, projects, stats, testimonials, heroImage } from "../data";
import SplitText from "../ui/SplitText";

const cream = "#f4f1ec";
const ink = "#1d1d1f";
const accent = "#7c5cff";
const peach = "#ff8a6f";

export default function AuroraVariant() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: cream, color: ink, fontFamily: "'Heebo', -apple-system, sans-serif" }}>
      <NavA />
      <BlobsBg />
      <HeroA />
      <PhotoStory />
      <ServicesA />
      <BigStatement />
      <ShowcaseA />
      <NumbersA />
      <VoicesA />
      <CTAA />
      <FooterA />
    </div>
  );
}

function NavA() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4">
      <div
        className="mx-auto max-w-5xl rounded-full px-5 py-3 flex items-center justify-between shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
        style={{ background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px) saturate(180%)" }}
      >
        <div className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <span className="block w-7 h-7 rounded-full" style={{ background: `conic-gradient(from 0deg, ${accent}, ${peach}, ${accent})` }} />
          NexusBuild
        </div>
        <nav className="hidden md:flex items-center gap-7 text-sm" style={{ color: "#3a3a3c" }}>
          {["שירותים", "פרויקטים", "אודות", "המלצות"].map((l) => (
            <a key={l} href="#" className="hover:text-black transition-colors">{l}</a>
          ))}
        </nav>
        <a href="#cta" className="text-sm font-semibold px-5 py-2 rounded-full text-white transition-opacity hover:opacity-90" style={{ background: ink }}>התחל</a>
      </div>
    </header>
  );
}

function BlobsBg() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-40"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 65%)`, filter: "blur(60px)" }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-40"
        style={{ background: `radial-gradient(circle, ${peach}, transparent 65%)`, filter: "blur(60px)" }}
      />
    </div>
  );
}

function HeroA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const yPic = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scalePic = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="relative pt-32 md:pt-40 pb-20 min-h-screen flex flex-col">
      <motion.div style={{ y }} className="mx-auto max-w-7xl px-5 md:px-8 w-full text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm border mb-8"
          style={{ borderColor: "rgba(0,0,0,0.1)", background: "rgba(255,255,255,0.5)", color: "#3a3a3c" }}
        >
          <span>NEXUS · 2026</span>
          <span style={{ color: accent }}>·</span>
          <span>סטודיו אדריכלות חכמה</span>
        </motion.div>

        <h1 className="font-bold tracking-tighter leading-[0.92] mb-8 max-w-5xl mx-auto" style={{ letterSpacing: "-0.04em" }}>
          <span className="block text-[12vw] md:text-[8vw] overflow-hidden">
            <SplitText text="פשטות מלאה." stagger={0.04} duration={1} />
          </span>
          <span
            className="block text-[12vw] md:text-[8vw] overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${peach})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <SplitText text="טכנולוגיה מורכבת." stagger={0.04} duration={1} delay={0.1} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 leading-snug"
          style={{ color: "#3a3a3c" }}
        >
          תכנון, סריקה, בנייה — בלי לאבד את הדרך.
          סטודיו אחד, שמדבר בשפה שלכם.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3"
        >
          <a href="#cta" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white transition-opacity hover:opacity-90" style={{ background: ink }}>
            דבר איתנו
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12L5 12M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#showcase" className="text-base font-semibold transition-opacity hover:opacity-70" style={{ color: ink }}>צפו בעבודות →</a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 1.1, ease: [0.65, 0.05, 0.36, 1] }}
        className="mt-12 relative mx-auto max-w-6xl w-full px-5 md:px-8"
      >
        <div className="rounded-[2rem] overflow-hidden aspect-[16/9] relative shadow-[0_30px_80px_rgba(124,92,255,0.2)]">
          <motion.img src={heroImage} alt="" style={{ y: yPic, scale: scalePic }} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 50%, rgba(244,241,236,0.2) 100%)` }} />
        </div>

        <div className="absolute -bottom-6 left-6 md:left-12 max-w-xs rounded-2xl p-4 backdrop-blur-2xl border shadow-xl" style={{ background: "rgba(255,255,255,0.85)", borderColor: "rgba(0,0,0,0.08)" }}>
          <div className="text-[10px] uppercase tracking-widest mb-1 font-mono" style={{ color: accent }}>HELIX TOWER · 2026</div>
          <div className="text-sm font-semibold">47 קומות · תל אביב</div>
        </div>
      </motion.div>
    </section>
  );
}

/** Sticky photo crossfade narrative — three frames that fade through one another while the headline stays. */
function PhotoStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const stages = [
    { src: projects[0].image, label: "שלב 01 · אבחון", title: "מתחילים בשטח." },
    { src: projects[2].image, label: "שלב 02 · תכנון", title: "מתכננים ב-AI." },
    { src: projects[1].image, label: "שלב 03 · בנייה", title: "בונים בשקיפות." },
    { src: projects[4].image, label: "שלב 04 · החיים", title: "הבניין חי לאחר." },
  ];

  return (
    <section ref={ref} className="relative" style={{ height: `${stages.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-10 max-w-7xl w-full px-5 md:px-10 items-center">
          <div className="relative h-[55vh] md:h-[70vh] rounded-[2rem] overflow-hidden">
            {stages.map((s, i) => (
              <PhotoFrame key={i} src={s.src} index={i} total={stages.length} progress={scrollYProgress} />
            ))}
            <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest backdrop-blur-md text-white" style={{ background: "rgba(0,0,0,0.4)" }}>
              ●  CHAPTER ↘
            </div>
          </div>

          <div className="relative">
            {stages.map((s, i) => (
              <Caption key={i} stage={s} index={i} total={stages.length} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoFrame({ src, index, total, progress }: { src: string; index: number; total: number; progress: any }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start - 0.05, start + 0.05, end - 0.05, end + 0.05], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1.05, 1]);
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0">
      <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
    </motion.div>
  );
}

function Caption({
  stage,
  index,
  total,
  progress,
}: {
  stage: { label: string; title: string };
  index: number;
  total: number;
  progress: any;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start - 0.04, start + 0.05, end - 0.05, end + 0.04], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [40, -40]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 flex flex-col justify-center">
      <div className="text-xs uppercase tracking-[0.3em] mb-5 font-mono" style={{ color: accent }}>
        {stage.label} · 0{index + 1} / 0{total}
      </div>
      <h2
        className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] mb-4"
        style={{
          background: `linear-gradient(135deg, ${accent}, ${peach})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {stage.title}
      </h2>
      <p className="text-lg md:text-xl max-w-md leading-snug" style={{ color: "#3a3a3c" }}>
        כל פרויקט עובר ארבעה שלבים מובחנים — לכל אחד שיטה, כלים, ונתון.
        אתם רואים, מאשרים, ומתקדמים — בקצב שלכם.
      </p>
    </motion.div>
  );
}

function ServicesA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-[0.3em] mb-4 font-mono" style={{ color: accent }}>השירותים</div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
            <span className="block overflow-hidden">
              <SplitText text="כל מה שצריך," stagger={0.04} duration={1} />
            </span>
            <span className="block overflow-hidden" style={{ color: "#86868b" }}>
              <SplitText text="כלום מיותר." stagger={0.04} duration={1} delay={0.1} />
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.7 }}
              className="rounded-3xl p-8 md:p-10 group cursor-pointer transition-all hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
                  style={{ background: i % 2 === 0 ? `linear-gradient(135deg, ${accent}, #5b3df5)` : `linear-gradient(135deg, ${peach}, #ff5e3a)` }}
                >
                  {s.n}
                </div>
                <div className="text-xs uppercase tracking-widest font-mono" style={{ color: "#86868b" }}>{s.tag}</div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">{s.title}</h3>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#3a3a3c" }}>{s.body}</p>
              <div className="flex flex-wrap gap-2">
                {s.tools.map((t) => (
                  <span key={t} className="text-[11px] uppercase tracking-widest px-3 py-1 rounded-full font-mono" style={{ background: "rgba(0,0,0,0.04)", color: "#3a3a3c" }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BigStatement() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8 text-center">
        <h2 className="font-bold tracking-tighter leading-[0.95]">
          <span className="block text-5xl md:text-7xl lg:text-8xl mb-3 overflow-hidden">
            <SplitText text="כל בניין שאנחנו" stagger={0.04} duration={1} />
          </span>
          <span
            className="block text-5xl md:text-7xl lg:text-8xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${accent}, ${peach})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <SplitText text="בונים — חי כבר עכשיו." stagger={0.04} duration={1} delay={0.1} />
          </span>
        </h2>
        <p className="mt-8 text-xl md:text-2xl max-w-3xl mx-auto" style={{ color: "#3a3a3c" }}>
          תאום דיגיטלי שנולד עם הסקיצה. הבניין מדבר עם המהנדסים, עם הקבלן, ועם הדיירים — לפני שהוא קיים.
        </p>
      </div>
    </section>
  );
}

function ShowcaseA() {
  return (
    <section id="showcase" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] mb-4 font-mono" style={{ color: accent }}>הפרויקטים</div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">חמישה מיקומים.</h2>
          </div>
          <a href="#" className="text-sm font-semibold hover:opacity-70 transition-opacity">כל הפרויקטים →</a>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {projects.slice(0, 3).map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4 shadow-lg">
                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute top-4 right-4 left-4 flex justify-between text-[10px] uppercase tracking-widest text-white/95 font-mono">
                  <span>0{i + 1}</span>
                  <span>{p.year}</span>
                </div>
              </div>
              <div className="text-xs uppercase tracking-widest mb-2 font-mono" style={{ color: accent }}>
                {p.type} · {p.floors} קומות
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-1">{p.title}</h3>
              <div className="text-sm" style={{ color: "#86868b" }}>{p.location}</div>
            </motion.article>
          ))}
        </div>

        <div className="mt-5 grid md:grid-cols-2 gap-5">
          {projects.slice(3, 5).map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="group relative cursor-pointer rounded-3xl overflow-hidden aspect-[16/9]"
            >
              <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-5 right-5 left-5 text-white">
                <div className="text-[10px] uppercase tracking-widest mb-2 font-mono" style={{ color: p.accent }}>
                  {p.type} · {p.floors} קומות
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-1">{p.title}</h3>
                <div className="text-sm text-white/80">{p.location}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function NumbersA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="rounded-3xl overflow-hidden p-1" style={{ background: `conic-gradient(from 90deg, ${accent}, ${peach}, ${accent})` }}>
          <div className="rounded-[1.4rem] p-8 md:p-12" style={{ background: cream }}>
            <div className="text-xs uppercase tracking-[0.3em] mb-10 font-mono text-center" style={{ color: accent }}>המספרים</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  className="text-center"
                >
                  <div
                    className="text-6xl md:text-7xl font-bold tracking-tighter mb-2"
                    style={{
                      background: `linear-gradient(135deg, ${accent}, ${peach})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}<span className="text-3xl">{s.suffix}</span>
                  </div>
                  <div className="text-base font-semibold mb-1">{s.label}</div>
                  <div className="text-xs" style={{ color: "#86868b" }}>{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VoicesA() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-[0.3em] mb-4 font-mono" style={{ color: accent }}>המלצות</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">לקוחות שלנו אומרים</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="rounded-3xl p-7 flex flex-col"
              style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <div className="text-5xl font-bold leading-none mb-3" style={{ color: accent }}>"</div>
              <blockquote className="text-base md:text-lg leading-relaxed mb-6 flex-1">{t.quote}</blockquote>
              <figcaption className="border-t pt-4" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs" style={{ color: "#86868b" }}>{t.role}</div>
                <div className="text-[10px] mt-1 uppercase tracking-widest font-mono" style={{ color: accent }}>{t.project}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAA() {
  return (
    <section id="cta" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div
          className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-20 text-center text-white"
          style={{ background: `linear-gradient(135deg, ${accent}, ${peach})` }}
        >
          <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] rounded-full opacity-30" style={{ background: "white", filter: "blur(80px)" }} />
          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.95]">
              <span className="block overflow-hidden">
                <SplitText text="מוכנים להתחיל?" stagger={0.04} duration={1} />
              </span>
            </h2>
            <p className="text-xl text-white/85 mb-10 max-w-xl mx-auto">
              שיחה ראשונה — חינם, ללא התחייבות.
              נבין את החזון שלכם, ונראה איך אפשר להפוך אותו למציאות.
            </p>
            <a
              href="mailto:hello@nexusbuild.io"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105"
              style={{ background: ink, color: cream }}
            >
              קבע פגישה ראשונה
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M19 12L5 12M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterA() {
  return (
    <footer className="relative pt-16 pb-8" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex flex-col md:flex-row justify-between gap-4 text-sm" style={{ color: "#86868b" }}>
        <span>© NEXUS BUILD STUDIO · 2026</span>
        <span>HALEVAVOT 14, TLV · HELLO@NEXUSBUILD.IO</span>
        <a href="#" className="hover:text-black transition-colors">↑ לראש העמוד</a>
      </div>
    </footer>
  );
}
