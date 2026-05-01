import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { services, projects, stats, testimonials, process } from "../data";
import { useTextScramble } from "../hooks/useTextScramble";

const orange = "#ff5b1f";
const ink = "#000";
const paper = "#fff";

export default function BrutalistVariant() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: paper, color: ink, fontFamily: "'JetBrains Mono', monospace" }}
    >
      <ScanLines />
      <MouseTrail />
      <Ticker />
      <Header />
      <Hero />
      <MarqueeWall />
      <ServicesGrid />
      <RotatedStamp />
      <ProjectsList />
      <ProcessBlocks />
      <NumbersWall />
      <Quotes />
      <CTABlock />
      <FooterB />
    </div>
  );
}

function ScanLines() {
  return (
    <div
      className="fixed inset-0 z-[5] pointer-events-none mix-blend-multiply opacity-[0.06]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0, rgba(0,0,0,0.5) 1px, transparent 1px, transparent 4px)",
      }}
    />
  );
}

function MouseTrail() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 200 });
  const sy = useSpring(y, { damping: 30, stiffness: 200 });
  useEffect(() => {
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);
  return (
    <motion.div
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", background: orange }}
      className="fixed top-0 left-0 w-3 h-3 z-[8] pointer-events-none mix-blend-difference"
    />
  );
}

