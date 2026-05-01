import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services, projects, stats, testimonials, heroImage } from "../data";

const paper = "#fafaf6";
const sumi = "#1f1f1f";
const vermilion = "#ce3e1d";
const muted = "#8a8a82";

export default function KenchikuVariant() {
  return (
    <div className="min-h-screen relative" style={{ background: paper, color: sumi, fontFamily: "'Frank Ruhl Libre', 'EB Garamond', serif" }}>
      <Header />
      <SideAxis />
      <Hero />
      <Whitespace />
      <Works />
      <Practice />
      <Numbers />
      <Voices />
      <Contact />
      <Foot />
    </div>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 px-6 md:px-10 py-5 flex items-center justify-between" style={{ background: `${paper}f0`, backdropFilter: "blur(6px)" }}>
      <div className="flex items-center gap-3">
        <span className="block w-1.5 h-1.5 rounded-full" style={{ background: vermilion }} />
        <div className="text-sm" style={{ fontFamily: "'EB Garamond', serif" }}>
          <span className="italic">Nexus</span> Build <span className="italic">Studio</span>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-7 text-[11px] uppercase tracking-[0.3em]" style={{ color: muted, fontFamily: "'IBM Plex Mono', monospace" }}>
        {["works", "practice", "approach", "contact"].map((l) => (
          <a key={l} href="#" className="hover:text-[var(--ink)] transition-colors" style={{ "--ink": sumi } as any}>{l}</a>
        ))}
      </nav>
      <a href="#cta" className="text-[11px] uppercase tracking-[0.3em]" style={{ color: vermilion, fontFamily: "'IBM Plex Mono', monospace" }}>
        — make contact
      </a>
    </header>
  );
}

function SideAxis() {
  return (
    <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-4 pointer-events-none">
      <span className="text-[10px] uppercase tracking-[0.5em]" style={{ color: muted, writingMode: "vertical-rl", fontFamily: "'IBM Plex Mono', monospace" }}>
        建築 · KENCHIKU · ARCHITECTURE
      </span>
      <span className="block w-px h-32" style={{ background: `${sumi}33` }} />
      <span className="block w-2 h-2 rounded-full" style={{ background: vermilion }} />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative min-h-screen pt-32 md:pt-44 pb-12 flex flex-col">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 w-full grid lg:grid-cols-12 gap-x-10 gap-y-12 items-end flex-1">
        <div className="lg:col-span-7 lg:order-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-[10px] uppercase tracking-[0.5em] mb-12"
            style={{ color: vermilion, fontFamily: "'IBM Plex Mono', monospace" }}
          >
            一 / chapter one ・ ⌖ tlv 32.0853°N
          </motion.div>

          <h1
            className="leading-[1] mb-12"
            style={{ fontFamily: "'Frank Ruhl Libre', 'EB Garamond', serif" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
              className="block text-[14vw] md:text-[8vw] font-light tracking-tight"
            >
              שקט.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="block text-[14vw] md:text-[8vw] italic font-normal tracking-tight"
              style={{ color: vermilion }}
            >
              דיוק.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="block text-[14vw] md:text-[8vw] font-light tracking-tight"
            >
              חלל.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-base md:text-lg leading-[1.8] max-w-md"
            style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
          >
            הסטודיו פועל מתל אביב, בקצב איטי בכוונה.
            ארבעה אנשים, ארבעה תחומים, פרויקט אחד בכל פעם.
            הפילוסופיה היא שתכנון טוב הוא תכנון שמשאיר מקום ל<em style={{ color: vermilion }}>אוויר</em>.
          </motion.p>
        </div>

        <motion.figure
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="lg:col-span-5 lg:order-2 self-stretch flex flex-col justify-end"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <motion.img src={heroImage} alt="" style={{ y }} className="absolute inset-0 w-full h-[120%] object-cover grayscale" loading="eager" />
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between text-[10px] uppercase tracking-[0.4em]" style={{ color: muted, fontFamily: "'IBM Plex Mono', monospace" }}>
            <span>fig. 一 — Helix Tower</span>
            <span>2026</span>
          </figcaption>
        </motion.figure>
      </div>

      <div className="mx-auto max-w-[1500px] px-6 md:px-12 w-full mt-20 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-[0.4em] pt-8 border-t" style={{ borderColor: `${sumi}22`, color: muted, fontFamily: "'IBM Plex Mono', monospace" }}>
        <span>est. 二〇二四</span>
        <span className="text-center">studio of four</span>
        <a href="#works" className="text-right hover:text-[var(--v)] transition-colors" style={{ "--v": vermilion } as any}>scroll ↓ to works</a>
      </div>
    </section>
  );
}

function Whitespace() {
  return (
    <section className="relative py-32 md:py-56">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            className="inline-block mb-12"
          >
            {/* Ensō — single brushstroke circle, the symbol of Zen */}
            <svg width="120" height="120" viewBox="0 0 120 120">
              <motion.path
                d="M 95 60 A 35 35 0 1 1 60 25 A 35 35 0 0 1 92 50"
                stroke={sumi}
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: [0.25, 1, 0.5, 1] }}
              />
            </svg>
          </motion.div>
          <p
            className="text-3xl md:text-5xl leading-[1.4] max-w-3xl mx-auto"
            style={{ fontFamily: "'EB Garamond', 'Frank Ruhl Libre', serif", fontWeight: 400 }}
          >
            <em>"כשאדריכל בונה כמו שצייר מצייר —</em>
            <br />
            הקיר הופך לקו, הקו הופך לרעיון."
          </p>
          <div className="mt-8 text-[10px] uppercase tracking-[0.5em]" style={{ color: vermilion, fontFamily: "'IBM Plex Mono', monospace" }}>
            — מנשר הסטודיו, 2024
          </div>
        </div>
      </div>
    </section>
  );
}

