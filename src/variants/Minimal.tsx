/**
 * Variant 02 — "Architectural Minimalism"
 * Pro Algorithm — landing page
 *
 * Reference points: zaha-hadid.com, Dieter Rams, Apple Vision Pro page,
 * MUJI, SANAA studio. Brutally minimal, hairline rules, paper depth, one accent.
 */

import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  brand,
  scenes,
  stats,
  products,
  partners,
  testimonials,
  team,
} from "../data";

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------- design tokens ----------------------------- */
const PAPER = "#fafaf7";
const INK = "#0a0a0a";
const GRAY = "#737373";
const RULE = "#d4d4d4";
const ACCENT = "#0040ff"; // existing — kept
const ROYAL = "#1e40ff"; // Figma — bright headline blue
const MINT = "#5fd0a6"; // Figma — CTA mint
const NAVY = "#0a1335"; // Figma — deep navy for dark cards
const CREAM = "#f3e8d6"; // Figma — press article paper

/* ----------------------------- Figma copy ----------------------------- */
const figmaCopy = {
  heroTitle: "הטכנולוגיה שבונה את העתיד",
  heroBody:
    'פרו אלגוריתם — בית תוכנה ישראלי פורץ דרך, המפתח פתרונות AI לענפי הנדל״ן, האדריכלות וההנדסה. אנחנו הופכים לוגיקה תכנונית מורכבת למערכות אוטונומיות חכמות.',
  services: [
    { title: "תאימות לרגולציה", body: "אוטומציה מלאה להגשות ורגולציה." },
    { title: "הנדסה ב-DNA", body: "מומחיות Native ב-Revit וב-AutoCAD." },
    { title: "Tailor-Made", body: "טכנולוגיה המותאמת ללוגיקת הארגון." },
    { title: "מומחיות ב-GNN", body: "פיצוח לוגיקה מרחבית מורכבת." },
  ],
  figmaStats: [
    { value: "+24,000", unit: "", label: "שרטוטים אדריכליים", desc: "שעברו תחת ידינו" },
    { value: "+8,000", unit: "", label: "בניינים", desc: "שלקחנו חלק בתכנונם" },
    { value: "+50,000", unit: 'מ"ר', label: "קומות משרדים", desc: "שתוכננו ומוטבו ב-AI" },
  ],
  podcastTitle: "פודקאסט",
  podcastSubtitle: 'מדברים אלגוריתמים ונדל״ן',
  podcastBody:
    "שיחות עומק עם מנהלי הנדסה, אדריכלים ומפתחי AI על איפה הטכנולוגיה פוגשת את הבטון.",
  podcastFeatured: {
    tag: "פרק חדש",
    date: "04 ינואר 2026",
    title: "איך הבינה המלאכותית משנה את חוקי המשחק",
    image:
      "https://images.unsplash.com/photo-1573497019418-b400bb3ab074?auto=format&fit=crop&w=1200&q=80",
  },
  podcastEpisodes: [
    { date: "21 דצמבר 2025", title: "GNN ב-Revit — מתחת למכסה המנוע" },
    { date: "07 דצמבר 2025", title: "מהאדריכל לאוטומציה: לאן הולכים?" },
    { date: "16 נובמבר 2025", title: "אסטרטגיית AI בחברת בנייה גדולה" },
  ],
  pressTitle: "תקשורת",
  pressSubtitle: "AI בעולם האדריכלות",
  pressBody:
    'שמונה כתבות בכלי התקשורת המובילים בישראל על AI ועתיד הנדל״ן.',
  pressArticles: [
    { outlet: "mako", color: "#df0a1c", quote: "התעשייה לא תהיה אותו דבר", highlight: "התעשייה" },
    { outlet: "Calcalist", color: "#000", quote: "Pro Algorithm פותחים פרק חדש", highlight: "פרק חדש" },
    { outlet: "Globes", color: "#1f4f9b", quote: "מהפכה שקטה במשרדי האדריכלים", highlight: "מהפכה שקטה" },
    { outlet: "ynet", color: "#e22219", quote: "מי שלא יאמץ AI — יישאר מאחור", highlight: "יישאר מאחור" },
  ],
  finalEyebrow: "רוצים לשמוע עוד על הפתרונות שלנו?",
  finalTitle: "צרו איתנו קשר",
  ctaPrimary: "💬 דברו עם המנהלים שלנו",
  ctaSecondary: "✉ שלחו לנו מייל",
};

/* ----------------------------- tiny atoms ----------------------------- */
const Hair = ({ className = "" }: { className?: string }) => (
  <div className={`h-px w-full bg-[#d4d4d4] ${className}`} />
);

const Mono = ({ children, className = "", dir }: { children: React.ReactNode; className?: string; dir?: "ltr" | "rtl" }) => (
  <span dir={dir} className={`font-mono text-[10px] tracking-[0.18em] uppercase ${className}`}>{children}</span>
);

