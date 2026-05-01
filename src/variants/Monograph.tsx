import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services, projects, stats, testimonials, heroImage } from "../data";

const paper = "#f3ece1";
const ink = "#1c1917";
const cordovan = "#8b2818";
const sage = "#6b7c5a";

export default function MonographVariant() {
  return (
    <div className="min-h-screen relative" style={{ background: paper, color: ink, fontFamily: "'Frank Ruhl Libre', 'Cormorant Garamond', serif" }}>
      <Folio />
      <Header />
      <Cover />
      <Inscription />
      <Portfolio />
      <Index />
      <Provenance />
      <Estimates />
      <SaleInformation />
      <Colophon />
    </div>
  );
}

function Folio() {
  const { scrollYProgress } = useScroll();
  const num = useTransform(scrollYProgress, (v) => `${String(Math.max(1, Math.round(v * 240))).padStart(3, "0")}`);
  return (
    <div className="fixed bottom-5 right-5 z-30 hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.4em]" style={{ color: ink, opacity: 0.6 }}>
      <span style={{ color: cordovan }}>—</span>
      <motion.span>{num}</motion.span>
      <span>—</span>
    </div>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b" style={{ borderColor: `${ink}22`, background: `${paper}f0`, backdropFilter: "blur(6px)" }}>
      <div className="mx-auto max-w-[1500px] grid grid-cols-12 px-6 md:px-10 py-3 items-center">
        <div className="col-span-3 text-[10px] uppercase tracking-[0.4em]" style={{ color: ink, opacity: 0.6 }}>
          קטלוג מס׳ <span style={{ color: cordovan }}>04</span>
        </div>
        <div className="col-span-6 text-center">
          <div className="text-2xl tracking-[0.05em]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            Nexus<span style={{ color: cordovan, fontStyle: "italic" }}>·</span>Build
          </div>
          <div className="text-[9px] uppercase tracking-[0.5em] mt-px" style={{ color: ink, opacity: 0.5 }}>
            ARCHITECTURAL MONOGRAPHS · TLV · MMXXVI
          </div>
        </div>
        <div className="col-span-3 text-right">
          <a href="#cta" className="text-[10px] uppercase tracking-[0.4em] italic hover:underline" style={{ color: cordovan, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
            request a viewing →
          </a>
        </div>
      </div>
    </header>
  );
}

function Cover() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPic = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative min-h-screen pt-20 pb-12 flex flex-col">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 w-full text-center pt-12 md:pt-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="mb-12">
          <div className="text-[10px] uppercase tracking-[0.5em] mb-3" style={{ color: cordovan }}>volume IV · 187 lots</div>
          <Ornament />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.65, 0.05, 0.36, 1] }}
          className="leading-[0.95] mb-8"
          style={{ fontFamily: "'Cormorant Garamond', 'Frank Ruhl Libre', serif" }}
        >
          <span className="block text-[15vw] md:text-[10vw] font-normal italic mb-2" style={{ color: cordovan }}>
            ארכיטקטורה
          </span>
          <span className="block text-[15vw] md:text-[10vw] font-normal" style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 500 }}>
            של חיים שלמים.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-xl mx-auto max-w-2xl leading-relaxed mb-12"
          style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
        >
          קטלוג של חמישה מבנים שתוכננו בין השנים 2024 ו-2027 בידי הסטודיו —
          כל אחד עם <em style={{ color: cordovan }}>provenance</em> דיגיטלי מלא:
          סקיצה, תאום תלת-ממד, ויומן בנייה.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }} className="mb-16">
          <Ornament />
        </motion.div>
      </div>

      <motion.figure
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 1.2 }}
        className="relative flex-1 mx-6 md:mx-10 overflow-hidden border"
        style={{ borderColor: `${ink}33`, minHeight: "55vh" }}
      >
        <motion.img src={heroImage} alt="" style={{ y: yPic }} className="absolute inset-0 w-full h-[120%] object-cover sepia-[0.15] contrast-[1.05]" />
        <div className="absolute bottom-4 right-4 left-4 flex justify-between items-end text-[10px] uppercase tracking-[0.4em]" style={{ color: paper }}>
          <span><em style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.1em" }}>plate i</em> · helix tower, tlv · 2026</span>
          <span style={{ color: cordovan, background: paper, padding: "4px 8px" }}>EST. ₪ 240M</span>
        </div>
      </motion.figure>
    </section>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3" style={{ color: cordovan }}>
      <span className="block w-12 h-px" style={{ background: cordovan }} />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2 L12 8 L18 10 L12 12 L10 18 L8 12 L2 10 L8 8 Z" fill={cordovan} />
      </svg>
      <span className="block w-12 h-px" style={{ background: cordovan }} />
    </div>
  );
}

