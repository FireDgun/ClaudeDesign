import { useEffect, useState, RefObject } from "react";

export function useInViewSection<T extends Element>(
  ref: RefObject<T>,
  margin = "0px"
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: margin, threshold: 0.01 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [ref, margin]);

  return inView;
}
