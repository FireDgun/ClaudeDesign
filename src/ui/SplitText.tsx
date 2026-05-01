import { motion, Variants } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  trigger?: "view" | "mount";
};

const wrapper: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

const letter: Variants = {
  hidden: { y: "120%", opacity: 0 },
  visible: (duration: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration,
      ease: [0.65, 0.05, 0.36, 1],
    },
  }),
};

export default function SplitText({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  stagger = 0.025,
  duration = 0.9,
  as = "span",
  trigger = "view",
}: Props) {
  const Component = motion[as] as typeof motion.span;
  const animateProps =
    trigger === "view"
      ? {
          initial: "hidden",
          whileInView: "visible",
          viewport: { once: true, margin: "-50px" },
        }
      : { initial: "hidden", animate: "visible" };

  const words = text.split(" ");

  return (
    <Component
      {...animateProps}
      variants={wrapper}
      custom={stagger}
      transition={{ delayChildren: delay }}
      className={`inline-block ${className}`}
      aria-label={text}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {Array.from(word).map((c, ci) => (
            <span
              key={ci}
              className={`inline-block overflow-hidden align-bottom ${charClassName}`}
              aria-hidden
            >
              <motion.span variants={letter} custom={duration} className="inline-block will-change-transform">
                {c}
              </motion.span>
            </span>
          ))}
          {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </Component>
  );
}
