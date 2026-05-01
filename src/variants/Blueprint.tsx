import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { services, projects, stats, testimonials, process } from "../data";

const navy = "#0c2a4a";
const cyan = "#5edcff";
const cream = "#f1e9d2";
const rust = "#e8704c";

export default function BlueprintVariant() {
  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: navy, color: cream, fontFamily: "'IBM Plex Mono', monospace" }}>
      <Hatching />
      <DraftingGrid />
      <CornerStamps />
      <Header />
      <Hero />
      <Sheet sheet="A-101" title="ELEVATION FRONT — ELEMENTS"><Services /></Sheet>
      <Sheet sheet="A-201" title="PORTFOLIO — REALIZED PROJECTS"><Projects /></Sheet>
      <Sheet sheet="A-301" title="WORKFLOW — PROCESS DIAGRAM"><Workflow /></Sheet>
      <Sheet sheet="A-401" title="QUANTITIES — BY THE NUMBERS"><Numbers /></Sheet>
      <Sheet sheet="A-501" title="VOICES — CLIENT NOTES"><Voices /></Sheet>
      <CTA />
      <Footer />
    </div>
  );
}

function Hatching() {
  return (
    <svg className="fixed inset-0 w-full h-full opacity-[0.04] pointer-events-none z-0" aria-hidden>
      <defs>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={cream} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hatch)" />
    </svg>
  );
}

function DraftingGrid() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.07]"
      style={{
        backgroundImage: `linear-gradient(${cyan} 1px, transparent 1px), linear-gradient(90deg, ${cyan} 1px, transparent 1px)`,
        backgroundSize: "32px 32px, 32px 32px",
      }}
    />
  );
}

function CornerStamps() {
  return (
    <>
      <div className="fixed top-2 left-2 z-20 text-[8px] font-mono uppercase tracking-[0.4em] pointer-events-none" style={{ color: cyan }}>
        ┌── A0
      </div>
      <div className="fixed top-2 right-2 z-20 text-[8px] font-mono uppercase tracking-[0.4em] pointer-events-none" style={{ color: cyan }}>
        A1 ──┐
      </div>
      <div className="fixed bottom-2 left-2 z-20 text-[8px] font-mono uppercase tracking-[0.4em] pointer-events-none" style={{ color: cyan }}>
        └── A3
      </div>
      <div className="fixed bottom-2 right-2 z-20 text-[8px] font-mono uppercase tracking-[0.4em] pointer-events-none" style={{ color: cyan }}>
        A2 ──┘
      </div>
    </>
  );
}