/* ----------------------------- top frame ----------------------------- */
function TopFrame() {
  const [t, setT] = useState("");
  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = String(d.getUTCHours()).padStart(2, "0");
      const m = String(d.getUTCMinutes()).padStart(2, "0");
      setT(`${h}:${m} GMT`);
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none bg-[#fafaf7]/80 backdrop-blur-md border-b border-[#d4d4d4]/40" dir="ltr">
      <div className="px-6 md:px-10 py-4 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-[#0a0a0a]">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="font-serif text-[15px] tracking-[0.02em] normal-case">Pro Algorithm</span>
            <span className="text-[#737373]">/</span>
            <span>Est. {brand.est}</span>
          </div>
          <span className="text-[#737373]">{brand.city} · 32.0853N · 34.7818E</span>
        </div>

        <div className="hidden md:flex items-center gap-8 pointer-events-auto">
          <a href="#scene-01" className="hover:text-[#0040ff] transition-colors">01 — City</a>
          <a href="#scene-02" className="hover:text-[#0040ff] transition-colors">02 — Project</a>
          <a href="#scene-03" className="hover:text-[#0040ff] transition-colors">03 — Plans</a>
          <a href="#scene-04" className="hover:text-[#0040ff] transition-colors">04 — CAD</a>
          <a href="#scene-05" className="hover:text-[#0040ff] transition-colors">05 — AI</a>
        </div>

        <div className="flex flex-col items-end gap-1 pointer-events-auto">
          <span>{t || "—— GMT"}</span>
          <span className="text-[#737373]">v.02 / minimal</span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- scroll progress dot ----------------------------- */
function ScrollIndex() {
  const { scrollYProgress } = useScroll();
  const [pct, setPct] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setPct(Math.round(v * 100)));
  return (
    <div className="fixed bottom-6 left-6 md:left-10 z-50 font-mono text-[10px] tracking-[0.2em] uppercase text-[#0a0a0a]" dir="ltr">
      <div className="flex items-center gap-3">
        <span>{String(pct).padStart(3, "0")}</span>
        <div className="w-32 h-px bg-[#d4d4d4] relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-[#0a0a0a]"
            style={{ width: `${pct}%`, height: "1px" }}
          />
        </div>
        <span className="text-[#737373]">SECTION INDEX</span>
      </div>
    </div>
  );
}

/* ============================== SCENE 01 — HERO / CITY ============================== */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yCity = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} id="scene-01" className="relative min-h-[100svh] overflow-hidden" dir="rtl">
      {/* huge cream background grid — almost imperceptible */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0a0a0a 1px, transparent 1px), linear-gradient(to bottom, #0a0a0a 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      <motion.div style={{ opacity }} className="relative z-10">
        <div className="pt-32 md:pt-36 px-6 md:px-10">
          <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.3em] uppercase text-[#737373] mb-10">
            <span>{scenes[0].eyebrow}</span>
            <span dir="ltr">PRO ALGORITHM · TLV · EST. 2024</span>
          </div>

          <motion.h1 style={{ y: yTitle }} className="text-[#0a0a0a]">
            <span className="block font-heebo font-black tracking-[-0.04em] text-[clamp(56px,11vw,180px)] leading-[0.86]">
              {figmaCopy.heroTitle.split(" ").slice(0, -2).join(" ")}
            </span>
            <span className="block font-heebo font-black tracking-[-0.04em] text-[clamp(56px,11vw,180px)] leading-[0.86]" style={{ color: ROYAL }}>
              {figmaCopy.heroTitle.split(" ").slice(-2).join(" ")}.
            </span>
          </motion.h1>

          <div className="mt-12 grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7 lg:col-span-6">
              <p className="font-heebo text-[16px] md:text-[18px] leading-[1.7] text-[#0a0a0a] max-w-[44ch]">
                {figmaCopy.heroBody}
              </p>
              <div className="mt-7 flex items-center gap-3">
                <a href="#cta" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-heebo font-medium" style={{ background: NAVY, color: PAPER }}>
                  קבע שיחת ייעוץ <span aria-hidden>←</span>
                </a>
                <a href="#scene-02" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-heebo font-medium border border-[#0a0a0a]/25">
                  ראה איך זה עובד
                </a>
              </div>
            </div>

            <div className="hidden md:block md:col-span-5 lg:col-span-6" dir="ltr">
              <div className="border-t border-[#0a0a0a]/25 pt-4 grid grid-cols-2 gap-x-6 gap-y-2">
                <Row k="DOC" v="PA-LP-02-MIN" />
                <Row k="ISSUED" v="03 MAY 2026" />
                <Row k="CLIENT" v="Pro Algorithm Ltd." />
                <Row k="LOCATION" v="Tel Aviv, IL" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-[#0a0a0a]/25 pt-4" dir="ltr">
                <Mini value="240k+" label="Plans" />
                <Mini value="14" label="Studios" />
                <Mini value="98%" label="Sat." />
              </div>
            </div>
          </div>
        </div>

        {/* The exploded axonometric city — pure SVG */}
        <motion.div style={{ y: yCity }} className="px-6 md:px-10 mt-20 md:mt-28">
          <div className="flex items-baseline justify-between mb-3" dir="ltr">
            <Mono className="text-[#737373]">FIG. 01 — TLV CBD · ISO PROJECTION</Mono>
            <Mono className="text-[#737373]">SCALE 1:8000 · 14 BUILDING SITES ACTIVE</Mono>
          </div>
          <SVGCity />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-4 font-mono text-[10px] tracking-[0.18em] uppercase">
      <span className="text-[#737373] w-24 shrink-0">{k}</span>
      <span className="flex-1 border-b border-dotted border-[#d4d4d4] translate-y-[-3px]" />
      <span className="text-[#0a0a0a]">{v}</span>
    </div>
  );
}

function Mini({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-heebo font-black text-[clamp(20px,2.4vw,32px)] tracking-[-0.02em]" style={{ color: ROYAL }}>
        {value}
      </div>
      <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#737373] mt-1">{label}</div>
    </div>
  );
}

/* ----------------------- SVG axonometric city ----------------------- */
function SVGCity() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const paths = ref.current.querySelectorAll<SVGPathElement>("[data-stroke]");
    paths.forEach((p) => {
      try {
        const len = (p as any).getTotalLength ? p.getTotalLength() : 0;
        if (len) {
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = `${len}`;
        }
      } catch {}
    });
    const ctx = gsap.context(() => {
      gsap.to("[data-stroke]", {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.018,
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // simple isometric building factory
  const buildings = [
    { x: 80, y: 280, w: 70, h: 110 },
    { x: 170, y: 240, w: 90, h: 150 },
    { x: 290, y: 200, w: 60, h: 190 },
    { x: 380, y: 260, w: 80, h: 130 },
    { x: 490, y: 180, w: 100, h: 210 },
    { x: 620, y: 230, w: 70, h: 160 },
    { x: 720, y: 260, w: 90, h: 130 },
    { x: 850, y: 210, w: 80, h: 180 },
    { x: 960, y: 250, w: 70, h: 140 },
    { x: 1060, y: 200, w: 90, h: 190 },
  ];

  const ISO = 0.5;

  return (
    <svg
      ref={ref}
      viewBox="0 0 1240 460"
      className="w-full h-auto"
      stroke={INK}
      strokeWidth={1}
      fill="none"
    >
      {/* ground line */}
      <line x1="0" y1="400" x2="1240" y2="400" stroke={INK} strokeWidth="1.5" data-stroke />
      <line x1="0" y1="410" x2="1240" y2="410" stroke={"#737373"} strokeWidth="0.8" strokeDasharray="2 4" data-stroke />

      <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill={GRAY} stroke="none">
        <text x="6" y="445">X — LONGITUDE 34.7818</text>
        <text x="1100" y="445">Y — LATITUDE 32.0853</text>
      </g>

      {buildings.map((b, i) => {
        const depth = 22;
        const top = b.y;
        return (
          <g key={i} stroke={INK}>
            <path
              data-stroke
              d={`M ${b.x} ${top} L ${b.x + b.w} ${top} L ${b.x + b.w} ${b.y + b.h} L ${b.x} ${b.y + b.h} Z`}
              strokeWidth={i === 4 ? 2 : 1.3}
            />
            <path
              data-stroke
              d={`M ${b.x + b.w} ${top} L ${b.x + b.w + depth} ${top - depth * ISO} L ${b.x + b.w + depth} ${b.y + b.h - depth * ISO} L ${b.x + b.w} ${b.y + b.h} Z`}
              strokeWidth={i === 4 ? 1.6 : 1.1}
            />
            <path
              data-stroke
              d={`M ${b.x} ${top} L ${b.x + b.w} ${top} L ${b.x + b.w + depth} ${top - depth * ISO} L ${b.x + depth} ${top - depth * ISO} Z`}
              strokeWidth={i === 4 ? 1.6 : 1.1}
            />
            {Array.from({ length: Math.floor(b.h / 14) }).map((_, k) => (
              <line
                key={k}
                data-stroke
                x1={b.x}
                y1={top + (k + 1) * 14}
                x2={b.x + b.w}
                y2={top + (k + 1) * 14}
                stroke={"#737373"}
                strokeWidth={0.7}
              />
            ))}
            {i === 4 && (
              <>
                <circle cx={b.x + b.w / 2} cy={top - 18} r="3" fill={ACCENT} stroke="none" />
                <line x1={b.x + b.w / 2} y1={top - 15} x2={b.x + b.w / 2} y2={top} stroke={ACCENT} strokeWidth="0.6" data-stroke />
                <text x={b.x + b.w / 2 + 8} y={top - 16} fontFamily="JetBrains Mono, monospace" fontSize="8" fill={ACCENT} stroke="none">
                  HELIX TOWER · ASHTROM
                </text>
              </>
            )}
          </g>
        );
      })}

      {/* compass */}
      <g transform="translate(60,60)" stroke={INK} fill="none" strokeWidth="0.8">
        <circle cx="0" cy="0" r="22" />
        <line x1="0" y1="-26" x2="0" y2="26" data-stroke />
        <line x1="-26" y1="0" x2="26" y2="0" data-stroke />
        <text x="-3" y="-30" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={INK} stroke="none">N</text>
      </g>

      {/* dimension line */}
      <g stroke={GRAY} strokeWidth="0.6">
        <line x1="80" y1="430" x2="1150" y2="430" data-stroke />
        <line x1="80" y1="425" x2="80" y2="435" data-stroke />
        <line x1="1150" y1="425" x2="1150" y2="435" data-stroke />
        <text x="600" y="425" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={GRAY} stroke="none" textAnchor="middle">
          ├ 14 BUILDING SITES · ALL ACTIVE ┤
        </text>
      </g>
    </svg>
  );
}

/* ============================== SCENE 02 — EXPLODED PROJECT (R3F) ============================== */

function ExplodedBuildingMesh({ progress }: { progress: number }) {
  const refs = useRef<(THREE.Group | null)[]>([]);

  useFrame(() => {
    const offsets = [0, 0.6, 1.2, 1.8, 2.4];
    refs.current.forEach((g, i) => {
      if (!g) return;
      const target = offsets[i] * progress + i * 0.4;
      g.position.y = THREE.MathUtils.lerp(g.position.y, target, 0.1);
      g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, progress * 0.3, 0.05);
    });
  });

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ececea",
        roughness: 0.9,
        metalness: 0,
      }),
    []
  );
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: "#0a0a0a" }), []);

  // pre-build geometries
  const slabGeo = useMemo(() => new THREE.BoxGeometry(3, 0.16, 2.4), []);
  const slabEdges = useMemo(() => new THREE.EdgesGeometry(slabGeo), [slabGeo]);
  const colGeo = useMemo(() => new THREE.BoxGeometry(0.1, 0.45, 0.1), []);
  const colEdges = useMemo(() => new THREE.EdgesGeometry(colGeo), [colGeo]);
  const wallGeoLong = useMemo(() => new THREE.BoxGeometry(3.05, 0.45, 0.05), []);
  const wallEdgesLong = useMemo(() => new THREE.EdgesGeometry(wallGeoLong), [wallGeoLong]);
  const wallGeoShort = useMemo(() => new THREE.BoxGeometry(0.05, 0.45, 2.45), []);
  const wallEdgesShort = useMemo(() => new THREE.EdgesGeometry(wallGeoShort), [wallGeoShort]);
  const roofGeo = useMemo(() => new THREE.BoxGeometry(3.2, 0.08, 2.6), []);
  const roofEdges = useMemo(() => new THREE.EdgesGeometry(roofGeo), [roofGeo]);

  const colPositions: [number, number, number][] = [
    [-1.35, 0, -1.05],
    [1.35, 0, -1.05],
    [-1.35, 0, 1.05],
    [1.35, 0, 1.05],
    [0, 0, 0],
  ];

  const furn: { p: [number, number, number]; s: [number, number, number] }[] = [
    { p: [0.7, 0.05, -0.6], s: [0.7, 0.1, 0.5] },
    { p: [-0.8, 0.05, 0.6], s: [0.5, 0.18, 0.3] },
    { p: [0.4, 0.05, 0.7], s: [0.3, 0.06, 0.3] },
  ];

  return (
    <group rotation={[0, Math.PI * 0.18, 0]}>
      {/* slab */}
      <group ref={(el) => (refs.current[0] = el)}>
        <mesh material={mat} geometry={slabGeo} castShadow receiveShadow />
        <lineSegments geometry={slabEdges} material={lineMat} />
      </group>

      {/* columns */}
      <group ref={(el) => (refs.current[1] = el)}>
        {colPositions.map((p, i) => (
          <group key={i} position={p}>
            <mesh material={mat} geometry={colGeo} castShadow />
            <lineSegments geometry={colEdges} material={lineMat} />
          </group>
        ))}
      </group>

      {/* walls */}
      <group ref={(el) => (refs.current[2] = el)}>
        <group position={[0, 0, -1.18]}>
          <mesh geometry={wallGeoLong} material={mat} />
          <lineSegments geometry={wallEdgesLong} material={lineMat} />
        </group>
        <group position={[0, 0, 1.18]}>
          <mesh geometry={wallGeoLong} material={mat} />
          <lineSegments geometry={wallEdgesLong} material={lineMat} />
        </group>
        <group position={[-1.5, 0, 0]}>
          <mesh geometry={wallGeoShort} material={mat} />
          <lineSegments geometry={wallEdgesShort} material={lineMat} />
        </group>
      </group>

      {/* furniture */}
      <group ref={(el) => (refs.current[3] = el)}>
        {furn.map((f, i) => {
          const g = new THREE.BoxGeometry(f.s[0], f.s[1], f.s[2]);
          const e = new THREE.EdgesGeometry(g);
          return (
            <group key={i} position={f.p}>
              <mesh geometry={g} material={mat} />
              <lineSegments geometry={e} material={lineMat} />
            </group>
          );
        })}
      </group>

      {/* roof */}
      <group ref={(el) => (refs.current[4] = el)}>
        <mesh material={mat} geometry={roofGeo} castShadow />
        <lineSegments geometry={roofEdges} material={lineMat} />
      </group>
    </group>
  );
}