function Inscription() {
  return (
    <section className="py-24 md:py-32 border-t border-b" style={{ borderColor: `${ink}22` }}>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 grid lg:grid-cols-12 gap-x-10">
        <div className="lg:col-span-3 mb-6 lg:mb-0">
          <div className="text-[10px] uppercase tracking-[0.4em] mb-2" style={{ color: cordovan }}>הקדמה</div>
          <div className="text-base italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>מאת מערכת המונוגרפיה,<br />מאי 2026</div>
        </div>
        <div className="lg:col-span-9">
          <p className="text-2xl md:text-3xl leading-snug" style={{ fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 400 }}>
            <span className="float-right ml-3 leading-[0.85] font-normal" style={{ color: cordovan, fontFamily: "'Cormorant Garamond', serif", fontSize: "5em", lineHeight: 0.85 }}>ב</span>
            עידן שבו <em>בינה מלאכותית</em> מתכננת מבנים מהר יותר מאדריכל אנושי, סטודיו אחד בתל אביב מציע משהו אחר —
            לא להחליף את האדם, אלא להעצים אותו. נקסוס בילד הוא לא משרד אדריכלים. הוא מכון מחקר.
          </p>
          <div className="mt-8 grid md:grid-cols-2 gap-x-10 gap-y-3 text-base leading-relaxed" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
            <p>
              סריקות LiDAR ברזולוציית מילימטר חושפות בעיות במבנים קיימים שאף סוקר אנושי לא היה רואה.
              חישובי צל ואקלים מבוצעים על מאות גרסאות תכנון בו-זמנית.
            </p>
            <p>
              אחרי שהבניין נמסר, הוא ממשיך לחיות. חיישנים פנימיים מנטרים תפוסה, צריכת אנרגיה, איכות אוויר. הבניין <em style={{ color: cordovan }}>מדבר</em>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section id="showcase" className="py-16 md:py-24">
      {projects.map((p, i) => (
        <Spread key={p.title} project={p} index={i} flip={i % 2 === 1} />
      ))}
    </section>
  );
}

