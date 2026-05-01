import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services, projects, stats, testimonials, process } from "../data";

const peach = "#f7d7c4";
const mint = "#bcd9c5";
const mustard = "#d6a85e";
const wine = "#3e2c2a";
const cream = "#f5ecd9";
const stamp = "#7a3327";

export default function AndersonVariant() {
  return (
    <div className="min-h-screen relative" style={{ background: peach, color: wine, fontFamily: "'Frank Ruhl Libre', 'Cormorant Garamond', serif" }}>
      <Stars />
      <Header />
      <Cover />
      <Itinerary />
      <Suite />
      <Postcard />
      <Departure />
      <Numbers />
      <Voices />
      <Booking />
      <Foot />
    </div>
  );
}

function Stars() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]" aria-hidden>
      <svg className="w-full h-full">
        <defs>
          <pattern id="stars" patternUnits="userSpaceOnUse" width="40" height="40">
            <text x="20" y="24" fontSize="12" textAnchor="middle" fill={wine} fontFamily="serif">✦</text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#stars)" />
      </svg>
    </div>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 px-6 md:px-10 py-3 border-b-[3px] border-double flex items-center justify-between" style={{ background: peach, borderColor: wine }}>
      <div className="text-[11px] uppercase tracking-[0.4em]" style={{ fontFamily: "'Italiana', serif" }}>חדר מס׳ 04</div>
      <div className="text-center">
        <div className="text-2xl tracking-[0.1em]" style={{ fontFamily: "'Italiana', serif" }}>
          ✦ NEXUS·BUILD ✦
        </div>
        <div className="text-[9px] uppercase tracking-[0.5em] -mt-0.5" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>
          studio · est mmxxiv · tlv
        </div>
      </div>
      <a href="#cta" className="text-[11px] uppercase tracking-[0.4em] italic" style={{ fontFamily: "'Italiana', serif", color: stamp }}>הזמינו ←</a>
    </header>
  );
}

function Cover() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative pt-28 md:pt-32 pb-16 md:pb-24 z-10">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 text-center">

        {/* Top stamp */}
        <motion.div initial={{ scale: 0.6, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: -8 }} transition={{ duration: 0.8 }} className="inline-block mb-8">
          <div className="border-2 border-dashed rounded-full px-6 py-2 text-[10px] uppercase tracking-[0.4em]" style={{ borderColor: stamp, color: stamp, fontFamily: "'Major Mono Display', monospace" }}>
            ✦ קטלוג מהדורה רביעית ✦ אביב 2026
          </div>
        </motion.div>

        {/* Ornament */}
        <Frame>
          <h1 className="leading-[0.95]" style={{ fontFamily: "'Italiana', 'Frank Ruhl Libre', serif" }}>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }} className="block text-[15vw] md:text-[8vw] tracking-tight">
              The
              <span className="italic" style={{ color: stamp }}> Helix </span>
              Tower
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.3 }} className="block text-3xl md:text-5xl mt-4 tracking-[0.1em]" style={{ color: stamp }}>
              ✦  ✦  ✦
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.5 }} className="block text-[12vw] md:text-[6vw] tracking-tight italic font-normal" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
              ארכיטקטורה אחרת.
            </motion.span>
          </h1>
        </Frame>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.9 }} className="text-lg md:text-xl mt-10 mx-auto max-w-2xl leading-relaxed italic" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
          סטודיו אדריכלות בתל אביב. ארבעה אנשים, ארבעה תחומים, ושיחה ראשונה
          שמתחילה תמיד בכוס תה ירוק (ולפעמים בעוגיית אגוזים).
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-10 flex justify-center gap-3">
          <a href="#cta" className="inline-block border-2 px-7 py-3 text-sm uppercase tracking-[0.3em]" style={{ borderColor: wine, color: wine, fontFamily: "'Major Mono Display', monospace" }}>
            ✦ קבע מפגש ✦
          </a>
          <a href="#works" className="inline-block px-7 py-3 text-sm uppercase tracking-[0.3em] italic" style={{ color: stamp, fontFamily: "'Italiana', serif" }}>
            view itinerary ↓
          </a>
        </motion.div>
      </div>

      {/* Symmetric flanking elements */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-8 z-0" aria-hidden>
        <Pennant color={mint} />
      </div>
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-8 z-0" aria-hidden>
        <Pennant color={mustard} flip />
      </div>
    </section>
  );
}