function Header() {
  const [t, setT] = useState("00:00:00");
  useEffect(() => {
    const f = () => {
      const d = new Date();
      setT(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`);
    };
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b" style={{ borderColor: `${cyan}33`, background: `${navy}cc`, backdropFilter: "blur(8px)" }}>
      <div className="mx-auto max-w-[1500px] grid grid-cols-12 px-5 md:px-8 py-3 text-[10px] uppercase tracking-[0.3em]">
        <div className="col-span-3 flex items-center gap-3" style={{ color: cyan }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.4" />
            <line x1="3" y1="8" x2="21" y2="8" stroke="currentColor" strokeWidth="0.8" />
            <line x1="8" y1="3" x2="8" y2="21" stroke="currentColor" strokeWidth="0.8" />
          </svg>
          <span style={{ color: cream }}>NEXUS+BUILD</span>
        </div>
        <div className="hidden md:flex col-span-6 items-center justify-center gap-6 opacity-70">
          <span>SHEET A0 / 12</span><span>·</span>
          <span>SCALE 1:200</span><span>·</span>
          <span>REV 04 — MAY 2026</span><span>·</span>
          <span style={{ color: cyan }}>{t}</span>
        </div>
        <div className="col-span-9 md:col-span-3 flex items-center justify-end gap-3" style={{ color: cyan }}>
          <a href="#cta" className="px-3 py-1 border hover:bg-[var(--cyan)] hover:text-[var(--navy)] transition-colors" style={{ borderColor: cyan, "--cyan": cyan, "--navy": navy } as any}>
            REQUEST CONSULT →
          </a>
        </div>
      </div>
    </header>
  );
}

function DimensionLine({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ color: cyan }}>
      <span className="text-[10px]">├</span>
      <span className="block flex-1 h-px" style={{ background: cyan, opacity: 0.6 }} />
      <span className="text-[10px] uppercase tracking-[0.3em] whitespace-nowrap px-2">{label}</span>
      <span className="block flex-1 h-px" style={{ background: cyan, opacity: 0.6 }} />
      <span className="text-[10px]">┤</span>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPic = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative pt-28 md:pt-32 pb-20 z-10">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8">
        <div className="text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-3" style={{ color: cyan }}>
          <svg width="28" height="14" viewBox="0 0 28 14"><polygon points="0,7 14,0 28,7 14,14" fill={cyan}/></svg>
          DRAWING SHEET A-001 · TITLE
        </div>

        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8">
          <h1 className="lg:col-span-8 text-[14vw] md:text-[8vw] leading-[0.85] font-archivo tracking-tighter">
            <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.65, 0.05, 0.36, 1] }} className="block overflow-hidden">
              <span className="block">תכנון אדריכלי</span>
            </motion.span>
            <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.65, 0.05, 0.36, 1] }} className="block overflow-hidden">
              <span className="block" style={{ color: cyan }}>ב<em className="not-italic" style={{ color: rust }}>1:1</em>.</span>
            </motion.span>
            <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.65, 0.05, 0.36, 1] }} className="block overflow-hidden">
              <span className="block" style={{ WebkitTextStroke: `2px ${cream}`, color: "transparent" }}>בלי הפתעות.</span>
            </motion.span>
          </h1>

          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="lg:col-span-4 border-l pr-6 self-end"
            style={{ borderColor: `${cyan}55` }}
          >
            <div className="text-[10px] uppercase tracking-[0.3em] mb-4 opacity-70">— SPECIFICATION</div>
            <p className="text-base md:text-lg leading-snug mb-6" style={{ fontFamily: "'Heebo', sans-serif" }}>
              סטודיו אדריכלות שמתכנן עם <span style={{ color: cyan }}>AI</span>, סורק ב-<span style={{ color: cyan }}>LiDAR</span>, ובונה עם <span style={{ color: cyan }}>IoT</span>.
              כל מילימטר רשום, מחושב, מאושר.
            </p>
            <div className="grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.2em]">
              <div><div className="opacity-60">EST</div><div className="font-archivo text-2xl" style={{ color: cyan }}>2024</div></div>
              <div><div className="opacity-60">PROJECTS</div><div className="font-archivo text-2xl" style={{ color: cyan }}>187+</div></div>
              <div><div className="opacity-60">SAT</div><div className="font-archivo text-2xl" style={{ color: cyan }}>98%</div></div>
            </div>
          </motion.aside>
        </div>

        <DimensionLine label="DIMENSION ↔ 1500MM" className="mt-12 mb-3" />

        {/* Isometric building drawing */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.65, 0.05, 0.36, 1] }}
          style={{ y: yPic }}
          className="relative h-[60vh] md:h-[80vh] border overflow-hidden flex items-end justify-center"
          dir="ltr"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `linear-gradient(${cyan} 1px, transparent 1px), linear-gradient(90deg, ${cyan} 1px, transparent 1px)`, backgroundSize: "16px 16px" }} />
          <IsometricBuilding />

          {/* Drafting callouts */}
          <Callout x="14%" y="22%" label="LVL +14" detail="ROOFTOP" />
          <Callout x="80%" y="44%" label="LVL +07" detail="SKY GARDEN" />
          <Callout x="22%" y="68%" label="LVL +03" detail="LOBBY" />

          <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.3em] flex gap-2" style={{ color: cyan }}>
            <span>FIG.01 — HELIX TOWER</span><span>·</span><span>SCALE 1:300</span><span>·</span><span>ISOMETRIC</span>
          </div>
          <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.3em] opacity-70">N ↑</div>
        </motion.div>

        <DimensionLine label="DIMENSION ↕ 60M" className="mt-3" />
      </div>
    </section>
  );
}

function IsometricBuilding() {
  const floors = 14;
  return (
    <svg viewBox="-160 -360 320 380" className="w-[80%] h-[88%]">
      {Array.from({ length: floors }).map((_, i) => {
        const y = -i * 22;
        const w = 90 - i * 1.2;
        const skew = 14;
        const isAccent = i === 6 || i === 13 || i === 2;
        return (
          <g key={i}>
            <motion.polygon
              points={`${-w} ${y} ${-w + skew} ${y - skew * 0.7} ${w + skew} ${y - skew * 0.7} ${w} ${y}`}
              fill="none"
              stroke={isAccent ? rust : cyan}
              strokeWidth={isAccent ? 1.4 : 0.8}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.6 + i * 0.04, duration: 0.6 }}
            />
            <motion.rect
              x={-w}
              y={y - 18}
              width={w * 2}
              height={18}
              fill="none"
              stroke={isAccent ? rust : cyan}
              strokeWidth={isAccent ? 1.4 : 0.8}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7 + i * 0.04, duration: 0.6 }}
            />
            {Array.from({ length: 7 }).map((_, j) => (
              <line
                key={j}
                x1={-w + 4 + j * ((w * 2 - 8) / 7)}
                y1={y - 16}
                x2={-w + 4 + j * ((w * 2 - 8) / 7)}
                y2={y - 4}
                stroke={cyan}
                strokeWidth="0.4"
                opacity="0.55"
              />
            ))}
          </g>
        );
      })}
      {/* Ground */}
      <line x1={-95} y1={0} x2={120} y2={0} stroke={cyan} strokeWidth="1.2" />
      <line x1={-95} y1={0} x2={-95 + 14} y2={-14 * 0.7} stroke={cyan} strokeWidth="1.2" />
      <line x1={120} y1={0} x2={120 - 14} y2={-14 * 0.7} stroke={cyan} strokeWidth="1.2" opacity="0.4" strokeDasharray="2 2" />
      {/* Hatched ground */}
      {Array.from({ length: 28 }).map((_, i) => (
        <line key={i} x1={-100 + i * 8} y1={4} x2={-110 + i * 8} y2={14} stroke={cyan} strokeWidth="0.4" opacity="0.4" />
      ))}
      <text x="-95" y="20" fill={cyan} fontSize="6" fontFamily="IBM Plex Mono">GRADE LINE 0.000</text>
    </svg>
  );
}

function Callout({ x, y, label, detail }: { x: string; y: string; label: string; detail: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="absolute pointer-events-none"
      style={{ left: x, top: y, color: cyan }}
    >
      <div className="flex items-center gap-2">
        <span className="block w-3 h-3 rounded-full border-2" style={{ borderColor: cyan }} />
        <span className="block w-12 h-px" style={{ background: cyan }} />
        <div className="border px-2 py-1 text-[10px] uppercase tracking-[0.3em]" style={{ borderColor: cyan, background: navy }}>
          <span style={{ color: rust }}>{label}</span> · {detail}
        </div>
      </div>
    </motion.div>
  );
}

function Sheet({ sheet, title, children }: { sheet: string; title: string; children: React.ReactNode }) {
  return (
    <section className="relative py-20 md:py-28 z-10 border-t" style={{ borderColor: `${cyan}33` }}>
      <div className="mx-auto max-w-[1500px] px-5 md:px-8">
        <header className="grid grid-cols-12 mb-10 text-[10px] uppercase tracking-[0.3em]" style={{ color: cyan }}>
          <div className="col-span-2"><span className="opacity-60">SHEET</span><br /><span className="font-archivo text-2xl block leading-none mt-1" style={{ color: cream }}>{sheet}</span></div>
          <div className="col-span-7 md:col-span-8 flex items-end pb-1"><span className="block w-full h-px" style={{ background: `${cyan}55` }} /></div>
          <div className="col-span-3 md:col-span-2 text-right" style={{ color: cream }}>{title}</div>
        </header>
        {children}
      </div>
    </section>
  );
}

function Services() {
  return (
    <div className="grid md:grid-cols-2 gap-px" style={{ background: `${cyan}33` }}>
      {services.map((s, i) => (
        <motion.article
          key={s.n}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.05, duration: 0.5 }}
          className="p-7 md:p-9 group"
          style={{ background: navy }}
        >
          <div className="flex items-start justify-between mb-5">
            <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: cyan }}>
              SPEC.{s.n} / {s.tag}
            </div>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ color: cyan }}>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" />
              <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="0.5" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>
          <h3 className="font-archivo text-3xl md:text-4xl leading-tight mb-3" style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900 }}>{s.title}</h3>
          <p className="text-base leading-snug mb-5 opacity-85" style={{ fontFamily: "'Heebo', sans-serif" }}>{s.body}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.3em]" style={{ color: cyan }}>
            {s.tools.map((t, j) => <span key={t}>{t}{j < s.tools.length - 1 && " ·"}</span>)}
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function Projects() {
  return (
    <div className="border-y" style={{ borderColor: `${cyan}55` }}>
      {projects.map((p, i) => (
        <motion.a
          key={p.title}
          href="#"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.04 }}
          className="grid grid-cols-12 items-center py-5 border-b last:border-b-0 hover:bg-[var(--c)] hover:text-[var(--n)] transition-colors group cursor-pointer"
          style={{ borderColor: `${cyan}33`, "--c": cyan, "--n": navy } as any}
        >
          <div className="col-span-1 text-[10px] uppercase tracking-[0.3em] pl-3" style={{ color: cyan }}>0{i + 1}</div>
          <div className="col-span-4 font-archivo text-2xl md:text-4xl leading-none">{p.title}</div>
          <div className="col-span-2 text-[10px] uppercase tracking-[0.3em] hidden md:block">{p.location}</div>
          <div className="col-span-2 text-[10px] uppercase tracking-[0.3em] hidden md:block">{p.type}</div>
          <div className="col-span-1 text-[10px] uppercase tracking-[0.3em]">F.{p.floors}</div>
          <div className="col-span-1 text-[10px] uppercase tracking-[0.3em]">{p.year}</div>
          <div className="col-span-1 text-2xl text-left pr-3">→</div>
        </motion.a>
      ))}
    </div>
  );
}

function Workflow() {
  return (
    <div className="grid md:grid-cols-5 gap-px relative" style={{ background: `${cyan}33` }}>
      {process.map((p, i) => (
        <motion.div
          key={p.n}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="p-6 min-h-[260px] flex flex-col justify-between relative"
          style={{ background: navy }}
        >
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: cyan }}>
              <span className="w-6 h-6 rounded-full border flex items-center justify-center" style={{ borderColor: cyan }}>{p.n}</span>
              {p.duration}
            </div>
            <h3 className="text-xl mb-2 font-bold" style={{ fontFamily: "'Heebo', sans-serif" }}>{p.title}</h3>
            <p className="text-xs leading-snug opacity-85" style={{ fontFamily: "'Heebo', sans-serif" }}>{p.body}</p>
          </div>
          {i < process.length - 1 && <div className="absolute top-8 -right-2 hidden md:block" style={{ color: cyan }}>→</div>}
        </motion.div>
      ))}
    </div>
  );
}

function Numbers() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: `${cyan}33` }}>
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="p-7 relative"
          style={{ background: navy }}
        >
          <div className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: cyan }}>QTY.0{i + 1} / {s.suffix.replace("%", "PCT").replace("M³", "M3").replace("Yr", "YR").replace("+", "PLUS")}</div>
          <div className="font-archivo leading-none mb-3" style={{ fontSize: "min(15vw, 7rem)" }}>
            {s.value}<span style={{ color: cyan, fontSize: "0.45em" }}>{s.suffix}</span>
          </div>
          <div className="font-bold text-base" style={{ fontFamily: "'Heebo', sans-serif" }}>{s.label}</div>
          <div className="text-xs mt-1 opacity-70" style={{ fontFamily: "'Heebo', sans-serif" }}>{s.desc}</div>
          <div className="absolute bottom-2 right-2 text-[10px]" style={{ color: cyan }}>┘</div>
          <div className="absolute top-2 left-2 text-[10px]" style={{ color: cyan }}>┌</div>
        </motion.div>
      ))}
    </div>
  );
}

function Voices() {
  return (
    <div className="grid md:grid-cols-3 gap-px" style={{ background: `${cyan}33` }}>
      {testimonials.map((t, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="p-7 relative"
          style={{ background: navy }}
        >
          <div className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: cyan }}>NOTE.0{i + 1}</div>
          <blockquote className="text-base md:text-lg leading-snug mb-6" style={{ fontFamily: "'Heebo', sans-serif" }}>
            <span className="text-3xl leading-none" style={{ color: cyan }}>"</span>
            {t.quote}
          </blockquote>
          <figcaption className="text-[10px] uppercase tracking-[0.3em] border-t pt-3" style={{ borderColor: `${cyan}55`, fontFamily: "'IBM Plex Mono', monospace" }}>
            — {t.name}<br />
            <span className="opacity-70">{t.role}</span><br />
            <span style={{ color: cyan }}>· REF: {t.project.toUpperCase()}</span>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

function CTA() {
  return (
    <section id="cta" className="relative py-20 md:py-28 z-10 border-t" style={{ borderColor: `${cyan}33` }}>
      <div className="mx-auto max-w-[1500px] px-5 md:px-8 grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-7">
          <div className="text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: cyan }}>SHEET A-999 — SIGN-OFF</div>
          <h2 className="font-archivo text-6xl md:text-[10vw] leading-[0.85] tracking-tighter">
            <span className="block" style={{ fontFamily: "'Heebo', sans-serif", fontWeight: 900 }}>החזון שלכם.</span>
            <span className="block" style={{ color: cyan, fontFamily: "'Heebo', sans-serif", fontWeight: 900 }}>התוכניות שלנו.</span>
          </h2>
        </div>
        <div className="md:col-span-5 border-2 p-6" style={{ borderColor: cyan, background: `${cyan}10` }}>
          <div className="grid grid-cols-2 gap-y-3 text-[10px] uppercase tracking-[0.3em]" style={{ color: cyan }}>
            <span className="opacity-60">PROJECT</span><span style={{ color: cream }}>NEW CONSULTATION</span>
            <span className="opacity-60">DATE</span><span style={{ color: cream }}>{new Date().toLocaleDateString("he-IL")}</span>
            <span className="opacity-60">DURATION</span><span style={{ color: cream }}>~ 45 MIN</span>
            <span className="opacity-60">FEE</span><span style={{ color: cream }}>FREE</span>
            <span className="opacity-60">METHOD</span><span style={{ color: cream }}>ZOOM / TLV</span>
          </div>
          <a href="mailto:hello@nexusbuild.io" className="mt-6 block w-full py-3 text-center text-base font-bold uppercase tracking-[0.2em] border-2 transition-colors hover:bg-[var(--c)] hover:text-[var(--n)]" style={{ borderColor: cyan, color: cyan, "--c": cyan, "--n": navy } as any}>
            ► תיק חתימה ◄
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t py-8" style={{ borderColor: `${cyan}33` }}>
      <div className="mx-auto max-w-[1500px] px-5 md:px-8 grid grid-cols-12 gap-4 text-[10px] uppercase tracking-[0.3em] opacity-70">
        <span className="col-span-4">© NEXUS BUILD STUDIO · TLV</span>
        <span className="col-span-4 text-center" style={{ color: cyan }}>ALL DIMENSIONS IN MILLIMETRES</span>
        <a href="#" className="col-span-4 text-right">↑ TOP / SHEET A-001</a>
      </div>
    </footer>
  );
}
