---
name: nexus-design-language
description: Project-specific design system rules for the Nexus Build landing page (5 variants — Crystal, Editorial, Brutalist, Glass, Aurora). Use whenever editing files under src/variants/, src/components/, or src/ui/. Defines the type scale, motion easing, color tokens, layout grid, accessibility floor, and the signature interaction allowed per variant. Also lists the imagery and content sources, and the rule that variants MUST be visually distinct, not just recolored.
---

# Nexus Build — Project Design Language

This site is a **5-variant** landing page. Each variant has a deliberately distinct visual identity. **Recoloring an existing variant is NOT a new variant** — each must have its own typography pairing, motion vocabulary, layout grid, and at least one signature interaction that no other variant has.

---

## 1. Variant identities (do not blur)

| Variant   | Mood              | Bg     | Headline font  | Body font   | Signature move (must keep)                                                         |
|-----------|-------------------|--------|----------------|-------------|------------------------------------------------------------------------------------|
| Crystal   | Sci-fi cinematic  | #050507| Orbitron       | Heebo       | R3F ring tower + chromatic-aberration glass core; live HUD; mouse-tracked camera   |
| Editorial | Magazine          | #f1ece2| Serif (Lora-ish)| Heebo      | Drop cap, marginalia sidebar, asymmetric photo collage, bottom folio counter        |
| Brutalist | Raw print         | #fff   | JetBrains Mono | Mono        | Triple-stacked marquees, hover-scramble titles, mouse trail, scanlines, sweep-invert|
| Glass     | iOS / Linear      | #06061a| Heebo          | Heebo       | Sticky-pinned feature chapters; Tilt cards (3D mouse); spotlight grid               |
| Aurora    | Apple, soft pastel| #f4f1ec| Heebo          | Heebo       | Sticky photo crossfade narrative; conic-gradient blobs; gradient-text headlines     |

**Rule:** before pushing a change, scan the diff for that variant — if the change makes the variant look more like ANY other variant in the table, undo it.

---

## 2. Spacing scale (8-point system)

Use only these values for `padding`, `margin`, `gap`. Anything else is a bug.

```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 · 200
```

Tailwind: `p-1 p-2 p-3 p-4 p-6 p-8 p-12 p-16 p-24 p-32 p-40 p-48`. **Never** mix `p-5`/`p-7`/`p-9` etc.

---

## 3. Type scale (modular, ratio 1.333)

| Role            | clamp                                     | line-height | weight        |
|-----------------|-------------------------------------------|-------------|---------------|
| Display hero    | `clamp(56px, 11vw, 200px)`                | 0.85        | 800-900       |
| Section h2      | `clamp(40px, 6vw, 96px)`                  | 0.95        | 700-900       |
| Card h3         | `clamp(24px, 2.5vw, 40px)`                | 1.05        | 700           |
| Body lead       | `clamp(18px, 1.6vw, 24px)`                | 1.4         | 300-400       |
| Body            | `15-17px`                                 | 1.6         | 400           |
| Label / caption | `10-12px` uppercase tracking `0.3em`      | 1.2         | 500-700 mono  |

Body line length max **75 characters**. Headings line length max **18 words**.

---

## 4. Motion vocabulary

Easing curve — use the **same curve everywhere** so the feel is cohesive:

```ts
const easeOutExpo = [0.65, 0.05, 0.36, 1] as const; // headlines, reveals
const easeOutQuart = [0.25, 1, 0.5, 1] as const;    // micro-interactions
```

Banned: `linear`, the default `ease`, and Framer Motion's default spring without tuning.

Durations:
- Headline reveal: 1.0–1.2s (with stagger 0.04s per char)
- Section enter: 0.7–0.9s
- Hover: 0.2–0.4s
- Page-level transitions: 0.4s crossfade

**Reveal pattern:** `{ y: "110%", opacity: 0 } → { y: 0, opacity: 1 }` inside `overflow: hidden`. Use `SplitText` from `src/ui/SplitText.tsx` for character-level. Stagger 0.04s per character.

**No more than ONE animated focal point per fold**. If the headline is animating, the photo is still. If the photo is parallaxing, the headline is static. Multiple competing motions = AI slop.

---

## 5. Color tokens (per variant)

Canonical palette already in `tailwind.config.js`. Per-variant accents:

```
crystal   bg #050507  text #f6f6f8  accent #7cf9ff  warm #ff6b6b
editorial bg #f1ece2  text #1a1a1a  accent #c14926
brutalist bg #ffffff  text #000000  accent #ff5b1f
glass     bg #06061a  text #ffffff  accent #5d6cff  cool #06b6d4
aurora    bg #f4f1ec  text #1d1d1f  accent #7c5cff  warm #ff8a6f
```

WCAG floor: body text contrast **≥ 4.5:1** against its background. Test with `accent` on `bg` — if it fails, dim the accent only for plain text usage; keep it full-strength for ornaments (lines, dots, icons).

---

## 6. Layout grid

- Desktop max width: `1500px` (`max-w-[1500px]`).
- Outer gutters: `px-5 md:px-8`.
- 12-column on lg+. Mobile is single-column with section gutters.
- Avoid centered-everything layouts — at least one section in each variant should break the grid (offset, asymmetric, oversized one column).

---

## 7. Imagery

- Source: Unsplash (specific IDs in `src/data.ts`). Do not change without checking the photo is hot-link friendly.
- Always specify `loading="lazy"` except for the hero image which is `loading="eager"`.
- Always set explicit `?w=` and `?q=` on Unsplash URLs. Default: `?auto=format&fit=crop&w=1600&q=80`.
- Crystal variant should NOT use photographs — it lives in pure 3D/CSS-generative. Other variants: photos are central.

---

## 8. Performance budget

- Initial JS gzipped budget: **≤ 110 KB**. The 3D scene must be in its own lazy chunk.
- Each variant chunk: **≤ 25 KB gzipped**.
- Only Crystal may use R3F. Other variants: SVG/CSS only.
- WebGL canvas: `dpr={[1, 1.5]}`, `frameloop="demand"` when out of viewport (use `useInViewSection`).

---

## 9. Code conventions

- All variants live in `src/variants/<Name>.tsx` as a SINGLE self-contained file (so we can delete one without touching the others).
- Shared logic goes in `src/ui/` (presentational) or `src/hooks/` (behavioral). Keep these tiny and dumb.
- Shared content lives in `src/data.ts`. Never inline copy in a variant file.
- Tailwind classes on JSX. Inline `style={{}}` is allowed for variant-specific tokens that aren't in the theme (e.g. one-off gradients).

---

## 10. Forbidden — do not do these in this repo

- ❌ `font-family: Inter` or `Arial` (the frontend-design skill explicitly bans these)
- ❌ Purple gradient on white background (cliché)
- ❌ Symmetric centered-everything hero layouts on more than 1 variant
- ❌ More than one R3F canvas mounted on the screen at once
- ❌ Mixing variant-specific easing curves
- ❌ Adding a new variant without updating the table in §1 and the VariantSwitcher swatch
- ❌ Touching `master` directly with `--force` or amending pushed commits without a reason

---

## 11. When in doubt

Default to **the frontend-design skill's principle**: pick a bold, intentional aesthetic direction, then commit to it precisely. Generic = wrong. Refined minimalism and bold maximalism are both correct — uncommitted middle ground is the failure state.
