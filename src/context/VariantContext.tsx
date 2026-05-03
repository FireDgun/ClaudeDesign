import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type VariantId = "cyberpunk" | "minimal" | "wireframe" | "premium" | "organic";

export const VARIANTS: { id: VariantId; name: string; tagline: string; concept: string; swatch: string[] }[] = [
  {
    id: "cyberpunk",
    name: "Cyberpunk Neon",
    tagline: "Blade Runner · Tron",
    concept: "Deep black + magenta + cyan. Neon glow, scan lines, holographic HUDs, matrix code rain.",
    swatch: ["#0a0a0f", "#ff00ff", "#00ffff"],
  },
  {
    id: "minimal",
    name: "Architectural Minimalism",
    tagline: "Bauhaus · Apple · Zaha",
    concept: "Off-white + grays + a single bold accent. Whitespace, technical drawings, exploded diagrams.",
    swatch: ["#fafaf7", "#0a0a0a", "#ff5500"],
  },
  {
    id: "wireframe",
    name: "Wireframe Blueprint",
    tagline: "Drafting Table · ISO",
    concept: "Prussian blue + cyan + copper. Wireframe everything, dimension lines, isometric, technical annotations.",
    swatch: ["#0d2849", "#5fb3d6", "#c98a3d"],
  },
  {
    id: "premium",
    name: "Premium Glass",
    tagline: "Stripe · Linear · Vercel",
    concept: "Deep navy + gold/silver. Glass morphism, depth layers, soft bloom, premium SaaS.",
    swatch: ["#0a0e1a", "#d4af37", "#c0c0c0"],
  },
  {
    id: "organic",
    name: "Organic Volumetric",
    tagline: "MDX · Spline · Lusion",
    concept: "Warm-cool gradients (orange · pink · purple). Blob shapes, volumetric light, fluid simulations.",
    swatch: ["#1a0820", "#ff6b35", "#c2185b"],
  },
];

const VariantContext = createContext<{
  variant: VariantId;
  setVariant: (v: VariantId) => void;
}>({ variant: "cyberpunk", setVariant: () => {} });

const KEY = "proalgo.variant";

export function VariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<VariantId>(() => {
    if (typeof window === "undefined") return "cyberpunk";
    const stored = localStorage.getItem(KEY);
    if (stored && VARIANTS.find((v) => v.id === stored)) return stored as VariantId;
    return "cyberpunk";
  });

  const setVariant = (v: VariantId) => {
    setVariantState(v);
    localStorage.setItem(KEY, v);
  };

  useEffect(() => {
    document.documentElement.dataset.variant = variant;
  }, [variant]);

  return (
    <VariantContext.Provider value={{ variant, setVariant }}>{children}</VariantContext.Provider>
  );
}

export const useVariant = () => useContext(VariantContext);
