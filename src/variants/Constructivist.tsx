import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services, projects, stats, testimonials, process } from "../data";

const bone = "#f4ebe1";
const red = "#c81d1d";
const ink = "#0a0a0a";
const ochre = "#d6a019";

export default function ConstructivistVariant() {
  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: bone, color: ink, fontFamily: "'Heebo', sans-serif" }}>
      <Halftone />
      <Ticker />
      <Header />
      <Hero />
      <Slogan />
      <Sections />
      <Manifesto />
      <ProjectsSlab />
      <Workflow />
      <NumbersBig />
      <Quotes />
      <CTA />
      <Footer />
    </div>
  );
}

function Halftone() {
  return (
    <svg className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.07]" aria-hidden>
      <defs>
        <pattern id="dots" patternUnits="userSpaceOnUse" width="14" height="14">
          <circle cx="3" cy="3" r="1.4" fill={ink} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}

function Ticker() {
  const items = ["★ NEXUS BUILD ★ EST.2024 ★ TLV ★ ORDER №04 ★ STUDIO OF THE PEOPLE ★ AI · IOT · LIDAR ★"];
  return (
    <div className="fixed top-0 inset-x-0 z-40 border-b-[3px] py-1 overflow-hidden" style={{ background: ink, color: bone, borderColor: red }}>
      <div className="flex gap-8 animate-marquee whitespace-nowrap text-sm font-archivo uppercase tracking-[0.3em]">
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} style={{ color: i % 2 === 0 ? bone : red }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-7 inset-x-0 z-30 border-b-[3px]" style={{ borderColor: ink, background: bone }}>
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-3 md:col-span-2 px-4 py-3 border-l-[3px] border-r-[3px] flex items-center gap-2" style={{ borderColor: ink }}>
          <span className="block w-5 h-5" style={{ background: red }} />
          <span className="font-archivo text-xl tracking-tight">נקסוס</span>
        </div>
        <nav className="hidden md:flex col-span-7 items-center px-6 gap-6 text-[11px] uppercase tracking-[0.3em] font-archivo border-r-[3px] py-3" style={{ borderColor: ink }}>
          {["§I פתיח", "§II תחומים", "§III פרויקטים", "§IV מנשר", "§V מספרים", "§VI קולות"].map((l, i) => (
            <a key={l} href="#" className="hover:text-[var(--r)] transition-colors" style={{ "--r": red } as any}>{l}</a>
          ))}
        </nav>
        <a
          href="#cta"
          className="col-span-9 md:col-span-3 px-4 py-3 text-base text-center font-archivo uppercase tracking-[0.2em] hover:bg-[var(--r)] transition-colors border-r-[3px]"
          style={{ background: ink, color: bone, borderColor: ink, "--r": red } as any}
        >
          ► נא לפנות לסטודיו ◄
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-28 md:pt-32 pb-20 z-10 overflow-hidden">
      {/* Big red diagonal wedge — El Lissitzky homage */}
      <motion.div
        initial={{ x: 200, opacity: 0, rotate: 25 }}
        animate={{ x: 0, opacity: 1, rotate: 18 }}
        transition={{ duration: 1.4, ease: [0.65, 0.05, 0.36, 1] }}
        className="absolute top-10 -right-20 w-[60vw] md:w-[40vw] h-[80vh] z-0 origin-top-right"
        style={{ background: red, clipPath: "polygon(0 0, 100% 0, 100% 100%, 30% 100%)" }}
      />
      {/* Black circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.65, 0.05, 0.36, 1] }}
        className="absolute top-32 right-[28%] w-32 h-32 md:w-48 md:h-48 rounded-full z-0"
        style={{ background: ink }}
      />
      {/* Yellow square */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-[32rem] md:top-72 left-[6%] w-20 h-20 md:w-28 md:h-28 z-0"
        style={{ background: ochre, transform: "rotate(8deg)" }}
      />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="text-[11px] uppercase tracking-[0.4em] mb-8 font-archivo flex items-center gap-3">
          <span className="block w-12 h-1" style={{ background: red }} />
          ORDER №04 · MAY 2026 · TLV
        </div>

        <h1 className="font-archivo leading-[0.85] tracking-tighter">
          <motion.span initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9, ease: [0.65, 0.05, 0.36, 1] }} className="block text-[18vw] md:text-[12vw]">
            לבנות
          </motion.span>
          <motion.span initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.65, 0.05, 0.36, 1] }} className="block text-[18vw] md:text-[12vw] -my-2 md:-my-4 italic" style={{ color: red, transform: "skewX(-6deg)", transformOrigin: "right" }}>
            את העתיד.
          </motion.span>
          <motion.span initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.65, 0.05, 0.36, 1] }} className="block text-[18vw] md:text-[12vw]" style={{ WebkitTextStroke: `2px ${ink}`, color: "transparent" }}>
            עכשיו.
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-12 grid lg:grid-cols-12 gap-x-10"
        >
          <p className="lg:col-span-7 text-xl md:text-2xl leading-snug pr-4">
            סטודיו אדריכלות שמתכנן עם <span className="font-archivo" style={{ color: red }}>AI</span>, סורק ב-<span className="font-archivo" style={{ color: red }}>LiDAR</span>, ובונה עם <span className="font-archivo" style={{ color: red }}>IoT</span>.
            כל פרויקט נולד דיגיטלית — לפני שאבן אחת מונחת.
          </p>
          <div className="lg:col-span-5 mt-6 lg:mt-0 flex items-end justify-end gap-4">
            <a
              href="#cta"
              className="font-archivo uppercase tracking-[0.2em] text-base md:text-lg px-8 py-4 transition-colors"
              style={{ background: ink, color: bone, transform: "rotate(-2deg)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = red; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ink; }}
            >
              ► פעלו ◄
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Slogan() {
  return (
    <section className="relative py-12 md:py-16 border-y-[3px] overflow-hidden" style={{ background: red, color: bone, borderColor: ink }}>
      <div className="flex gap-12 animate-marquee whitespace-nowrap font-archivo text-4xl md:text-6xl uppercase tracking-tight">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="flex items-center gap-12">
            כל קיר הוא <span style={{ WebkitTextStroke: `2px ${bone}`, color: "transparent" }}>נתון.</span>
            <span className="block w-4 h-4 rotate-45" style={{ background: bone }} />
            כל חלון <span style={{ WebkitTextStroke: `2px ${bone}`, color: "transparent" }}>החלטה.</span>
            <span className="block w-4 h-4 rotate-45" style={{ background: bone }} />
          </span>
        ))}
      </div>
    </section>
  );
}

