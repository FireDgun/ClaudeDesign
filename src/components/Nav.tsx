import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMagnetic } from "../hooks/useMagnetic";

const links = [
  { label: "השירותים", href: "#about" },
  { label: "תהליך", href: "#process" },
  { label: "פרויקטים", href: "#showcase" },
  { label: "המספרים", href: "#stats" },
  { label: "המלצות", href: "#testimonials" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8, ease: [0.65, 0.05, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div
          className={`mx-auto max-w-7xl px-5 md:px-8 transition-all duration-500 ${
            scrolled ? "" : ""
          }`}
        >
          <div
            className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
              scrolled ? "glass" : ""
            }`}
          >
            <a href="#hero" className="flex items-center gap-2 h-display text-lg" data-cursor="home">
              <span className="text-accent">[</span>
              <span>NEXUS</span>
              <em className="not-italic text-accent">BUILD</em>
              <span className="text-accent">]</span>
            </a>

            <nav className="hidden lg:flex items-center gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2.8 + i * 0.06 }}
                  className="text-sm relative group"
                >
                  <span className="text-white/70 group-hover:text-white transition">
                    {l.label}
                  </span>
                  <span className="absolute -bottom-1 right-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full" />
                </motion.a>
              ))}
            </nav>

            <a
              ref={ctaRef}
              href="#cta"
              data-cursor="לחץ"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-ink-900 text-sm font-bold hover:bg-accent transition-colors"
            >
              דבר איתנו
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M19 12L5 12M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="תפריט"
            >
              <span className={`block w-6 h-px bg-white transition-transform ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block w-6 h-px bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-px bg-white transition-transform ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink-900/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className="h-display text-3xl"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="px-7 py-3 mt-4 rounded-full bg-accent text-ink-900 font-bold"
              >
                דבר איתנו
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
