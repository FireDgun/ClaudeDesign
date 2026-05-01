import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitText from "../ui/SplitText";

const projects = [
  {
    title: "Helix Tower",
    location: "תל אביב",
    year: "2026",
    type: "מגדל מגורים",
    floors: 47,
    grad: "from-cyan-300 via-blue-500 to-indigo-900",
    accent: "#7cf9ff",
  },
  {
    title: "Sky Gardens",
    location: "הרצליה",
    year: "2025",
    type: "מתחם משרדים",
    floors: 22,
    grad: "from-rose-300 via-orange-500 to-red-900",
    accent: "#ff6b6b",
  },
  {
    title: "Nexus Hub",
    location: "ירושלים",
    year: "2026",
    type: "מרכז טכנולוגי",
    floors: 14,
    grad: "from-violet-300 via-fuchsia-500 to-purple-900",
    accent: "#a78bfa",
  },
  {
    title: "Coral Block",
    location: "אילת",
    year: "2027",
    type: "מלון בוטיק",
    floors: 9,
    grad: "from-amber-200 via-orange-400 to-amber-900",
    accent: "#fbbf24",
  },
  {
    title: "Echo Plaza",
    location: "חיפה",
    year: "2027",
    type: "מרכז תרבות",
    floors: 6,
    grad: "from-emerald-300 via-teal-500 to-emerald-900",
    accent: "#34d399",
  },
];

export default function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // pan distance: enough to walk through all cards while keeping last in view
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section
      id="showcase"
      ref={ref}
      className="relative bg-ink-800/30"
      style={{ height: `${projects.length * 80}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <div className="relative pt-28 md:pt-32 px-5 md:px-8 mx-auto max-w-[1500px] w-full">
          <div className="flex justify-between items-end gap-6 mb-8 md:mb-12">
            <div>
              <div className="num-display text-[10px] uppercase tracking-[0.3em] text-accent mb-4">
                [ 03 ] הפרויקטים
              </div>
              <h2 className="h-display text-4xl md:text-5xl lg:text-6xl">
                <span className="block overflow-hidden">
                  <SplitText text="עבודה חיה." stagger={0.04} duration={1} />
                </span>
              </h2>
            </div>
            <div className="hidden md:flex items-center gap-3 num-display text-[10px] uppercase tracking-[0.3em] text-white/40">
              <span>גרור / גלול</span>
              <svg width="40" height="8" viewBox="0 0 40 8" fill="none">
                <path d="M0 4H38M38 4L34 1M38 4L34 7" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="flex-1 flex items-center gap-6 md:gap-10 pr-8 will-change-transform">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} progress={scrollYProgress} total={projects.length} />
          ))}
          <div className="shrink-0 h-[60vh] w-[40vw] md:w-[20vw] flex items-center justify-center">
            <a href="#cta" className="num-display text-xs uppercase tracking-[0.3em] text-white/60 hover:text-accent transition border border-white/10 hover:border-accent/40 rounded-full px-6 py-4">
              כל הפרויקטים →
            </a>
          </div>
        </motion.div>

        <div className="px-5 md:px-8 mx-auto max-w-[1500px] w-full pb-8 num-display text-[10px] uppercase tracking-[0.3em] text-white/30 flex justify-between">
          <span>5 PROJECTS · 2025–2027</span>
          <span>SCROLL → 03/08</span>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: typeof projects[number];
  index: number;
  progress: any;
  total: number;
}) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.65, 0.05, 0.36, 1] }}
      data-cursor="פרויקט"
      className="relative shrink-0 h-[68vh] md:h-[72vh] w-[78vw] md:w-[42vw] lg:w-[34vw] rounded-3xl overflow-hidden border border-white/10 group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.grad}`} />
      <BuildingArt accent={project.accent} />

      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/95 via-ink-900/30 to-ink-900/20 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="absolute top-6 right-6 left-6 flex justify-between items-start text-white num-display text-[10px] uppercase tracking-[0.3em]">
        <span className="opacity-80">[ 0{index + 1} ]</span>
        <span className="opacity-80">{project.year}</span>
      </div>

      <div className="absolute bottom-6 right-6 left-6 text-white">
        <div className="num-display text-[10px] uppercase tracking-[0.3em] mb-3" style={{ color: project.accent }}>
          {project.type} · {project.floors} קומות
        </div>
        <h3 className="h-display text-3xl md:text-4xl lg:text-5xl mb-2 leading-none">{project.title}</h3>
        <div className="text-white/70 text-sm">{project.location}</div>
      </div>

      <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/30 transition-all duration-700 rounded-3xl pointer-events-none" />
    </motion.article>
  );
}

/** Pure-SVG isometric tower — no WebGL, runs on CSS transforms. */
function BuildingArt({ accent }: { accent: string }) {
  const floors = 12;
  return (
    <div className="absolute inset-0 flex items-end justify-center overflow-hidden pointer-events-none">
      <motion.svg
        viewBox="-100 -300 200 320"
        className="w-[80%] h-[78%] drop-shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.65, 0.05, 0.36, 1] }}
      >
        <defs>
          <linearGradient id={`g-${accent}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={accent} stopOpacity="0.95" />
            <stop offset="1" stopColor={accent} stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {Array.from({ length: floors }).map((_, i) => {
          const y = -i * 22;
          const w = 90 - i * 2;
          const skew = 0.4;
          return (
            <g key={i}>
              <polygon
                points={`${-w} ${y} ${-w + 30} ${y - 15 * skew} ${w + 30} ${y - 15 * skew} ${w} ${y}`}
                fill={`url(#g-${accent})`}
                opacity={0.18}
              />
              <rect x={-w} y={y - 18} width={w * 2} height={18} fill={`url(#g-${accent})`} opacity={0.85} />
              <rect x={-w} y={y - 18} width={w * 2} height={18} fill="none" stroke="white" strokeOpacity={0.5} strokeWidth={0.4} />
              {Array.from({ length: 6 }).map((_, j) => (
                <rect
                  key={j}
                  x={-w + 6 + j * ((w * 2 - 12) / 6)}
                  y={y - 14}
                  width={(w * 2 - 12) / 6 - 4}
                  height={10}
                  fill="white"
                  opacity={Math.random() * 0.5 + 0.2}
                />
              ))}
            </g>
          );
        })}
        <rect x={-95} y={-22} width={190} height={22} fill={accent} opacity={0.5} />
      </motion.svg>
    </div>
  );
}
