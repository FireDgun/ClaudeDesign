import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>{}[]";

export function useTextScramble(target: string, options?: { speed?: number; revealRate?: number; trigger?: any }) {
  const [output, setOutput] = useState(target);
  const speed = options?.speed ?? 28;
  const revealRate = options?.revealRate ?? 0.38;

  useEffect(() => {
    let raf = 0;
    let queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    const oldText = output || "";
    const newText = target;
    const length = Math.max(oldText.length, newText.length);
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 30);
      const end = start + Math.floor(Math.random() * 30) + 10;
      queue.push({ from, to, start, end });
    }
    let frame = 0;

    const update = () => {
      let out = "";
      let done = 0;
      for (let i = 0; i < queue.length; i++) {
        const q = queue[i];
        if (frame >= q.end) {
          done++;
          out += q.to;
        } else if (frame >= q.start) {
          if (!q.char || Math.random() < revealRate) q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          out += q.char;
        } else {
          out += q.from;
        }
      }
      setOutput(out);
      if (done === queue.length) return;
      frame++;
      raf = requestAnimationFrame(update);
    };

    const t = setTimeout(() => {
      raf = requestAnimationFrame(update);
    }, speed);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, options?.trigger]);

  return output;
}
