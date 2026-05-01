const items = [
  "תכנון פרמטרי",
  "★",
  "סריקות לייזר 3D",
  "★",
  "הדמיות AI",
  "★",
  "BIM אינטגרטיבי",
  "★",
  "IoT לבניינים",
  "★",
  "אופטימיזציית אנרגיה",
  "★",
  "Smart City",
  "★",
];

export default function Marquee() {
  return (
    <section className="relative py-12 md:py-16 border-y border-white/5 overflow-hidden marquee-mask bg-ink-800/40">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items, ...items].map((it, i) => (
          <span
            key={i}
            className={`h-display text-3xl md:text-5xl font-black ${
              it === "★" ? "text-accent" : "text-white/80"
            }`}
          >
            {it}
          </span>
        ))}
      </div>
    </section>
  );
}
