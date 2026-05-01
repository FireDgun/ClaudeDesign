import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services, projects, stats, testimonials, process } from "../data";

const orange = "#ff5b1f";
const ink = "#000";
const paper = "#fff";

export default function BrutalistVariant() {
  return (
    <div
      className="min-h-screen font-mono"
      style={{ background: paper, color: ink, fontFamily: "'JetBrains Mono', monospace" }}
    >
      <Header />
      <Hero />
      <Strip />
      <ServicesGrid />
      <ProjectsList />
      <ProcessBlocks />
      <NumbersWall />
      <Quotes />
      <CTABlock />
      <FooterB />
    </div>
  );
}

function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 border-b-4"
      style={{ borderColor: ink, background: paper }}
    >
      <div className="grid grid-cols-12 border-collapse">
        <div className="col-span-3 md:col-span-2 border-l-4 border-r-4 px-4 py-4 text-2xl font-black tracking-tighter uppercase" style={{ borderColor: ink }}>
          NEXUS<span style={{ color: orange }}>/</span>BUILD
        </div>
        <div className="hidden md:flex col-span-6 items-center px-6 text-[10px] uppercase tracking-[0.3em] border-r-4" style={{ borderColor: ink }}>
          <span>EST.2024</span>
          <span className="px-3" style={{ color: orange }}>×</span>
          <span>ARCHITECTURE</span>
          <span className="px-3" style={{ color: orange }}>×</span>
          <span>AI / IOT</span>
          <span className="px-3" style={{ color: orange }}>×</span>
          <span>TLV.IL</span>
        </div>
        <a
          href="#cta"
          className="col-span-9 md:col-span-4 px-4 py-4 text-base font-black uppercase text-center hover:bg-black hover:text-white transition-colors border-r-4"
          style={{ background: orange, color: ink, borderColor: ink }}
        >
          ► צרו קשר ◄
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
          <div className="col-span-12 md:col-span-9 border-l-4 border-r-4 p-6 md:p-10" style={{ borderColor: ink }}>
            <div className="text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <span className="block w-12 h-1" style={{ background: orange }} />
              <span>FILE: HERO.001 / 2026</span>
            </div>
            <motion.h1
              className="font-black uppercase tracking-tighter leading-[0.8]"
              style={{ y }}
            >
              <span className="block text-[20vw] md:text-[14vw]">בונים</span>
              <span className="block text-[20vw] md:text-[14vw] -my-2 md:-my-4" style={{ color: orange }}>
                את העתיד
              </span>
              <span className="block text-[20vw] md:text-[14vw] outline-text">
                במהירות
              </span>
            </motion.h1>
          </div>
          <div className="col-span-12 md:col-span-3 border-r-4 p-6 md:p-10 flex flex-col justify-between gap-8" style={{ borderColor: ink, background: ink, color: paper }}>
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: orange }}>
                ►► STATUS
              </div>
              <div className="text-sm uppercase">
                סטודיו אדריכלות שמשלב AI, סריקות 3D ו-IoT לבנייה חכמה.
              </div>
            </div>
            <div>
              <div className="text-7xl md:text-8xl font-black tracking-tighter leading-none mb-2">
                187+
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: orange }}>
                PROJECTS SHIPPED
              </div>
            </div>
            <a
              href="#cta"
              className="block w-full text-center text-lg font-black uppercase py-4 border-2 hover:scale-[1.02] transition-transform"
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

