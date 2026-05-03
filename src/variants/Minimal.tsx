/**
 * Variant 02 — "Architectural Minimalism"
 * Pro Algorithm — landing page faithfully reproducing the user's Figma design.
 *
 * Sections (RTL):
 *  1. Top nav (transparent over hero)
 *  2. Hero photo + curve clip + overlapping white card
 *  3. 4-up service strip with floating folded-paper SVG
 *  4. Featured solution navy card with Revit-style mock SVG + chips
 *  5. Stats row (3 columns)
 *  6. Detailed isometric blueprint SVG section
 *  7. Podcast section — featured episode + 3 stacked
 *  8. Press / media row of cream "torn" article cards
 *  9. Final CTA dark rounded card
 * 10. Minimal footer
 */

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ----------------------------- design tokens ----------------------------- */
const C = {
  paper: "#ffffff",
  soft: "#fafaf7",
  ink: "#0a1335",
  royal: "#1e40ff",
  mint: "#5fd0a6",
  mintDeep: "#34a87f",
  cream: "#f3e8d6",
  mute: "#5a6175",
  rule: "#e6e8ee",
  dark: "#0a1335",
};

/* ----------------------------- atoms ----------------------------- */
const Wordmark = ({ light = false, className = "" }: { light?: boolean; className?: string }) => (
  <span
    className={`font-grotesk font-medium uppercase tracking-[0.18em] ${className}`}
    style={{ color: light ? "#fff" : C.ink }}
    dir="ltr"
  >
    PRO ALGORITHM
  </span>
);

const MintCheck = ({ size = 28 }: { size?: number }) => (
  <span
    className="inline-flex items-center justify-center rounded-full shrink-0"
    style={{ width: size, height: size, background: C.mint }}
    aria-hidden
  >
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5L6.5 12L13 4.5" stroke="#0a1335" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const PillButton = ({
  children,
  filled = true,
  href = "#",
  className = "",
}: {
  children: React.ReactNode;
  filled?: boolean;
  href?: string;
  className?: string;
}) => (
  <a
    href={href}
    className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-heebo font-semibold transition-all hover:-translate-y-0.5 ${className}`}
    style={
      filled
        ? { background: C.mint, color: C.ink }
        : { background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.5)" }
    }
  >
    {children}
  </a>
);

/* ----------------------------- 1. NAV ----------------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      dir="rtl"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.04)]" : ""
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <Wordmark light={!scrolled} className="text-[15px] md:text-[16px]" />
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-heebo font-medium" style={{ color: scrolled ? C.ink : "#fff" }}>
          <a href="#expertise" className="hover:opacity-70 transition-opacity">מומחיות</a>
          <a href="#projects" className="hover:opacity-70 transition-opacity">פרויקטים</a>
          <a href="#knowledge" className="hover:opacity-70 transition-opacity">מרכז ידע</a>
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-full px-4 md:px-5 py-2 md:py-2.5 text-[13px] md:text-[14px] font-heebo font-semibold"
          style={{ background: C.mint, color: C.ink }}
        >
          צרו קשר
          <span aria-hidden>←</span>
        </a>
      </div>
    </header>
  );
}

/* ----------------------------- 2. HERO ----------------------------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const HERO_IMG =
    "https://images.unsplash.com/photo-1503387762-cf2253c8f3ca?auto=format&fit=crop&w=2400&q=85";

  return (
    <section ref={ref} dir="rtl" className="relative" style={{ background: C.paper }}>
      {/* photo + scallop clip */}
      <div className="relative w-full" style={{ height: "clamp(560px, 80vh, 820px)" }}>
        <motion.div
          style={{
            y,
            backgroundImage: `linear-gradient(180deg, rgba(10,19,53,0.35) 0%, rgba(10,19,53,0.55) 100%), url("${HERO_IMG}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: "url(#hero-scallop)",
          }}
          className="absolute inset-0"
        />
        {/* SVG defs holding the scallop clip */}
        <svg width="0" height="0" className="absolute" aria-hidden>
          <defs>
            <clipPath id="hero-scallop" clipPathUnits="objectBoundingBox">
              <path d="M0,0 L1,0 L1,0.94 C0.83,1.02 0.66,0.92 0.5,0.96 C0.34,1 0.17,1.02 0,0.94 Z" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* overlapping card */}
      <div className="relative" style={{ marginTop: "clamp(-220px, -22vh, -160px)" }}>
        <div className="max-w-[1320px] mx-auto px-6 md:px-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-[920px] rounded-[28px] bg-white p-8 md:p-14 text-center"
            style={{ boxShadow: "0 30px 80px -20px rgba(10,19,53,0.18), 0 8px 24px -8px rgba(10,19,53,0.08)" }}
          >
            <h1
              className="font-heebo font-black leading-[1.05]"
              style={{
                color: C.royal,
                fontSize: "clamp(32px, 5.6vw, 68px)",
                letterSpacing: "-0.02em",
                fontWeight: 900,
              }}
            >
              הטכנולוגיה שבונה את העתיד
            </h1>
            <p
              className="font-heebo mt-5 md:mt-7 mx-auto"
              style={{ color: C.ink, fontSize: "clamp(15px, 1.3vw, 18px)", lineHeight: 1.65, maxWidth: 720 }}
            >
              פרו אלגוריתם — בית תוכנה ישראלי פורץ דרך, המפתח פתרונות AI לענפי הנדל"ן, האדריכלות וההנדסה.
              אנחנו הופכים לוגיקה תכנונית מורכבת למערכות אוטונומיות חכמות.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 3. SERVICE STRIP ----------------------------- */