function Pennant({ color, flip = false }: { color: string; flip?: boolean }) {
  return (
    <motion.svg
      width="60"
      height="200"
      viewBox="0 0 60 200"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 0.4 }}
      style={{ transform: flip ? "scaleX(-1)" : "" }}
    >
      <line x1="30" y1="0" x2="30" y2="200" stroke={wine} strokeWidth="2" />
      <polygon points="30,10 60,30 30,50" fill={color} stroke={wine} strokeWidth="1.5" />
      <polygon points="30,60 50,80 30,100" fill={color} stroke={wine} strokeWidth="1.5" opacity="0.7" />
      <circle cx="30" cy="115" r="3" fill={wine} />
    </motion.svg>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-block px-8 md:px-16 py-10 md:py-14" style={{ background: cream, border: `2px double ${wine}` }}>
      <div className="absolute -top-3 -left-3 w-6 h-6 border-2 border-dashed rounded-full" style={{ borderColor: stamp, background: peach }} />
      <div className="absolute -top-3 -right-3 w-6 h-6 border-2 border-dashed rounded-full" style={{ borderColor: stamp, background: peach }} />
      <div className="absolute -bottom-3 -left-3 w-6 h-6 border-2 border-dashed rounded-full" style={{ borderColor: stamp, background: peach }} />
      <div className="absolute -bottom-3 -right-3 w-6 h-6 border-2 border-dashed rounded-full" style={{ borderColor: stamp, background: peach }} />
      {children}
    </div>
  );
}

