import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type VariantId = "blueprint" | "monograph" | "constructivist" | "kenchiku" | "anderson";

export const VARIANTS: { id: VariantId; name: string; tagline: string; concept: string; swatch: string[] }[] = [
  {
    id: "blueprint",
    name: "Blueprint",
    tagline: "תוכנית אדריכל · 1:200",
    concept: "Architectural drafting — cyan on prussian blue, dimension lines, isometric drawings, drafting symbols.",
    swatch: ["#0c2a4a", "#5edcff", "#f1e9d2"],
  },
  {
    id: "monograph",
    name: "Monograph",
    tagline: "ספר נדל\"ן יוקרתי",
    concept: "Auction-house property catalog — warm cream, Cormorant Garamond, full-bleed photography, marginalia.",
    swatch: ["#f3ece1", "#1c1917", "#8b2818"],
  },
  {
    id: "constructivist",
    name: "Constructivist",
    tagline: "אגיטפרופ · רוסיה 1920",
    concept: "Russian constructivist — bone white, deep red, hard black, rotated slabs, geometric shapes.",
    swatch: ["#f4ebe1", "#c81d1d", "#0a0a0a"],
  },
  {
    id: "kenchiku",
    name: "Kenchiku",
    tagline: "סטודיו יפני · SANAA",
    concept: "Japanese architecture firm — vast white, sumi black, single vermillion accent, vertical type.",
    swatch: ["#fafaf6", "#1f1f1f", "#ce3e1d"],
  },
  {
    id: "anderson",
    name: "Anderson",
    tagline: "ווס אנדרסון · סימטריה",
    concept: "Wes Anderson framing — pastel mint/coral, Italiana display, ornate symmetric frames, vintage stamps.",
    swatch: ["#f7d7c4", "#bcd9c5", "#3e2c2a"],
  },
];

const VariantContext = createContext<{
  variant: VariantId;
  setVariant: (v: VariantId) => void;
}>({ variant: "blueprint", setVariant: () => {} });

const KEY = "nexus.variant";

export function VariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariantState] = useState<VariantId>(() => {
    if (typeof window === "undefined") return "blueprint";
    const stored = localStorage.getItem(KEY);
    if (stored && VARIANTS.find((v) => v.id === stored)) return stored as VariantId;
    return "blueprint";
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