function Strip() {
  const items = [
    "PARAMETRIC DESIGN",
    "★",
    "3D LASER SCAN",
    "★",
    "AI RENDERS",
    "★",
    "BIM",
    "★",
    "SMART IOT",
    "★",
    "ENERGY OPT",
    "★",
  ];
  return (
    <div className="overflow-hidden border-b-4 py-4" style={{ background: ink, color: paper, borderColor: ink }}>
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((it, i) => (
          <span
            key={i}
            className={`text-2xl md:text-4xl font-black uppercase ${
              it === "★" ? "" : ""
            }`}
            style={{ color: it === "★" ? orange : paper }}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

function ServicesGrid() {
  return (
    <section className="border-b-4" style={{ borderColor: ink }}>
      <div className="grid grid-cols-12 border-collapse">
        <div className="col-span-12 md:col-span-4 border-l-4 border-r-4 p-8 md:p-12 sticky top-20 self-start hidden md:block" style={{ borderColor: ink }}>
          <div className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: orange }}>
            §02 / SERVICES
          </div>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
            ARSENAL
          </h2>
          <p className="text-base uppercase">ארבעה תחומים. סטודיו אחד.</p>
        </div>
        <div className="col-span-12 md:col-span-8 border-r-4" style={{ borderColor: ink }}>
          {services.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`border-b-4 p-6 md:p-10 group cursor-pointer hover:text-white transition-colors`}
              style={{ borderColor: ink }}
              onMouseEnter={(e) => (e.currentTarget.style.background = ink)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div className="flex items-center justify-between mb-6 text-[10px] uppercase tracking-[0.3em]">
                <span>{s.tag}</span>
                <span style={{ color: orange }}>● {s.n}</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
                {s.title}
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsList() {
  return (
    <section className="border-b-4" style={{ borderColor: ink, background: ink, color: paper }}>
      <div className="border-l-4 border-r-4 px-6 md:px-10 py-12" style={{ borderColor: ink }}>
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: orange }}>§03 / PORTFOLIO</span>
          <span className="block flex-1 h-1" style={{ background: orange }} />
          <span className="text-[10px] uppercase tracking-[0.3em]">005 ENTRIES</span>
        </div>
        <h2 className="text-7xl md:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] mb-12">
          PROJECTS
        </h2>

        <div className="space-y-0 border-y-4" style={{ borderColor: paper }}>
          {projects.map((p, i) => (
            <motion.a
              href="#"
              key={p.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="grid grid-cols-12 items-center border-b-2 py-6 group cursor-pointer hover:bg-white hover:text-black transition-colors"
              style={{ borderColor: paper }}
            >
              <div className="col-span-1 text-xs uppercase tracking-[0.3em]" style={{ color: orange }}>
                0{i + 1}
              </div>
              <div className="col-span-5 md:col-span-4 text-3xl md:text-5xl font-black uppercase tracking-tighter">
                {p.title}
              </div>
              <div className="col-span-3 md:col-span-3 text-xs uppercase tracking-widest hidden md:block">
                {p.location}
              </div>
              <div className="col-span-3 md:col-span-2 text-xs uppercase tracking-widest hidden md:block">
                {p.type}
              </div>
              <div className="col-span-2 md:col-span-1 text-xs uppercase tracking-widest text-left">
                {p.year}
              </div>
              <div className="col-span-4 md:col-span-1 text-3xl text-left">→</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessBlocks() {
  return (
    <section className="border-b-4" style={{ borderColor: ink }}>
      <div className="border-l-4 border-r-4 px-6 md:px-10 py-12" style={{ borderColor: ink }}>
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em]" style={{ color: orange }}>
            §04 / WORKFLOW
          </span>
          <span className="block flex-1 h-1" style={{ background: ink }} />
          <span className="text-[10px] uppercase tracking-[0.3em]">005 STEPS</span>
        </div>
        <div className="grid md:grid-cols-5 gap-px border-2" style={{ background: ink, borderColor: ink }}>
          {process.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-5 md:p-7 min-h-[280px] flex flex-col justify-between"
              style={{ background: i % 2 === 0 ? paper : "#fafafa" }}
            >
              <div>
                <div className="text-7xl md:text-8xl font-black tracking-tighter leading-none mb-4" style={{ color: orange }}>
                  {p.n}
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-2">{p.title}</h3>
                <p className="text-xs uppercase leading-snug" style={{ opacity: 0.7 }}>
                  {p.body}
                </p>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] mt-4 pt-4 border-t-2" style={{ borderColor: ink }}>
                {p.duration}
              </div>
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
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="border-b-4 pb-8 flex items-baseline gap-6"
              style={{ borderColor: ink }}
            >
              <div className="font-black tracking-tighter leading-none" style={{ fontSize: "min(20vw, 14rem)" }}>
                {s.value}
                <span style={{ fontSize: "0.4em" }}>{s.suffix}</span>
              </div>
              <div className="flex-1">
                <div className="text-xl md:text-2xl font-black uppercase tracking-tight">{s.label}</div>
                <div className="text-xs uppercase mt-1" style={{ opacity: 0.7 }}>
                  {s.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quotes() {
  return (
    <section className="border-b-4" style={{ borderColor: ink }}>
      <div className="border-l-4 border-r-4 px-6 md:px-10 py-16" style={{ borderColor: ink }}>
        <div className="text-[10px] uppercase tracking-[0.3em] mb-10" style={{ color: orange }}>
          §06 / VOICES
        </div>
        <div className="grid md:grid-cols-3 gap-px" style={{ background: ink }}>
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="p-7 md:p-9"
              style={{ background: paper }}
            >
              <div className="text-6xl font-black leading-none mb-3" style={{ color: orange }}>
                "
              </div>
              <blockquote className="text-base md:text-lg uppercase leading-snug font-bold mb-6">{t.quote}</blockquote>
              <figcaption className="border-t-2 pt-4 text-[10px] uppercase tracking-[0.3em]" style={{ borderColor: ink }}>
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
      <div className="border-l-4 border-r-4 px-6 md:px-10 py-24 md:py-32 text-center" style={{ borderColor: ink }}>
        <div className="text-[10px] uppercase tracking-[0.3em] mb-8" style={{ color: orange }}>
          §07 / CONTACT
        </div>
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
    </section>
  );
}

function FooterB() {
  return (
    <footer style={{ background: paper, color: ink }}>
      <div className="border-l-4 border-r-4 px-6 md:px-10 py-8 grid md:grid-cols-3 gap-4 text-[10px] uppercase tracking-[0.3em]" style={{ borderColor: ink }}>
        <span>© NEXUS BUILD — 2026</span>
        <span className="text-center">RAW. UNFILTERED. ARCHITECTURE.</span>
        <a href="#" className="text-left md:text-left" style={{ color: orange }}>
          ↑ TOP
        </a>
      </div>
    </footer>
  );
}