function Spread({ project, index, flip }: { project: typeof projects[number]; index: number; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <article ref={ref} className="py-16 md:py-24 border-t" style={{ borderColor: `${ink}22` }}>
      <div className="mx-auto max-w-[1500px] px-6 md:px-10">
        <header className="grid grid-cols-12 mb-8 text-[10px] uppercase tracking-[0.4em]">
          <div className="col-span-2" style={{ color: cordovan }}>
            LOT <span className="font-bold">0{index + 1}</span> / 05
          </div>
          <div className="col-span-7 md:col-span-8 flex items-center"><span className="block w-full h-px" style={{ background: `${ink}30` }} /></div>
          <div className="col-span-3 md:col-span-2 text-right opacity-70">{project.year}</div>
        </header>

        <div className={`grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end ${flip ? "lg:[direction:rtl]" : ""}`}>
          <motion.figure
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className={`lg:col-span-7 relative aspect-[4/5] overflow-hidden ${flip ? "lg:[direction:ltr]" : ""}`}
            style={{ borderColor: `${ink}33`, borderWidth: 1 }}
          >
            <motion.img src={project.image} alt={project.title} style={{ y }} className="absolute inset-0 w-full h-[120%] object-cover sepia-[0.1] contrast-[1.05]" loading="lazy" />
            <figcaption className="absolute bottom-3 right-3 left-3 text-[9px] uppercase tracking-[0.4em] italic" style={{ color: paper, fontFamily: "'Cormorant Garamond', serif" }}>
              plate {romanize(index + 1)} · {project.title.toLowerCase()}
            </figcaption>
          </motion.figure>

          <div className={`lg:col-span-5 ${flip ? "lg:[direction:ltr]" : ""}`}>
            <div className="text-[10px] uppercase tracking-[0.5em] mb-3" style={{ color: cordovan }}>{project.type}</div>
            <h3
              className="text-5xl md:text-7xl leading-[0.95] mb-1 italic font-normal"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {project.title}
            </h3>
            <div className="text-2xl mb-6 italic font-normal" style={{ fontFamily: "'Frank Ruhl Libre', serif", color: cordovan }}>{project.location}</div>

            <div className="space-y-2 text-sm border-t pt-4" style={{ borderColor: `${ink}30`, fontFamily: "'Frank Ruhl Libre', serif" }}>
              <Row label="Year" value={project.year} />
              <Row label="Floors" value={String(project.floors)} />
              <Row label="Method" value="LiDAR · BIM · IoT" />
              <Row label="Status" value={<span style={{ color: sage }}>Realized</span>} />
            </div>

            <p className="mt-6 text-base leading-relaxed italic" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
              <span className="not-italic" style={{ color: cordovan, fontWeight: 700 }}>Provenance.</span> תכנון פרמטרי במשך 14 שבועות, סקירה תלת-ממדית בכל קומה,
              ניטור IoT פעיל מיום המסירה.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-[10px] uppercase tracking-[0.4em] w-24" style={{ color: ink, opacity: 0.5 }}>{label}</span>
      <span className="block flex-1 border-b border-dotted" style={{ borderColor: `${ink}40` }} />
      <span className="italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{value}</span>
    </div>
  );
}

function romanize(n: number) {
  const r = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x"];
  return r[n - 1] || String(n);
}