const SERVICES = [
  { title: "תאימות לרגולציה", body: "אוטומציה מלאה להגשות ורגולציה." },
  { title: "הנדסה ב-DNA", body: "מומחיות Native ב-Revit וב-AutoCAD." },
  { title: "Tailor-Made", body: "טכנולוגיה המותאמת ללוגיקת הארגון." },
  { title: "מומחיות ב-GNN", body: "פיצוח לוגיקה מרחבית מורכבת." },
];

function FoldedPaper() {
  return (
    <svg
      width="86"
      height="104"
      viewBox="0 0 86 104"
      className="absolute -top-6 left-2 md:-top-8 md:-left-4 hidden sm:block"
      aria-hidden
      style={{ filter: "drop-shadow(0 12px 24px rgba(10,19,53,0.12))" }}
    >
      <path d="M8 8 H62 L78 24 V96 H8 Z" fill="#fff" stroke={C.rule} strokeWidth="1.2" />
      <path d="M62 8 V24 H78" fill="#fafaf7" stroke={C.rule} strokeWidth="1.2" />
      <line x1="18" y1="42" x2="68" y2="42" stroke={C.rule} strokeWidth="1" />
      <line x1="18" y1="52" x2="64" y2="52" stroke={C.rule} strokeWidth="1" />
      <line x1="18" y1="62" x2="60" y2="62" stroke={C.rule} strokeWidth="1" />
      <rect x="18" y="76" width="20" height="4" rx="1" fill={C.mint} />
    </svg>
  );
}

