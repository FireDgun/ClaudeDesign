import { motion } from "framer-motion";

const footerLinks = {
  studio: ["אודות", "צוות", "קריירה", "בלוג"],
  work: ["פרויקטים", "תהליך", "טכנולוגיות", "פרסים"],
  social: ["Instagram", "LinkedIn", "Behance", "Vimeo"],
};

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-10 border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="overflow-hidden marquee-mask py-8 mb-16 border-y border-white/5">
          <div className="flex gap-12 animate-marquee-r whitespace-nowrap">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="h-display text-6xl md:text-9xl font-black text-stroke"
              >
                NEXUS&nbsp;BUILD&nbsp;★
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 h-display text-xl mb-6">
              <span className="text-accent">[</span>
              <span>NEXUS</span>
              <em className="not-italic text-accent">BUILD</em>
              <span className="text-accent">]</span>
            </div>
            <p className="text-white/60 max-w-xs leading-relaxed mb-8">
              סטודיו אדריכלות עתידני — AI, סריקות 3D ו-IoT. בונים את העולם של אחרי הבטון.
            </p>
            <div className="num-display text-xs text-white/40 uppercase tracking-widest space-y-2">
              <div>HALEVAVOT 14, TLV</div>
              <div>+972-3-1234567</div>
              <div>HELLO@NEXUSBUILD.IO</div>
            </div>
          </div>

          <FooterCol title="הסטודיו" links={footerLinks.studio} />
          <FooterCol title="העבודה" links={footerLinks.work} />
          <FooterCol title="עקבו" links={footerLinks.social} />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-white/10 num-display text-xs uppercase tracking-widest text-white/40">
          <div>© {new Date().getFullYear()} NEXUS BUILD · ALL RIGHTS RESERVED</div>
          <div className="flex items-center gap-2">
            <span className="block w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span>BUILT WITH ❤ IN TEL AVIV</span>
          </div>
          <a href="#hero" className="hover:text-accent transition">
            ↑ BACK TO TOP
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="md:col-span-2">
      <div className="num-display text-[10px] uppercase tracking-widest text-accent mb-5">
        {title}
      </div>
      <ul className="space-y-3">
        {links.map((l, i) => (
          <motion.li
            key={l}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <a href="#" className="text-white/70 hover:text-white transition relative group">
              {l}
              <span className="absolute -bottom-px right-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