function Index() {
  return (
    <section id="about" className="py-24 md:py-32 border-t" style={{ borderColor: `${ink}22` }}>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <header className="text-center mb-16">
          <Ornament />
          <div className="text-[10px] uppercase tracking-[0.5em] mt-6 mb-2" style={{ color: cordovan }}>chapter II</div>
          <h2 className="text-5xl md:text-6xl italic font-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            תחומי המכון
          </h2>
        </header>

        <div className="space-y-px" style={{ background: `${ink}22` }}>
          {services.map((s, i) => (
            <motion.article
              key={s.n}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="grid md:grid-cols-12 gap-x-8 gap-y-3 p-8"
              style={{ background: paper }}
            >
              <div className="md:col-span-2 text-[10px] uppercase tracking-[0.5em]" style={{ color: cordovan }}>
                §{s.n}
              </div>
              <div className="md:col-span-4">
                <h3 className="text-3xl md:text-4xl italic font-normal leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {s.title}
                </h3>
                <div className="text-[10px] uppercase tracking-[0.4em] mt-2 opacity-60">{s.tag}</div>
              </div>
              <div className="md:col-span-6">
                <p className="text-base md:text-lg leading-relaxed mb-4" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>{s.body}</p>
                <div className="text-[10px] uppercase tracking-[0.4em] italic" style={{ color: cordovan, fontFamily: "'Cormorant Garamond', serif" }}>
                  instruments — {s.tools.join(" · ")}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Provenance() {
  return (
    <section className="py-24 md:py-32 border-t" style={{ borderColor: `${ink}22`, background: ink, color: paper }}>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10 text-center">
        <div className="text-[10px] uppercase tracking-[0.5em] mb-4" style={{ color: cordovan }}>chapter III</div>
        <h2 className="text-5xl md:text-7xl italic font-normal mb-12" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          provenance
        </h2>
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-12 text-right">
          {testimonials.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border-t pt-5"
              style={{ borderColor: `${paper}40` }}
            >
              <blockquote className="text-lg md:text-xl leading-snug mb-5" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
                <span className="text-3xl italic" style={{ color: cordovan, fontFamily: "'Cormorant Garamond', serif" }}>"</span>
                {t.quote}
              </blockquote>
              <figcaption className="text-[10px] uppercase tracking-[0.4em] italic" style={{ fontFamily: "'Cormorant Garamond', serif", opacity: 0.85 }}>
                — {t.name}, <em>{t.role}</em>
                <div className="mt-1 not-italic" style={{ color: cordovan }}>· lot referencing {t.project}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Estimates() {
  return (
    <section id="stats" className="py-24 md:py-32 border-t" style={{ borderColor: `${ink}22` }}>
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <header className="text-center mb-12">
          <div className="text-[10px] uppercase tracking-[0.5em] mb-2" style={{ color: cordovan }}>appendix · estimates</div>
          <h2 className="text-5xl md:text-6xl italic font-normal" style={{ fontFamily: "'Cormorant Garamond', serif" }}>by the numbers</h2>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t" style={{ borderColor: `${ink}30` }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              className="p-8 border-b lg:border-l first:lg:border-l-0"
              style={{ borderColor: `${ink}30` }}
            >
              <div className="text-[10px] uppercase tracking-[0.4em] mb-2 italic" style={{ color: cordovan, fontFamily: "'Cormorant Garamond', serif" }}>fig. {romanize(i + 1)}</div>
              <div className="leading-none mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "min(15vw, 7rem)" }}>
                {s.value}<span className="italic" style={{ color: cordovan, fontSize: "0.4em" }}>{s.suffix}</span>
              </div>
              <div className="text-base font-bold" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>{s.label}</div>
              <div className="text-sm italic mt-1" style={{ fontFamily: "'Cormorant Garamond', serif", opacity: 0.7 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SaleInformation() {
  return (
    <section id="cta" className="py-24 md:py-32 border-t text-center" style={{ borderColor: `${ink}22` }}>
      <div className="mx-auto max-w-[800px] px-6 md:px-10">
        <Ornament />
        <div className="text-[10px] uppercase tracking-[0.5em] mt-6 mb-3" style={{ color: cordovan }}>sale information</div>
        <h2 className="text-5xl md:text-7xl mb-6 leading-[0.95]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          <em className="font-normal" style={{ color: cordovan }}>נא לדבר איתנו —</em>
          <br />
          <span style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>שיחה אחת מספיקה.</span>
        </h2>
        <p className="text-lg md:text-xl leading-relaxed mb-10" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
          ייעוץ ראשון ניתן ללא תשלום, באולפן הסטודיו ברחוב הלבבות 14, או באמצעות שיחת וידאו.
        </p>
        <div className="inline-block border-2 px-10 py-6" style={{ borderColor: ink }}>
          <div className="text-[10px] uppercase tracking-[0.5em] mb-2" style={{ color: cordovan }}>contact</div>
          <a href="mailto:hello@nexusbuild.io" className="block text-3xl italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            hello@nexusbuild.io
          </a>
          <div className="text-sm mt-1 italic" style={{ fontFamily: "'Cormorant Garamond', serif", opacity: 0.7 }}>+972·3·1234567</div>
        </div>
        <div className="mt-12">
          <Ornament />
        </div>
      </div>
    </section>
  );
}

function Colophon() {
  return (
    <footer className="py-12 border-t text-center" style={{ borderColor: `${ink}22` }}>
      <div className="mx-auto max-w-[800px] px-6 md:px-10">
        <div className="text-[10px] uppercase tracking-[0.5em] mb-3" style={{ color: cordovan }}>colophon</div>
        <p className="text-base italic leading-relaxed mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Set in <em>Cormorant Garamond</em> &amp; <em>Frank Ruhl Libre</em>. Printed in TLV, MMXXVI.
          All photographs courtesy of the studio archive. © Nexus Build Studio. All rights reserved.
        </p>
        <a href="#" className="text-[10px] uppercase tracking-[0.5em]" style={{ color: cordovan }}>↑ to cover</a>
      </div>
    </footer>
  );
}
