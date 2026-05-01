import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services, projects, stats, testimonials, heroImage } from "../data";
import SplitText from "../ui/SplitText";

const cream = "#f1ece2";
const ink = "#1a1a1a";
const accent = "#c14926";

export default function EditorialVariant() {
  return (
    <div
      className="min-h-screen"
      style={{ background: cream, color: ink, fontFamily: "'Heebo', system-ui, sans-serif" }}
    >
      <Header />
      <Hero />
      <Index />
      <Cover />
      <Featurette />
      <Spread />
      <Numbers />
      <Voices />
      <Closing />
      <FooterE />
    </div>
  );
}

function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 border-b"
      style={{ borderColor: "rgba(26,26,26,0.15)", background: cream }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="font-serif italic text-2xl tracking-tight">Nexus<span style={{ color: accent }}>·</span>Build</div>
        <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.25em] font-mono">
          <span style={{ color: ink, opacity: 0.5 }}>גיליון 04 — 2026</span>
          <span style={{ color: ink, opacity: 0.5 }}>·</span>
          <span style={{ color: accent }}>ארכיטקטורה</span>
          <span style={{ color: ink, opacity: 0.5 }}>·</span>
          <span style={{ color: ink, opacity: 0.5 }}>טל אביב</span>
        </div>
        <a
          href="#cta"
          className="text-xs uppercase tracking-[0.25em] font-mono border border-current rounded-full px-5 py-2 hover:text-white transition-colors"
          style={{ borderColor: ink }}
          onMouseEnter={(e) => (e.currentTarget.style.background = ink)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          צרו קשר
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-xs uppercase tracking-[0.3em] font-mono mb-10" style={{ color: accent }}>
          ··· מאמר ראשי
        </div>

        <h1 className="font-serif font-black tracking-tight leading-[0.85] mb-12">
          <span className="block text-[14vw] md:text-[10vw] overflow-hidden">
            <SplitText text="בונים את" stagger={0.04} duration={1.1} />
          </span>
          <span className="block text-[14vw] md:text-[10vw] italic font-light overflow-hidden" style={{ color: accent }}>
            <SplitText text="העתיד," stagger={0.04} duration={1.1} delay={0.1} />
          </span>
          <span className="block text-[14vw] md:text-[10vw] overflow-hidden">
            <SplitText text="קומה אחר קומה." stagger={0.04} duration={1.1} delay={0.2} />
          </span>
        </h1>

        <div className="grid md:grid-cols-12 gap-8 mb-16 max-w-6xl">
          <div className="md:col-span-3 text-xs uppercase tracking-[0.3em] font-mono" style={{ opacity: 0.55 }}>
            <div className="mb-2">מאת</div>
            <div className="font-serif text-base normal-case tracking-normal" style={{ opacity: 1 }}>
              <em>הסטודיו</em>, מערכת
            </div>
            <div className="mt-6 mb-2">תאריך</div>
            <div className="font-serif text-base normal-case tracking-normal" style={{ opacity: 1 }}>
              מאי 2026 · 14 דקות קריאה
            </div>
          </div>
          <p className="md:col-span-9 text-2xl md:text-3xl leading-snug font-light max-w-3xl">
            סטודיו אדריכלות שמשלב <em className="font-serif italic">בינה מלאכותית</em>, סריקות תלת-ממד ו-IoT לבנייה חכמה.
            כל פרויקט נולד דיגיטלית — מוצג, מחושב, מאושר — לפני שאבן אחת מונחת באתר.
          </p>
        </div>
      </div>

      <motion.div style={{ scale }} className="relative h-[60vh] md:h-[80vh] mx-6 md:mx-10 overflow-hidden">
        <motion.img
          style={{ y }}
          src={heroImage}
          alt="Modern architecture"
          className="absolute inset-0 w-full h-[120%] object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-6 right-6 text-white text-xs font-mono uppercase tracking-[0.25em]">
          תמונה ↓ פרויקט HELIX TOWER · 2026
        </div>
      </motion.div>
    </section>
  );
}