function Itinerary() {
  return (
    <section className="relative py-20 md:py-28 z-10 border-y-[3px] border-double" style={{ borderColor: wine, background: cream }}>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="text-center mb-10">
          <div className="text-[10px] uppercase tracking-[0.5em] mb-2" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>chapitre i</div>
          <h2 className="text-4xl md:text-6xl italic" style={{ fontFamily: "'Italiana', serif" }}>
            ✦ Itinéraire du Studio ✦
          </h2>
        </div>
        <div className="grid md:grid-cols-5 border-2" style={{ borderColor: wine, background: peach }}>
          {process.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`p-5 text-center ${i > 0 ? "border-t-2 md:border-t-0 md:border-l-2 border-dashed" : ""}`}
              style={{ borderColor: wine }}
            >
              <div className="w-10 h-10 mx-auto rounded-full border-2 flex items-center justify-center text-base mb-3" style={{ borderColor: wine, background: cream, fontFamily: "'Italiana', serif" }}>
                {p.n}
              </div>
              <div className="text-[10px] uppercase tracking-[0.4em] mb-2" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>{p.duration}</div>
              <h3 className="text-xl mb-2 italic" style={{ fontFamily: "'Italiana', serif" }}>{p.title}</h3>
              <p className="text-xs leading-snug" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Suite() {
  return (
    <section id="services" className="relative py-20 md:py-28 z-10">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="text-center mb-12">
          <div className="text-[10px] uppercase tracking-[0.5em] mb-2" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>chapitre ii</div>
          <h2 className="text-4xl md:text-6xl italic" style={{ fontFamily: "'Italiana', serif" }}>
            התחומים של הסטודיו
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => {
            const colors = [mint, mustard, peach, mint];
            return (
              <motion.article
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06 }}
                className="border-2 p-6 md:p-8 relative"
                style={{ borderColor: wine, background: colors[i] }}
              >
                {/* Stamp number badge in corner */}
                <div className="absolute -top-4 -right-4 w-14 h-14 border-2 border-dashed rounded-full flex items-center justify-center" style={{ borderColor: stamp, background: cream, fontFamily: "'Italiana', serif" }}>
                  {s.n}
                </div>
                <div className="text-[10px] uppercase tracking-[0.4em] mb-3" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>
                  ※ {s.tag}
                </div>
                <h3 className="text-3xl md:text-4xl italic mb-3" style={{ fontFamily: "'Italiana', 'Frank Ruhl Libre', serif" }}>
                  {s.title}
                </h3>
                <p className="text-base leading-relaxed mb-4" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>{s.body}</p>
                <div className="text-[10px] uppercase tracking-[0.3em] border-t-2 border-dashed pt-3 italic" style={{ borderColor: wine, fontFamily: "'Italiana', serif" }}>
                  ✦ instruments — {s.tools.join(" · ")}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Postcard() {
  const accent = mint;
  return (
    <section className="relative py-20 md:py-28 z-10 border-y-[3px] border-double" style={{ borderColor: wine, background: accent }}>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 grid md:grid-cols-2 gap-10 items-center">
        <motion.figure initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative aspect-[4/5] border-[6px] bg-white" style={{ borderColor: cream, boxShadow: `0 0 0 2px ${wine}` }}>
          <img src={projects[0].image} alt="" className="absolute inset-0 w-full h-full object-cover sepia-[0.2]" />
          <div className="absolute -top-4 -right-4 rotate-12 w-20 h-20 border-2 border-dashed rounded-full flex items-center justify-center text-center text-[8px] uppercase tracking-[0.3em]" style={{ borderColor: stamp, color: stamp, background: peach, fontFamily: "'Major Mono Display', monospace" }}>
            ✦<br />approved<br />✦
          </div>
        </motion.figure>
        <div>
          <div className="text-[10px] uppercase tracking-[0.5em] mb-3" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>★ a postcard ★</div>
          <blockquote className="text-3xl md:text-5xl italic leading-[1.1] mb-6" style={{ fontFamily: "'Italiana', 'Frank Ruhl Libre', serif" }}>
            "כל בניין שאנחנו בונים — חי כבר עכשיו.
            <br />
            הוא מדבר עם המהנדסים, עם הקבלן, עם הדיירים — לפני שהוא קיים."
          </blockquote>
          <div className="text-[11px] uppercase tracking-[0.4em] border-t-2 border-dashed pt-3 italic" style={{ borderColor: wine, fontFamily: "'Italiana', serif" }}>
            — מנשר הסטודיו, התחלת השנה הרביעית
          </div>
        </div>
      </div>
    </section>
  );
}

function Departure() {
  return (
    <section id="works" className="relative py-20 md:py-28 z-10">
      <div className="mx-auto max-w-[1300px] px-6 md:px-10">
        <div className="text-center mb-12">
          <div className="text-[10px] uppercase tracking-[0.5em] mb-2" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>chapitre iii</div>
          <h2 className="text-4xl md:text-6xl italic" style={{ fontFamily: "'Italiana', serif" }}>
            ✦ Tableau des Œuvres ✦
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="border-2 p-3 group"
              style={{ borderColor: wine, background: cream }}
            >
              <div className="relative aspect-[3/4] overflow-hidden mb-3 border-2" style={{ borderColor: wine }}>
                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover sepia-[0.2] transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute top-2 left-2 text-[9px] uppercase tracking-[0.3em] px-2 py-1" style={{ background: peach, color: wine, fontFamily: "'Major Mono Display', monospace", border: `1px solid ${wine}` }}>
                  ✦ no. 0{i + 1}
                </div>
              </div>
              <div className="px-2 pb-2">
                <h3 className="text-2xl italic mb-1" style={{ fontFamily: "'Italiana', 'Frank Ruhl Libre', serif" }}>{p.title}</h3>
                <div className="text-xs uppercase tracking-[0.3em]" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>
                  {p.location} · {p.floors}f · {p.year}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {projects.slice(3, 5).map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
              className="border-2 p-3 group relative"
              style={{ borderColor: wine, background: cream }}
            >
              <div className="relative aspect-[16/10] overflow-hidden border-2" style={{ borderColor: wine }}>
                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover sepia-[0.2]" loading="lazy" />
                <div className="absolute bottom-2 right-2 text-[9px] uppercase tracking-[0.3em] px-2 py-1" style={{ background: peach, color: wine, fontFamily: "'Major Mono Display', monospace", border: `1px solid ${wine}` }}>
                  ✦ {p.title} ✦
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section className="relative py-20 md:py-28 z-10 border-y-[3px] border-double" style={{ borderColor: wine, background: mustard }}>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="text-center mb-10">
          <div className="text-[10px] uppercase tracking-[0.5em] mb-2" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>chapitre iv ✦ statistiques</div>
          <h2 className="text-4xl md:text-6xl italic" style={{ fontFamily: "'Italiana', serif" }}>
            ✦ ספרור הסטודיו ✦
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="border-2 p-5 text-center"
              style={{ borderColor: wine, background: cream }}
            >
              <div className="text-[10px] uppercase tracking-[0.4em] mb-2" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>
                ✦ no. 0{i + 1}
              </div>
              <div className="leading-none mb-2" style={{ fontFamily: "'Italiana', serif", fontSize: "min(15vw, 5.5rem)" }}>
                {s.value}<span style={{ color: stamp, fontSize: "0.4em" }}>{s.suffix}</span>
              </div>
              <div className="italic text-base" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>{s.label}</div>
              <div className="text-[10px] uppercase tracking-[0.3em] mt-1" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Voices() {
  return (
    <section className="relative py-20 md:py-28 z-10">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <div className="text-center mb-10">
          <div className="text-[10px] uppercase tracking-[0.5em] mb-2" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>chapitre v</div>
          <h2 className="text-4xl md:text-6xl italic" style={{ fontFamily: "'Italiana', serif" }}>
            ✦ Lettres des Hôtes ✦
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const bg = [mint, peach, mustard][i] || cream;
            return (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06 }}
                className="border-2 p-6 relative"
                style={{ borderColor: wine, background: bg }}
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] uppercase tracking-[0.4em] border-2 rounded-full" style={{ borderColor: wine, background: cream, color: stamp, fontFamily: "'Major Mono Display', monospace" }}>
                  ✦ letter no. 0{i + 1} ✦
                </div>
                <blockquote className="text-base md:text-lg italic leading-snug mb-4 mt-3" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
                  "{t.quote}"
                </blockquote>
                <figcaption className="text-[10px] uppercase tracking-[0.3em] border-t-2 border-dashed pt-2 italic text-center" style={{ borderColor: wine, fontFamily: "'Italiana', serif" }}>
                  — {t.name} · <span style={{ color: stamp }}>{t.project}</span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section id="cta" className="relative py-20 md:py-28 z-10 border-y-[3px] border-double" style={{ borderColor: wine, background: cream }}>
      <div className="mx-auto max-w-[1000px] px-6 md:px-10 text-center">
        <div className="text-[10px] uppercase tracking-[0.5em] mb-2" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>chapitre vi · réservation</div>
        <h2 className="text-5xl md:text-7xl italic mb-3" style={{ fontFamily: "'Italiana', serif" }}>
          הזמנת מפגש
        </h2>
        <div className="text-2xl mb-10 italic" style={{ fontFamily: "'Italiana', serif", color: stamp }}>✦  ✦  ✦</div>
        <div className="border-4 inline-block p-8 md:p-12" style={{ borderColor: wine, background: peach, borderStyle: "double" }}>
          <div className="grid md:grid-cols-2 gap-6 text-right">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] mb-1" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>שעות פתיחה</div>
              <div className="text-base" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>א׳-ה׳ 09:00–18:00<br />ו׳ עד 13:00</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] mb-1" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>כתובת</div>
              <div className="text-base" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>הלבבות 14, תל אביב<br />קומה שלישית, חדר 4</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] mb-1" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>טלפון</div>
              <div className="text-base" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>03-1234567</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] mb-1" style={{ color: stamp, fontFamily: "'Major Mono Display', monospace" }}>דוא״ל</div>
              <div className="text-base italic" style={{ fontFamily: "'Italiana', serif", color: stamp }}>hello@nexusbuild.io</div>
            </div>
          </div>
          <a
            href="mailto:hello@nexusbuild.io"
            className="block mt-8 py-4 text-lg uppercase tracking-[0.4em] border-2 transition-colors"
            style={{ background: wine, color: cream, borderColor: wine, fontFamily: "'Major Mono Display', monospace" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = stamp; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = wine; }}
          >
            ✦ קבע פגישה ✦
          </a>
        </div>
      </div>
    </section>
  );
}

function Foot() {
  return (
    <footer className="py-10 z-10 relative">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 text-center">
        <div className="flex justify-center gap-3 text-xl mb-3" style={{ color: stamp, fontFamily: "'Italiana', serif" }}>
          ✦ ✦ ✦
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em]" style={{ fontFamily: "'Major Mono Display', monospace", color: stamp }}>
          ✦ © nexus build studio · mmxxvi · printed in tlv with care ✦
        </div>
      </div>
    </footer>
  );
}
