import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { services, projects, stats, testimonials, heroImage, aboutImage } from "../data";
import SplitText from "../ui/SplitText";

const cream = "#f1ece2";
const ink = "#1a1a1a";
const accent = "#c14926";

export default function EditorialVariant() {
  const { scrollYProgress } = useScroll();
  const folio = useTransform(scrollYProgress, (v) => `P. ${String(Math.max(1, Math.round(v * 64))).padStart(3, "0")} / 064`);
  const [folioStr, setFolioStr] = useState("P. 001 / 064");
  useEffect(() => folio.on("change", (v) => setFolioStr(v as string)), [folio]);

  return (
    <div className="min-h-screen" style={{ background: cream, color: ink, fontFamily: "'Heebo', system-ui, sans-serif" }}>
      <ProgressBar progress={scrollYProgress} />
      <Header />
      <FolioCorner folio={folioStr} />
      <Hero />
      <Index />
      <Lede />
      <PhotoGrid />
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

function ProgressBar({ progress }: { progress: any }) {
  const w = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1" style={{ background: "rgba(26,26,26,0.1)" }}>
      <motion.div style={{ width: w, background: accent }} className="h-full origin-left" />
    </div>
  );
}

function FolioCorner({ folio }: { folio: string }) {
  return (
    <div className="fixed bottom-5 right-5 z-30 hidden md:block font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: ink, opacity: 0.5 }}>
      {folio}
    </div>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-1 z-40 border-b" style={{ borderColor: "rgba(26,26,26,0.15)", background: cream }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="font-magazine italic text-2xl tracking-tight">Nexus<span style={{ color: accent }}>·</span>Build</div>
        <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.25em] font-mono">
          <span style={{ opacity: 0.5 }}>גיליון 04 — מאי 2026</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span style={{ color: accent }}>אדריכלות + בינה</span>
        </div>
        <a
          href="#cta"
          className="text-xs uppercase tracking-[0.25em] font-mono border border-current rounded-full px-5 py-2 transition-colors"
          style={{ borderColor: ink }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = ink;
            e.currentTarget.style.color = cream;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = ink;
          }}
        >
          צרו קשר →
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPic = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="text-xs uppercase tracking-[0.3em] font-mono mb-6 flex items-center gap-3" style={{ color: accent }}>
          <span className="block w-12 h-px" style={{ background: accent }} />
          ··· מאמר ראשי / גיליון 04
        </div>

        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-6 items-start mb-16">
          <h1 className="lg:col-span-9 font-magazine font-black tracking-tight leading-[0.85]">
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
          <aside className="lg:col-span-3 lg:pt-6 border-t pt-6 lg:border-t-0 lg:border-r lg:pr-6" style={{ borderColor: "rgba(26,26,26,0.2)" }}>
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono mb-3" style={{ opacity: 0.6 }}>מתוך הגיליון</div>
            <div className="font-magazine italic text-base leading-snug mb-3">
              "אנחנו לא מציירים בניינים. אנחנו <span style={{ color: accent }}>מקודדים</span> אותם."
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] font-mono" style={{ opacity: 0.5 }}>— עמ׳ 32, מתוך הראיון עם הצוות</div>
          </aside>
        </div>
      </div>

      <motion.div style={{ scale }} className="relative h-[60vh] md:h-[80vh] mx-6 md:mx-10 overflow-hidden">
        <motion.img style={{ y: yPic }} src={heroImage} alt="Modern architecture" className="absolute inset-0 w-full h-[120%] object-cover" loading="eager" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.4))" }} />
        <div className="absolute bottom-6 right-6 left-6 flex justify-between text-white text-xs font-mono uppercase tracking-[0.25em]">
          <div>↓ FIG. 01 — HELIX TOWER, TLV · 2026 · 47 קומות</div>
          <div>צילום · נקסוס סטודיו</div>
        </div>
      </motion.div>
    </section>
  );
}