function Index() {
  return (
    <section className="border-y py-10" style={{ borderColor: "rgba(26,26,26,0.15)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-8">
        {[
          ["I.", "מאמר ראשי", "עמ' 03"],
          ["II.", "התמחויות", "עמ' 12"],
          ["III.", "תיק עבודות", "עמ' 24"],
          ["IV.", "המספרים", "עמ' 38"],
          ["V.", "המלצות", "עמ' 47"],
        ].map(([n, t, p]) => (
          <div key={n} className="font-mono text-xs uppercase tracking-[0.25em] flex items-baseline justify-between border-b pb-2" style={{ borderColor: "rgba(26,26,26,0.2)" }}>
            <span style={{ color: accent }}>{n}</span>
            <span className="text-base font-serif normal-case tracking-normal mr-2 ml-auto">{t}</span>
            <span style={{ opacity: 0.5 }}>{p}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Cover() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
          <div className="font-mono text-xs uppercase tracking-[0.3em] mb-6" style={{ color: accent }}>
            II · התמחויות
          </div>
          <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 tracking-tight">
            <span className="block overflow-hidden">
              <SplitText text="ארבעה" stagger={0.04} duration={1} />
            </span>
            <span className="block italic font-light overflow-hidden" style={{ color: accent }}>
              <SplitText text="תחומים." stagger={0.04} duration={1} delay={0.1} />
            </span>
            <span className="block overflow-hidden">
              <SplitText text="סטודיו אחד." stagger={0.04} duration={1} delay={0.2} />
            </span>
          </h2>
          <p className="text-lg leading-snug max-w-md" style={{ opacity: 0.7 }}>
            הכלים החזקים בעולם — מ-Rhino ועד AWS IoT — מתחת לקורת גג אחת.
            אתם מקבלים סטודיו, לא סוכנות.
          </p>
        </div>

        <div className="lg:col-span-7 space-y-px" style={{ background: "rgba(26,26,26,0.15)" }}>
          {services.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="p-8 md:p-10 group"
              style={{ background: cream }}
            >
              <div className="flex items-start justify-between gap-6 mb-4">
                <div className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: accent }}>
                  {s.tag}
                </div>
                <div className="font-serif italic text-sm" style={{ opacity: 0.4 }}>
                  fig. {s.n}
                </div>
              </div>
              <h3 className="font-serif text-3xl md:text-5xl mb-3 leading-tight tracking-tight">{s.title}</h3>
              <p className="text-base md:text-lg leading-snug max-w-xl mb-5" style={{ opacity: 0.7 }}>
                {s.body}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-widest" style={{ opacity: 0.5 }}>
                {s.tools.map((t, j) => (
                  <span key={t}>
                    {t}
                    {j < s.tools.length - 1 && " ·"}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Featurette() {
  return (
    <section className="py-24 border-y" style={{ borderColor: "rgba(26,26,26,0.15)", background: ink, color: cream }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="font-mono text-xs uppercase tracking-[0.3em] mb-12 opacity-60">
          MANIFESTO — pull quote
        </div>
        <blockquote className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-5xl">
          <span className="block overflow-hidden mb-2">
            <SplitText text='"אנחנו לא מציירים בניינים.' stagger={0.04} duration={1} />
          </span>
          <span className="block overflow-hidden italic" style={{ color: accent }}>
            <SplitText text="אנחנו מקודדים אותם." stagger={0.04} duration={1} delay={0.15} />
          </span>
          <span className="block overflow-hidden">
            <SplitText text="כל קיר הוא נתון." stagger={0.04} duration={1} delay={0.3} />
          </span>
          <span className="block overflow-hidden">
            <SplitText text='כל חלון — החלטה."' stagger={0.04} duration={1} delay={0.45} />
          </span>
        </blockquote>
        <div className="mt-12 font-mono text-xs uppercase tracking-[0.3em] opacity-60">
          — מתוך מאמר העריכה, מאי 2026
        </div>
      </div>
    </section>
  );
}

function Spread() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mb-12">
        <div className="font-mono text-xs uppercase tracking-[0.3em] mb-6" style={{ color: accent }}>
          III · תיק עבודות
        </div>
        <h2 className="font-serif text-5xl md:text-7xl tracking-tight leading-none">
          <span className="overflow-hidden inline-block">
            <SplitText text="חמישה פרויקטים." stagger={0.04} duration={1} />
          </span>
          <br />
          <span className="italic font-light overflow-hidden inline-block" style={{ color: accent }}>
            <SplitText text="חמש שכונות." stagger={0.04} duration={1} delay={0.1} />
          </span>
        </h2>
      </div>
      <div className="grid md:grid-cols-12 gap-px" style={{ background: "rgba(26,26,26,0.2)" }}>
        {projects.map((p, i) => {
          const span =
            i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : i === 2 ? "md:col-span-4" : i === 3 ? "md:col-span-4" : "md:col-span-4";
          return (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.8 }}
              className={`relative ${span} group overflow-hidden cursor-pointer`}
              style={{ background: cream, height: "62vh" }}
            >
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white">
                <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.3em]">
                  <span>fig. 0{i + 1}</span>
                  <span>{p.year}</span>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.3em] mb-3 opacity-80">
                    {p.type} · {p.floors} קומות
                  </div>
                  <h3 className="font-serif text-3xl md:text-5xl mb-1 tracking-tight leading-none">{p.title}</h3>
                  <div className="text-sm opacity-80 italic font-serif">{p.location}</div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section className="py-24 md:py-32 border-y" style={{ borderColor: "rgba(26,26,26,0.15)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="font-mono text-xs uppercase tracking-[0.3em] mb-12" style={{ color: accent }}>
          IV · המספרים
        </div>
        <div className="grid md:grid-cols-4 gap-px" style={{ background: "rgba(26,26,26,0.2)" }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="p-8 md:p-10"
              style={{ background: cream }}
            >
              <div className="font-mono text-xs uppercase tracking-[0.3em] mb-4" style={{ opacity: 0.5 }}>
                fig. 0{i + 1}
              </div>
              <div className="font-serif text-7xl md:text-8xl leading-none mb-3 tracking-tighter">
                <CountNumber value={s.value} />
                <span className="italic font-light text-5xl" style={{ color: accent }}>
                  {s.suffix}
                </span>
              </div>
              <div className="font-bold text-lg mb-1">{s.label}</div>
              <div className="text-sm" style={{ opacity: 0.55 }}>
                {s.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountNumber({ value }: { value: number }) {
  return <span>{value}</span>;
}

function Voices() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="font-mono text-xs uppercase tracking-[0.3em] mb-12" style={{ color: accent }}>
          V · המלצות
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="border-t-2 pt-6"
              style={{ borderColor: ink }}
            >
              <blockquote className="font-serif text-xl md:text-2xl leading-snug mb-6" style={{ color: ink }}>
                <span className="text-4xl font-serif" style={{ color: accent }}>
                  "
                </span>
                {t.quote}
              </blockquote>
              <figcaption className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ opacity: 0.7 }}>
                — {t.name}, {t.role}
                <div className="mt-1" style={{ color: accent }}>
                  · {t.project}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section id="cta" className="py-24 md:py-32" style={{ background: ink, color: cream }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.3em] mb-10 opacity-60">VI · יצירת קשר</div>
        <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight mb-12">
          <span className="block overflow-hidden">
            <SplitText text="יש לכם חזון." stagger={0.04} duration={1} />
          </span>
          <span className="block italic font-light overflow-hidden" style={{ color: accent }}>
            <SplitText text="נבנה אותו." stagger={0.04} duration={1} delay={0.1} />
          </span>
        </h2>
        <a
          href="mailto:hello@nexusbuild.io"
          className="inline-block font-mono text-sm uppercase tracking-[0.3em] border-2 px-10 py-5 hover:bg-white hover:text-black transition-colors"
          style={{ borderColor: cream }}
        >
          קבע פגישה →
        </a>
      </div>
    </section>
  );
}

function FooterE() {
  return (
    <footer className="py-12 border-t" style={{ borderColor: "rgba(26,26,26,0.15)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col md:flex-row justify-between gap-4 font-mono text-xs uppercase tracking-[0.3em]" style={{ opacity: 0.6 }}>
        <span>© NEXUS BUILD STUDIO — TLV — 2026</span>
        <span>גיליון 04 · נערך במאי 2026</span>
        <a href="#" style={{ color: accent }}>
          ↑ לראש העמוד
        </a>
      </div>
    </footer>
  );
}
