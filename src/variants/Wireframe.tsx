import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { brand, scenes, stats, products, partners, testimonials, team } from "../data";

/* =========================================================================
   PRO ALGORITHM — VARIANT 03: WIREFRAME BLUEPRINT
   1960s drafting books × NASA mission control × Westworld credits × TRON 1982
   Palette: prussian #0d2849, cyan #5fb3d6, white #fff, copper #c98a3d, amber #f4b942
   ========================================================================= */

const COLORS = {
  ink: "#0d2849",
  ink2: "#0a1f3b",
  ink3: "#081832",
  cyan: "#5fb3d6",
  cyanDim: "#2f6c89",
  white: "#ffffff",
  copper: "#c98a3d",
  amber: "#f4b942",
};

/* ---------- 3D: WIREFRAME CITY ---------- */
function WireframeCity({ count = 120 }: { count: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const seed = (n: number) => {
    const x = Math.sin(n * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  };
  const scales = useMemo(() => {
    const arr: { x: number; y: number; z: number; px: number; pz: number; rot: number }[] = [];
    let i = 0;
    while (arr.length < count) {
      const r1 = seed(i++);
      const r2 = seed(i++);
      const r3 = seed(i++);
      const r4 = seed(i++);
      const r5 = seed(i++);
      const px = (r1 - 0.5) * 60;
      const pz = (r2 - 0.5) * 60;
      if (Math.abs(px) < 4 && Math.abs(pz) < 4) continue;
      const h = 2 + r3 * r3 * 18;
      const w = 1 + r4 * 2.2;
      const d = 1 + r5 * 2.2;
      arr.push({ x: w, y: h, z: d, px, pz, rot: r5 * Math.PI });
    }
    return arr;
  }, [count]);

  const edgeGeom = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), []);
  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(COLORS.cyan),
        transparent: true,
        opacity: 0.55,
      }),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <group ref={groupRef}>
      {scales.map((s, i) => (
        <lineSegments
          key={i}
          position={[s.px, s.y / 2, s.pz]}
          rotation={[0, s.rot, 0]}
          scale={[s.x, s.y, s.z]}
          geometry={edgeGeom}
          material={lineMat}
        />
      ))}
      <gridHelper args={[120, 60, COLORS.cyanDim, COLORS.cyanDim]} position={[0, 0, 0]} />
    </group>
  );
}

/* ---------- 3D: HERO BUILDING ---------- */
function HeroBuilding({ extend = 0 }: { extend: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const floors = 14;
  const floorH = 0.9;
  const w = 4;
  const d = 3;

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(COLORS.white),
        transparent: true,
        opacity: 0.9,
      }),
    [],
  );
  const accentMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(COLORS.amber),
        transparent: true,
        opacity: 0.95,
      }),
    [],
  );
  const cyanMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(COLORS.cyan),
        transparent: true,
        opacity: 0.7,
      }),
    [],
  );

  const boxEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(1, 1, 1)), []);

  const braceGeom = useMemo(() => {
    const pts = [
      new THREE.Vector3(-w / 2, 0, d / 2 + 0.001),
      new THREE.Vector3(w / 2, floorH, d / 2 + 0.001),
      new THREE.Vector3(w / 2, 0, d / 2 + 0.001),
      new THREE.Vector3(-w / 2, floorH, d / 2 + 0.001),
    ];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.15;
  });

  const shownFloors = Math.max(2, Math.floor(floors * (0.55 + extend * 0.45)));

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <lineSegments geometry={boxEdges} material={accentMat} scale={[w + 1, 0.3, d + 1]} position={[0, 0.15, 0]} />
      {Array.from({ length: shownFloors }).map((_, i) => (
        <group key={i} position={[0, 0.3 + i * floorH + floorH / 2, 0]}>
          <lineSegments geometry={boxEdges} material={lineMat} scale={[w, floorH, d]} />
          {i % 2 === 0 && <lineSegments geometry={braceGeom} material={cyanMat} />}
        </group>
      ))}
      <lineSegments
        geometry={boxEdges}
        material={accentMat}
        scale={[w * 0.6, 0.25, d * 0.6]}
        position={[0, 0.3 + shownFloors * floorH + 0.125, 0]}
      />
      {extend > 0.6 &&
        Array.from({ length: Math.max(0, Math.floor((extend - 0.6) * 10)) }).map((_, i) => (
          <lineSegments
            key={`ext-${i}`}
            geometry={boxEdges}
            material={cyanMat}
            scale={[w * (1 - i * 0.05), 0.2, d * (1 - i * 0.05)]}
            position={[0, 0.3 + shownFloors * floorH + 0.5 + i * 0.4, 0]}
          />
        ))}
    </group>
  );
}

/* ---------- 3D: SCENE WRAPPER WITH SCROLL-DRIVEN CAMERA ---------- */
function SceneRig({ progress, extend }: { progress: number; extend: number }) {
  const { camera } = useThree();
  useFrame(() => {
    const p = progress;
    const pos = new THREE.Vector3();
    const look = new THREE.Vector3(0, 2, 0);
    if (p < 0.2) {
      const t = p / 0.2;
      pos.set(40 - t * 18, 28 - t * 14, 40 - t * 18);
      look.set(0, 4, 0);
    } else if (p < 0.4) {
      const t = (p - 0.2) / 0.2;
      pos.set(22 - t * 8, 14 - t * 4, 22 - t * 8);
      look.set(0, 5 + t * 2, 0);
    } else if (p < 0.6) {
      const t = (p - 0.4) / 0.2;
      pos.set(14 - t * 8, 10 + t * 14, 14 - t * 8);
      look.set(0, 3 - t * 3, 0);
    } else if (p < 0.8) {
      const t = (p - 0.6) / 0.2;
      pos.set(6 + t * 4, 24 - t * 14, 6 - t * 8);
      look.set(0, 4, 0);
    } else {
      const t = (p - 0.8) / 0.2;
      pos.set(10 + t * 10, 10 + t * 6, -2 - t * 18);
      look.set(0, 5 + t * 3, 0);
    }
    camera.position.lerp(pos, 0.06);
    camera.lookAt(look);
  });
  return <HeroBuilding extend={extend} />;
}