function ServiceStrip() {
  return (
    <section id="expertise" dir="rtl" className="relative py-20 md:py-28" style={{ background: C.paper }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 relative">
        <FoldedPaper />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col gap-4"
            >
              <MintCheck />
              <h3 className="font-heebo font-bold text-[20px] md:text-[22px]" style={{ color: C.ink, letterSpacing: "-0.01em" }}>
                {s.title}
              </h3>
              <p className="font-heebo text-[14px] md:text-[15px] leading-[1.6]" style={{ color: C.mute }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 4. FEATURED SOLUTION ----------------------------- */
function RevitMock() {
  return (
    <svg viewBox="0 0 600 400" className="w-full h-full block" preserveAspectRatio="xMidYMid slice">
      <rect width="600" height="400" fill="#f4f6fa" />
      {/* toolbar */}
      <rect x="0" y="0" width="600" height="28" fill="#1f2a44" />
      <circle cx="14" cy="14" r="4" fill="#ff6b6b" />
      <circle cx="28" cy="14" r="4" fill="#ffd166" />
      <circle cx="42" cy="14" r="4" fill="#5fd0a6" />
      <rect x="70" y="8" width="60" height="12" rx="2" fill="#374561" />
      <rect x="140" y="8" width="50" height="12" rx="2" fill="#374561" />
      <rect x="200" y="8" width="40" height="12" rx="2" fill="#374561" />
      {/* secondary toolbar */}
      <rect x="0" y="28" width="600" height="22" fill="#e3e7ef" />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} x={10 + i * 20} y={34} width="14" height="10" rx="1.5" fill="#9aa5bd" />
      ))}
      {/* tree pane */}
      <rect x="0" y="50" width="120" height="350" fill="#fbfcfe" />
      {Array.from({ length: 9 }).map((_, i) => (
        <g key={i}>
          <rect x="10" y={60 + i * 22} width="8" height="8" fill="#5fd0a6" opacity={i % 3 === 0 ? 1 : 0.4} />
          <rect x="22" y={62 + i * 22} width={70 - (i % 3) * 12} height="4" rx="1" fill="#9aa5bd" />
        </g>
      ))}
      {/* viewport floor plan */}
      <rect x="120" y="50" width="480" height="350" fill="#eef1f7" />
      {/* grid */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={`v${i}`} x1={140 + i * 38} y1="60" x2={140 + i * 38} y2="390" stroke="#d6dce8" strokeWidth="0.5" />
      ))}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`h${i}`} x1="130" y1={70 + i * 38} x2="590" y2={70 + i * 38} stroke="#d6dce8" strokeWidth="0.5" />
      ))}
      {/* building plan outline */}
      <g stroke={C.royal} strokeWidth="1.6" fill="none">
        <rect x="180" y="100" width="320" height="200" />
        <rect x="180" y="100" width="160" height="100" />
        <rect x="340" y="100" width="160" height="100" />
        <rect x="180" y="200" width="160" height="100" />
        <rect x="340" y="200" width="160" height="100" />
        <line x1="260" y1="100" x2="260" y2="200" />
        <line x1="420" y1="100" x2="420" y2="200" />
        <line x1="260" y1="200" x2="260" y2="300" />
        <line x1="420" y1="200" x2="420" y2="300" />
        <line x1="180" y1="150" x2="340" y2="150" />
        <line x1="340" y1="150" x2="500" y2="150" />
        <line x1="180" y1="250" x2="500" y2="250" />
      </g>
      {/* dimension lines */}
      <g stroke="#5a6175" strokeWidth="0.6" fill="#5a6175" fontSize="8" fontFamily="monospace">
        <line x1="180" y1="86" x2="500" y2="86" />
        <line x1="180" y1="82" x2="180" y2="90" />
        <line x1="500" y1="82" x2="500" y2="90" />
        <text x="334" y="82" textAnchor="middle">32.0 m</text>
      </g>
      {/* node markers */}
      {[
        [180, 100],
        [340, 100],
        [500, 100],
        [180, 200],
        [340, 200],
        [500, 200],
        [180, 300],
        [340, 300],
        [500, 300],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={C.royal} />
      ))}
      {/* scale + status strip */}
      <rect x="120" y="380" width="480" height="20" fill="#1f2a44" />
      <text x="135" y="394" fill="#9aa5bd" fontSize="9" fontFamily="monospace">SCALE 1:100  ·  LEVEL 03  ·  GRID A-H / 1-9</text>
    </svg>
  );
}