function Sections() {
  return (
    <section id="services" className="relative py-20 md:py-28 z-10">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead n="II" title="התחומים" />
        <div className="grid md:grid-cols-2 gap-px" style={{ background: ink }}>
          {services.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06 }}
              className="p-8 md:p-10 group relative"
              style={{ background: bone }}
            >
              <div
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center font-archivo text-xl"
                style={{ background: i % 2 === 0 ? red : ink, color: bone, transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)` }}
              >
                {s.n}
              </div>
              <div className="text-[11px] uppercase tracking-[0.4em] mb-3 font-archivo opacity-70">{s.tag}</div>
              <h3 className="font-archivo text-3xl md:text-4xl leading-tight mb-4">
                {s.title}
              </h3>
              <p className="text-base md:text-lg leading-snug mb-5 max-w-md">{s.body}</p>
              <div className="text-[11px] uppercase tracking-[0.3em] font-archivo border-t-[3px] pt-3" style={{ borderColor: ink }}>
                <span style={{ color: red }}>כלים — </span>
                {s.tools.join(" · ")}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHead({ n, title }: { n: string; title: string }) {
  return (
    <div className="grid grid-cols-12 items-end mb-12 md:mb-16">
      <div className="col-span-2 md:col-span-1">
        <div className="font-archivo text-7xl md:text-9xl leading-none" style={{ color: red }}>§{n}</div>
      </div>
      <div className="col-span-7 md:col-span-9 pb-3"><div className="h-1" style={{ background: ink }} /></div>
      <div className="col-span-3 md:col-span-2 text-right text-sm md:text-base font-archivo uppercase tracking-[0.2em]">{title}</div>
    </div>
  );
}

function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-12, 12]);
  return (
    <section ref={ref} className="relative py-20 md:py-28 z-10 border-y-[3px] overflow-hidden" style={{ background: ink, color: bone, borderColor: ink }}>
      <motion.div
        style={{ rotate, x: 60 }}
        className="absolute top-1/2 -translate-y-1/2 -right-24 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full pointer-events-none opacity-90"
        aria-hidden
      >
        <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: red }}>
          <div className="font-archivo text-center text-white" style={{ transform: "rotate(8deg)" }}>
            <div className="text-[10px] uppercase tracking-[0.5em] mb-2">★ MANIFESTO ★</div>
            <div className="text-2xl">04 / 26</div>
            <div className="text-[10px] uppercase tracking-[0.5em] mt-2">TLV · STUDIO</div>
          </div>
        </div>
      </motion.div>

      <div className="mx-auto max-w-[1500px] px-5 md:px-10 relative">
        <div className="text-[11px] uppercase tracking-[0.4em] mb-8 font-archivo flex items-center gap-3">
          <span className="block w-12 h-1" style={{ background: red }} />
          §IV — מנשר הסטודיו
        </div>
        <h2 className="font-archivo text-5xl md:text-[10vw] leading-[0.85] tracking-tighter max-w-4xl">
          לא <span style={{ WebkitTextStroke: `2px ${bone}`, color: "transparent" }}>לצייר</span> בניינים.<br />
          <span style={{ color: red }}>לקודד</span> אותם.<br />
          לא <span style={{ WebkitTextStroke: `2px ${bone}`, color: "transparent" }}>לקוות</span>.<br />
          <span style={{ color: red }}>לחשב.</span>
        </h2>
        <div className="mt-12 max-w-2xl text-lg md:text-xl leading-relaxed">
          המהפכה אינה אדריכלית. היא תכנונית. כשאלגוריתם מגלה ש-23% מעלויות התחזוקה
          ניתנות לחיסכון לפני שהבטון מתייבש — ההחלטה ברורה. אנחנו לא מתנצלים על מהירות.
        </div>
      </div>
    </section>
  );
}

function ProjectsSlab() {
  return (
    <section id="projects" className="relative py-20 md:py-28 z-10">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead n="III" title="פרויקטים" />
        <div className="space-y-px" style={{ background: ink }}>
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.7 }}
              className="grid grid-cols-12 gap-4 p-6 md:p-8 hover:bg-[var(--ink)] hover:text-[var(--bone)] transition-colors group cursor-pointer items-center"
              style={{ background: bone, "--ink": ink, "--bone": bone } as any}
            >
              <div className="col-span-2 md:col-span-1 font-archivo text-3xl md:text-5xl" style={{ color: red }}>0{i + 1}</div>
              <div className="col-span-10 md:col-span-5 font-archivo text-3xl md:text-5xl leading-none">{p.title}</div>
              <div className="hidden md:block md:col-span-2 text-[11px] uppercase tracking-[0.3em] font-archivo">{p.location}</div>
              <div className="hidden md:block md:col-span-2 text-[11px] uppercase tracking-[0.3em] font-archivo">{p.type} · F{p.floors}</div>
              <div className="col-span-2 md:col-span-2 text-left text-3xl md:text-5xl">→</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section className="relative py-20 md:py-28 z-10 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead n="V" title="התהליך" />
        <div className="grid md:grid-cols-5 gap-3">
          {process.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="border-[3px] p-5 min-h-[260px] flex flex-col justify-between relative"
              style={{ borderColor: ink, background: i === 2 ? red : bone, color: i === 2 ? bone : ink, transform: `rotate(${[-1, 1, -0.5, 0.8, -1.2][i]}deg)` }}
            >
              <div>
                <div className="font-archivo text-7xl leading-none mb-3">{p.n}</div>
                <h3 className="font-archivo text-xl leading-tight mb-2">{p.title}</h3>
                <p className="text-xs leading-snug">{p.body}</p>
              </div>
              <div className="text-[10px] uppercase tracking-[0.3em] font-archivo border-t-2 pt-2 mt-3" style={{ borderColor: i === 2 ? bone : ink }}>{p.duration}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NumbersBig() {
  return (
    <section id="stats" className="relative py-20 md:py-28 z-10 border-y-[3px]" style={{ background: ochre, borderColor: ink }}>
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead n="VI" title="המספרים" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="border-b-[3px] pb-6"
              style={{ borderColor: ink }}
            >
              <div className="font-archivo leading-none tracking-tighter" style={{ fontSize: "min(20vw, 9rem)" }}>
                {s.value}
                <span style={{ color: red, fontSize: "0.4em" }}>{s.suffix}</span>
              </div>
              <div className="font-archivo text-base uppercase tracking-[0.15em] mt-2">{s.label}</div>
              <div className="text-xs mt-1 opacity-80">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Quotes() {
  return (
    <section className="relative py-20 md:py-28 z-10">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <SectionHead n="VII" title="קולות" />
        <div className="grid md:grid-cols-3 gap-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: i * 0.06 }}
              className="border-[3px] p-7 relative"
              style={{ borderColor: ink, background: i === 1 ? ink : bone, color: i === 1 ? bone : ink }}
            >
              <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center font-archivo" style={{ background: red, color: bone }}>★</div>
              <div className="font-archivo text-5xl leading-none mb-3" style={{ color: red }}>"</div>
              <blockquote className="text-base md:text-lg leading-snug mb-5">{t.quote}</blockquote>
              <figcaption className="text-[11px] uppercase tracking-[0.3em] font-archivo border-t-2 pt-3" style={{ borderColor: i === 1 ? bone : ink }}>
                — {t.name} · {t.role}
                <br />
                <span style={{ color: i === 1 ? red : red }}>{t.project}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="relative py-24 md:py-32 z-10 border-t-[3px] overflow-hidden" style={{ background: ink, color: bone, borderColor: ink }}>
      <div className="absolute -top-20 -left-20 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px]" style={{ background: red, transform: "rotate(20deg)" }} />
      <div className="absolute -bottom-20 -right-20 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] rounded-full" style={{ background: ochre }} />

      <div className="relative mx-auto max-w-[1500px] px-5 md:px-10 text-center">
        <h2 className="font-archivo text-7xl md:text-[14vw] leading-[0.85] tracking-tighter mb-12">
          <span className="block">החזון <span style={{ color: red }}>שלכם.</span></span>
          <span className="block">הכלים <span style={{ WebkitTextStroke: `2px ${bone}`, color: "transparent" }}>שלנו.</span></span>
        </h2>
        <a
          href="mailto:hello@nexusbuild.io"
          className="inline-block font-archivo text-2xl md:text-3xl uppercase tracking-[0.15em] px-12 py-6 border-[4px] transition-colors"
          style={{ borderColor: bone, background: red, color: bone }}
          onMouseEnter={(e) => { e.currentTarget.style.background = bone; e.currentTarget.style.color = ink; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = red; e.currentTarget.style.color = bone; }}
        >
          ► התכתבו עם הסטודיו ◄
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 border-t-[3px] py-6" style={{ borderColor: ink, background: bone }}>
      <div className="mx-auto max-w-[1500px] px-5 md:px-10 grid grid-cols-3 gap-4 text-[11px] uppercase tracking-[0.3em] font-archivo">
        <span>© נקסוס בילד · MMXXVI</span>
        <span className="text-center" style={{ color: red }}>★ STUDIO OF THE PEOPLE ★</span>
        <a href="#" className="text-right">↑ לראש העמוד</a>
      </div>
    </footer>
  );
}
