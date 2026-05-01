import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type VariantId = "crystal" | "editorial" | "brutalist" | "glass" | "aurora";

export const VARIANTS: { id: VariantId; name: string; tagline: string; swatch: string[] }[] = [
  { id: "crystal", name: "Crystal", tagline: "futuristic 3D · cyan", swatch: ["#050507", "#7cf9ff", "#ff6b6b"] },
  { id: "editorial", name: "Editorial", tagline: "magazine · serif · cream", swatch: ["#f1ece2", "#1a1a1a", "#c14926"] },
  { id: "brutalist", name: "Brutalist", tagline: "raw · mono · orange", swatch: ["#000", "#ff5b1f", "#fff"] },
  { id: "glass", name: "Glass", tagline: "linear-style glassmorphism", swatch: ["#0b0b22", "#5d6cff", "#a5b4fc"] },
  { id: "aurora", name: "Aurora", tagline: "soft pastel · apple-like", swatch: ["#f4f1ec", "#1d1d1f", "#a78bfa"] },
];

const VariantContext = createContext<{
  variant: VariantId;
  setVariant: (v: VariantId) => void;
}>({ variant: "crystal", setVariant: () => {} });

const KEY = "nexus.variant";

export function VariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<VariantId>(() => {
    if (typeof window === "undefined") return "crystal";
    const stored = localStorage.getItem(KEY);
    if (stored && VARIANTS.find((v) => v.id === stored)) return stored as VariantId;
    return "crystal";
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