function Ticker() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${d.getUTCHours()}:${String(d.getUTCMinutes()).padStart(2, "0")}:${String(d.getUTCSeconds()).padStart(2, "0")} UTC`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const items = [
    `[${time}]`,
    "▲ NEXUS BUILD STUDIO",
    "TLV.IL · 32.0853°N / 34.7818°E",
    "OPERATIONAL · 187 PROJECTS · 24 STAFF",
    "AI / IOT / SCAN / PARAMETRIC",
    "■ ESTABLISHED 2024",
  ];
  return (
    <div
      className="fixed top-0 inset-x-0 z-50 border-b-4 overflow-hidden h-7 flex items-center"
      style={{ borderColor: ink, background: ink, color: paper }}
    >
      <div className="flex gap-8 animate-marquee whitespace-nowrap text-[10px] uppercase tracking-[0.3em]">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} style={{ color: i % items.length === 1 ? orange : paper }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header
      className="fixed inset-x-0 top-7 z-40 border-b-4"
      style={{ borderColor: ink, background: paper }}
    >
      <div className="grid grid-cols-12">
        <div
          className="col-span-3 md:col-span-2 border-l-4 border-r-4 px-4 py-3 text-2xl font-black tracking-tighter uppercase"
          style={{ borderColor: ink }}
        >
          NEXUS<span style={{ color: orange }}>/</span>BUILD
        </div>
        <div
          className="hidden md:flex col-span-7 items-center px-6 text-[10px] uppercase tracking-[0.3em] border-r-4 gap-2 overflow-hidden"
          style={{ borderColor: ink }}
        >
          {["SERVICES", "PROJECTS", "PROCESS", "STATS", "VOICES", "CONTACT"].map((l, i) => (
            <a key={l} href="#" className="px-3 py-1 hover:bg-black hover:text-white transition-colors flex items-center gap-2">
              <span style={{ color: orange }}>0{i + 1}</span>
              {l}
            </a>
          ))}
        </div>
        <a
          href="#cta"
          className="col-span-9 md:col-span-3 px-4 py-3 text-base font-black uppercase text-center hover:bg-black hover:text-white transition-colors border-r-4"
          style={{ background: orange, color: ink, borderColor: ink }}
        >
          ► START PROJECT ◄
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  return (
    <section ref={ref} className="relative pt-24 md:pt-28 overflow-hidden">
      <div className="border-b-4" style={{ borderColor: ink }}>
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-9 border-l-4 border-r-4 p-6 md:p-10 relative overflow-hidden" style={{ borderColor: ink }}>
            <div className="text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <span className="block w-12 h-1" style={{ background: orange }} />
              <span>FILE: HERO.001 / 2026</span>
              <span style={{ color: orange }}>●●●</span>
              <span style={{ opacity: 0.6 }}>VERSION 04 — STABLE</span>
            </div>
            <motion.h1 className="font-black uppercase tracking-tighter leading-[0.8]" style={{ y }}>
              <span className="block text-[20vw] md:text-[14vw]">בונים</span>
              <span className="block text-[20vw] md:text-[14vw] -my-2 md:-my-4 relative" style={{ color: orange }}>
                את העתיד
                <span className="absolute -top-4 -right-4 w-8 h-8 rounded-full border-4 animate-pulse" style={{ borderColor: orange }} />
              </span>
              <span className="block text-[20vw] md:text-[14vw]" style={{ WebkitTextStroke: "2px black", color: "transparent" }}>
                במהירות
              </span>
            </motion.h1>
            <div className="mt-6 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-[0.3em] border-t-2 pt-4" style={{ borderColor: ink }}>
              <div>
                <div style={{ color: orange }}>// CLIENT</div>
                <div className="font-black">187+</div>
                <div style={{ opacity: 0.6 }}>SHIPPED</div>
              </div>
              <div>
                <div style={{ color: orange }}>// SCANS</div>
                <div className="font-black">42M³</div>
                <div style={{ opacity: 0.6 }}>LIDAR</div>
              </div>
              <div>
                <div style={{ color: orange }}>// UPTIME</div>
                <div className="font-black">98%</div>
                <div style={{ opacity: 0.6 }}>SAT</div>
              </div>
            </div>
          </div>
          <div
            className="col-span-12 md:col-span-3 border-r-4 p-6 md:p-10 flex flex-col justify-between gap-8 relative overflow-hidden"
            style={{ borderColor: ink, background: ink, color: paper }}
          >
            <pre className="text-[8px] leading-[1.2] absolute inset-0 p-2 opacity-20 pointer-events-none whitespace-pre overflow-hidden">
{`█▓▒░ NEXUS-OS v4.0
> init scene helix-tower
> load lidar.scan
> compute climate
> render @ 144fps
> deploy.smart-grid
> sync iot.cluster
░▒▓█ READY
█▓▒░ NEXUS-OS v4.0
> init scene helix-tower
> load lidar.scan
> compute climate`}
            </pre>
            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: orange }}>►► STATUS</div>
              <div className="text-sm uppercase">סטודיו אדריכלות שמשלב AI, סריקות 3D ו-IoT לבנייה חכמה.</div>
            </div>
            <div className="relative">
              <RollingNumber target={187} suffix="+" />
              <div className="text-[10px] uppercase tracking-[0.3em] mt-1" style={{ color: orange }}>PROJECTS SHIPPED</div>
            </div>
            <a
              href="#cta"
              className="relative block w-full text-center text-lg font-black uppercase py-4 border-4 hover:scale-[1.02] transition-transform"
              style={{ background: orange, color: ink, borderColor: orange }}
            >
              [ START → ]
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function RollingNumber({ target, suffix }: { target: number; suffix: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let start = 0;
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      const n = Math.min(Math.floor(target * (frame / 40)), target);
      setV(n);
      if (n >= target) clearInterval(id);
    }, 40);
    return () => clearInterval(id);
  }, [target]);
  return (
    <div className="text-7xl md:text-8xl font-black tracking-tighter leading-none">
      {v}
      <span>{suffix}</span>
    </div>
  );
}

function MarqueeWall() {
  const top = ["PARAMETRIC", "★", "3D LASER SCAN", "★", "AI RENDERS", "★", "BIM 360", "★", "SMART IOT", "★"];
  const mid = ["TLV → JLM → HFA → ELT → JCY", "▲", "EST. 2024", "▲", "24 STAFF", "▲", "187 PROJECTS", "▲"];
  const bot = ["RAW.", "■", "UNFILTERED.", "■", "ARCHITECTURE.", "■", "BY THE BIT.", "■"];

  return (
    <section style={{ background: orange, color: ink }} className="border-y-4 overflow-hidden" >
      <div className="overflow-hidden border-b-2 py-2" style={{ borderColor: ink }}>
        <div className="flex gap-6 animate-marquee whitespace-nowrap text-xl md:text-3xl font-black uppercase">
          {[...top, ...top, ...top].map((t, i) => (
            <span key={i} style={{ color: t === "★" ? paper : ink }}>{t}</span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden border-b-2 py-2 bg-black text-white" style={{ borderColor: ink }}>
        <div className="flex gap-6 animate-marquee-r whitespace-nowrap text-base font-bold uppercase tracking-[0.3em]">
          {[...mid, ...mid, ...mid].map((t, i) => (
            <span key={i} style={{ color: t === "▲" ? orange : paper }}>{t}</span>
          ))}
        </div>
      </div>
      <div className="overflow-hidden py-3">
        <div className="flex gap-6 animate-marquee whitespace-nowrap text-3xl md:text-5xl font-black uppercase">
          {[...bot, ...bot, ...bot].map((t, i) => (
            <span key={i} style={{ color: t === "■" ? paper : ink }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceTitle({ title }: { title: string }) {
  const [hover, setHover] = useState(false);
  const text = useTextScramble(title, { trigger: hover });
  return (
    <span onMouseEnter={() => setHover((s) => !s)}>{text}</span>
  );
}

function ServicesGrid() {
  return (
    <section className="border-b-4" style={{ borderColor: ink }}>
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-4 border-l-4 border-r-4 p-8 md:p-12 sticky top-32 self-start hidden md:block" style={{ borderColor: ink }}>
          <div className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: orange }}>§02 / SERVICES</div>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6">ARSENAL</h2>
          <div className="text-base uppercase mb-6">ארבעה תחומים. סטודיו אחד.</div>
          <div className="border-t-4 pt-4 text-[10px] uppercase tracking-[0.3em]" style={{ borderColor: ink }}>
            <div className="flex justify-between"><span>RANGE</span><span>04 / 04</span></div>
            <div className="flex justify-between mt-1"><span>STATUS</span><span style={{ color: orange }}>● ALL ACTIVE</span></div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 border-r-4" style={{ borderColor: ink }}>
          {services.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="border-b-4 p-6 md:p-10 group cursor-pointer relative overflow-hidden"
              style={{ borderColor: ink }}
            >
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"
                style={{ background: ink }}
              />
              <div className="relative group-hover:text-white transition-colors duration-500">
                <div className="flex items-center justify-between mb-6 text-[10px] uppercase tracking-[0.3em]">
                  <span>{s.tag}</span>
                  <span style={{ color: orange }}>● {s.n}</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
                  <ServiceTitle title={s.title} />
                </h3>
                <p className="text-base md:text-lg uppercase max-w-2xl mb-6">{s.body}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tools.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-widest px-3 py-1 border-2"
                      style={{ borderColor: "currentColor", color: orange }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RotatedStamp() {
  return (
    <section className="border-b-4 relative overflow-hidden" style={{ borderColor: ink, background: ink, color: paper }}>
      {/* Oversized rotated word that breaks the right edge — grid-breaking decoration */}
      <motion.div
        initial={{ x: 200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.65, 0.05, 0.36, 1] }}
        className="absolute top-1/2 -translate-y-1/2 -right-[10%] md:-right-[6%] text-[28vw] md:text-[20vw] font-black tracking-tighter leading-none pointer-events-none select-none"
        style={{ WebkitTextStroke: `2px ${orange}`, color: "transparent", transform: "rotate(-90deg)", transformOrigin: "right center" }}
      >
        BRUTAL.
      </motion.div>

      <div className="border-l-4 border-r-4 px-6 md:px-10 py-12 relative" style={{ borderColor: ink }}>
        <motion.div
          initial={{ rotate: -12, scale: 0.7, opacity: 0 }}
          whileInView={{ rotate: -8, scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 w-32 h-32 md:w-44 md:h-44 border-4 rounded-full flex items-center justify-center text-center pointer-events-none"
          style={{ borderColor: orange, background: paper, color: ink }}
        >
          <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] leading-tight">
            ★<br />
            CERTIFIED<br />
            BUILT BY<br />
            BYTES<br />
            EST.2024<br />
            ★
          </div>
        </motion.div>
        <div className="text-[10px] uppercase tracking-[0.3em] mb-8" style={{ color: orange }}>§ MANIFESTO ★</div>
        <h2 className="text-5xl md:text-7xl lg:text-[9vw] font-black uppercase tracking-tighter leading-[0.85] max-w-4xl">
          לא מציירים בניינים.
          <br />
          <span style={{ color: orange }}>מקודדים אותם.</span>
          <br />
          <span style={{ WebkitTextStroke: `2px ${paper}`, color: "transparent" }}>בשפת מכונה.</span>
        </h2>
      </div>
    </section>
  );
}

function ProjectsList() {
  return (
    <section className="border-b-4" style={{ borderColor: ink, background: paper, color: ink }}>
      <div className="border-l-4 border-r-4 px-6 md:px-10 py-12" style={{ borderColor: ink }}>
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: orange }}>§03 / PORTFOLIO</span>
          <span className="block flex-1 h-1" style={{ background: ink }} />
          <span className="text-[10px] uppercase tracking-[0.3em]">005 ENTRIES</span>
        </div>
        <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] mb-12">PROJECTS↘</h2>

        <div className="border-y-4" style={{ borderColor: ink }}>
          {projects.map((p, i) => (
            <ProjectRow key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: typeof projects[number]; index: number }) {
  const [hover, setHover] = useState(false);
  const title = useTextScramble(project.title, { trigger: hover });
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onMouseEnter={() => setHover((s) => !s)}
      className="grid grid-cols-12 items-center border-b-2 py-6 group cursor-pointer relative overflow-hidden"
      style={{ borderColor: ink }}
    >
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" style={{ background: ink }} />
      <div className="contents group-hover:text-white relative" style={{ position: "relative" }}>
        <div className="col-span-1 text-xs uppercase tracking-[0.3em] z-10" style={{ color: orange }}>0{index + 1}</div>
        <div className="col-span-5 md:col-span-4 text-3xl md:text-5xl font-black uppercase tracking-tighter z-10">{title}</div>
        <div className="col-span-3 md:col-span-3 text-xs uppercase tracking-widest hidden md:block z-10">{project.location}</div>
        <div className="col-span-3 md:col-span-2 text-xs uppercase tracking-widest hidden md:block z-10">{project.type}</div>
        <div className="col-span-2 md:col-span-1 text-xs uppercase tracking-widest text-left z-10">{project.year}</div>
        <div className="col-span-4 md:col-span-1 text-3xl text-left z-10">→</div>
      </div>
    </motion.a>
  );
}

function ProcessBlocks() {
  return (
    <section className="border-b-4" style={{ borderColor: ink }}>
      <div className="border-l-4 border-r-4 px-6 md:px-10 py-12" style={{ borderColor: ink }}>
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: orange }}>§04 / WORKFLOW</span>
          <span className="block flex-1 h-1" style={{ background: ink }} />
          <span className="text-[10px] uppercase tracking-[0.3em]">005 STEPS</span>
        </div>
        <div className="grid md:grid-cols-5 gap-px border-2" style={{ background: ink, borderColor: ink }}>
          {process.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-5 md:p-7 min-h-[300px] flex flex-col justify-between hover:bg-orange-500 transition-colors group"
              style={{ background: i % 2 === 0 ? paper : "#fafafa" }}
            >
              <div>
                <div className="text-7xl md:text-8xl font-black tracking-tighter leading-none mb-4" style={{ color: orange }}>
                  {p.n}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{p.title}</h3>
                <p className="text-xs uppercase leading-snug" style={{ opacity: 0.7 }}>{p.body}</p>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] mt-4 pt-4 border-t-2" style={{ borderColor: ink }}>{p.duration}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NumbersWall() {
  return (
    <section className="border-b-4" style={{ borderColor: ink, background: orange, color: ink }}>
      <div className="border-l-4 border-r-4 px-6 md:px-10 py-16" style={{ borderColor: ink }}>
        <div className="text-[10px] uppercase tracking-[0.3em] mb-12">§05 / METRICS</div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
          {stats.map((s, i) => (
            <CounterRow key={i} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CounterRow({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([en]) => {
        if (en.isIntersecting) {
          let frame = 0;
          const id = setInterval(() => {
            frame++;
            const n = Math.min(Math.floor(stat.value * (frame / 50)), stat.value);
            setV(n);
            if (n >= stat.value) clearInterval(id);
          }, 30);
          return () => clearInterval(id);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [stat.value]);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="border-b-4 pb-8 flex items-baseline gap-6"
      style={{ borderColor: ink }}
    >
      <div className="font-black tracking-tighter leading-none" style={{ fontSize: "min(20vw, 14rem)" }}>
        {v}
        <span style={{ fontSize: "0.4em" }}>{stat.suffix}</span>
      </div>
      <div className="flex-1">
        <div className="text-xl md:text-2xl font-black uppercase tracking-tight">{stat.label}</div>
        <div className="text-xs uppercase mt-1" style={{ opacity: 0.7 }}>{stat.desc}</div>
      </div>
    </motion.div>
  );
}

function Quotes() {
  return (
    <section className="border-b-4" style={{ borderColor: ink }}>
      <div className="border-l-4 border-r-4 px-6 md:px-10 py-16" style={{ borderColor: ink }}>
        <div className="text-[10px] uppercase tracking-[0.3em] mb-10" style={{ color: orange }}>§06 / VOICES</div>
        <div className="grid md:grid-cols-3 gap-px" style={{ background: ink }}>
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-7 md:p-9 hover:bg-black hover:text-white transition-colors group"
              style={{ background: paper }}
            >
              <div className="text-6xl font-black leading-none mb-3" style={{ color: orange }}>"</div>
              <blockquote className="text-base md:text-lg uppercase leading-snug font-bold mb-6">{t.quote}</blockquote>
              <figcaption className="border-t-2 pt-4 text-[10px] uppercase tracking-[0.3em]" style={{ borderColor: "currentColor" }}>
                — {t.name}
                <br />
                <span style={{ opacity: 0.6 }}>{t.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABlock() {
  return (
    <section id="cta" className="border-b-4" style={{ borderColor: ink, background: ink, color: paper }}>
      <div className="border-l-4 border-r-4 px-6 md:px-10 py-24 md:py-32 text-center relative overflow-hidden" style={{ borderColor: ink }}>
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <div className="text-[40vw] font-black leading-none" style={{ color: orange }}>★</div>
        </div>
        <div className="relative">
          <div className="text-[10px] uppercase tracking-[0.3em] mb-8" style={{ color: orange }}>§07 / CONTACT</div>
          <h2 className="text-7xl md:text-[14vw] font-black uppercase tracking-tighter leading-[0.85] mb-12">
            <span className="block">יש לכם חזון.</span>
            <span className="block" style={{ color: orange }}>נבנה אותו.</span>
          </h2>
          <a
            href="mailto:hello@nexusbuild.io"
            className="inline-block text-2xl md:text-3xl font-black uppercase px-12 py-6 border-4 transition-colors"
            style={{ borderColor: orange, background: orange, color: ink }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = paper;
              e.currentTarget.style.borderColor = paper;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = orange;
              e.currentTarget.style.borderColor = orange;
            }}
          >
            ► קבע פגישה ◄
          </a>
        </div>
      </div>
    </section>
  );
}

function FooterB() {
  return (
    <footer style={{ background: paper, color: ink }}>
      <div className="border-l-4 border-r-4 px-6 md:px-10 py-8 grid md:grid-cols-3 gap-4 text-[10px] uppercase tracking-[0.3em]" style={{ borderColor: ink }}>
        <span>© NEXUS BUILD — 2026</span>
        <span className="text-center">RAW. UNFILTERED. ARCHITECTURE.</span>
        <a href="#" style={{ color: orange }}>↑ TOP</a>
      </div>
    </footer>
  );
}
