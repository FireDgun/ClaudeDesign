import { motion } from "framer-motion";
import { useState } from "react";

const items = [
  {
    quote:
      "התהליך היה שונה מכל מה שהכרנו. ראינו את הבניין שלנו ב-VR לפני שנגעו באבן. כל שינוי שביקשנו קיבל מענה תוך שעות.",
    name: "יעל ברנשטיין",
    role: "מנכ\"לית, פרסונה גרופ",
    project: "Helix Tower",
  },
  {
    quote:
      "השילוב של AI ו-IoT הוריד לנו 23% מעלויות התחזוקה השוטפות. הבניין באמת חושב לבד.",
    name: "ארז דהן",
    role: "Director of Operations, NextWave",
    project: "Sky Gardens",
  },
  {
    quote:
      "סריקת הלייזר חשפה בעיות במבנה הקיים שאף סוקר לא ראה. חסכו לנו 2.4 מיליון ש\"ח לפני שהתחלנו.",
    name: "דוד אסולין",
    role: "יו\"ר, אסולין נדל\"ן",
    project: "Coral Block",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const item = items[active];

  return (
    <section id="testimonials" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="mx-auto max-w-7xl px-5 md:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="num-display text-xs uppercase tracking-[0.3em] text-accent mb-6">
              [ 06 ] המלצות
            </div>
            <h2 className="h-display text-5xl md:text-6xl">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.65, 0.05, 0.36, 1] }}
                  className="block"
                >
                  שומעים אותנו
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.65, 0.05, 0.36, 1] }}
                  className="block text-stroke"
                >
                  מאחרים.
                </motion.span>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="text-accent/40 h-display text-9xl md:text-[10rem] absolute -top-12 -right-2 leading-none">
                "
              </div>
              <p className="relative text-2xl md:text-3xl lg:text-4xl leading-snug font-light mb-10">
                {item.quote}
              </p>
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-warm flex items-center justify-center text-ink-900 font-black text-lg">
                  {item.name[0]}
                </div>
                <div>
                  <div className="font-bold">{item.name}</div>
                  <div className="text-sm text-white/60">{item.role}</div>
                  <div className="num-display text-[10px] text-accent mt-1 uppercase tracking-widest">
                    PROJECT · {item.project}
                  </div>
                </div>
              </div>
            </motion.blockquote>

            <div className="flex gap-3 mt-12">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`relative h-1 flex-1 max-w-[120px] rounded-full overflow-hidden ${
                    i === active ? "bg-white/20" : "bg-white/10"
                  }`}
                  aria-label={`המלצה ${i + 1}`}
                  data-cursor=""
                >
                  {i === active && (
                    <motion.div
                      layoutId="testimonial-progress"
                      className="absolute inset-0 bg-accent"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