function Works() {
  return (
    <section id="works" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Head n="二" en="works" he="עבודות" />
        <div className="space-y-32 md:space-y-48">
          {projects.slice(0, 3).map((p, i) => (
            <Work key={p.title} project={p} index={i} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Work({ project, index, flip }: { project: typeof projects[number]; index: number; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  return (
    <article ref={ref} className={`grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end ${flip ? "lg:[direction:rtl]" : ""}`}>
      <motion.figure
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.4 }}
        className={`lg:col-span-7 relative aspect-[4/5] overflow-hidden ${flip ? "lg:[direction:ltr]" : ""}`}
      >
        <motion.img src={project.image} alt="" style={{ y }} className="absolute inset-0 w-full h-[120%] object-cover grayscale" loading="lazy" />
      </motion.figure>
      <div className={`lg:col-span-5 ${flip ? "lg:[direction:ltr]" : ""}`}>
        <div className="text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: vermilion, fontFamily: "'IBM Plex Mono', monospace" }}>
          fig. {numerize(index + 1)} ・ {project.year}
        </div>
        <h3
          className="text-5xl md:text-7xl mb-2 leading-none font-light tracking-tight"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          {project.title}
        </h3>
        <div className="text-xl mb-8 italic font-normal" style={{ fontFamily: "'EB Garamond', serif", color: muted }}>
          {project.location}
        </div>
        <div className="space-y-3 text-[11px] uppercase tracking-[0.3em] border-t pt-4 max-w-sm" style={{ borderColor: `${sumi}22`, fontFamily: "'IBM Plex Mono', monospace" }}>
          <Row k="program" v={project.type} />
          <Row k="storeys" v={String(project.floors)} />
          <Row k="year" v={project.year} />
          <Row k="method" v="bim · iot · lidar" />
        </div>
      </div>
    </article>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="w-20" style={{ color: muted }}>{k}</span>
      <span className="block flex-1 border-b border-dotted" style={{ borderColor: `${sumi}33` }} />
      <span>{v}</span>
    </div>
  );
}

function numerize(n: number) {
  const j = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  return j[n - 1] || String(n);
}

function Practice() {
  return (
    <section id="practice" className="relative py-24 md:py-32 border-t" style={{ borderColor: `${sumi}22` }}>
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Head n="三" en="practice" he="התחומים" />
        <div className="grid md:grid-cols-2 gap-y-20 gap-x-16 max-w-5xl">
          {services.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.8 }}
            >
              <div className="text-[10px] uppercase tracking-[0.5em] mb-4 flex items-baseline gap-3" style={{ color: vermilion, fontFamily: "'IBM Plex Mono', monospace" }}>
                <span>{numerize(i + 1)}</span>
                <span className="block w-8 h-px" style={{ background: vermilion }} />
                <span>{s.tag}</span>
              </div>
              <h3 className="text-3xl md:text-5xl mb-4 leading-tight font-light" style={{ fontFamily: "'EB Garamond', 'Frank Ruhl Libre', serif" }}>
                {s.title}
              </h3>
              <p className="text-base leading-[1.8] mb-5 max-w-md" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
                {s.body}
              </p>
              <div className="text-[10px] uppercase tracking-[0.4em]" style={{ color: muted, fontFamily: "'IBM Plex Mono', monospace" }}>
                {s.tools.join(" ・ ")}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Head({ n, en, he }: { n: string; en: string; he: string }) {
  return (
    <header className="grid grid-cols-12 items-baseline mb-16 md:mb-24">
      <div className="col-span-2 text-7xl md:text-8xl font-light leading-none" style={{ fontFamily: "'EB Garamond', serif" }}>{n}</div>
      <div className="col-span-7 md:col-span-8 pb-3"><div className="border-b border-dotted" style={{ borderColor: `${sumi}33` }} /></div>
      <div className="col-span-3 md:col-span-2 text-right">
        <div className="text-2xl italic" style={{ fontFamily: "'EB Garamond', serif" }}>{en}</div>
        <div className="text-xs uppercase tracking-[0.4em] mt-1" style={{ color: muted, fontFamily: "'IBM Plex Mono', monospace" }}>{he}</div>
      </div>
    </header>
  );
}

function Numbers() {
  return (
    <section id="stats" className="relative py-24 md:py-32 border-t" style={{ borderColor: `${sumi}22` }}>
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Head n="四" en="figures" he="המספרים" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`p-8 ${i > 0 ? "border-t lg:border-t-0 lg:border-l" : ""}`}
              style={{ borderColor: `${sumi}22` }}
            >
              <div className="text-[10px] uppercase tracking-[0.5em] mb-2" style={{ color: vermilion, fontFamily: "'IBM Plex Mono', monospace" }}>
                fig. {numerize(i + 1)}
              </div>
              <div className="leading-none mb-3 font-light" style={{ fontFamily: "'EB Garamond', serif", fontSize: "min(15vw, 6rem)" }}>
                {s.value}<span className="italic" style={{ color: vermilion, fontSize: "0.5em" }}>{s.suffix}</span>
              </div>
              <div className="text-base" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>{s.label}</div>
              <div className="text-xs italic mt-1" style={{ color: muted, fontFamily: "'EB Garamond', serif" }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section className="relative py-24 md:py-32 border-t" style={{ borderColor: `${sumi}22` }}>
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <Head n="五" en="voices" he="המלצות" />
        <div className="space-y-20">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
              className="grid md:grid-cols-12 gap-x-10 gap-y-3"
            >
              <div className="md:col-span-2 text-[10px] uppercase tracking-[0.5em]" style={{ color: vermilion, fontFamily: "'IBM Plex Mono', monospace" }}>
                {numerize(i + 1)} ・ note
              </div>
              <blockquote className="md:col-span-10 text-2xl md:text-3xl leading-snug font-light" style={{ fontFamily: "'EB Garamond', serif" }}>
                "{t.quote}"
                <figcaption className="text-sm italic mt-4 not-italic" style={{ fontFamily: "'Frank Ruhl Libre', serif", color: muted }}>
                  — <span className="italic">{t.name}</span>, {t.role} · <span style={{ color: vermilion }}>{t.project}</span>
                </figcaption>
              </blockquote>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="cta" className="relative py-24 md:py-44 border-t" style={{ borderColor: `${sumi}22` }}>
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <Head n="六" en="contact" he="יצירת קשר" />
        <div className="grid md:grid-cols-12 gap-x-10 gap-y-8">
          <div className="md:col-span-7">
            <h2 className="text-5xl md:text-7xl leading-[1] font-light" style={{ fontFamily: "'EB Garamond', 'Frank Ruhl Libre', serif" }}>
              שיחה ראשונה,
              <br />
              <em style={{ color: vermilion }}>בלי התחייבות.</em>
            </h2>
          </div>
          <div className="md:col-span-5 space-y-6">
            <p className="text-base leading-[1.8]" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
              אנחנו לוקחים מספר מצומצם של פרויקטים בכל שנה.
              נשמח להכיר ולהבין אם הסטודיו מתאים לכם, גם אם לא נעבוד יחד.
            </p>
            <div className="space-y-2 text-[11px] uppercase tracking-[0.4em] border-t pt-5" style={{ borderColor: `${sumi}22`, fontFamily: "'IBM Plex Mono', monospace" }}>
              <div className="flex justify-between"><span style={{ color: muted }}>email</span><a href="mailto:hello@nexusbuild.io" style={{ color: vermilion }}>hello@nexusbuild.io</a></div>
              <div className="flex justify-between"><span style={{ color: muted }}>tel</span><span>+972 ・ 3 ・ 1234567</span></div>
              <div className="flex justify-between"><span style={{ color: muted }}>studio</span><span>halevavot 14, tlv</span></div>
            </div>
            <a
              href="mailto:hello@nexusbuild.io"
              className="block text-center py-4 text-sm uppercase tracking-[0.4em] transition-colors"
              style={{ background: sumi, color: paper, fontFamily: "'IBM Plex Mono', monospace" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = vermilion; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = sumi; }}
            >
              — write to studio →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Foot() {
  return (
    <footer className="py-10 border-t" style={{ borderColor: `${sumi}22` }}>
      <div className="mx-auto max-w-[1500px] px-6 md:px-12 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-[0.4em]" style={{ color: muted, fontFamily: "'IBM Plex Mono', monospace" }}>
        <span>© nexus build studio · 二〇二六</span>
        <span className="text-center" style={{ color: vermilion }}>建築 ・ kenchiku</span>
        <a href="#" className="text-right">↑ to top</a>
      </div>
    </footer>
  );
}
