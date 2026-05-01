import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const sy = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });
  const dotX = useSpring(x, { damping: 20, stiffness: 700, mass: 0.2 });
  const dotY = useSpring(y, { damping: 20, stiffness: 700, mass: 0.2 });
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest('a, button, [data-cursor], input, textarea');
      if (interactive) {
        setHover(true);
        const cursorText = interactive.getAttribute('data-cursor');
        setText(cursorText);
      } else {
        setHover(false);
        setText(null);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        ref={ringRef}
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hover ? (text ? 4 : 2.2) : 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="pointer-events-none fixed top-0 left-0 z-[200] mix-blend-difference"
      >
        <div className="w-9 h-9 rounded-full border border-white/80 flex items-center justify-center backdrop-blur-sm">
          {text && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="num-display text-[10px] uppercase tracking-wider whitespace-nowrap"
            >
              {text}
            </motion.span>
          )}
        </div>
      </motion.div>
      <motion.div
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hover ? 0 : 1 }}
        className="pointer-events-none fixed top-0 left-0 z-[201] w-1.5 h-1.5 bg-white rounded-full mix-blend-difference"
      />
    </>
  );
}