function Index() {
  return (
    <section className="border-y py-10" style={{ borderColor: "rgba(26,26,26,0.15)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-3" style={{ color: accent }}>
          <span>תוכן הגיליון</span>
          <span className="block flex-1 h-px" style={{ background: "rgba(26,26,26,0.2)" }} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-8">
          {[
            ["I.", "מאמר ראשי", "003"],
            ["II.", "התמחויות", "012"],
            ["III.", "תיק עבודות", "024"],
            ["IV.", "המספרים", "038"],
            ["V.", "המלצות", "047"],
          ].map(([n, t, p]) => (
            <a key={t} href="#" className="font-mono text-xs uppercase tracking-[0.25em] flex items-baseline justify-between border-b pb-2 group" style={{ borderColor: "rgba(26,26,26,0.2)" }}>
              <span style={{ color: accent }}>{n}</span>
              <span className="text-base font-magazine normal-case tracking-normal mr-2 ml-auto group-hover:italic transition-all">{t}</span>
              <span style={{ opacity: 0.5 }}>{p}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Lede() {
  return (
    <section className="py-24 md:py-32 border-b" style={{ borderColor: "rgba(26,26,26,0.15)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-3 order-2 lg:order-1 space-y-6 text-sm">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: accent }}>מאת</div>
            <div className="font-magazine italic text-lg">הסטודיו, מערכת המגזין</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: accent }}>נושא</div>
            <div>אדריכלות פרמטרית, סריקות 3D, IoT, בנייה חכמה</div>
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-2" style={{ color: accent }}>זמן קריאה</div>
            <div className="font-magazine text-lg">14 דקות</div>
          </div>
          <div className="pt-6 border-t" style={{ borderColor: "rgba(26,26,26,0.2)" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] leading-relaxed" style={{ opacity: 0.6 }}>
              ★ הערת המערכת:<br />
              הכתבה מבוססת על תיק עבודות שנערך בין 2024-2026 ב-187 פרויקטים, מתל אביב ועד אילת.
            </div>
          </div>
        </aside>
        <div className="lg:col-span-9 order-1 lg:order-2">
          <p className="font-magazine text-2xl md:text-3xl leading-snug font-light max-w-3xl">
            <span className="float-right ml-3 text-[5em] leading-[0.85] font-black" style={{ color: accent, fontFamily: "Georgia, serif" }}>ב</span>
            עידן שבו <em className="italic">בינה מלאכותית</em> מתכננת מבנים מהר יותר מאדריכל אנושי, סטודיו אחד בתל אביב מציע משהו אחר —
            לא להחליף את האדם, אלא להעצים אותו. נקסוס בילד הוא לא משרד אדריכלים. הוא מערכת.
            כל פרויקט נולד דיגיטלית — מוצג, מחושב, מאושר — לפני שאבן אחת מונחת באתר.
          </p>
          <div className="my-12 border-y py-3 flex items-center justify-center gap-3" style={{ borderColor: "rgba(26,26,26,0.15)" }}>
            <span className="block w-8 h-px" style={{ background: ink }} />
            <span style={{ color: accent }}>★</span>
            <span className="block w-8 h-px" style={{ background: ink }} />
          </div>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 text-base md:text-lg leading-relaxed" style={{ opacity: 0.85 }}>
            <p>
              סריקות LiDAR ברזולוציית מילימטר חושפות בעיות במבנים קיימים שאף סוקר אנושי לא היה רואה.
              חישובי צל ואקלים מבוצעים על מאות גרסאות תכנון בו-זמנית. הדמיות VR מאפשרות ללקוח לטייל בבניין שלו לפני שהוא קיים — ולשנות אותו.
            </p>
            <p>
              ובעיקר — אחרי שהבניין נמסר, הוא ממשיך לחיות. חיישנים פנימיים מנטרים תפוסה, צריכת אנרגיה, איכות אוויר. הבניין <em className="italic">מדבר</em> עם הצוות.
              זה לא מותרות. זה <span style={{ color: accent }} className="font-bold">התקן החדש.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoGrid() {
  return (
    <section className="py-24 md:py-32 border-b" style={{ borderColor: "rgba(26,26,26,0.15)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-3 md:gap-4 mb-8">
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7 md:row-span-2 relative aspect-[4/5] md:aspect-auto md:h-[80vh] overflow-hidden"
          >
            <img src={projects[0].image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <figcaption className="absolute bottom-4 right-4 left-4 text-white text-xs font-mono uppercase tracking-[0.25em] flex justify-between">
              <span>↘ FIG. 02 — HELIX TOWER, סקיצה ראשונית</span>
              <span style={{ color: "#fff" }}>03/12</span>
            </figcaption>
          </motion.figure>
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-5 relative aspect-[4/3] overflow-hidden"
          >
            <img src={projects[2].image} alt="" className="absolute inset-0 w-full h-full object-cover grayscale" loading="lazy" />
            <figcaption className="absolute bottom-4 right-4 left-4 text-white text-xs font-mono uppercase tracking-[0.25em]">
              ↘ FIG. 03 — סריקת LiDAR (B/W)
            </figcaption>
          </motion.figure>
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-5 relative aspect-[4/3] overflow-hidden"
          >
            <img src={aboutImage} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
            <figcaption className="absolute bottom-4 right-4 left-4 text-white text-xs font-mono uppercase tracking-[0.25em]">↘ FIG. 04 — אתר בנייה SKY GARDENS</figcaption>
          </motion.figure>
        </div>

        <blockquote className="font-magazine text-3xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-4xl mx-auto text-center my-16 md:my-24">
          <span className="text-[3em] leading-none" style={{ color: accent, fontFamily: "Georgia,serif" }}>"</span>
          <br />
          <em className="italic">אנחנו לא בונים ארבעה קירות וגג.</em>
          <br />
          <span style={{ color: accent }}>אנחנו בונים מערכת חיה.</span>
          <br />
          <span style={{ fontFamily: "Georgia,serif" }} className="text-[3em] leading-none">"</span>
        </blockquote>
      </div>
    </section>
  );
}

function Cover() {
  return (
    <section className="py-24 md:py-32 border-b" style={{ borderColor: "rgba(26,26,26,0.15)" }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-3" style={{ color: accent }}>
            <span className="block w-8 h-px" style={{ background: accent }} />
            II · התמחויות
          </div>
          <h2 className="font-magazine text-6xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 tracking-tight">
            <span className="block overflow-hidden"><SplitText text="ארבעה" stagger={0.04} duration={1} /></span>
            <span className="block italic font-light overflow-hidden" style={{ color: accent }}>
              <SplitText text="תחומים." stagger={0.04} duration={1} delay={0.1} />
            </span>
            <span className="block overflow-hidden"><SplitText text="סטודיו אחד." stagger={0.04} duration={1} delay={0.2} /></span>
          </h2>
          <p className="text-lg leading-snug max-w-md mb-8" style={{ opacity: 0.7 }}>
            הכלים החזקים בעולם — מ-Rhino ועד AWS IoT — מתחת לקורת גג אחת.
            אתם מקבלים <em className="italic">סטודיו</em>, לא סוכנות.
          </p>
          <div className="border-t pt-4 font-mono text-[10px] uppercase tracking-[0.3em] flex justify-between" style={{ borderColor: "rgba(26,26,26,0.2)", opacity: 0.6 }}>
            <span>4 / 4 פעילים</span>
            <span style={{ color: accent }}>★ ALL OPERATIONAL</span>
          </div>
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
                <div className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: accent }}>{s.tag}</div>
                <div className="font-magazine italic text-sm" style={{ opacity: 0.4 }}>fig. {s.n}</div>
              </div>
              <h3 className="font-magazine text-3xl md:text-5xl mb-3 leading-tight tracking-tight">
                {s.title}
              </h3>
              <p className="text-base md:text-lg leading-snug max-w-xl mb-5" style={{ opacity: 0.7 }}>{s.body}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-widest" style={{ opacity: 0.5 }}>
                {s.tools.map((t, j) => (
                  <span key={t}>
                    {t}{j < s.tools.length - 1 && " ·"}
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
    <section className="py-24 md:py-32 border-y" style={{ borderColor: "rgba(26,26,26,0.15)", background: ink, color: cream }}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-12 opacity-60 flex items-center gap-3">
          <span className="block w-8 h-px" style={{ background: accent }} />
          MANIFESTO — pull quote
        </div>
        <blockquote className="font-magazine text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-5xl">
          <span className="block overflow-hidden mb-2"><SplitText text='"אנחנו לא מציירים בניינים.' stagger={0.04} duration={1} /></span>
          <span className="block overflow-hidden italic" style={{ color: accent }}>
            <SplitText text="אנחנו מקודדים אותם." stagger={0.04} duration={1} delay={0.15} />
          </span>
          <span className="block overflow-hidden"><SplitText text="כל קיר הוא נתון." stagger={0.04} duration={1} delay={0.3} /></span>
          <span className="block overflow-hidden"><SplitText text='כל חלון — החלטה."' stagger={0.04} duration={1} delay={0.45} /></span>
        </blockquote>
        <div className="mt-12 font-mono text-[10px] uppercase tracking-[0.3em] opacity-60">— מתוך מאמר העריכה, מאי 2026</div>
      </div>
    </section>
  );
}

function Spread() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 mb-12">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-3" style={{ color: accent }}>
          <span className="block w-8 h-px" style={{ background: accent }} />
          III · תיק עבודות
        </div>
        <h2 className="font-magazine text-5xl md:text-7xl tracking-tight leading-none">
          <span className="overflow-hidden inline-block"><SplitText text="חמישה פרויקטים." stagger={0.04} duration={1} /></span>
          <br />
          <span className="italic font-light overflow-hidden inline-block" style={{ color: accent }}>
            <SplitText text="חמש שכונות." stagger={0.04} duration={1} delay={0.1} />
          </span>
        </h2>
      </div>
      <div className="grid md:grid-cols-12 gap-px" style={{ background: "rgba(26,26,26,0.2)" }}>
        {projects.map((p, i) => {
          const span = i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-4";
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
              <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative h-full flex flex-col justify-between p-6 md:p-8 text-white">
                <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.3em]">
                  <span>fig. 0{i + 1}</span>
                  <span>{p.year}</span>
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.3em] mb-3 opacity-80">{p.type} · {p.floors} קומות</div>
                  <h3 className="font-magazine text-3xl md:text-5xl mb-1 tracking-tight leading-none">{p.title}</h3>
                  <div className="text-sm opacity-80 italic font-magazine">{p.location}</div>
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
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-12 flex items-center gap-3" style={{ color: accent }}>
          <span className="block w-8 h-px" style={{ background: accent }} />
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
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ opacity: 0.5 }}>fig. 0{i + 1}</div>
              <div className="font-magazine text-7xl md:text-8xl leading-none mb-3 tracking-tighter">
                {s.value}
                <span className="italic font-light text-5xl" style={{ color: accent }}>{s.suffix}</span>
              </div>
              <div className="font-bold text-lg mb-1">{s.label}</div>
              <div className="text-sm" style={{ opacity: 0.55 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-12 flex items-center gap-3" style={{ color: accent }}>
          <span className="block w-8 h-px" style={{ background: accent }} />
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
              <blockquote className="font-magazine text-xl md:text-2xl leading-snug mb-6">
                <span className="text-4xl font-magazine" style={{ color: accent }}>"</span>
                {t.quote}
              </blockquote>
              <figcaption className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ opacity: 0.7 }}>
                — {t.name}, {t.role}
                <div className="mt-1" style={{ color: accent }}>· {t.project}</div>
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
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-10 opacity-60">VI · יצירת קשר</div>
        <h2 className="font-magazine text-6xl md:text-8xl lg:text-9xl leading-none tracking-tight mb-12">
          <span className="block overflow-hidden"><SplitText text="יש לכם חזון." stagger={0.04} duration={1} /></span>
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
        <a href="#" style={{ color: accent }}>↑ לראש העמוד</a>
      </div>
    </footer>
  );
}
