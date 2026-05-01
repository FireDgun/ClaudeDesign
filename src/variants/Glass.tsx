import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services, projects, stats, testimonials } from "../data";
import SplitText from "../ui/SplitText";
import Tilt from "../ui/Tilt";
import { useMouseLight } from "../hooks/useMouseLight";

export default function GlassVariant() {
  return (
    <div className="min-h-screen text-white relative overflow-x-hidden" style={{ background: "#06061a" }}>
      <Aurora />
      <NavG />
      <HeroG />
      <FeatureSticky />
      <ServicesG />
      <ShowcaseG />
      <NumbersG />
      <VoicesG />
      <CTAG />
      <FooterG />
    </div>
  );
}

function Aurora() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full blur-[120px] opacity-50"
        style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ x: [0, -80, 0], y: [0, -40, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-40 w-[800px] h-[800px] rounded-full blur-[120px] opacity-40"
        style={{ background: "radial-gradient(circle, #fb923c 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full blur-[140px] opacity-30"
        style={{ background: "radial-gradient(ellipse, #06b6d4 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
    </div>
  );
}

function NavG() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4 md:px-6">
      <div className="mx-auto max-w-6xl rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 px-5 py-2.5 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 text-base font-semibold tracking-tight">
          <span className="block w-2.5 h-2.5 rounded-full" style={{ background: "#2dd4bf", boxShadow: "0 0 12px #2dd4bf" }} />
          NexusBuild
        </div>
        <nav className="hidden md:flex items-center gap-7 text-xs text-white/60">
          {["שירותים", "פרויקטים", "המספרים", "המלצות"].map((l) => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </nav>
        <a href="#cta" className="text-xs font-semibold px-4 py-1.5 rounded-full bg-white text-[#06061a] hover:bg-teal-200 transition-colors">התחל</a>
      </div>
    </header>
  );
}

function HeroG() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative pt-40 md:pt-48 pb-24 min-h-screen flex flex-col">
      <motion.div style={{ y, opacity }} className="mx-auto max-w-7xl px-5 md:px-8 w-full">
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-xs">
            <span className="block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70">חדש: סריקות LiDAR ב-RT</span>
            <span className="text-teal-300">→</span>
          </div>
        </div>

        <h1 className="text-center font-bold tracking-tighter leading-[0.95] mb-8 mx-auto" style={{ fontFamily: "'Heebo', sans-serif", maxWidth: "1100px" }}>
          <span className="block text-[12vw] md:text-[7vw] overflow-hidden">
            <SplitText text="בנייה חכמה." stagger={0.03} duration={0.9} />
          </span>
          <span className="block text-[12vw] md:text-[7vw] overflow-hidden">
            <span className="bg-gradient-to-r from-teal-200 via-amber-200 to-cyan-200 bg-clip-text text-transparent">
              <SplitText text="שקופה לחלוטין." stagger={0.03} duration={0.9} delay={0.1} />
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center text-lg md:text-xl text-white/65 max-w-2xl mx-auto mb-12 leading-snug"
        >
          סטודיו אדריכלות שמשלב AI, סריקות תלת-ממד ו-IoT לבנייה חכמה.
          כל פרויקט נולד דיגיטלית — מוצג, מחושב, מאושר — לפני שאבן אחת מונחת.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3"
        >
          <a href="#cta" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#06061a] font-semibold hover:bg-teal-200 transition-colors text-sm">
            קבע שיחת ייעוץ
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M19 12L5 12M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#showcase" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/15 text-sm hover:bg-white/10 transition-colors">
            צפו בפרויקטים
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1, ease: [0.65, 0.05, 0.36, 1] }}
        className="mt-20 mx-auto max-w-6xl w-full px-5 md:px-8"
      >
        <Tilt intensity={5} className="rounded-3xl">
          <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-2 shadow-[0_30px_120px_rgba(93,108,255,0.25)]">
            <div className="rounded-2xl overflow-hidden aspect-[16/9] relative" style={{ background: "linear-gradient(135deg, #042f2e, #0f766e, #f59e0b)" }}>
              <DashboardMockup />
            </div>
          </div>
        </Tilt>
      </motion.div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="absolute inset-0 p-4 md:p-6">
      <div className="h-full grid grid-cols-12 gap-3">
        <div className="col-span-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/15 p-4 flex flex-col gap-3">
          <div className="text-[10px] text-white/60 uppercase tracking-widest">פרויקטים פעילים</div>
          <div className="text-3xl font-bold">12</div>
          <div className="flex-1 flex flex-col gap-1.5">
            {[88, 64, 42, 30].map((w, i) => (
              <div key={i} className="h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${w}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.15, ease: [0.65, 0.05, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-teal-400 to-amber-300"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-6 rounded-xl bg-white/10 backdrop-blur-xl border border-white/15 p-4 relative overflow-hidden">
          <div className="text-[10px] text-white/60 uppercase tracking-widest mb-2">Helix Tower — מודל חי</div>
          <svg viewBox="-100 -180 200 220" className="w-full h-full">
            {Array.from({ length: 14 }).map((_, i) => {
              const y = -i * 12;
              const w = 70 - i * 2;
              return (
                <g key={i}>
                  <rect x={-w} y={y - 10} width={w * 2} height={10} fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" strokeWidth={0.3} />
                  {Array.from({ length: 6 }).map((_, j) => (
                    <rect
                      key={j}
                      x={-w + 3 + j * ((w * 2 - 6) / 6)}
                      y={y - 8}
                      width={(w * 2 - 6) / 6 - 2}
                      height={6}
                      fill={Math.random() > 0.5 ? "#7cf9ff" : "rgba(255,255,255,0.4)"}
                      opacity={Math.random() * 0.6 + 0.3}
                    />
                  ))}
                </g>
              );
            })}
          </svg>
          <div className="absolute bottom-2 right-2 text-[9px] font-mono uppercase text-white/60 tracking-widest bg-black/30 px-2 py-1 rounded">
            ● LIVE · 24FPS
          </div>
        </div>
        <div className="col-span-3 grid grid-rows-3 gap-3">
          {[
            ["צריכת אנרגיה", "−23%", "from-emerald-400"],
            ["איכות אוויר", "A+", "from-cyan-400"],
            ["תפוסה", "87%", "from-amber-400"],
          ].map(([l, v, c], i) => (
            <div key={i} className="rounded-xl bg-white/10 backdrop-blur-xl border border-white/15 p-3 flex flex-col justify-between">
              <div className="text-[9px] text-white/60 uppercase tracking-widest">{l}</div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${c} to-white bg-clip-text text-transparent`}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureSticky() {
  const ref = useRef<HTMLElement>(null);
  const features = [
    {
      tag: "AI · PARAMETRIC",
      title: "תכנון פרמטרי, חי.",
      body: "שינוי פרמטר אחד ומאות גרסאות מחושבות מחדש בזמן אמת. אופטימיזציית אקלים, אור ועלות בלחיצת כפתור.",
      gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)",
    },
    {
      tag: "LIDAR · 3D SCAN",
      title: "סריקות ברזולוציית מילימטר.",
      body: "כל מבנה קיים מקבל תאום דיגיטלי. כל פגם, כל סדק, כל נישה — נתון. תכנון על אמת ולא על הנחות.",
      gradient: "linear-gradient(135deg, #fb923c, #ec4899)",
    },
    {
      tag: "IOT · LIVE BUILDING",
      title: "בניינים שחושבים.",
      body: "חיישנים פנימיים מנטרים תפוסה, אנרגיה, איכות אוויר. הבניין מדבר עם הצוות אחרי שהוא נמסר.",
      gradient: "linear-gradient(135deg, #2dd4bf, #fbbf24)",
    },
  ];
  const total = features.length;
  return (
    <section ref={ref} className="relative" style={{ height: `${total * 100}vh` }}>
      {features.map((f, i) => (
        <FeaturePanel key={i} feature={f} index={i} total={total} parentRef={ref} />
      ))}
    </section>
  );
}

function FeaturePanel({
  feature,
  index,
  total,
  parentRef,
}: {
  feature: { tag: string; title: string; body: string; gradient: string };
  index: number;
  total: number;
  parentRef: React.RefObject<HTMLElement>;
}) {
  const { scrollYProgress } = useScroll({ target: parentRef });
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start - 0.05, start + 0.05, end - 0.05, end + 0.05], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [1, 0.95]);
  return (
    <motion.div style={{ opacity, scale }} className="sticky top-0 h-screen flex items-center justify-center px-5 md:px-8">
      <div className="grid lg:grid-cols-2 gap-10 max-w-7xl w-full items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] mb-5 font-mono text-teal-300">{feature.tag} · 0{index + 1} / 0{total}</div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] mb-6">
            {feature.title}
          </h2>
          <p className="text-lg md:text-xl text-white/65 max-w-lg leading-snug">{feature.body}</p>
        </div>
        <Tilt intensity={6} className="rounded-3xl aspect-[5/4]">
          <div
            className="rounded-3xl w-full h-full p-px"
            style={{ background: feature.gradient }}
          >
            <div className="rounded-3xl w-full h-full bg-white/5 backdrop-blur-2xl border border-white/10 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-30" style={{ background: feature.gradient }} />
              <div className="relative text-7xl md:text-9xl font-bold tracking-tighter">0{index + 1}</div>
            </div>
          </div>
        </Tilt>
      </div>
    </motion.div>
  );
}

function ServicesG() {
  const ref = useMouseLight<HTMLDivElement>();
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="text-xs text-teal-300 uppercase tracking-[0.3em] mb-4 font-mono">השירותים</div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 leading-tight">
            <span className="block overflow-hidden">
              <SplitText text="ארבעה תחומים." stagger={0.04} duration={1} />
            </span>
            <span className="block overflow-hidden bg-gradient-to-r from-teal-200 via-white to-amber-200 bg-clip-text text-transparent">
              <SplitText text="סטודיו אחד." stagger={0.04} duration={1} delay={0.1} />
            </span>
          </h2>
          <p className="text-white/60">הכלים החזקים בעולם, מתחת לקורת גג אחת.</p>
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative" style={{ "--mx": 0.5, "--my": 0.5 } as any}>
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl"
            style={{
              background:
                "radial-gradient(500px circle at calc(var(--mx) * 100%) calc(var(--my) * 100%), rgba(93,108,255,0.18), transparent 60%)",
            }}
          />
          {services.map((s, i) => (
            <Tilt key={s.n} intensity={6} glow className="rounded-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06, duration: 0.7 }}
                className="relative rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 hover:border-white/20 transition-colors overflow-hidden h-full"
              >
                <div className="text-xs text-teal-300 uppercase tracking-widest mb-3 font-mono">{s.tag}</div>
                <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-5">{s.body}</p>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {s.tools.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest text-white/50 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseG() {
  return (
    <section id="showcase" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs text-teal-300 uppercase tracking-[0.3em] mb-4 font-mono">פרויקטים</div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
              <span className="block overflow-hidden">
                <SplitText text="עבודה חיה." stagger={0.04} duration={1} />
              </span>
            </h2>
          </div>
          <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">כל הפרויקטים →</a>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.slice(0, 4).map((p, i) => (
            <Tilt key={p.title} intensity={4} className="rounded-3xl">
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 2) * 0.08, duration: 0.8 }}
                className={`relative rounded-3xl overflow-hidden border border-white/10 ${i === 0 ? "md:row-span-2 aspect-[4/5]" : "aspect-[4/3]"}`}
              >
                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06061a]/95 via-[#06061a]/30 to-transparent" />
                <div className="absolute top-4 right-4 left-4 flex justify-between text-[10px] uppercase tracking-widest text-white/80 font-mono">
                  <span>0{i + 1}</span>
                  <span>{p.year}</span>
                </div>
                <div className="absolute bottom-5 right-5 left-5">
                  <div className="text-[10px] uppercase tracking-widest mb-2 font-mono" style={{ color: p.accent }}>
                    {p.type} · {p.floors} קומות
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">{p.title}</h3>
                  <div className="text-sm text-white/70">{p.location}</div>
                </div>
              </motion.article>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function NumbersG() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-2">
          <div className="rounded-2xl bg-gradient-to-br from-teal-950/80 via-emerald-950/80 to-cyan-950/80 p-8 md:p-12">
            <div className="text-xs text-teal-300 uppercase tracking-[0.3em] mb-10 font-mono text-center">המספרים</div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-5xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-teal-200 to-amber-200 bg-clip-text text-transparent mb-2">
                    {s.value}
                    <span className="text-3xl">{s.suffix}</span>
                  </div>
                  <div className="text-sm font-semibold mb-1">{s.label}</div>
                  <div className="text-xs text-white/50">{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VoicesG() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center mb-12 max-w-xl mx-auto">
          <div className="text-xs text-teal-300 uppercase tracking-[0.3em] mb-4 font-mono">המלצות</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">לקוחות שלנו, במילים שלהם</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Tilt key={i} intensity={5} className="rounded-2xl">
              <motion.figure
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 flex flex-col h-full"
              >
                <blockquote className="text-base md:text-lg leading-relaxed mb-6 flex-1">{t.quote}</blockquote>
                <figcaption className="border-t border-white/10 pt-4">
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-white/55">{t.role}</div>
                  <div className="text-[10px] text-teal-300 mt-1 uppercase tracking-widest font-mono">{t.project}</div>
                </figcaption>
              </motion.figure>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAG() {
  return (
    <section id="cta" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Tilt intensity={3} className="rounded-[2rem]">
          <div className="relative rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 p-12 md:p-20 text-center">
            <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-50" style={{ background: "#2dd4bf" }} />
            <div className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] opacity-40" style={{ background: "#06b6d4" }} />
            <div className="relative">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[0.95]">
                <span className="block overflow-hidden">
                  <SplitText text="יש לכם חזון." stagger={0.04} duration={1} />
                </span>
                <span className="block overflow-hidden bg-gradient-to-r from-teal-200 via-white to-amber-200 bg-clip-text text-transparent">
                  <SplitText text="נבנה אותו." stagger={0.04} duration={1} delay={0.1} />
                </span>
              </h2>
              <p className="text-white/65 text-lg mb-10 max-w-xl mx-auto">
                שיחה ראשונה — חינם, בלי התחייבות. נבין מה אתם רוצים להשיג ונראה איך הטכנולוגיה הופכת את זה למציאות.
              </p>
              <a
                href="mailto:hello@nexusbuild.io"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#06061a] font-semibold hover:bg-teal-200 transition-colors"
              >
                קבע פגישה ראשונה
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12L5 12M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  );
}

function FooterG() {
  return (
    <footer className="relative pt-16 pb-8 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/50 font-mono uppercase tracking-widest">
        <span>© NEXUS BUILD · 2026</span>
        <span>HALEVAVOT 14, TLV · HELLO@NEXUSBUILD.IO</span>
        <a href="#" className="text-teal-300 hover:text-white transition-colors">↑ TOP</a>
      </div>
    </footer>
  );
}