function ExplodedScene({ mobile }: { mobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const explode = useTransform(scrollYProgress, [0.15, 0.75], [0, 1]);
  const [p, setP] = useState(0);
  useMotionValueEvent(explode, "change", (v) => setP(v));

  const labels = [
    { y: "8%", he: "גג", en: "ROOF · PROTECTION" },
    { y: "28%", he: "פנים", en: "INTERIOR · OCCUPANTS" },
    { y: "48%", he: "מעטפת", en: "ENVELOPE · WALLS" },
    { y: "68%", he: "שלד", en: "STRUCTURE · COLUMNS" },
    { y: "88%", he: "יסוד", en: "FOUNDATION · SLAB" },
  ];

  return (
    <section ref={ref} id="scene-02" className="relative" dir="rtl">
      <Hair />
      <div className="grid grid-cols-12 gap-6 px-6 md:px-10 py-12">
        <div className="col-span-12 md:col-span-7">
          <Mono className="text-[#737373]">{scenes[1].eyebrow}</Mono>
          <h2 className="font-heebo font-black tracking-[-0.025em] text-[clamp(40px,6vw,92px)] leading-[0.95] tracking-[-0.02em] text-[#0a0a0a] mt-4">
            {scenes[1].title}
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 md:pt-10">
          <p className="font-sans text-[14px] leading-[1.75] text-[#0a0a0a] max-w-[36ch]">
            {scenes[1].body}
          </p>
          <div className="mt-6 inline-block">
            <Mono className="text-[#737373]">{scenes[1].audience}</Mono>
          </div>
        </div>
      </div>

      <div className="relative h-[140vh]">
        <div className="sticky top-0 h-screen flex">
          <div className="flex-1 relative">
            <Canvas
              dpr={[1, mobile ? 1.2 : 2]}
              camera={{ position: [4.5, 3, 5], fov: 35 }}
              shadows={!mobile}
              gl={{ antialias: true, alpha: true }}
            >
              <color attach="background" args={[PAPER]} />
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[5, 8, 4]}
                intensity={1}
                castShadow={!mobile}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
              />
              <directionalLight position={[-4, 2, -2]} intensity={0.25} />
              <Suspense fallback={null}>
                <ExplodedBuildingMesh progress={p} />
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]} receiveShadow>
                  <planeGeometry args={[14, 14]} />
                  <shadowMaterial transparent opacity={0.12} />
                </mesh>
              </Suspense>
            </Canvas>

            <div className="pointer-events-none absolute inset-0">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <line x1="6%" y1="20%" x2="6%" y2="85%" stroke={GRAY} strokeWidth="0.5" strokeDasharray="2 3" />
                <line x1="3%" y1="20%" x2="9%" y2="20%" stroke={GRAY} strokeWidth="0.5" />
                <line x1="3%" y1="85%" x2="9%" y2="85%" stroke={GRAY} strokeWidth="0.5" />
              </svg>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 origin-center">
                <Mono className="text-[#737373]">EXPLODE FACTOR · {Math.round(p * 100)}%</Mono>
              </div>
            </div>
          </div>

          <div className="hidden md:block w-72 border-l border-[#d4d4d4] relative">
            <div className="absolute inset-0">
              {labels.map((l, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 px-6 transition-all duration-700"
                  style={{ top: l.y, opacity: 0.2 + p * 0.8 }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#737373]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="font-magazine text-[22px] text-[#0a0a0a] leading-tight" dir="rtl">{l.he}</div>
                      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#737373] mt-1">
                        {l.en}
                      </div>
                    </div>
                    {i === 2 && <span className="w-1.5 h-1.5 rounded-full bg-[#0040ff]" />}
                  </div>
                  <div className="h-px bg-[#d4d4d4] mt-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== SCENE 03 — PLANS ============================== */
function PlansScene() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const paths = ref.current!.querySelectorAll<SVGPathElement>("[data-plan-stroke]");
      paths.forEach((p) => {
        try {
          const len = (p as any).getTotalLength ? p.getTotalLength() : 0;
          if (len) {
            p.style.strokeDasharray = `${len}`;
            p.style.strokeDashoffset = `${len}`;
          }
        } catch {}
      });
      gsap.to("[data-plan-stroke]", {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="scene-03" className="relative" dir="rtl">
      <Hair />
      <div className="px-6 md:px-10 py-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Mono className="text-[#737373]">{scenes[2].eyebrow}</Mono>
            <h2 className="font-heebo font-black tracking-[-0.025em] text-[clamp(40px,6vw,92px)] leading-[0.95] tracking-[-0.02em] text-[#0a0a0a] mt-4">
              {scenes[2].title}
            </h2>
            <p className="font-sans text-[14px] leading-[1.75] text-[#0a0a0a] max-w-[40ch] mt-8">
              {scenes[2].body}
            </p>
            <div className="mt-8 inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0040ff]" />
              <Mono className="text-[#0040ff]">{scenes[2].audience}</Mono>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div
              className="relative bg-[#ffffff] aspect-[4/3]"
              style={{
                boxShadow:
                  "0 1px 0 #e7e7e2, 0 2px 0 #fafaf7, 0 3px 0 #e7e7e2, 0 4px 0 #fafaf7, 0 5px 0 #e7e7e2, 0 14px 30px rgba(10,10,10,0.07)",
              }}
              dir="ltr"
            >
              <PlanDrawing />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <Mono className="text-[#737373]">DRAWING · A-101 · GROUND FLOOR</Mono>
                <Mono className="text-[#737373]">SCALE 1:50</Mono>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <Mono className="text-[#737373]">REV A · 2026.05</Mono>
                <Mono className="text-[#737373]">PRO ALGORITHM · GENERATED</Mono>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanDrawing() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      <defs>
        <pattern id="pgrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ececea" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect x="40" y="40" width="720" height="520" fill="url(#pgrid)" />

      <path
        data-plan-stroke
        d="M 80 80 L 720 80 L 720 520 L 380 520 L 380 460 L 80 460 Z"
        stroke={INK}
        strokeWidth="1.6"
        fill="none"
      />
      <path data-plan-stroke d="M 80 240 L 380 240" stroke={INK} strokeWidth="1" fill="none" />
      <path data-plan-stroke d="M 240 80 L 240 240" stroke={INK} strokeWidth="1" fill="none" />
      <path data-plan-stroke d="M 380 80 L 380 460" stroke={INK} strokeWidth="1" fill="none" />
      <path data-plan-stroke d="M 380 280 L 540 280" stroke={INK} strokeWidth="1" fill="none" />
      <path data-plan-stroke d="M 540 280 L 540 460" stroke={INK} strokeWidth="1" fill="none" />
      <path data-plan-stroke d="M 540 380 L 720 380" stroke={INK} strokeWidth="1" fill="none" />

      <path data-plan-stroke d="M 320 240 A 30 30 0 0 0 350 270" stroke={INK} strokeWidth="0.6" fill="none" />
      <path data-plan-stroke d="M 460 280 A 30 30 0 0 1 490 310" stroke={INK} strokeWidth="0.6" fill="none" />

      <rect data-plan-stroke x="120" y="120" width="80" height="50" stroke={GRAY} strokeWidth="0.6" fill="none" />
      <rect data-plan-stroke x="280" y="120" width="60" height="80" stroke={GRAY} strokeWidth="0.6" fill="none" />
      <circle data-plan-stroke cx="450" cy="380" r="35" stroke={GRAY} strokeWidth="0.6" fill="none" />
      <rect data-plan-stroke x="600" y="120" width="100" height="80" stroke={GRAY} strokeWidth="0.6" fill="none" />

      <g stroke={INK} strokeWidth="0.5" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={INK}>
        <line data-plan-stroke x1="80" y1="60" x2="720" y2="60" />
        <line data-plan-stroke x1="80" y1="55" x2="80" y2="65" />
        <line data-plan-stroke x1="720" y1="55" x2="720" y2="65" />
        <text x="400" y="55" textAnchor="middle" stroke="none">├ 12.80 m ┤</text>

        <line data-plan-stroke x1="60" y1="80" x2="60" y2="460" />
        <line data-plan-stroke x1="55" y1="80" x2="65" y2="80" />
        <line data-plan-stroke x1="55" y1="460" x2="65" y2="460" />
        <text x="40" y="270" textAnchor="middle" transform="rotate(-90 40 270)" stroke="none">├ 7.60 m ┤</text>
      </g>

      <g>
        <circle data-plan-stroke cx="450" cy="380" r="40" stroke={ACCENT} strokeWidth="0.8" strokeDasharray="2 2" fill="none" />
        <line data-plan-stroke x1="490" y1="360" x2="600" y2="320" stroke={ACCENT} strokeWidth="0.6" />
        <text x="610" y="320" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={ACCENT}>AI · suggested skylight</text>
        <text x="610" y="334" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={ACCENT}>+18% daylight</text>
      </g>

      <g transform="translate(700,500)" stroke={INK}>
        <circle data-plan-stroke cx="0" cy="0" r="14" fill="none" />
        <path data-plan-stroke d="M 0 -14 L -4 4 L 0 0 L 4 4 Z" fill={INK} />
        <text x="-3" y="-18" fontFamily="JetBrains Mono, monospace" fontSize="8" fill={INK} stroke="none">N</text>
      </g>
    </svg>
  );
}

/* ============================== SCENE 04 — CAD ============================== */
function CADScene() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section ref={ref} id="scene-04" className="relative" dir="rtl">
      <Hair />
      <div className="px-6 md:px-10 py-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <Mono className="text-[#737373]">{scenes[3].eyebrow}</Mono>
            <h2 className="font-heebo font-black tracking-[-0.025em] text-[clamp(40px,6vw,92px)] leading-[0.95] tracking-[-0.02em] text-[#0a0a0a] mt-4">
              {scenes[3].title}
            </h2>
            <p className="font-sans text-[14px] leading-[1.75] text-[#0a0a0a] max-w-[40ch] mt-8">
              {scenes[3].body}
            </p>
            <div className="mt-8" dir="ltr">
              <Mono className="text-[#737373]">{scenes[3].audience}</Mono>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <CADMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function CADMock() {
  return (
    <div
      className="bg-white border border-[#d4d4d4]"
      style={{ boxShadow: "0 30px 60px -30px rgba(10,10,10,0.18)" }}
      dir="ltr"
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#d4d4d4] bg-[#fafaf7]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full border border-[#737373]" />
          <span className="w-2 h-2 rounded-full border border-[#737373]" />
          <span className="w-2 h-2 rounded-full border border-[#737373]" />
        </div>
        <Mono className="text-[#737373]">REVIT 2024 · helix-tower-rev-A.rvt</Mono>
        <Mono className="text-[#737373]">CONNECTED · PRO ALGORITHM v2.4</Mono>
      </div>

      <div className="flex items-center gap-5 px-3 py-2 border-b border-[#d4d4d4] font-mono text-[10px] tracking-[0.18em] uppercase text-[#737373]">
        <span>File</span><span>Edit</span><span>View</span><span>Modify</span><span>Annotate</span>
        <span className="text-[#0a0a0a]">Pro Algorithm</span>
        <span>Help</span>
      </div>

      <div className="grid grid-cols-12 min-h-[420px]">
        <div className="col-span-2 border-r border-[#d4d4d4] p-3 flex flex-col gap-2">
          {["Select", "Line", "Wall", "Door", "Window", "Column", "Stair", "Roof"].map((t, i) => (
            <div key={t} className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase">
              <div className="w-4 h-4 border border-[#0a0a0a]" />
              <span className={i === 1 ? "text-[#0040ff]" : "text-[#0a0a0a]"}>{t}</span>
            </div>
          ))}
        </div>

        <div className="col-span-7 border-r border-[#d4d4d4] relative bg-[#fcfcfa]">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, #e7e7e2 1px, transparent 1px), linear-gradient(to bottom, #e7e7e2 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <svg viewBox="0 0 600 400" className="absolute inset-0 w-full h-full">
            <path d="M 80 80 L 520 80 L 520 320 L 80 320 Z" stroke={INK} strokeWidth="1.6" fill="none" />
            <path d="M 80 200 L 520 200" stroke={INK} strokeWidth="1" fill="none" />
            <path d="M 280 80 L 280 320" stroke={INK} strokeWidth="1" fill="none" />
            <circle cx="180" cy="140" r="22" stroke={GRAY} strokeWidth="0.8" fill="none" />
            <rect x="320" y="100" width="140" height="60" stroke={GRAY} strokeWidth="0.8" fill="none" />
            <rect x="320" y="240" width="140" height="60" stroke={GRAY} strokeWidth="0.8" fill="none" />
            <g stroke={ACCENT}>
              <rect x="100" y="220" width="160" height="80" strokeWidth="1" strokeDasharray="3 3" fill="none" />
              <circle cx="180" cy="260" r="3" fill={ACCENT} stroke="none" />
              <line x1="180" y1="260" x2="260" y2="220" strokeWidth="0.5" />
              <text x="262" y="218" fontFamily="JetBrains Mono, monospace" fontSize="9" fill={ACCENT}>AI · suggest open kitchen</text>
            </g>
          </svg>

          <div className="absolute bottom-3 left-3 right-3 bg-white border border-[#0a0a0a] flex items-center">
            <Mono className="text-[#737373] px-3 py-2 border-r border-[#d4d4d4]">PROMPT</Mono>
            <input
              dir="rtl"
              defaultValue="הוסף חלון פנורמי על הקיר הצפוני · עם פתח אוורור"
              className="flex-1 px-3 py-2 font-sans text-[12px] text-[#0a0a0a] outline-none bg-transparent"
            />
            <button className="px-4 py-2 bg-[#0040ff] text-white font-mono text-[10px] tracking-[0.18em] uppercase">
              Generate
            </button>
          </div>
        </div>

        <div className="col-span-3 p-3 space-y-3">
          <Mono className="text-[#737373]">Properties · Wall</Mono>
          {[
            ["Type", "Generic 200 mm"],
            ["Length", "12.80 m"],
            ["Height", "3.00 m"],
            ["Material", "Concrete C30"],
            ["Layer", "A-WALL-EXT"],
            ["Cost", "14,820"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-2">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#737373] w-20">{k}</span>
              <span className="flex-1 border-b border-dotted border-[#d4d4d4] translate-y-[-3px]" />
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#0a0a0a]">{v}</span>
            </div>
          ))}

          <div className="border-t border-[#d4d4d4] pt-3 mt-3">
            <Mono className="text-[#0040ff]">PRO ALGORITHM · suggestion</Mono>
            <p className="font-sans text-[11px] leading-[1.6] text-[#0a0a0a] mt-2">
              Reduce wall to 180mm + insulation to save NIS 2,140 with no thermal loss.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-1.5 border-t border-[#d4d4d4] bg-[#fafaf7] font-mono text-[10px] tracking-[0.18em] uppercase text-[#737373]">
        <span>X 12.80 · Y 7.60 · Z 3.00</span>
        <span>14 elements · 0 errors</span>
        <span className="text-[#0a0a0a]">SYNC OK</span>
      </div>
    </div>
  );
}

/* ============================== SCENE 05 — AI MARK ============================== */
function AIScene() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const paths = ref.current!.querySelectorAll<SVGPathElement>("[data-mark]");
      paths.forEach((p) => {
        try {
          const len = (p as any).getTotalLength ? p.getTotalLength() : 0;
          if (len) {
            p.style.strokeDasharray = `${len}`;
            p.style.strokeDashoffset = `${len}`;
          }
        } catch {}
      });
      gsap.to("[data-mark]", {
        strokeDashoffset: 0,
        ease: "none",
        stagger: 0.05,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="scene-05" className="relative" dir="rtl">
      <Hair />
      <div className="px-6 md:px-10 py-24 md:py-40">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-5 order-2 md:order-1">
            <Mono className="text-[#737373]">{scenes[4].eyebrow}</Mono>
            <h2 className="font-heebo font-black tracking-[-0.025em] text-[clamp(40px,6vw,92px)] leading-[0.95] tracking-[-0.02em] text-[#0a0a0a] mt-4">
              {scenes[4].title}
            </h2>
            <p className="font-sans text-[14px] leading-[1.75] text-[#0a0a0a] max-w-[40ch] mt-8">
              {scenes[4].body}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={scenes[4].cta?.href}
                className="group inline-flex items-center gap-3 px-6 py-3 bg-[#0a0a0a] text-[#fafaf7] font-mono text-[10px] tracking-[0.18em] uppercase"
              >
                <span dir="rtl" className="font-sans text-[12px]">{scenes[4].cta?.primary}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href={scenes[4].cta?.href}
                className="inline-flex items-center gap-3 px-6 py-3 border border-[#0a0a0a] text-[#0a0a0a] font-mono text-[10px] tracking-[0.18em] uppercase"
              >
                <span dir="rtl" className="font-sans text-[12px]">{scenes[4].cta?.secondary}</span>
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 order-1 md:order-2">
            <svg viewBox="0 0 600 600" className="w-full h-auto">
              <g stroke={INK} strokeWidth="0.8" fill="none" strokeLinecap="round">
                <circle data-mark cx="300" cy="300" r="220" />
                <circle data-mark cx="300" cy="300" r="180" stroke={RULE} strokeWidth="0.5" />
                <circle data-mark cx="300" cy="300" r="140" stroke={RULE} strokeWidth="0.5" />

                <path data-mark d="M 200 180 L 200 420" />
                <path data-mark d="M 200 180 L 280 180 A 60 60 0 0 1 280 300 L 200 300" />

                <path data-mark d="M 320 420 L 380 180 L 440 420" />
                <path data-mark d="M 340 340 L 420 340" />

                <path data-mark d="M 78 300 L 200 300" stroke={ACCENT} strokeWidth="0.8" />
                <path data-mark d="M 440 300 L 522 300" stroke={GRAY} strokeWidth="0.5" />
                <path data-mark d="M 300 78 L 300 180" stroke={GRAY} strokeWidth="0.5" />
                <path data-mark d="M 300 420 L 300 522" stroke={GRAY} strokeWidth="0.5" />

                {Array.from({ length: 36 }).map((_, i) => {
                  const a = (i / 36) * Math.PI * 2;
                  const r1 = 220;
                  const r2 = i % 9 === 0 ? 240 : 228;
                  return (
                    <line
                      key={i}
                      data-mark
                      x1={300 + Math.cos(a) * r1}
                      y1={300 + Math.sin(a) * r1}
                      x2={300 + Math.cos(a) * r2}
                      y2={300 + Math.sin(a) * r2}
                      stroke={GRAY}
                      strokeWidth="0.5"
                    />
                  );
                })}
              </g>
              <text x="300" y="560" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={GRAY} textAnchor="middle" letterSpacing="3">
                PRO ALGORITHM · AUTONOMOUS DRAFTING
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== SERVICES STRIP (Figma) ============================== */
function ServicesStrip() {
  return (
    <section className="relative" dir="rtl">
      <Hair />
      <div className="px-6 md:px-10 py-12 md:py-16">
        <div className="flex items-baseline justify-between mb-8">
          <Mono className="text-[#737373]">II — מומחיות · 04 תחומים</Mono>
          <Mono className="text-[#737373]" dir="ltr">SERVICES INDEX</Mono>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-[#d4d4d4]">
          {figmaCopy.services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              className={`p-6 md:p-8 border-[#d4d4d4] ${i !== 0 ? "md:border-r border-t md:border-t-0" : ""}`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full"
                  style={{ background: MINT }}
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7.2 L5.6 10 L11.5 4" stroke="#0a1335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <Mono className="text-[#737373]" dir="ltr">{String(i + 1).padStart(2, "0")} / 04</Mono>
              </div>
              <h3 className="font-heebo font-bold tracking-[-0.02em] text-[24px] md:text-[28px] leading-tight text-[#0a0a0a] mt-5">
                {s.title}
              </h3>
              <p className="font-sans text-[14px] leading-[1.65] text-[#0a0a0a] mt-2">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== STATS ============================== */
function StatsSection() {
  return (
    <section className="relative" dir="rtl">
      <Hair />
      <div className="px-6 md:px-10 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <Mono className="text-[#737373]">V — המספרים</Mono>
          <Mono className="text-[#737373]" dir="ltr">FIGURES · CUMULATIVE</Mono>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-[#d4d4d4]">
          {figmaCopy.figmaStats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`p-8 md:p-12 border-[#d4d4d4] ${i !== 0 ? "md:border-r border-t md:border-t-0" : ""}`}
            >
              <div className="flex items-start gap-3 mb-4">
                <Icon i={i} />
                <Mono className="text-[#737373]" dir="ltr">{String(i + 1).padStart(2, "0")} / 03</Mono>
              </div>
              <div
                className="font-heebo font-black tracking-[-0.04em] text-[clamp(40px,4.4vw,64px)] leading-[1] tabular-nums flex items-baseline gap-2"
                style={{ color: ROYAL }}
                dir="ltr"
              >
                <span>{s.value}</span>
                {s.unit && <span className="text-[0.5em] font-semibold tracking-normal" style={{ color: ROYAL, opacity: 0.85 }}>{s.unit}</span>}
              </div>
              <div className="mt-4 font-sans text-[16px] text-[#0a0a0a] font-medium">{s.label}</div>
              <div className="mt-1 font-sans text-[13px] text-[#737373]">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Icon({ i }: { i: number }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={ROYAL} strokeWidth="1.2">
      {i === 0 && (
        <>
          <rect x="3" y="3" width="16" height="16" />
          <line x1="3" y1="8" x2="19" y2="8" />
          <line x1="8" y1="3" x2="8" y2="19" />
        </>
      )}
      {i === 1 && (
        <>
          <path d="M4 19 L4 8 L11 4 L18 8 L18 19" />
          <line x1="4" y1="19" x2="18" y2="19" />
          <line x1="9" y1="19" x2="9" y2="13" />
          <line x1="13" y1="19" x2="13" y2="13" />
        </>
      )}
      {i === 2 && (
        <>
          <rect x="3" y="3" width="16" height="16" />
          <line x1="3" y1="11" x2="19" y2="11" />
          <line x1="11" y1="3" x2="11" y2="19" />
          <circle cx="11" cy="11" r="2" fill={ROYAL} stroke="none" />
        </>
      )}
    </svg>
  );
}

/* ============================== PODCAST (Figma) ============================== */
function PodcastSection() {
  return (
    <section className="relative" dir="rtl">
      <Hair />
      <div className="px-6 md:px-10 py-20">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 md:col-span-3">
            <Mono className="text-[#737373]">VII — פודקאסט</Mono>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h3 className="font-heebo font-black tracking-[-0.025em] text-[clamp(36px,5.4vw,84px)] leading-[0.95] tracking-[-0.02em] text-[#0a0a0a]">
              <span style={{ color: ROYAL }}>{figmaCopy.podcastTitle}.</span>{" "}
              {figmaCopy.podcastSubtitle}
            </h3>
            <p className="mt-4 font-sans text-[15px] leading-[1.7] max-w-[60ch] text-[#0a0a0a]">
              {figmaCopy.podcastBody}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 items-stretch">
          {/* Featured episode */}
          <article
            className="col-span-12 md:col-span-7 relative overflow-hidden"
            style={{ background: NAVY, color: PAPER, minHeight: "440px" }}
          >
            <img
              src={figmaCopy.podcastFeatured.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-65"
              loading="lazy"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${NAVY}00 30%, ${NAVY}f5 90%)` }} />
            <div className="relative h-full flex flex-col justify-between p-6 md:p-10">
              <div className="flex items-center gap-3">
                <span
                  className="inline-block px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em]"
                  style={{ background: MINT, color: NAVY }}
                  dir="ltr"
                >
                  {figmaCopy.podcastFeatured.tag}
                </span>
                <Mono className="text-white/70" dir="ltr">{figmaCopy.podcastFeatured.date}</Mono>
              </div>
              <div>
                <Mono className="text-white/60" dir="ltr">EP. 014 · 48 MIN</Mono>
                <h4 className="font-heebo font-bold tracking-[-0.025em] text-[clamp(24px,3.2vw,42px)] leading-[1.1] mt-3">
                  {figmaCopy.podcastFeatured.title}
                </h4>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-mono uppercase tracking-[0.18em]"
                  style={{ background: MINT, color: NAVY }}
                >
                  ▶ נגן
                </button>
              </div>
            </div>
          </article>

          {/* 3 episode list */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
            {figmaCopy.podcastEpisodes.map((e, i) => (
              <motion.a
                key={i}
                href="#"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.07 }}
                className="group p-5 md:p-6 flex items-start justify-between gap-4 transition-colors"
                style={{ background: NAVY, color: PAPER }}
              >
                <div>
                  <Mono className="text-white/55" dir="ltr">EP. {String(13 - i).padStart(3, "0")} · {e.date}</Mono>
                  <h5 className="font-heebo font-bold tracking-[-0.02em] text-[18px] md:text-[20px] leading-[1.3] mt-2">
                    {e.title}
                  </h5>
                </div>
                <div className="shrink-0 mt-1">
                  <span
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-transform group-hover:scale-110"
                    style={{ background: MINT, color: NAVY }}
                  >
                    ▶
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <a
            href="https://youtube.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono uppercase tracking-[0.18em]"
            style={{ background: MINT, color: NAVY }}
            dir="rtl"
          >
            ← צפייה בכל הפרקים ביוטיוב
          </a>
        </div>
      </div>
    </section>
  );
}

/* ============================== PRESS (Figma) ============================== */
function PressSection() {
  return (
    <section className="relative" dir="rtl">
      <Hair />
      <div className="px-6 md:px-10 py-20">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 md:col-span-3">
            <Mono className="text-[#737373]">VIII — תקשורת</Mono>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h3 className="font-heebo font-black tracking-[-0.025em] text-[clamp(36px,5.4vw,84px)] leading-[0.95] tracking-[-0.02em] text-[#0a0a0a]">
              <span style={{ color: ROYAL }}>{figmaCopy.pressSubtitle}.</span>
            </h3>
            <p className="mt-4 font-sans text-[15px] leading-[1.7] max-w-[60ch] text-[#0a0a0a]">
              {figmaCopy.pressBody}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {figmaCopy.pressArticles.map((a, i) => {
            const rotations = ["-1.2deg", "0.8deg", "-0.6deg", "1.4deg"];
            const before = a.quote.split(a.highlight)[0];
            const after = a.quote.split(a.highlight)[1] || "";
            return (
              <motion.article
                key={a.outlet}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                style={{ background: CREAM, transform: `rotate(${rotations[i]})` }}
                className="p-6 transition-all"
              >
                <div
                  className="text-2xl font-bold tracking-tight mb-4"
                  dir="ltr"
                  style={{ color: a.color, fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
                >
                  {a.outlet}
                </div>
                <blockquote className="font-magazine text-[20px] leading-[1.35] text-[#0a0a0a] mb-6">
                  {before}
                  <span
                    style={{
                      background: "linear-gradient(180deg, transparent 55%, #ffe66b 55%, #ffe66b 92%, transparent 92%)",
                      padding: "0 2px",
                    }}
                  >
                    {a.highlight}
                  </span>
                  {after}
                </blockquote>
                <div className="flex items-baseline justify-between border-t border-[#0a0a0a]/15 pt-3">
                  <a href="#" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0a0a0a] underline decoration-1 underline-offset-[4px]">
                    לכתבה המלאה →
                  </a>
                  <Mono className="text-[#0a0a0a]/55" dir="ltr">0{i + 1}/04</Mono>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-end gap-2">
          <button className="w-10 h-10 border border-[#0a0a0a] flex items-center justify-center font-mono">←</button>
          <button className="w-10 h-10 border border-[#0a0a0a] flex items-center justify-center font-mono" style={{ background: NAVY, color: PAPER }}>→</button>
        </div>
      </div>
    </section>
  );
}

/* ============================== HORIZONTAL PRODUCTS ============================== */
function HorizontalProducts() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrap.current || !track.current) return;
    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.current!.scrollWidth - window.innerWidth);
      gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={wrap} className="relative" dir="ltr">
      <Hair />
      <div className="overflow-hidden">
        <div ref={track} className="flex items-stretch gap-8 px-6 md:px-10 py-20 will-change-transform" style={{ width: "max-content" }}>
          <div className="w-[80vw] md:w-[40vw] shrink-0" dir="rtl">
            <Mono className="text-[#737373]">PRODUCTS · 01—04</Mono>
            <h3 className="font-heebo font-black tracking-[-0.025em] text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.02em] text-[#0a0a0a] mt-4">
              ארבעה מוצרים. <br />שפה אחת.
            </h3>
            <p className="font-sans text-[14px] leading-[1.75] text-[#0a0a0a] max-w-[36ch] mt-6">
              כל מוצר עומד בפני עצמו. יחד הם מערכת סגורה — מחישוב חדר ועד תפעול מבנה.
            </p>
            <div className="mt-8 flex items-center gap-2 text-[#737373]">
              <Mono>SCROLL</Mono>
              <span className="font-mono">→</span>
            </div>
          </div>

          {products.map((p, i) => (
            <div
              key={p.n}
              className="w-[80vw] md:w-[36vw] shrink-0 bg-white"
              style={{
                boxShadow:
                  "0 1px 0 #e7e7e2, 0 2px 0 #fafaf7, 0 3px 0 #e7e7e2, 0 24px 40px -20px rgba(10,10,10,0.12)",
              }}
            >
              <div className="p-6 md:p-8" dir="rtl">
                <div className="flex items-start justify-between" dir="ltr">
                  <Mono className="text-[#737373]">PRODUCT · {p.n} / 04</Mono>
                  <Mono className="text-[#0a0a0a]">{p.tag}</Mono>
                </div>

                <div className="mt-6 aspect-[16/10] border border-[#d4d4d4] relative bg-[#fcfcfa] overflow-hidden">
                  <svg viewBox="0 0 320 200" className="absolute inset-0 w-full h-full">
                    {i === 0 && (
                      <g stroke={INK} strokeWidth="0.8" fill="none">
                        <rect x="40" y="40" width="240" height="120" />
                        <line x1="40" y1="80" x2="280" y2="80" />
                        <line x1="120" y1="40" x2="120" y2="160" />
                        <circle cx="200" cy="120" r="18" stroke={ACCENT} strokeWidth="0.8" strokeDasharray="2 2" />
                      </g>
                    )}
                    {i === 1 && (
                      <g stroke={INK} strokeWidth="0.8" fill="none">
                        <text x="40" y="60" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={GRAY} stroke="none">{">"} 4 חדרים, 120m²</text>
                        <line x1="40" y1="80" x2="280" y2="80" stroke={RULE} />
                        <path d="M 40 110 L 100 110 L 100 160 L 40 160 Z" />
                        <path d="M 100 110 L 180 110 L 180 160 L 100 160" />
                        <path d="M 180 110 L 280 110 L 280 160 L 180 160" />
                        <line x1="40" y1="135" x2="280" y2="135" stroke={ACCENT} strokeDasharray="3 3" />
                      </g>
                    )}
                    {i === 2 && (
                      <g stroke={INK} strokeWidth="0.6" fill="none">
                        {Array.from({ length: 80 }).map((_, k) => (
                          <circle
                            key={k}
                            cx={40 + (k % 16) * 16}
                            cy={40 + Math.floor(k / 16) * 24}
                            r="1"
                            fill={GRAY}
                            stroke="none"
                          />
                        ))}
                        <path d="M 40 160 L 280 60" stroke={ACCENT} />
                      </g>
                    )}
                    {i === 3 && (
                      <g stroke={INK} strokeWidth="0.8" fill="none">
                        <rect x="40" y="40" width="240" height="120" stroke={RULE} />
                        <path d="M 60 140 L 90 100 L 130 130 L 170 80 L 220 110 L 260 70" stroke={INK} />
                        <circle cx="220" cy="110" r="3" fill={ACCENT} stroke="none" />
                        <line x1="220" y1="110" x2="220" y2="50" stroke={ACCENT} strokeDasharray="2 2" strokeWidth="0.5" />
                        <text x="226" y="50" fontFamily="JetBrains Mono, monospace" fontSize="8" fill={ACCENT} stroke="none">peak load</text>
                      </g>
                    )}
                  </svg>
                </div>

                <h4 className="font-magazine text-[28px] md:text-[32px] leading-tight text-[#0a0a0a] mt-6" dir="ltr">
                  {p.title}
                </h4>
                <p className="font-sans text-[14px] leading-[1.7] text-[#0a0a0a] mt-3">
                  {p.body}
                </p>
                <div className="mt-6 pt-4 border-t border-[#d4d4d4]" dir="ltr">
                  <Mono className="text-[#737373]">STACK</Mono>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    {p.tools.map((t) => (
                      <span key={t} className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#0a0a0a]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== TESTIMONIALS ============================== */
function TestimonialsSection() {
  return (
    <section className="relative" dir="rtl">
      <Hair />
      <div className="px-6 md:px-10 py-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <Mono className="text-[#737373]">VOICES · N=120</Mono>
            <h3 className="font-heebo font-black tracking-[-0.025em] text-[clamp(32px,4vw,56px)] leading-[0.95] tracking-[-0.02em] text-[#0a0a0a] mt-4">
              מה שאומרים<br />עלינו.
            </h3>
          </div>
          <div className="col-span-12 md:col-span-9 grid md:grid-cols-3 gap-0 md:border-l border-[#d4d4d4]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`p-6 md:p-8 border-[#d4d4d4] ${i !== 0 ? "border-t md:border-t-0" : ""} md:border-r`}
              >
                <Mono className="text-[#737373]">{String(i + 1).padStart(2, "0")} / 03</Mono>
                <p className="font-magazine text-[20px] md:text-[22px] leading-[1.45] text-[#0a0a0a] mt-6">
                  "{t.quote}"
                </p>
                <div className="mt-8 pt-4 border-t border-[#d4d4d4]">
                  <div className="font-sans text-[14px] text-[#0a0a0a]">{t.name}</div>
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#737373] mt-1">{t.role}</div>
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#737373] mt-0.5">{t.project}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== PARTNERS ============================== */
function PartnersSection() {
  return (
    <section className="relative" dir="ltr">
      <Hair />
      <div className="px-6 md:px-10 py-12">
        <div className="flex items-center justify-between mb-8">
          <Mono className="text-[#737373]">PARTNERS · 14 ACTIVE</Mono>
          <Mono className="text-[#737373]">— SCROLLING</Mono>
        </div>
        <div className="overflow-hidden">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...partners, ...partners].map((p, i) => (
              <span
                key={i}
                className="font-magazine text-[clamp(28px,5vw,72px)] font-light text-[#0a0a0a] tracking-[0.02em]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== TEAM ============================== */
function TeamSection() {
  return (
    <section className="relative" dir="rtl">
      <Hair />
      <div className="px-6 md:px-10 py-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <Mono className="text-[#737373]">TEAM · 04 FOUNDERS</Mono>
            <h3 className="font-heebo font-black tracking-[-0.025em] text-[clamp(32px,4vw,56px)] leading-[0.95] tracking-[-0.02em] text-[#0a0a0a] mt-4">
              צוות קטן.<br />אמביציה גדולה.
            </h3>
          </div>
          <div className="col-span-12 md:col-span-8">
            <div className="border-t border-[#d4d4d4]">
              {team.map((m, i) => (
                <div
                  key={m.name}
                  className="grid grid-cols-12 gap-4 py-6 border-b border-[#d4d4d4] items-baseline"
                >
                  <div className="col-span-2 font-mono text-[10px] tracking-[0.18em] uppercase text-[#737373]" dir="ltr">
                    0{i + 1}
                  </div>
                  <div className="col-span-5 font-magazine text-[28px] md:text-[32px] text-[#0a0a0a] leading-none">
                    {m.name}
                  </div>
                  <div className="col-span-3 font-mono text-[10px] tracking-[0.18em] uppercase text-[#0a0a0a]" dir="ltr">
                    {m.role}
                  </div>
                  <div className="col-span-2 font-mono text-[10px] tracking-[0.18em] uppercase text-[#737373] text-right" dir="ltr">
                    {m.bg}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== FINAL CTA (Figma) ============================== */
function FinalCTA() {
  return (
    <section dir="rtl" className="px-4 md:px-8 pt-8">
      <div
        className="relative rounded-[40px] md:rounded-[64px] overflow-hidden p-10 md:p-20 text-center"
        style={{ background: NAVY, color: PAPER }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative">
          <div className="flex justify-center items-center gap-2 mb-6">
            <span className="block w-2 h-2 rounded-full" style={{ background: MINT }} />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/70">
              PRO ALGORITHM
            </span>
          </div>
          <Mono className="text-white/65 mb-6 inline-block">{figmaCopy.finalEyebrow}</Mono>
          <h2 className="font-heebo font-black tracking-[-0.025em] text-[clamp(48px,9vw,160px)] leading-[0.92] tracking-[-0.025em] text-white mb-10">
            {figmaCopy.finalTitle}
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex items-center gap-2 px-7 py-4 text-sm font-mono uppercase tracking-[0.2em]"
              style={{ background: MINT, color: NAVY }}
            >
              {figmaCopy.ctaPrimary}
            </a>
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex items-center gap-2 px-7 py-4 text-sm font-mono uppercase tracking-[0.2em] border border-white/40 hover:bg-white/10 transition-colors"
            >
              {figmaCopy.ctaSecondary}
            </a>
          </div>
          <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap justify-center items-center gap-6 text-white/60" dir="ltr">
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.7" fill="currentColor"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.4l.6-3H14V8z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18"/><line x1="7" y1="10" x2="7" y2="17"/><circle cx="7" cy="7" r="0.7" fill="currentColor"/><path d="M11 17v-5a3 3 0 0 1 6 0v5"/><line x1="11" y1="10" x2="11" y2="17"/></svg>
            </a>
            <Mono>© 2026 PRO ALGORITHM · ALL RIGHTS RESERVED</Mono>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== FOOTER ============================== */
function FooterSection() {
  return (
    <footer className="relative" dir="rtl">
      <Hair />
      <div className="px-6 md:px-10 py-12">
        <div className="grid grid-cols-12 gap-6 text-[10px] font-mono tracking-[0.18em] uppercase text-[#0a0a0a]" dir="ltr">
          <div className="col-span-12 md:col-span-3">
            <Mono className="text-[#737373]">OFFICE</Mono>
            <div className="mt-3 space-y-1 normal-case tracking-normal text-[12px]" dir="rtl">
              <div>{brand.address}</div>
            </div>
            <div className="mt-2">{brand.phone}</div>
          </div>
          <div className="col-span-6 md:col-span-3">
            <Mono className="text-[#737373]">CONTACT</Mono>
            <a href={`mailto:${brand.email}`} className="block mt-3 normal-case tracking-normal text-[12px] underline decoration-[#1e40ff] decoration-1 underline-offset-[4px]">
              {brand.email}
            </a>
          </div>
          <div className="col-span-6 md:col-span-3">
            <Mono className="text-[#737373]">FOLLOW</Mono>
            <div className="mt-3 flex gap-3" dir="ltr">
              <a href="#" className="hover:text-[#1e40ff]">IG</a>
              <a href="#" className="hover:text-[#1e40ff]">FB</a>
              <a href="#" className="hover:text-[#1e40ff]">LI</a>
              <a href="#" className="hover:text-[#1e40ff]">YT</a>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <Mono className="text-[#737373]">COLOPHON</Mono>
            <div className="mt-3 space-y-1">
              <div>Set in Heebo · Inter · IBM Plex Mono</div>
              <div>Drawn 2026 · Tel Aviv</div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#d4d4d4] flex flex-wrap items-end justify-between gap-4" dir="ltr">
          <div className="font-heebo font-black tracking-[-0.04em] leading-[0.85] text-[clamp(80px,18vw,260px)] text-[#0a0a0a]">
            Pro<span className="text-[#1e40ff]">.</span>Algorithm
          </div>
          <Mono className="text-[#737373]">© 2026 · ALL RIGHTS RESERVED</Mono>
        </div>
      </div>
    </footer>
  );
}

/* ============================== ROOT ============================== */
export default function Minimal() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const update = () => setMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="bg-[#fafaf7] text-[#0a0a0a] min-h-screen overflow-x-hidden font-sans selection:bg-[#0040ff] selection:text-white">
      <TopFrame />
      <ScrollIndex />

      <main className="pt-24">
        <Hero />
        <ServicesStrip />
        <ExplodedScene mobile={mobile} />
        <PlansScene />
        <CADScene />
        <StatsSection />
        <HorizontalProducts />
        <AIScene />
        <TestimonialsSection />
        <PartnersSection />
        <PodcastSection />
        <PressSection />
        <TeamSection />
        <FinalCTA />
        <FooterSection />
      </main>
    </div>
  );
}