function FeaturedSolution() {
  return (
    <section id="projects" dir="rtl" className="relative py-16 md:py-24" style={{ background: C.paper }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="mb-8 md:mb-12">
          <h2 className="font-heebo font-black text-[28px] md:text-[42px]" style={{ color: C.ink, letterSpacing: "-0.02em" }}>
            הפתרונות שלנו:
          </h2>
        </div>

        <div className="relative">
          {/* floating accent circle */}
          <div
            className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-16 h-16 md:w-20 md:h-20 rounded-full hidden sm:block"
            style={{ background: C.royal, boxShadow: "0 10px 30px rgba(30,64,255,0.35)" }}
            aria-hidden
          />

          <div
            className="relative rounded-[32px] overflow-hidden"
            style={{ background: C.dark, boxShadow: "0 30px 80px -20px rgba(10,19,53,0.35)" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* mockup */}
              <div className="lg:col-span-7 order-2 lg:order-1 p-6 md:p-10">
                <div className="rounded-2xl overflow-hidden ring-1 ring-white/10" style={{ aspectRatio: "3/2" }}>
                  <RevitMock />
                </div>
              </div>
              {/* copy */}
              <div className="lg:col-span-5 order-1 lg:order-2 p-8 md:p-12 lg:py-14 lg:pr-12 lg:pl-6 flex flex-col justify-center">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: C.mint }}>
                  AI · GNN · CAD
                </span>
                <h3
                  className="font-heebo font-black mt-4 text-[24px] md:text-[32px] leading-[1.15]"
                  style={{ color: "#fff", letterSpacing: "-0.015em" }}
                >
                  פיתוח מודלי AI ורשתות נוירונים (GNN) מותאמים אישית
                </h3>
                <p className="font-heebo mt-5 text-[14px] md:text-[15px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.72)" }}>
                  אנחנו בונים מודלים ייעודיים שפוצחים את הלוגיקה המרחבית של פרויקטים מורכבים — מתוכניות
                  אדריכלות ועד מערכות MEP — וממירים אותם לקוד שניתן להריץ.
                </p>
                <div className="flex flex-wrap gap-2 mt-7">
                  {["Revit GNN", "AutoCAD", "MEP"].map((c) => (
                    <span
                      key={c}
                      className="px-3.5 py-1.5 rounded-full text-[12px] font-heebo font-semibold"
                      style={{ background: "rgba(95,208,166,0.18)", color: C.mint, border: "1px solid rgba(95,208,166,0.4)" }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 5. STATS ----------------------------- */
const STATS = [
  {
    num: "+24,000",
    label: "שרטוטים אדריכליים שעברו תחת ידינו",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="5" y="5" width="26" height="26" rx="2" stroke={C.ink} strokeWidth="1.4" />
        <path d="M5 12h26M12 5v26" stroke={C.ink} strokeWidth="1.4" />
        <rect x="14" y="14" width="6" height="6" fill={C.mint} />
      </svg>
    ),
  },
  {
    num: "+8,000",
    label: "בניינים שלקחנו חלק בתכנונם",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M6 30V14l8-6 8 6v16M22 30V18l8-4v16" stroke={C.ink} strokeWidth="1.4" strokeLinejoin="round" />
        <rect x="10" y="20" width="3" height="3" fill={C.mint} />
        <rect x="15" y="20" width="3" height="3" fill={C.mint} />
      </svg>
    ),
  },
  {
    num: '+50,000 מ"ר',
    label: "קומות משרדים שתוכננו ומוטבו ב-AI",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M4 30h28M8 30V10h6v20M18 30V6h6v24M28 30V16h2" stroke={C.ink} strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="11" cy="14" r="1.5" fill={C.mint} />
        <circle cx="21" cy="10" r="1.5" fill={C.mint} />
      </svg>
    ),
  },
];

function Stats() {
  return (
    <section dir="rtl" className="relative py-20 md:py-28" style={{ background: C.soft }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-start text-right"
            >
              <div className="mb-5">{s.icon}</div>
              <div
                className="font-heebo font-black leading-none"
                style={{ color: C.royal, fontSize: "clamp(40px, 5.5vw, 76px)", letterSpacing: "-0.03em" }}
              >
                {s.num}
              </div>
              <div className="font-heebo mt-4 text-[15px] md:text-[16px] leading-[1.5] font-semibold" style={{ color: C.ink }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 6. ISOMETRIC BLUEPRINT ----------------------------- */
function Blueprint() {
  // build a row of axonometric "buildings" with blue strokes
  const towers = [
    { x: 60, base: 40, h: 110, w: 36, d: 22, dome: false },
    { x: 120, base: 40, h: 70, w: 30, d: 20, dome: false },
    { x: 180, base: 40, h: 150, w: 38, d: 24, dome: true },
    { x: 250, base: 40, h: 100, w: 34, d: 22, dome: false },
    { x: 310, base: 40, h: 200, w: 42, d: 26, dome: false },
    { x: 380, base: 40, h: 90, w: 30, d: 20, dome: false },
    { x: 440, base: 40, h: 130, w: 36, d: 22, dome: false },
    { x: 500, base: 40, h: 80, w: 28, d: 18, dome: false },
    { x: 560, base: 40, h: 170, w: 40, d: 24, dome: false },
    { x: 630, base: 40, h: 110, w: 32, d: 20, dome: false },
    { x: 690, base: 40, h: 150, w: 36, d: 22, dome: false },
    { x: 760, base: 40, h: 90, w: 30, d: 20, dome: false },
    { x: 820, base: 40, h: 220, w: 44, d: 28, dome: false },
    { x: 900, base: 40, h: 130, w: 34, d: 22, dome: false },
    { x: 960, base: 40, h: 170, w: 38, d: 24, dome: false },
    { x: 1030, base: 40, h: 100, w: 30, d: 20, dome: false },
    { x: 1090, base: 40, h: 140, w: 36, d: 22, dome: false },
    { x: 1160, base: 40, h: 80, w: 28, d: 18, dome: false },
  ];

  // axonometric — depth offset
  const axo = (x: number, y: number, d: number) => ({ x: x + d, y: y - d * 0.55 });

  return (
    <section dir="rtl" className="relative py-20 md:py-28" style={{ background: C.paper }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="mb-8 max-w-[720px]">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: C.mute }}>
            BLUEPRINT · TLV
          </span>
          <h2
            className="font-heebo font-black mt-3 text-[26px] md:text-[40px] leading-[1.1]"
            style={{ color: C.ink, letterSpacing: "-0.02em" }}
          >
            מתוך תיק הפרויקטים שלנו
          </h2>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden border"
          style={{ borderColor: C.rule, background: "#fdfdfb" }}
        >
          {/* faint blueprint grid */}
          <div
            className="absolute inset-0 opacity-[0.4] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #c9d6f2 1px, transparent 1px), linear-gradient(to bottom, #c9d6f2 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <svg viewBox="0 0 1240 360" className="relative w-full h-auto block" preserveAspectRatio="xMidYMid meet">
            {/* ground line */}
            <line x1="20" y1="305" x2="1220" y2="305" stroke={C.royal} strokeWidth="1" />
            {/* horizon hint */}
            <line x1="20" y1="40" x2="1220" y2="40" stroke="#bcd0f5" strokeWidth="0.6" strokeDasharray="2 4" />

            {towers.map((t, i) => {
              const top = 305 - t.h;
              const right = t.x + t.w;
              const bRight = axo(right, 305, t.d);
              const tRight = axo(right, top, t.d);
              const tLeft = axo(t.x, top, t.d);
              return (
                <g key={i} stroke={C.royal} strokeWidth="1" fill="none" strokeLinejoin="round">
                  {/* front face */}
                  <rect x={t.x} y={top} width={t.w} height={t.h} />
                  {/* side face */}
                  <polygon points={`${right},${top} ${tRight.x},${tRight.y} ${bRight.x},${bRight.y} ${right},${305}`} />
                  {/* top face */}
                  <polygon points={`${t.x},${top} ${right},${top} ${tRight.x},${tRight.y} ${tLeft.x},${tLeft.y}`} />
                  {/* window grid front */}
                  {Array.from({ length: Math.floor(t.h / 14) }).map((_, r) =>
                    Array.from({ length: Math.floor(t.w / 8) }).map((__, c) => (
                      <rect
                        key={`${r}-${c}`}
                        x={t.x + 2 + c * 8}
                        y={top + 4 + r * 14}
                        width="5"
                        height="9"
                        stroke={C.royal}
                        strokeWidth="0.4"
                      />
                    ))
                  )}
                  {/* dome */}
                  {t.dome && (
                    <>
                      <ellipse cx={t.x + t.w / 2} cy={top} rx={t.w / 2} ry={6} fill={C.mint} stroke={C.mintDeep} strokeWidth="0.8" />
                      <line x1={t.x + t.w / 2} y1={top - 12} x2={t.x + t.w / 2} y2={top - 4} stroke={C.royal} strokeWidth="0.8" />
                      <circle cx={t.x + t.w / 2} cy={top - 14} r="1.5" fill={C.royal} />
                    </>
                  )}
                </g>
              );
            })}

            {/* numbered call-outs */}
            {[
              { n: "①", x: 198, y: 130 },
              { n: "②", x: 330, y: 80 },
              { n: "③", x: 580, y: 110 },
              { n: "④", x: 840, y: 60 },
              { n: "⑤", x: 980, y: 100 },
            ].map((c) => (
              <g key={c.n}>
                <line x1={c.x} y1={c.y + 10} x2={c.x} y2={c.y + 40} stroke={C.royal} strokeWidth="0.6" strokeDasharray="2 2" />
                <circle cx={c.x} cy={c.y} r="11" fill="#fff" stroke={C.royal} strokeWidth="1" />
                <text x={c.x} y={c.y + 4} textAnchor="middle" fontSize="13" fill={C.royal} fontFamily="serif">
                  {c.n}
                </text>
              </g>
            ))}

            {/* US BANK TOWER CROWN DETAIL inset */}
            <g transform="translate(990, 150)">
              <rect x="0" y="0" width="220" height="120" fill="#fff" stroke={C.royal} strokeWidth="0.8" />
              <text x="10" y="16" fontSize="9" fontFamily="monospace" fill={C.ink} letterSpacing="2">
                US BANK TOWER · CROWN DETAIL
              </text>
              <line x1="10" y1="22" x2="210" y2="22" stroke={C.rule} strokeWidth="0.6" />
              {/* mini elevation */}
              <g stroke={C.royal} strokeWidth="0.8" fill="none" transform="translate(70,30)">
                <rect x="0" y="40" width="80" height="50" />
                <polygon points="0,40 40,10 80,40" />
                <line x1="40" y1="10" x2="40" y2="0" />
                <circle cx="40" cy="-2" r="2" fill={C.royal} />
                <line x1="10" y1="50" x2="70" y2="50" />
                <line x1="10" y1="60" x2="70" y2="60" />
                <line x1="10" y1="70" x2="70" y2="70" />
                <line x1="10" y1="80" x2="70" y2="80" />
              </g>
              <text x="10" y="108" fontSize="7" fontFamily="monospace" fill={C.mute}>
                SCALE 1:500 · ELEVATION N
              </text>
            </g>

            {/* graphic scale ruler bottom-right */}
            <g transform="translate(900, 320)">
              <rect x="0" y="0" width="200" height="6" fill="none" stroke={C.royal} strokeWidth="0.8" />
              {Array.from({ length: 8 }).map((_, i) => (
                <rect key={i} x={i * 25} y="0" width="25" height="6" fill={i % 2 === 0 ? C.royal : "#fff"} stroke={C.royal} strokeWidth="0.4" />
              ))}
              {[0, 25, 50, 75, 100].map((m, i) => (
                <text key={i} x={i * 50} y="20" fontSize="7" fontFamily="monospace" fill={C.mute} textAnchor="middle">
                  {m}m
                </text>
              ))}
            </g>

            {/* north arrow / compass */}
            <g transform="translate(60, 60)">
              <circle cx="0" cy="0" r="22" fill="#fff" stroke={C.royal} strokeWidth="0.8" />
              <polygon points="0,-18 6,4 0,0 -6,4" fill={C.royal} />
              <polygon points="0,18 6,-4 0,0 -6,-4" fill="none" stroke={C.royal} strokeWidth="0.6" />
              <text x="0" y="-26" fontSize="9" fontFamily="monospace" fill={C.royal} textAnchor="middle">N</text>
              <line x1="-22" y1="0" x2="22" y2="0" stroke={C.royal} strokeWidth="0.4" />
              <line x1="0" y1="-22" x2="0" y2="22" stroke={C.royal} strokeWidth="0.4" />
            </g>
          </svg>

          <div className="px-4 md:px-6 py-3 border-t flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em]" style={{ borderColor: C.rule, color: C.mute }}>
            <span dir="ltr">DWG · 2026.04 · REV 03</span>
            <span>מתוך תיק הפרויקטים — TLV CBD, 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 7. PODCAST ----------------------------- */
const EPISODES = [
  { date: "12.04.2026", title: "מה קורה כשהמודל מבין קונסטרוקציה" },
  { date: "28.03.2026", title: "בין IFC ל-LLM — שפה משותפת לבנייה" },
  { date: "07.03.2026", title: "המגדל החכם הראשון בישראל — מאחורי הקלעים" },
];

function Podcast() {
  const PHOTO =
    "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=1200&q=80";
  return (
    <section id="knowledge" dir="rtl" className="relative py-20 md:py-28" style={{ background: C.soft }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="mb-10 md:mb-14 max-w-[760px]">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: C.mute }}>
            PODCAST
          </span>
          <h2 className="font-heebo font-black mt-3 text-[28px] md:text-[42px] leading-[1.1]" style={{ color: C.ink, letterSpacing: "-0.02em" }}>
            פודקאסט · מדברים אלגוריתמים ונדל"ן
          </h2>
          <p className="font-heebo mt-4 text-[15px] md:text-[16px] leading-[1.65]" style={{ color: C.mute }}>
            שיחות עומק עם מנהלי הנדסה, אדריכלים ומפתחי AI על איפה הטכנולוגיה פוגשת את הבטון.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* featured */}
          <motion.a
            href="#"
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 group relative block rounded-[24px] overflow-hidden"
            style={{ background: C.dark, boxShadow: "0 20px 50px -20px rgba(10,19,53,0.25)" }}
          >
            <div className="relative" style={{ aspectRatio: "16/10" }}>
              <img
                src={PHOTO}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,19,53,0.05) 0%, rgba(10,19,53,0.85) 100%)" }} />
              <div className="absolute top-5 right-5">
                <span
                  className="px-3 py-1 rounded-full text-[11px] font-heebo font-bold"
                  style={{ background: C.mint, color: C.ink }}
                >
                  פרק חדש
                </span>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase mb-3" style={{ color: "rgba(255,255,255,0.7)" }}>
                  EP 14 · 25.04.2026
                </div>
                <h3 className="font-heebo font-black text-[22px] md:text-[34px] leading-[1.15] text-white" style={{ letterSpacing: "-0.015em" }}>
                  איך הבינה המלאכותית משנה את חוקי המשחק
                </h3>
              </div>
            </div>
          </motion.a>

          {/* stack */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {EPISODES.map((e, i) => (
              <motion.a
                key={e.title}
                href="#"
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group block rounded-2xl p-5 md:p-6 transition-colors hover:bg-[#0f1a45]"
                style={{ background: C.dark }}
              >
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: C.mint }}>
                  EP {13 - i} · {e.date}
                </div>
                <div className="font-heebo font-bold text-[16px] md:text-[18px] leading-[1.35] text-white">
                  {e.title}
                </div>
                <div className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-mono uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <span>LISTEN</span>
                  <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-10 md:mt-12">
          <PillButton filled href="#" className="!text-[13px]">
            צפייה בכל הפרקים ביוטיוב
            <span aria-hidden>←</span>
          </PillButton>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 8. PRESS ----------------------------- */
const PRESS = [
  {
    outlet: "mako",
    color: "#e10a17",
    quote: "הסטארטאפ הישראלי שמלמד את הבינה המלאכותית",
    highlight: "לתכנן בניינים",
  },
  {
    outlet: "calcalist",
    color: "#003f7d",
    quote: "פרו אלגוריתם גייסה כדי להפוך את ה-AI ל",
    highlight: "אדריכל הראשי",
  },
  {
    outlet: "globes",
    color: "#0a0a0a",
    quote: "המוח האלגוריתמי מאחורי",
    highlight: "מגדלי המשרדים החדשים",
  },
  {
    outlet: "ynet",
    color: "#ed1c24",
    quote: "כך נראית הנדל\"ן של 2030 — ",
    highlight: "פחות שרטוטים, יותר מודלים",
  },
];

function Press() {
  const rot = ["-rotate-1", "rotate-1", "-rotate-1", "rotate-1"];
  return (
    <section dir="rtl" className="relative py-20 md:py-28" style={{ background: C.paper }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="mb-10 max-w-[820px]">
          <h2 className="font-heebo font-black text-[28px] md:text-[42px] leading-[1.1]" style={{ color: C.ink, letterSpacing: "-0.02em" }}>
            תקשורת — AI בעולם האדריכלות
          </h2>
          <p className="font-heebo mt-4 text-[15px] md:text-[16px] leading-[1.65]" style={{ color: C.mute }}>
            8 כתבות בכלי התקשורת המובילים בישראל על AI ועתיד הנדל"ן.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRESS.map((p, i) => (
            <motion.article
              key={p.outlet}
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative p-6 md:p-7 rounded-md md:${rot[i]} transition-transform hover:rotate-0 hover:-translate-y-1`}
              style={{
                background: C.cream,
                boxShadow: "0 10px 24px -10px rgba(10,19,53,0.18), 0 2px 6px rgba(10,19,53,0.06)",
              }}
            >
              <div
                className="font-grotesk font-bold text-[18px] uppercase tracking-[0.05em] mb-5"
                style={{ color: p.color }}
                dir="ltr"
              >
                {p.outlet}
              </div>
              <p className="font-heebo text-[15px] leading-[1.55] font-medium" style={{ color: C.ink }}>
                "{p.quote}{" "}
                <span
                  className="px-1"
                  style={{
                    background: "linear-gradient(180deg, transparent 55%, #ffe66d 55%)",
                  }}
                >
                  {p.highlight}
                </span>
                "
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-1 mt-6 font-heebo font-semibold text-[13px] hover:underline"
                style={{ color: C.royal }}
              >
                לכתבה המלאה
                <span aria-hidden>←</span>
              </a>
            </motion.article>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 mt-10">
          <button
            aria-label="הקודם"
            className="w-11 h-11 rounded-full border flex items-center justify-center transition-colors hover:bg-[#0a1335] hover:text-white"
            style={{ borderColor: C.rule, color: C.ink }}
          >
            ←
          </button>
          <button
            aria-label="הבא"
            className="w-11 h-11 rounded-full border flex items-center justify-center transition-colors hover:bg-[#0a1335] hover:text-white"
            style={{ borderColor: C.rule, color: C.ink }}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 9. FINAL CTA ----------------------------- */
function FinalCTA() {
  return (
    <section id="contact" dir="rtl" className="relative pt-10 pb-20 md:pt-16 md:pb-28" style={{ background: C.paper }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[40px] md:rounded-[48px] px-6 py-16 md:px-12 md:py-24 text-center overflow-hidden"
          style={{ background: C.dark, boxShadow: "0 40px 100px -30px rgba(10,19,53,0.45)" }}
        >
          {/* faint backdrop dots */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ background: C.mint }} />
              <Wordmark light className="text-[12px] md:text-[13px]" />
            </div>

            <p
              className="font-heebo mt-8 text-[14px] md:text-[16px]"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              רוצים לשמוע עוד על הפתרונות שלנו?
            </p>

            <h2
              className="font-heebo font-black mt-4 leading-[0.95]"
              style={{
                color: "#fff",
                fontSize: "clamp(48px, 9vw, 128px)",
                letterSpacing: "-0.04em",
                fontWeight: 900,
              }}
            >
              צרו איתנו קשר
            </h2>

            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <PillButton filled={false} href="mailto:hello@proalgorithm.io" className="!px-6 !py-3 !text-[15px]">
                <span aria-hidden>✉</span>
                שלחו לנו מייל
              </PillButton>
              <PillButton filled href="#" className="!px-6 !py-3 !text-[15px]">
                <span aria-hidden>💬</span>
                דברו עם המנהלים שלנו
              </PillButton>
            </div>

            <div className="mt-12 md:mt-16 flex items-center justify-center gap-5">
              {[
                {
                  name: "Instagram",
                  d: "M16 3H8a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5zm-4 13a4 4 0 110-8 4 4 0 010 8zm5-9a1 1 0 110-2 1 1 0 010 2z",
                },
                {
                  name: "Facebook",
                  d: "M14 22v-8h3l1-4h-4V7.5C14 6.7 14.5 6 15.5 6H18V2h-3c-2.8 0-5 2.2-5 5v3H7v4h3v8h4z",
                },
                {
                  name: "LinkedIn",
                  d: "M4 4h4v4H4V4zm0 6h4v12H4V10zm6 0h4v2c.7-1.2 2-2.3 4-2.3 4 0 5 2.6 5 6V22h-4v-5.6c0-1.6-.6-2.7-2.1-2.7s-2.4 1-2.4 2.7V22h-4V10z",
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[#5fd0a6]"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>

            <p className="mt-10 font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
              © 2026 Pro Algorithm. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------------- 10. FOOTER ----------------------------- */
function Footer() {
  return (
    <footer dir="rtl" className="border-t" style={{ background: C.paper, borderColor: C.rule }}>
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Wordmark className="text-[13px]" />
        <div className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: C.mute }}>
          © 2026 · TEL AVIV · MADE WITH ALGORITHMS
        </div>
        <div className="flex items-center gap-3" dir="ltr">
          {["IG", "FB", "IN"].map((s) => (
            <a
              key={s}
              href="#"
              className="w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-mono tracking-[0.1em]"
              style={{ borderColor: C.rule, color: C.ink }}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ============================== ROOT ============================== */
export default function Minimal() {
  return (
    <main className="relative" style={{ background: C.paper, color: C.ink, fontFamily: "Heebo, Inter, system-ui, sans-serif" }}>
      <Nav />
      <Hero />
      <ServiceStrip />
      <FeaturedSolution />
      <Stats />
      <Blueprint />
      <Podcast />
      <Press />
      <FinalCTA />
      <Footer />
    </main>
  );
}