/* ---------- BACKGROUND CANVAS ---------- */
function BlueprintCanvas({ progress, extend }: { progress: number; extend: number }) {
  const [count, setCount] = useState(120);
  useEffect(() => {
    const onResize = () => setCount(window.innerWidth < 768 ? 50 : 120);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <Canvas
      className="!fixed inset-0"
      camera={{ position: [40, 28, 40], fov: 35, near: 0.1, far: 500 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={[COLORS.ink]} />
      <fog attach="fog" args={[COLORS.ink, 30, 90]} />
      <ambientLight intensity={0.4} />
      <WireframeCity count={count} />
      <SceneRig progress={progress} extend={extend} />
    </Canvas>
  );
}

/* ---------- ISOMETRIC GRID PAPER OVERLAY ---------- */
function GridPaper() {
  return (
    <svg className="pointer-events-none fixed inset-0 z-[2] h-full w-full opacity-[0.18] mix-blend-screen" aria-hidden>
      <defs>
        <pattern id="grid-fine" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke={COLORS.cyan} strokeWidth="0.4" />
        </pattern>
        <pattern id="grid-bold" width="120" height="120" patternUnits="userSpaceOnUse">
          <path d="M 120 0 L 0 0 0 120" fill="none" stroke={COLORS.cyan} strokeWidth="0.9" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-fine)" />
      <rect width="100%" height="100%" fill="url(#grid-bold)" />
    </svg>
  );
}

/* ---------- VIEWPORT CHROME: CROSSHAIR, TITLE BLOCK, NORTH ARROW, RULER ---------- */
function ViewportChrome({ scene }: { scene: number }) {
  const sheetN = `A-${(201 + scene).toString().padStart(3, "0")}`;
  const titleByScene = [
    "CITY OVERVIEW · TEL AVIV",
    "PROJECT ELEVATION · BLOCK 14",
    "FLOOR PLAN · LEVEL +14.500m",
    "CAD VIEWPORT · REVIT 2026",
    "AUTONOMOUS GENERATION · AI",
  ];
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {/* Sheet borders */}
      <div className="absolute inset-5 border" style={{ borderColor: `${COLORS.cyan}8c` }} />
      <div className="absolute inset-7 border" style={{ borderColor: `${COLORS.cyan}55` }} />

      {/* Center crosshair */}
      <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="140" height="140" viewBox="-70 -70 140 140">
        <circle cx="0" cy="0" r="46" fill="none" stroke={COLORS.cyan} strokeOpacity="0.45" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="22" fill="none" stroke={COLORS.cyan} strokeOpacity="0.6" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="2" fill={COLORS.amber} />
        <line x1="-66" y1="0" x2="-26" y2="0" stroke={COLORS.cyan} strokeWidth="0.6" />
        <line x1="26" y1="0" x2="66" y2="0" stroke={COLORS.cyan} strokeWidth="0.6" />
        <line x1="0" y1="-66" x2="0" y2="-26" stroke={COLORS.cyan} strokeWidth="0.6" />
        <line x1="0" y1="26" x2="0" y2="66" stroke={COLORS.cyan} strokeWidth="0.6" />
        <text x="50" y="-50" fontSize="6" fill={COLORS.amber} fontFamily="IBM Plex Mono">VP·01</text>
      </svg>

      {/* Top-left: project mark */}
      <div className="absolute left-10 top-12 font-plex text-[10px] uppercase tracking-[0.2em]" style={{ color: COLORS.cyan }}>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rotate-45 border border-current" />
          PRO ALGORITHM ⌀ DRAFTING ROOM
        </div>
        <div className="mt-1 opacity-70">PROJECT N° PA-2026-014 · BLUEPRINT REV. 04</div>
      </div>

      {/* Top-right: sheet number */}
      <div className="absolute right-10 top-12 text-right font-plex text-[10px] uppercase tracking-[0.18em]" style={{ color: COLORS.cyan }}>
        <div className="text-xs" style={{ color: COLORS.amber }}>SHEET {sheetN}</div>
        <div className="opacity-80">{titleByScene[Math.min(scene, 4)]}</div>
        <div className="opacity-60">SCALE 1:200 · A1 / 594×841mm</div>
      </div>

      {/* North arrow */}
      <svg className="absolute right-10 top-32" width="60" height="80" viewBox="0 0 60 80">
        <circle cx="30" cy="40" r="22" fill="none" stroke={COLORS.cyan} strokeWidth="0.8" strokeOpacity="0.7" />
        <polygon points="30,18 36,46 30,42 24,46" fill={COLORS.amber} stroke={COLORS.amber} />
        <text x="30" y="14" textAnchor="middle" fontSize="8" fill={COLORS.amber} fontFamily="IBM Plex Mono">N</text>
        <text x="30" y="72" textAnchor="middle" fontSize="6" fill={COLORS.cyan} fontFamily="IBM Plex Mono">TRUE NORTH</text>
      </svg>

      {/* Bottom-left: scale ruler */}
      <div className="absolute bottom-10 left-10">
        <svg width="220" height="44" viewBox="0 0 220 44">
          <line x1="2" y1="20" x2="210" y2="20" stroke={COLORS.cyan} strokeWidth="0.8" />
          {Array.from({ length: 11 }).map((_, i) => (
            <g key={i}>
              <line x1={2 + i * 20} y1="14" x2={2 + i * 20} y2="26" stroke={COLORS.cyan} strokeWidth="0.6" />
              <text x={2 + i * 20} y="38" fontSize="6" fill={COLORS.cyan} fontFamily="IBM Plex Mono" textAnchor="middle">{i * 5}</text>
            </g>
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <rect key={i} x={2 + i * 40} y="14" width="20" height="6" fill={i % 2 === 0 ? COLORS.cyan : "transparent"} />
          ))}
          <text x="2" y="10" fontSize="6" fill={COLORS.amber} fontFamily="IBM Plex Mono">SCALE BAR · METERS</text>
        </svg>
      </div>

      {/* Bottom-right: title block */}
      <div className="absolute bottom-10 right-10 w-[340px] border font-plex text-[9px] uppercase tracking-wider" style={{ borderColor: COLORS.cyan, color: COLORS.cyan, background: "rgba(8,24,50,0.55)" }}>
        <div className="grid grid-cols-3 border-b" style={{ borderColor: COLORS.cyan }}>
          <div className="border-r p-2" style={{ borderColor: COLORS.cyan }}>
            <div className="opacity-60">CLIENT</div>
            <div className="text-white">PRO ALGORITHM</div>
          </div>
          <div className="border-r p-2" style={{ borderColor: COLORS.cyan }}>
            <div className="opacity-60">PROJECT</div>
            <div className="text-white">CITY · BLOCK 14</div>
          </div>
          <div className="p-2">
            <div className="opacity-60">DRAWN BY</div>
            <div style={{ color: COLORS.amber }}>AI · v4.2</div>
          </div>
        </div>
        <div className="grid grid-cols-3 border-b" style={{ borderColor: COLORS.cyan }}>
          <div className="border-r p-2" style={{ borderColor: COLORS.cyan }}>
            <div className="opacity-60">SCALE</div><div className="text-white">1 : 200</div>
          </div>
          <div className="border-r p-2" style={{ borderColor: COLORS.cyan }}>
            <div className="opacity-60">DATE</div><div className="text-white">2026-05-03</div>
          </div>
          <div className="p-2">
            <div className="opacity-60">REV</div><div style={{ color: COLORS.amber }}>04</div>
          </div>
        </div>
        <div className="flex items-center justify-between p-2">
          <div>SHEET {sheetN} OF A-205</div>
          <div className="flex items-center gap-2">
            <span style={{ color: COLORS.amber }}>◇</span>
            <span>{titleByScene[Math.min(scene, 4)]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- DIMENSION LINE ---------- */
function DimLine({ from, to, label, side = "top" }: { from: [number, number]; to: [number, number]; label: string; side?: "top" | "bottom" | "left" | "right" }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const off = 20;
  const ox = side === "left" ? -off : side === "right" ? off : 0;
  const oy = side === "top" ? -off : side === "bottom" ? off : 0;
  return (
    <g stroke={COLORS.amber} fill="none">
      <line x1={x1} y1={y1} x2={x1 + ox} y2={y1 + oy} strokeWidth="0.5" />
      <line x1={x2} y1={y2} x2={x2 + ox} y2={y2 + oy} strokeWidth="0.5" />
      <line x1={x1 + ox} y1={y1 + oy} x2={x2 + ox} y2={y2 + oy} strokeWidth="0.7" />
      <polygon points={`${x1 + ox - 3},${y1 + oy + 1} ${x1 + ox},${y1 + oy} ${x1 + ox - 3},${y1 + oy - 1}`} fill={COLORS.amber} />
      <polygon points={`${x2 + ox + 3},${y2 + oy + 1} ${x2 + ox},${y2 + oy} ${x2 + ox + 3},${y2 + oy - 1}`} fill={COLORS.amber} />
      <text x={(x1 + x2) / 2 + ox} y={(y1 + y2) / 2 + oy - 4} fontSize="7" fill={COLORS.amber} fontFamily="IBM Plex Mono" textAnchor="middle">{label}</text>
    </g>
  );
}

/* ---------- CALLOUT WITH LEADER LINE ---------- */
function Callout({ x, y, fromX, fromY, code, title, sub }: { x: number; y: number; fromX: number; fromY: number; code: string; title: string; sub?: string }) {
  return (
    <g fontFamily="IBM Plex Mono">
      <line x1={fromX} y1={fromY} x2={x} y2={y} stroke={COLORS.amber} strokeWidth="0.6" />
      <circle cx={fromX} cy={fromY} r="2.5" fill="none" stroke={COLORS.amber} strokeWidth="0.7" />
      <circle cx={fromX} cy={fromY} r="0.7" fill={COLORS.amber} />
      <circle cx={x} cy={y} r="9" fill={COLORS.ink} stroke={COLORS.amber} strokeWidth="0.7" />
      <text x={x} y={y + 2.5} fontSize="7" fill={COLORS.amber} textAnchor="middle">{code}</text>
      <text x={x + 14} y={y - 1} fontSize="7" fill={COLORS.white}>{title}</text>
      {sub && <text x={x + 14} y={y + 8} fontSize="6" fill={COLORS.cyan}>{sub}</text>}
    </g>
  );
}

/* ---------- HUD: SCENE INDICATOR ---------- */
function SceneHUD({ scene, progress }: { scene: number; progress: number }) {
  return (
    <div className="pointer-events-none fixed left-1/2 top-24 z-[55] -translate-x-1/2 font-plex text-[10px] uppercase tracking-[0.3em]" style={{ color: COLORS.cyan }}>
      <div className="flex items-center gap-3">
        {scenes.map((s, i) => (
          <div key={s.key} className="flex items-center gap-1.5">
            <span
              className="inline-block h-[6px] w-[6px] rotate-45 border"
              style={{
                borderColor: i === scene ? COLORS.amber : COLORS.cyan,
                background: i === scene ? COLORS.amber : "transparent",
                opacity: i <= scene ? 1 : 0.45,
              }}
            />
            <span style={{ color: i === scene ? COLORS.white : COLORS.cyan, opacity: i === scene ? 1 : 0.55 }}>{s.n}</span>
            {i < scenes.length - 1 && <span className="opacity-30">/</span>}
          </div>
        ))}
      </div>
      <div className="mt-1 text-center text-[8px]" style={{ color: COLORS.amber }}>
        PROGRESS {(progress * 100).toFixed(1).padStart(5, "0")}%
      </div>
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-[80] px-12">
      <div className="pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between border-b font-plex text-[10px] uppercase tracking-[0.22em]" style={{ borderColor: `${COLORS.cyan}55`, color: COLORS.cyan }}>
        <div className="flex items-center gap-3 py-2">
          <svg width="22" height="22" viewBox="-11 -11 22 22"><polygon points="0,-9 7,5 -7,5" fill="none" stroke={COLORS.amber} strokeWidth="1.2" /><circle cx="0" cy="0" r="2" fill={COLORS.amber} /></svg>
          <span className="text-white">PRO ALGORITHM</span>
          <span className="opacity-60">∟ DRAFTING / TLV</span>
        </div>
        <nav className="hidden items-center gap-6 py-2 md:flex">
          <span>I · CITY</span>
          <span>II · PROJECT</span>
          <span>III · PLANS</span>
          <span>IV · CAD</span>
          <span>V · AI</span>
        </nav>
        <div className="flex items-center gap-3 py-2">
          <span style={{ color: COLORS.amber }}>◇ REV 04</span>
          <span className="opacity-60">MAY · 2026</span>
        </div>
      </div>
    </header>
  );
}

/* =========================================================================
   SCENES
   ========================================================================= */

function SceneCity() {
  return (
    <section className="relative z-[20] flex min-h-[140vh] items-center justify-end px-6 pt-40 md:px-12">
      <div className="grid w-full max-w-[1600px] grid-cols-12 gap-8" dir="rtl">
        <div className="col-span-12 lg:col-span-7">
          <div className="font-plex text-[10px] uppercase tracking-[0.32em]" style={{ color: COLORS.amber }}>
            FIG. 01 — ELEVATION FRONT · CITY ⌀ TEL AVIV
          </div>
          <h1 className="mt-4 font-heebo text-[clamp(40px,6vw,84px)] font-light leading-[0.95] text-white">
            {scenes[0].title}
          </h1>
          <div className="mt-2 font-plex text-[12px] uppercase tracking-[0.18em]" style={{ color: COLORS.cyan }}>
            {scenes[0].titleEn}
          </div>
          <p className="mt-8 max-w-[60ch] font-heebo text-[17px] leading-[1.85] text-white/85">
            {scenes[0].body}
          </p>

          <div className="mt-10 grid max-w-[640px] grid-cols-3 gap-4 font-plex text-[10px] uppercase tracking-wider" style={{ color: COLORS.cyan }}>
            <div className="border p-3" style={{ borderColor: `${COLORS.cyan}66` }}>
              <div style={{ color: COLORS.amber }}>⌀ AUDIENCE</div>
              <div className="mt-1 font-heebo text-white">יזמי נדל"ן</div>
            </div>
            <div className="border p-3" style={{ borderColor: `${COLORS.cyan}66` }}>
              <div style={{ color: COLORS.amber }}>∟ EST.</div>
              <div className="mt-1 text-white">{brand.est}</div>
            </div>
            <div className="border p-3" style={{ borderColor: `${COLORS.cyan}66` }}>
              <div style={{ color: COLORS.amber }}>▽ CITY</div>
              <div className="mt-1 font-heebo text-white">{brand.cityHe}</div>
            </div>
          </div>
        </div>

        <div className="col-span-12 hidden lg:col-span-5 lg:block">
          <svg viewBox="0 0 500 480" className="h-[480px] w-full">
            <Callout x={70} y={70} fromX={250} fromY={120} code="A1" title="OVERVIEW" sub="CITY · 1:5000" />
            <Callout x={70} y={170} fromX={310} fromY={210} code="A2" title="DENSITY MAP" sub="120 STRUCTURES" />
            <Callout x={70} y={270} fromX={280} fromY={320} code="A3" title="GRID NORTH" sub="0 deg 00 min" />
            <Callout x={70} y={370} fromX={340} fromY={400} code="A4" title="DATUM" sub="MSL +0.000m" />

            <DimLine from={[430, 60]} to={[430, 420]} label="∟ 360.00m" side="right" />
            <DimLine from={[120, 440]} to={[400, 440]} label="∟ 280.00m" side="bottom" />

            <g stroke={COLORS.cyan} fill="none" strokeWidth="0.8" opacity="0.7">
              {Array.from({ length: 22 }).map((_, i) => {
                const x = 150 + (i % 7) * 38;
                const y = 80 + Math.floor(i / 7) * 70;
                const w = 22 + (i % 3) * 6;
                const h = 28 + ((i * 13) % 30);
                return <rect key={i} x={x} y={y} width={w} height={h} />;
              })}
              <line x1="140" y1="80" x2="420" y2="80" />
              <line x1="140" y1="80" x2="140" y2="420" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

function SceneProject() {
  return (
    <section className="relative z-[20] min-h-[140vh] px-6 py-40 md:px-12">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-10" dir="rtl">
        <div className="col-span-12 lg:col-span-5">
          <div className="font-plex text-[10px] uppercase tracking-[0.32em]" style={{ color: COLORS.amber }}>
            FIG. 02 — ISOMETRIC PROJECTION · BLOCK 14
          </div>
          <h2 className="mt-4 font-heebo text-[clamp(34px,4.6vw,62px)] font-light leading-[1] text-white">
            {scenes[1].title}
          </h2>
          <div className="mt-2 font-plex text-[12px] uppercase tracking-[0.18em]" style={{ color: COLORS.cyan }}>
            {scenes[1].titleEn}
          </div>
          <p className="mt-6 max-w-[55ch] font-heebo text-[16px] leading-[1.85] text-white/85">
            {scenes[1].body}
          </p>

          <div className="mt-10 space-y-3 font-plex text-[11px] uppercase tracking-wider">
            {[
              { code: "L-14", label: "ROOF · MECH ·", value: "+42.000m" },
              { code: "L-08", label: "OFFICE FLOOR ·", value: "+24.500m" },
              { code: "L-04", label: "MIXED USE ·", value: "+12.000m" },
              { code: "L-00", label: "GROUND · LOBBY ·", value: "+0.000m" },
              { code: "B-01", label: "BASEMENT · PARKING ·", value: "-3.500m" },
            ].map((row) => (
              <div key={row.code} className="grid grid-cols-12 items-center gap-2">
                <span className="col-span-2 text-right" style={{ color: COLORS.amber }}>{row.code}</span>
                <span className="col-span-1 text-center opacity-50" style={{ color: COLORS.cyan }}>—</span>
                <span className="col-span-6 font-heebo" style={{ color: COLORS.white }}>{row.label}</span>
                <span className="col-span-3 text-left" style={{ color: COLORS.cyan }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <svg viewBox="0 0 700 720" className="h-auto w-full">
            <defs>
              <pattern id="iso-grid" width="20" height="34.64" patternUnits="userSpaceOnUse">
                <path d="M 0 0 L 20 11.547 L 20 23.094 L 0 11.547 Z" fill="none" stroke={COLORS.cyan} strokeWidth="0.3" opacity="0.4" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="700" height="720" fill="url(#iso-grid)" />

            <g stroke={COLORS.white} strokeWidth="0.8" fill="none">
              {Array.from({ length: 14 }).map((_, i) => {
                const y = 600 - i * 32;
                const w = 180 - i * 2;
                const dx = 80;
                const cx = 340;
                return (
                  <g key={i}>
                    <polygon points={`${cx - w / 2},${y} ${cx + w / 2},${y} ${cx + w / 2 + dx},${y - dx * 0.5} ${cx - w / 2 + dx},${y - dx * 0.5}`} stroke={i % 4 === 0 ? COLORS.amber : COLORS.white} strokeWidth={i % 4 === 0 ? 1 : 0.6} />
                    <line x1={cx - w / 2} y1={y} x2={cx - w / 2} y2={y - 28} stroke={COLORS.white} strokeWidth="0.6" />
                    <line x1={cx + w / 2} y1={y} x2={cx + w / 2} y2={y - 28} stroke={COLORS.white} strokeWidth="0.6" />
                    <line x1={cx + w / 2 + dx} y1={y - dx * 0.5} x2={cx + w / 2 + dx} y2={y - dx * 0.5 - 28} stroke={COLORS.white} strokeWidth="0.6" />
                  </g>
                );
              })}
            </g>

            <g stroke={COLORS.amber} fill="none" strokeWidth="0.6">
              <line x1="540" y1="160" x2="600" y2="160" />
              <line x1="540" y1="600" x2="600" y2="600" />
              <line x1="590" y1="160" x2="590" y2="600" />
              <text x="595" y="380" fontSize="10" fill={COLORS.amber} fontFamily="IBM Plex Mono" transform="rotate(90,595,380)">∟ 42.000m TOTAL</text>
            </g>

            <Callout x={620} y={180} fromX={520} fromY={180} code="B1" title="ROOF MECH" sub="HVAC + PV" />
            <Callout x={620} y={300} fromX={500} fromY={310} code="B2" title="CURTAIN WALL" sub="LOW-E GLASS" />
            <Callout x={80} y={420} fromX={300} fromY={440} code="B3" title="STRUCTURAL CORE" sub="RC SHEAR WALLS" />
            <Callout x={80} y={560} fromX={290} fromY={570} code="B4" title="LOBBY VOID" sub="14m H × 8m W" />
            <Callout x={620} y={580} fromX={520} fromY={570} code="B5" title="EXPRESSED FRAME" sub="STEEL × 350mm" />

            <text x="20" y="700" fontSize="9" fill={COLORS.cyan} fontFamily="IBM Plex Mono">FIG. 02 · ISOMETRIC PROJECTION · NORTH-EAST 30/30 · NTS</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

function ScenePlans() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const drawMV = useTransform(scrollYProgress, [0.05, 0.85], [1, 0]);
  const [d, setD] = useState(1);
  useMotionValueEvent(drawMV, "change", (v) => setD(v));

  const planPaths = useMemo(() => {
    const wallSet: { d: string; len: number }[] = [];
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [
      { x1: 60, y1: 60, x2: 740, y2: 60 },
      { x1: 740, y1: 60, x2: 740, y2: 480 },
      { x1: 740, y1: 480, x2: 60, y2: 480 },
      { x1: 60, y1: 480, x2: 60, y2: 60 },
      { x1: 60, y1: 240, x2: 320, y2: 240 },
      { x1: 320, y1: 60, x2: 320, y2: 480 },
      { x1: 320, y1: 360, x2: 740, y2: 360 },
      { x1: 540, y1: 60, x2: 540, y2: 360 },
      { x1: 540, y1: 200, x2: 740, y2: 200 },
      { x1: 320, y1: 150, x2: 320, y2: 190 },
      { x1: 540, y1: 280, x2: 540, y2: 320 },
    ];
    lines.forEach((l) => {
      const len = Math.hypot(l.x2 - l.x1, l.y2 - l.y1);
      wallSet.push({ d: `M ${l.x1} ${l.y1} L ${l.x2} ${l.y2}`, len });
    });
    return wallSet;
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[20] min-h-[180vh] px-6 py-40 md:px-12">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-10" dir="rtl">
        <div className="col-span-12 lg:col-span-4">
          <div className="font-plex text-[10px] uppercase tracking-[0.32em]" style={{ color: COLORS.amber }}>
            FIG. 03 — FLOOR PLAN · LEVEL +14.500m
          </div>
          <h2 className="mt-4 font-heebo text-[clamp(34px,4.6vw,62px)] font-light leading-[1] text-white">
            {scenes[2].title}
          </h2>
          <div className="mt-2 font-plex text-[12px] uppercase tracking-[0.18em]" style={{ color: COLORS.cyan }}>
            {scenes[2].titleEn}
          </div>
          <p className="mt-6 font-heebo text-[16px] leading-[1.85] text-white/85">{scenes[2].body}</p>
          <div className="mt-8 font-plex text-[10px] uppercase tracking-[0.2em]" style={{ color: COLORS.cyan }}>
            <div>OUTPUT FORMATS</div>
            <div className="mt-2 flex gap-2">
              {["DWG", "IFC", "RVT", "PDF"].map((f) => (
                <span key={f} className="border px-2 py-1" style={{ borderColor: COLORS.amber, color: COLORS.amber }}>{f}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <svg viewBox="0 0 800 560" className="h-auto w-full">
            <rect x="20" y="20" width="760" height="520" fill="none" stroke={COLORS.cyan} strokeOpacity="0.5" strokeWidth="0.6" />

            {planPaths.map((p, i) => (
              <path
                key={i}
                d={p.d}
                stroke={COLORS.white}
                strokeWidth="2"
                fill="none"
                strokeDasharray={p.len}
                strokeDashoffset={p.len * d}
              />
            ))}

            {(() => {
              const items = [
                { d: "M 100 100 L 200 100 L 200 180 L 100 180 Z", l: 360 },
                { d: "M 360 100 L 480 100 L 480 200 L 360 200 Z", l: 440 },
                { d: "M 360 280 L 480 280 L 480 340 L 360 340 Z", l: 360 },
                { d: "M 580 240 L 700 240 L 700 320 L 580 320 Z", l: 400 },
                { d: "M 100 300 L 240 300 L 240 440 L 100 440 Z", l: 540 },
                { d: "M 600 100 L 720 100 L 720 180 L 600 180 Z", l: 400 },
              ];
              const phase = Math.max(0, (1 - d - 0.4) / 0.6);
              return items.map((it, i) => (
                <path key={`f-${i}`} d={it.d} stroke={COLORS.cyan} strokeWidth="1" fill="none" strokeDasharray={it.l} strokeDashoffset={it.l * (1 - phase)} opacity="0.85" />
              ));
            })()}

            <g opacity={Math.max(0, 1 - d) ** 0.7}>
              <DimLine from={[60, 40]} to={[320, 40]} label="∟ 8.20m" side="top" />
              <DimLine from={[320, 40]} to={[540, 40]} label="∟ 6.50m" side="top" />
              <DimLine from={[540, 40]} to={[740, 40]} label="∟ 6.30m" side="top" />
              <DimLine from={[40, 60]} to={[40, 240]} label="∟ 5.40m" side="left" />
              <DimLine from={[40, 240]} to={[40, 480]} label="∟ 7.20m" side="left" />
            </g>

            <g fontFamily="IBM Plex Mono" opacity={Math.max(0, 1 - d) ** 0.7}>
              <text x="190" y="160" fill={COLORS.amber} fontSize="9">A.01 · LIVING</text>
              <text x="190" y="172" fill={COLORS.cyan} fontSize="7">42.5 m²</text>
              <text x="430" y="160" fill={COLORS.amber} fontSize="9">A.02 · KITCHEN</text>
              <text x="430" y="172" fill={COLORS.cyan} fontSize="7">18.2 m²</text>
              <text x="430" y="320" fill={COLORS.amber} fontSize="9">A.03 · DINING</text>
              <text x="430" y="332" fill={COLORS.cyan} fontSize="7">22.0 m²</text>
              <text x="640" y="290" fill={COLORS.amber} fontSize="9">A.04 · STUDY</text>
              <text x="640" y="302" fill={COLORS.cyan} fontSize="7">14.4 m²</text>
              <text x="170" y="380" fill={COLORS.amber} fontSize="9">A.05 · BEDROOM</text>
              <text x="170" y="392" fill={COLORS.cyan} fontSize="7">28.6 m²</text>
              <text x="660" y="160" fill={COLORS.amber} fontSize="9">A.06 · BATH</text>
              <text x="660" y="172" fill={COLORS.cyan} fontSize="7">9.8 m²</text>
            </g>

            <g transform="translate(720,500)">
              <circle cx="0" cy="0" r="14" fill="none" stroke={COLORS.cyan} strokeWidth="0.6" />
              <polygon points="0,-12 4,4 0,2 -4,4" fill={COLORS.amber} />
              <text x="0" y="-16" textAnchor="middle" fontSize="6" fill={COLORS.amber} fontFamily="IBM Plex Mono">N</text>
            </g>

            <text x="40" y="540" fontSize="9" fill={COLORS.cyan} fontFamily="IBM Plex Mono">
              FIG. 03 · FLOOR PLAN GENERATED · {(((1 - d) * 100) | 0).toString().padStart(3, "0")}% COMPLETE
            </text>
          </svg>

          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border p-4 font-plex" style={{ borderColor: `${COLORS.cyan}77`, background: "rgba(8,24,50,0.4)" }}>
                <div className="text-[28px] tracking-tight" style={{ color: COLORS.amber }}>
                  {s.value}
                  <span className="text-[14px] opacity-70">{s.suffix}</span>
                </div>
                <div className="mt-1 font-heebo text-[13px] text-white">{s.label}</div>
                <div className="mt-1 text-[9px] uppercase tracking-wider opacity-70" style={{ color: COLORS.cyan }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SceneCAD() {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const start = useRef({ x: 0, y: 0, px: 0, py: 0 });

  return (
    <section className="relative z-[20] min-h-[140vh] px-6 py-40 md:px-12">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-10" dir="rtl">
        <div className="col-span-12 lg:col-span-4">
          <div className="font-plex text-[10px] uppercase tracking-[0.32em]" style={{ color: COLORS.amber }}>
            FIG. 04 — CAD VIEWPORT · SHEET A-204
          </div>
          <h2 className="mt-4 font-heebo text-[clamp(34px,4.6vw,62px)] font-light leading-[1] text-white">
            {scenes[3].title}
          </h2>
          <div className="mt-2 font-plex text-[12px] uppercase tracking-[0.18em]" style={{ color: COLORS.cyan }}>
            {scenes[3].titleEn}
          </div>
          <p className="mt-6 font-heebo text-[16px] leading-[1.85] text-white/85">{scenes[3].body}</p>

          <div className="mt-10 space-y-2">
            {products.map((p) => (
              <div key={p.n} className="border p-3 font-plex text-[10px] uppercase tracking-wider" style={{ borderColor: `${COLORS.cyan}66`, background: "rgba(8,24,50,0.45)" }}>
                <div className="flex items-center justify-between">
                  <span style={{ color: COLORS.amber }}>{p.n} · {p.title}</span>
                  <span style={{ color: COLORS.cyan }}>{p.tag}</span>
                </div>
                <p className="mt-2 font-heebo text-[13px] normal-case tracking-normal text-white/80">{p.body}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.tools.map((t) => (
                    <span key={t} className="border px-2 py-0.5 text-[9px]" style={{ borderColor: COLORS.copper, color: COLORS.copper }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div
            className="relative h-[680px] w-full cursor-grab overflow-hidden border active:cursor-grabbing"
            style={{ borderColor: COLORS.cyan, background: "rgba(8,24,50,0.55)" }}
            onMouseDown={(e) => {
              dragging.current = true;
              start.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
            }}
            onMouseMove={(e) => {
              if (!dragging.current) return;
              setPan({ x: start.current.px + (e.clientX - start.current.x), y: start.current.py + (e.clientY - start.current.y) });
            }}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
          >
            <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-2 border-b px-3 py-1.5 font-plex text-[10px] uppercase tracking-wider" style={{ borderColor: `${COLORS.cyan}66`, color: COLORS.cyan, background: "rgba(8,24,50,0.95)" }}>
              <span style={{ color: COLORS.amber }}>FILE</span>
              <span>EDIT</span>
              <span>VIEW</span>
              <span>INSERT</span>
              <span>ANNOTATE</span>
              <span>MODIFY</span>
              <span className="ml-auto">CMD: <span style={{ color: COLORS.amber }}>_PROALG.GENERATE</span></span>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 border-t px-3 py-1 font-plex text-[9px] uppercase tracking-wider" style={{ borderColor: `${COLORS.cyan}66`, color: COLORS.cyan, background: "rgba(8,24,50,0.95)" }}>
              <span>X: <span style={{ color: COLORS.amber }}>{pan.x.toFixed(0)}</span></span>
              <span>Y: <span style={{ color: COLORS.amber }}>{pan.y.toFixed(0)}</span></span>
              <span>Z: <span style={{ color: COLORS.amber }}>+14.500</span></span>
              <span className="ml-auto">SNAP · ORTHO · GRID · POLAR</span>
              <span style={{ color: COLORS.amber }}>MODEL · LAYOUT1 · A-204</span>
            </div>

            <div className="absolute inset-0 mt-7 mb-6" style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
              <svg viewBox="-400 -300 800 600" className="h-full w-full">
                <defs>
                  <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke={COLORS.cyan} strokeWidth="0.3" opacity="0.4" />
                  </pattern>
                </defs>
                <rect x="-400" y="-300" width="800" height="600" fill="url(#cad-grid)" />

                <g>
                  <rect x="-380" y="-280" width="340" height="240" fill="none" stroke={COLORS.cyan} strokeWidth="0.6" />
                  <text x="-378" y="-286" fontSize="8" fill={COLORS.amber} fontFamily="IBM Plex Mono">VP·01 PLAN · 1:200</text>
                  <g stroke={COLORS.white} strokeWidth="0.7" fill="none">
                    <rect x="-360" y="-260" width="300" height="200" />
                    <line x1="-260" y1="-260" x2="-260" y2="-60" />
                    <line x1="-360" y1="-160" x2="-260" y2="-160" />
                    <line x1="-260" y1="-180" x2="-60" y2="-180" />
                    <line x1="-160" y1="-180" x2="-160" y2="-60" />
                  </g>
                  <g fontFamily="IBM Plex Mono" fontSize="6" fill={COLORS.amber}>
                    <text x="-330" y="-200">A.01</text>
                    <text x="-330" y="-100">A.05</text>
                    <text x="-220" y="-220">A.02</text>
                    <text x="-220" y="-100">A.03</text>
                    <text x="-130" y="-100">A.06</text>
                  </g>

                  <rect x="40" y="-280" width="340" height="240" fill="none" stroke={COLORS.cyan} strokeWidth="0.6" />
                  <text x="42" y="-286" fontSize="8" fill={COLORS.amber} fontFamily="IBM Plex Mono">VP·02 SECTION A-A · 1:200</text>
                  <g stroke={COLORS.white} strokeWidth="0.7" fill="none">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <line key={i} x1="60" y1={-260 + i * 16} x2="360" y2={-260 + i * 16} />
                    ))}
                    <line x1="60" y1="-260" x2="60" y2="-72" />
                    <line x1="360" y1="-260" x2="360" y2="-72" />
                    <line x1="60" y1="-72" x2="360" y2="-72" />
                  </g>

                  <rect x="-380" y="-20" width="340" height="240" fill="none" stroke={COLORS.cyan} strokeWidth="0.6" />
                  <text x="-378" y="-26" fontSize="8" fill={COLORS.amber} fontFamily="IBM Plex Mono">VP·03 3D · ISO NE</text>
                  <g stroke={COLORS.white} strokeWidth="0.6" fill="none">
                    {Array.from({ length: 10 }).map((_, i) => {
                      const y = 180 - i * 18;
                      const dx = 40;
                      return (
                        <polygon key={i} points={`-340,${y} -160,${y} -120,${y - dx * 0.5} -300,${y - dx * 0.5}`} stroke={i % 3 === 0 ? COLORS.amber : COLORS.white} strokeWidth={i % 3 === 0 ? 0.9 : 0.5} />
                      );
                    })}
                  </g>

                  <rect x="40" y="-20" width="340" height="240" fill="none" stroke={COLORS.cyan} strokeWidth="0.6" />
                  <text x="42" y="-26" fontSize="8" fill={COLORS.amber} fontFamily="IBM Plex Mono">VP·04 SCHEDULE · ROOM AREAS</text>
                  <g fontFamily="IBM Plex Mono" fontSize="7">
                    <line x1="60" y1="0" x2="360" y2="0" stroke={COLORS.cyan} strokeWidth="0.4" />
                    {[
                      ["A.01", "LIVING", "42.50"],
                      ["A.02", "KITCHEN", "18.20"],
                      ["A.03", "DINING", "22.00"],
                      ["A.04", "STUDY", "14.40"],
                      ["A.05", "BEDROOM", "28.60"],
                      ["A.06", "BATH", "9.80"],
                      ["A.07", "ENTRY", "6.20"],
                      ["A.08", "BALCONY", "12.10"],
                      ["—", "TOTAL", "153.80"],
                    ].map((r, i) => (
                      <g key={i}>
                        <text x="70" y={20 + i * 18} fill={COLORS.amber}>{r[0]}</text>
                        <text x="140" y={20 + i * 18} fill={COLORS.white}>{r[1]}</text>
                        <text x="320" y={20 + i * 18} fill={COLORS.cyan} textAnchor="end">{r[2]}</text>
                        <line x1="60" y1={24 + i * 18} x2="360" y2={24 + i * 18} stroke={COLORS.cyan} strokeWidth="0.2" opacity="0.4" />
                      </g>
                    ))}
                  </g>
                </g>

                <rect x="-395" y="-295" width="790" height="590" fill="none" stroke={COLORS.amber} strokeWidth="0.8" />
                <g transform="translate(180,230)">
                  <rect x="0" y="0" width="200" height="60" fill="none" stroke={COLORS.amber} strokeWidth="0.6" />
                  <line x1="0" y1="20" x2="200" y2="20" stroke={COLORS.amber} strokeWidth="0.3" />
                  <line x1="0" y1="40" x2="200" y2="40" stroke={COLORS.amber} strokeWidth="0.3" />
                  <line x1="100" y1="0" x2="100" y2="60" stroke={COLORS.amber} strokeWidth="0.3" />
                  <text x="4" y="13" fontSize="6" fill={COLORS.cyan} fontFamily="IBM Plex Mono">SHEET A-204</text>
                  <text x="104" y="13" fontSize="6" fill={COLORS.cyan} fontFamily="IBM Plex Mono">SCALE 1:200</text>
                  <text x="4" y="33" fontSize="6" fill={COLORS.cyan} fontFamily="IBM Plex Mono">DRAWN BY: AI</text>
                  <text x="104" y="33" fontSize="6" fill={COLORS.cyan} fontFamily="IBM Plex Mono">REV: 04</text>
                  <text x="4" y="53" fontSize="6" fill={COLORS.amber} fontFamily="IBM Plex Mono">CAD VIEWPORT — PRO ALGORITHM</text>
                  <text x="104" y="53" fontSize="6" fill={COLORS.amber} fontFamily="IBM Plex Mono">2026-05-03</text>
                </g>
              </svg>
            </div>
          </div>
          <div className="mt-3 text-center font-plex text-[10px] uppercase tracking-[0.25em] opacity-70" style={{ color: COLORS.cyan }}>
            ◇ DRAG TO PAN VIEWPORT · ESC TO RELEASE
          </div>
        </div>
      </div>
    </section>
  );
}

function SceneAI() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ext = useSpring(scrollYProgress, { stiffness: 100, damping: 40 });
  const [v, setV] = useState(0);
  useMotionValueEvent(ext, "change", (val) => setV(val));

  const drawn = Math.min(1, Math.max(0, (v - 0.1) / 0.7));

  const extLines = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const r1 = 80;
      const r2 = 220 + (i % 4) * 40;
      arr.push({
        x1: 400 + Math.cos(angle) * r1,
        y1: 300 + Math.sin(angle) * r1,
        x2: 400 + Math.cos(angle) * r2,
        y2: 300 + Math.sin(angle) * r2,
        len: r2 - r1,
      });
    }
    return arr;
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[20] min-h-[180vh] px-6 py-40 md:px-12">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-10" dir="rtl">
        <div className="col-span-12 lg:col-span-5">
          <div className="font-plex text-[10px] uppercase tracking-[0.32em]" style={{ color: COLORS.amber }}>
            FIG. 05 — AUTONOMOUS GENERATION · BETA · Q4 2026
          </div>
          <h2 className="mt-4 font-heebo text-[clamp(34px,4.6vw,62px)] font-light leading-[1] text-white">
            {scenes[4].title}
          </h2>
          <div className="mt-2 font-plex text-[12px] uppercase tracking-[0.18em]" style={{ color: COLORS.cyan }}>
            {scenes[4].titleEn}
          </div>
          <p className="mt-6 font-heebo text-[16px] leading-[1.85] text-white/85">{scenes[4].body}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={scenes[4].cta?.href} className="inline-flex items-center gap-2 border px-5 py-3 font-plex text-[11px] uppercase tracking-[0.22em]" style={{ borderColor: COLORS.amber, color: COLORS.amber, background: "rgba(244,185,66,0.08)" }}>
              ▸ {scenes[4].cta?.primary}
            </a>
            <a href={scenes[4].cta?.href} className="inline-flex items-center gap-2 border px-5 py-3 font-plex text-[11px] uppercase tracking-[0.22em]" style={{ borderColor: COLORS.cyan, color: COLORS.cyan }}>
              ◇ {scenes[4].cta?.secondary}
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 font-plex text-[10px] uppercase tracking-wider">
            <div className="border p-3" style={{ borderColor: `${COLORS.amber}88` }}>
              <div className="opacity-70" style={{ color: COLORS.cyan }}>GEOMETRY EXTENDED</div>
              <div className="text-[22px]" style={{ color: COLORS.amber }}>{(drawn * 124 + 14) | 0} <span className="text-[10px] opacity-70">elements</span></div>
            </div>
            <div className="border p-3" style={{ borderColor: `${COLORS.amber}88` }}>
              <div className="opacity-70" style={{ color: COLORS.cyan }}>LINES DRAWN</div>
              <div className="text-[22px]" style={{ color: COLORS.amber }}>{(drawn * 8420 + 320) | 0}</div>
            </div>
            <div className="border p-3" style={{ borderColor: `${COLORS.amber}88` }}>
              <div className="opacity-70" style={{ color: COLORS.cyan }}>TIME ELAPSED</div>
              <div className="text-[22px]" style={{ color: COLORS.amber }}>00:0{Math.floor(drawn * 9)}.{((drawn * 99) | 0).toString().padStart(2, "0")}</div>
            </div>
            <div className="border p-3" style={{ borderColor: `${COLORS.amber}88` }}>
              <div className="opacity-70" style={{ color: COLORS.cyan }}>CONFIDENCE</div>
              <div className="text-[22px]" style={{ color: COLORS.amber }}>{(94 + drawn * 5).toFixed(2)}%</div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <svg viewBox="0 0 800 600" className="h-auto w-full">
            <defs>
              <radialGradient id="ai-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={COLORS.amber} stopOpacity="0.15" />
                <stop offset="100%" stopColor={COLORS.ink} stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="800" height="600" fill="url(#ai-glow)" />

            <g stroke={COLORS.white} strokeWidth="0.8" fill="none">
              {Array.from({ length: 8 }).map((_, i) => {
                const y = 360 - i * 24;
                return <rect key={i} x={340} y={y} width="120" height="22" />;
              })}
              <rect x={330} y={170} width="140" height="20" stroke={COLORS.amber} />
            </g>

            {extLines.map((l, i) => (
              <line
                key={i}
                x1={l.x1}
                y1={l.y1}
                x2={l.x2}
                y2={l.y2}
                stroke={i % 3 === 0 ? COLORS.amber : COLORS.cyan}
                strokeWidth={i % 3 === 0 ? 0.9 : 0.5}
                strokeDasharray={l.len}
                strokeDashoffset={l.len * (1 - drawn)}
              />
            ))}

            {Array.from({ length: 8 }).map((_, i) => {
              const px = 120 + (i % 4) * 130;
              const py = 70 + Math.floor(i / 4) * 360;
              const len = 200;
              return (
                <g key={`gen-${i}`}>
                  <rect x={px} y={py} width="80" height="100" fill="none" stroke={COLORS.cyan} strokeWidth="0.6" strokeDasharray={len} strokeDashoffset={len * (1 - Math.max(0, drawn - i * 0.05))} />
                  <text x={px} y={py - 4} fontSize="6" fill={COLORS.amber} fontFamily="IBM Plex Mono" opacity={drawn > i * 0.05 ? 1 : 0}>GEN-{(i + 1).toString().padStart(2, "0")}</text>
                </g>
              );
            })}

            <g stroke={COLORS.amber} strokeWidth="0.5" fill="none" opacity="0.7">
              <circle cx="400" cy="300" r="4" />
              <line x1="380" y1="300" x2="396" y2="300" />
              <line x1="404" y1="300" x2="420" y2="300" />
              <line x1="400" y1="280" x2="400" y2="296" />
              <line x1="400" y1="304" x2="400" y2="320" />
            </g>

            <text x="20" y="586" fontSize="8" fill={COLORS.cyan} fontFamily="IBM Plex Mono">FIG. 05 · GENERATIVE EXTENSION · {(drawn * 100).toFixed(1)}% ITERATED</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

function PartnersStrip() {
  return (
    <section className="relative z-[20] mx-auto mt-10 max-w-[1600px] border-y px-6 py-8 md:px-12" style={{ borderColor: `${COLORS.cyan}55` }}>
      <div className="font-plex text-[10px] uppercase tracking-[0.32em]" style={{ color: COLORS.amber }}>FIG. 06 — REGISTERED PARTNERS · 14 ENTITIES</div>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-6">
        {partners.map((p, i) => (
          <div key={p} className="border p-4 text-center font-plex text-[11px] uppercase tracking-[0.18em]" style={{ borderColor: `${COLORS.cyan}55`, color: COLORS.cyan }}>
            <div className="text-[8px] opacity-60">PT-{(i + 1).toString().padStart(2, "0")}</div>
            <div className="mt-1 text-white">{p}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative z-[20] mx-auto max-w-[1600px] px-6 py-24 md:px-12" dir="rtl">
      <div className="font-plex text-[10px] uppercase tracking-[0.32em]" style={{ color: COLORS.amber }}>FIG. 07 — FIELD TESTIMONIALS · N=120</div>
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure key={i} className="border p-6" style={{ borderColor: `${COLORS.cyan}66`, background: "rgba(8,24,50,0.45)" }}>
            <div className="mb-3 font-plex text-[10px] uppercase tracking-[0.22em]" style={{ color: COLORS.amber }}>QT-{(i + 1).toString().padStart(2, "0")} · {t.project}</div>
            <blockquote className="font-heebo text-[15px] leading-[1.8] text-white/90">"{t.quote}"</blockquote>
            <figcaption className="mt-4 border-t pt-3 font-plex text-[10px] uppercase tracking-wider" style={{ borderColor: `${COLORS.cyan}55`, color: COLORS.cyan }}>
              <div className="font-heebo text-[13px] normal-case tracking-normal text-white">{t.name}</div>
              <div>{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function TeamGrid() {
  return (
    <section className="relative z-[20] mx-auto max-w-[1600px] px-6 py-16 md:px-12" dir="rtl">
      <div className="font-plex text-[10px] uppercase tracking-[0.32em]" style={{ color: COLORS.amber }}>FIG. 08 — KEY PERSONNEL</div>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {team.map((m, i) => (
          <div key={m.name} className="border p-5" style={{ borderColor: `${COLORS.cyan}66`, background: "rgba(8,24,50,0.4)" }}>
            <div className="font-plex text-[9px] uppercase tracking-wider" style={{ color: COLORS.amber }}>PERS-{(i + 1).toString().padStart(2, "0")}</div>
            <div className="mt-2 font-heebo text-[20px] text-white">{m.name}</div>
            <div className="mt-1 font-plex text-[10px] uppercase tracking-wider" style={{ color: COLORS.cyan }}>{m.role}</div>
            <div className="mt-3 border-t pt-2 font-plex text-[9px] uppercase opacity-70" style={{ borderColor: `${COLORS.cyan}55`, color: COLORS.cyan }}>{m.bg}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative z-[20] mx-auto max-w-[1600px] border-t px-6 py-10 font-plex text-[10px] uppercase tracking-[0.22em] md:px-12" style={{ borderColor: `${COLORS.cyan}55`, color: COLORS.cyan }} dir="ltr">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div>
          <div style={{ color: COLORS.amber }}>{brand.name}</div>
          <div className="mt-1 font-heebo normal-case tracking-normal text-white">{brand.nameHe}</div>
          <div className="mt-2 opacity-70">∟ {brand.taglineEn}</div>
        </div>
        <div>
          <div style={{ color: COLORS.amber }}>CONTACT</div>
          <div className="mt-1 text-white">{brand.email}</div>
          <div className="text-white">{brand.phone}</div>
        </div>
        <div>
          <div style={{ color: COLORS.amber }}>ADDRESS</div>
          <div className="mt-1 font-heebo normal-case tracking-normal text-white">{brand.address}</div>
        </div>
        <div>
          <div style={{ color: COLORS.amber }}>SHEET INDEX</div>
          <div className="mt-1 grid grid-cols-2 gap-y-1 text-white">
            <span>A-201 CITY</span>
            <span>A-202 ISO</span>
            <span>A-203 PLAN</span>
            <span>A-204 CAD</span>
            <span>A-205 AI</span>
            <span>REV.04</span>
          </div>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between border-t pt-4 opacity-60" style={{ borderColor: `${COLORS.cyan}33` }}>
        <span>© {brand.est}–2026 {brand.name} · ALL DRAWINGS</span>
        <span>DRAFTING ROOM · BLUEPRINT CYAN · ISO A1</span>
      </div>
    </footer>
  );
}

/* =========================================================================
   ROOT
   ========================================================================= */
export default function Wireframe() {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [extend, setExtend] = useState(0);
  const [scene, setScene] = useState(0);
  const sceneSpring = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  useMotionValueEvent(sceneSpring, "change", (v) => {
    setProgress(v);
    setScene(Math.min(4, Math.floor(v * 5)));
    setExtend(Math.max(0, Math.min(1, (v - 0.78) / 0.22)));
  });

  useEffect(() => {
    const html = document.documentElement;
    const prev = html.getAttribute("data-variant");
    html.setAttribute("data-variant", "wireframe");
    return () => {
      if (prev) html.setAttribute("data-variant", prev);
    };
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: COLORS.ink, color: COLORS.white }}>
      <BlueprintCanvas progress={progress} extend={extend} />
      <GridPaper />
      <ViewportChrome scene={scene} />
      <SceneHUD scene={scene} progress={progress} />
      <Nav />

      <main className="relative z-[20]">
        <SceneCity />
        <SceneProject />
        <ScenePlans />
        <SceneCAD />
        <SceneAI />
        <PartnersStrip />
        <Testimonials />
        <TeamGrid />
        <Footer />
      </main>
    </div>
  );
}
