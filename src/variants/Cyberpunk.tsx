// Cyberpunk Neon — Pro Algorithm.
// Blade Runner 2049 + Tron Legacy + Severance HUD + xAI Grok terminal.
// Single shared R3F canvas, scroll-driven 5-scene narrative, postprocessing bloom + scanlines.

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, Float } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
  Glitch,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import * as THREE from "three";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, MotionValue } from "framer-motion";
import { brand, scenes, stats, products, partners, testimonials, team } from "../data";

// ---------------------------------------------------------------------------
// THEME TOKENS
// ---------------------------------------------------------------------------
const COLOR = {
  bg: "#0a0a0f",
  bgDeep: "#05050a",
  magenta: "#ff00ff",
  cyan: "#00ffff",
  purple: "#b600ff",
  lime: "#00ff88",
  white: "#f0f6ff",
  dim: "rgba(255,255,255,0.45)",
};

// ---------------------------------------------------------------------------
// HOOKS
// ---------------------------------------------------------------------------
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    setM(typeof window !== "undefined" && window.innerWidth < 768);
  }, []);
  return m;
}

function useGlitchText(target: string, active: boolean = true, intensity = 0.04) {
  const [out, setOut] = useState(target);
  useEffect(() => {
    if (!active) {
      setOut(target);
      return;
    }
    let raf = 0;
    let t0 = performance.now();
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#@*+!?";
    const tick = () => {
      const t = performance.now() - t0;
      const arr = target.split("");
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === " ") continue;
        if (Math.random() < intensity * (1 - Math.min(t / 800, 1))) {
          arr[i] = chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setOut(arr.join(""));
      if (t < 1200) raf = requestAnimationFrame(tick);
      else setOut(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, intensity]);
  return out;
}

function useTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

// ---------------------------------------------------------------------------
// SCENE 1 — CITY (instanced neon skyline)
// ---------------------------------------------------------------------------
function CityScene({ progress, count }: { progress: MotionValue<number>; count: number }) {
  const ref = useRef<THREE.Group>(null);
  const buildings = useMemo(() => {
    const arr: { x: number; z: number; h: number; w: number; d: number; hue: number; phase: number }[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 70;
      const z = (Math.random() - 0.5) * 70;
      const h = 0.6 + Math.pow(Math.random(), 2.2) * 12;
      const w = 0.6 + Math.random() * 1.4;
      const d = 0.6 + Math.random() * 1.4;
      const hue = Math.random();
      arr.push({ x, z, h, w, d, hue, phase: Math.random() * Math.PI * 2 });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const p = progress.get();
    const t = state.clock.elapsedTime;
    ref.current.position.y = THREE.MathUtils.lerp(-3, -8, p);
    ref.current.rotation.y = -0.3 + Math.sin(t * 0.05) * 0.04 + p * 0.4;
    ref.current.children.forEach((c, i) => {
      const b = buildings[i];
      if (!b || !c) return;
      const m = c as THREE.Mesh;
      const sy = 1 + Math.sin(t * 0.6 + b.phase) * 0.015;
      m.scale.y = sy;
      const mat = m.material as THREE.MeshStandardMaterial;
      if (mat && "emissiveIntensity" in mat) {
        mat.emissiveIntensity = 0.5 + Math.sin(t * 1.2 + b.phase) * 0.4 + (1 - p) * 0.3;
      }
    });
  });

  return (
    <group ref={ref}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[160, 160, 1, 1]} />
        <meshBasicMaterial color="#05050a" />
      </mesh>
      <gridHelper args={[160, 60, COLOR.cyan, "#1a0030"]} position={[0, 0.01, 0]} />
      {buildings.map((b, i) => {
        const c = b.hue < 0.5 ? COLOR.magenta : COLOR.cyan;
        return (
          <mesh key={i} position={[b.x, b.h / 2, b.z]}>
            <boxGeometry args={[b.w, b.h, b.d]} />
            <meshStandardMaterial
              color="#0a0014"
              emissive={c}
              emissiveIntensity={0.7}
              roughness={0.4}
              metalness={0.7}
            />
          </mesh>
        );
      })}
      {[...Array(4)].map((_, i) => {
        const angle = (i / 4) * Math.PI * 2;
        const r = 22;
        const c = i % 2 === 0 ? COLOR.magenta : COLOR.cyan;
        return (
          <mesh key={`spire-${i}`} position={[Math.cos(angle) * r, 18, Math.sin(angle) * r]}>
            <cylinderGeometry args={[0.05, 0.05, 36, 8]} />
            <meshBasicMaterial color={c} />
          </mesh>
        );
      })}
    </group>
  );
}

// ---------------------------------------------------------------------------
// SCENE 2 — PROJECT (exploded holographic building)
// ---------------------------------------------------------------------------
function ProjectScene({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<THREE.Group>(null);
  const floors = 14;
  useFrame((state) => {
    if (!ref.current) return;
    const p = progress.get();
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.15 + p * 0.5;
    ref.current.children.forEach((c, i) => {
      if (!c) return;
      const explode = Math.pow(p, 1.5);
      const targetY = (i - floors / 2) * (1.1 + explode * 0.7);
      const targetX = Math.sin(i * 1.7) * explode * 1.4;
      const targetZ = Math.cos(i * 1.7) * explode * 1.4;
      c.position.y = THREE.MathUtils.lerp(c.position.y, targetY, 0.08);
      c.position.x = THREE.MathUtils.lerp(c.position.x, targetX, 0.08);
      c.position.z = THREE.MathUtils.lerp(c.position.z, targetZ, 0.08);
    });
  });

  return (
    <group ref={ref}>
      {Array.from({ length: floors }).map((_, i) => {
        const w = 4 + Math.sin(i * 0.6) * 0.8;
        const d = 3 + Math.cos(i * 0.6) * 0.6;
        const isAccent = i % 4 === 0;
        return (
          <group key={i} position={[0, (i - floors / 2) * 1.1, 0]}>
            <mesh>
              <boxGeometry args={[w, 0.6, d]} />
              <meshStandardMaterial
                color="#0a0014"
                emissive={isAccent ? COLOR.magenta : COLOR.cyan}
                emissiveIntensity={0.8}
                transparent
                opacity={0.85}
                roughness={0.3}
                metalness={0.6}
              />
            </mesh>
            <mesh>
              <boxGeometry args={[w + 0.05, 0.62, d + 0.05]} />
              <meshBasicMaterial color={isAccent ? COLOR.magenta : COLOR.cyan} wireframe transparent opacity={0.5} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ---------------------------------------------------------------------------
// SCENE 3 — PLANS (wireframe HUD floor plan)
// ---------------------------------------------------------------------------
function PlansScene({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    const rooms: [number, number, number, number][] = [
      [-6, -4, 6, -4], [6, -4, 6, 4], [6, 4, -6, 4], [-6, 4, -6, -4],
      [-2, -4, -2, 4], [2, -4, 2, 4],
      [-6, 0, -2, 0], [2, 0, 6, 0],
      [-2, -1, 2, -1], [-2, 2, 2, 2],
      [-4, -4, -4, -2], [-4, -2, -2, -2],
      [4, 4, 4, 1], [4, 1, 2, 1],
    ];
    return rooms.map(([x1, y1, x2, y2]) => [
      new THREE.Vector3(x1, 0, y1),
      new THREE.Vector3(x2, 0, y2),
    ]);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const p = progress.get();
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = THREE.MathUtils.lerp(-Math.PI / 2.2, -Math.PI / 3, p);
    ref.current.rotation.z = t * 0.05;
    ref.current.position.y = THREE.MathUtils.lerp(-2, 1, p);
  });

  return (
    <group ref={ref}>
      {lines.map((pts, i) => (
        <Line key={i} points={pts} color={COLOR.cyan} lineWidth={2} transparent opacity={0.9} />
      ))}
      {[-6, -2, 2, 6].map((x, i) => (
        <Line
          key={`dim-${i}`}
          points={[new THREE.Vector3(x, 0, -5), new THREE.Vector3(x, 0, -4.5)]}
          color={COLOR.magenta}
          lineWidth={1.5}
        />
      ))}
      {[[-6, -4], [6, -4], [6, 4], [-6, 4]].map(([x, z], i) => (
        <mesh key={`dot-${i}`} position={[x, 0, z]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshBasicMaterial color={COLOR.magenta} />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// SCENE 4 — CAD (floating UI panes in 3D space)
// ---------------------------------------------------------------------------
function CADScene({ progress }: { progress: MotionValue<number> }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const p = progress.get();
    ref.current.rotation.y = -0.2 + Math.sin(t * 0.2) * 0.15;
    ref.current.position.x = THREE.MathUtils.lerp(2, -1, p);
  });

  const panes: { pos: [number, number, number]; rot: [number, number, number]; color: string; w: number; h: number }[] = [
    { pos: [-4, 1.5, 0], rot: [0, 0.3, 0], color: COLOR.cyan, w: 4, h: 2.6 },
    { pos: [3.6, 0.8, -1], rot: [0, -0.4, 0], color: COLOR.magenta, w: 3.6, h: 2.2 },
    { pos: [0, -2.4, 1.5], rot: [0, 0.05, 0], color: COLOR.purple, w: 5, h: 1.8 },
    { pos: [-1, 3.2, -2], rot: [0, 0.15, 0], color: COLOR.lime, w: 2.8, h: 1.4 },
  ];

  return (
    <group ref={ref}>
      {panes.map((p, i) => (
        <Float key={i} speed={1.2 + i * 0.15} rotationIntensity={0.05} floatIntensity={0.2}>
          <group position={p.pos} rotation={p.rot}>
            <mesh>
              <planeGeometry args={[p.w, p.h]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.65} />
            </mesh>
            <Line
              points={[
                new THREE.Vector3(-p.w / 2, -p.h / 2, 0.01),
                new THREE.Vector3(p.w / 2, -p.h / 2, 0.01),
                new THREE.Vector3(p.w / 2, p.h / 2, 0.01),
                new THREE.Vector3(-p.w / 2, p.h / 2, 0.01),
                new THREE.Vector3(-p.w / 2, -p.h / 2, 0.01),
              ]}
              color={p.color}
              lineWidth={1.5}
            />
            {Array.from({ length: 6 }).map((_, j) => (
              <Line
                key={j}
                points={[
                  new THREE.Vector3(-p.w / 2, -p.h / 2 + (j + 1) * (p.h / 7), 0.01),
                  new THREE.Vector3(p.w / 2, -p.h / 2 + (j + 1) * (p.h / 7), 0.01),
                ]}
                color={p.color}
                lineWidth={0.6}
                transparent
                opacity={0.25}
              />
            ))}
            {[[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([sx, sy], k) => (
              <Line
                key={`c-${k}`}
                points={[
                  new THREE.Vector3((sx * p.w) / 2 - sx * 0.4, (sy * p.h) / 2, 0.02),
                  new THREE.Vector3((sx * p.w) / 2, (sy * p.h) / 2, 0.02),
                  new THREE.Vector3((sx * p.w) / 2, (sy * p.h) / 2 - sy * 0.4, 0.02),
                ]}
                color={p.color}
                lineWidth={2.5}
              />
            ))}
          </group>
        </Float>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// SCENE 5 — AI (autonomous self-drawing lines + matrix particle rain)
// ---------------------------------------------------------------------------
function AIScene({ progress, particleCount }: { progress: MotionValue<number>; particleCount: number }) {
  const ref = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const path = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    let x = -8, y = 0, z = 0;
    for (let i = 0; i < 220; i++) {
      pts.push(new THREE.Vector3(x, y, z));
      const choice = Math.floor(Math.random() * 4);
      const step = 0.4 + Math.random() * 0.5;
      if (choice === 0) x += step;
      else if (choice === 1) x -= step * 0.5;
      else if (choice === 2) y += step;
      else z += step * (Math.random() - 0.5);
      x = THREE.MathUtils.clamp(x, -10, 10);
      y = THREE.MathUtils.clamp(y, -5, 5);
      z = THREE.MathUtils.clamp(z, -5, 5);
    }
    return pts;
  }, []);

  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 30;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  }, [particleCount]);

  const [revealed, setRevealed] = useState(2);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.1;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        arr[i * 3 + 1] -= 0.05 + (i % 5) * 0.01;
        if (arr[i * 3 + 1] < -10) arr[i * 3 + 1] = 10;
      }
      pos.needsUpdate = true;
    }
    const target = Math.max(2, Math.floor(path.length * Math.min(1, progress.get() * 1.3 + 0.1)));
    if (target !== revealed) setRevealed(target);
  });

  const visiblePath = path.slice(0, revealed);

  return (
    <group ref={ref}>
      <Line points={visiblePath.length > 1 ? visiblePath : [path[0], path[1]]} color={COLOR.lime} lineWidth={2} />
      {path.filter((_, i) => i % 24 === 0).map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[0.18, 0.18, 0.18]} />
          <meshBasicMaterial color={i % 2 === 0 ? COLOR.magenta : COLOR.cyan} />
        </mesh>
      ))}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial color={COLOR.lime} size={0.06} sizeAttenuation transparent opacity={0.85} />
      </points>
    </group>
  );
}

// ---------------------------------------------------------------------------
// SHARED CANVAS HOST — fades scenes in/out by scroll progress
// ---------------------------------------------------------------------------
function SceneHost({ scrollY, isMobile }: { scrollY: MotionValue<number>; isMobile: boolean }) {
  const groupRefs = [useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null)];
  const { camera } = useThree();

  const cityP = useTransform(scrollY, [0, 0.2], [0, 1]);
  const projP = useTransform(scrollY, [0.18, 0.4], [0, 1]);
  const planP = useTransform(scrollY, [0.4, 0.6], [0, 1]);
  const cadP = useTransform(scrollY, [0.6, 0.8], [0, 1]);
  const aiP = useTransform(scrollY, [0.78, 1], [0, 1]);

  useFrame(() => {
    const p = scrollY.get();
    const phases = [
      { from: 0, to: 0.2, peak: 0.1 },
      { from: 0.2, to: 0.42, peak: 0.32 },
      { from: 0.42, to: 0.62, peak: 0.52 },
      { from: 0.62, to: 0.82, peak: 0.72 },
      { from: 0.78, to: 1.05, peak: 0.92 },
    ];
    groupRefs.forEach((ref, i) => {
      if (!ref.current) return;
      const ph = phases[i];
      let v = 0;
      if (p >= ph.from && p <= ph.to) {
        const span = (ph.to - ph.from) / 2;
        const dist = Math.abs(p - ph.peak);
        v = Math.max(0, 1 - dist / span);
        v = Math.pow(v, 0.6);
      }
      ref.current.visible = v > 0.02;
      ref.current.scale.setScalar(THREE.MathUtils.lerp(0.7, 1, v));
    });

    const tx = Math.sin(p * Math.PI * 2) * 1.5;
    const ty = THREE.MathUtils.lerp(8, 4, Math.min(1, p * 1.2));
    const tz = THREE.MathUtils.lerp(22, 10, Math.min(1, Math.pow(p, 1.1)));
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, tz, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.18} />
      <pointLight position={[0, 18, 0]} intensity={2} color={COLOR.magenta} distance={50} />
      <pointLight position={[10, 5, 10]} intensity={1.5} color={COLOR.cyan} distance={40} />
      <pointLight position={[-10, 5, -10]} intensity={1.2} color={COLOR.purple} distance={40} />
      <fog attach="fog" args={[COLOR.bgDeep, 14, 60]} />

      <group ref={groupRefs[0]}>
        <CityScene progress={cityP} count={isMobile ? 60 : 160} />
      </group>
      <group ref={groupRefs[1]}>
        <ProjectScene progress={projP} />
      </group>
      <group ref={groupRefs[2]}>
        <PlansScene progress={planP} />
      </group>
      <group ref={groupRefs[3]}>
        <CADScene progress={cadP} />
      </group>
      <group ref={groupRefs[4]}>
        <AIScene progress={aiP} particleCount={isMobile ? 200 : 700} />
      </group>

      {!isMobile && (
        <EffectComposer>
          <Bloom intensity={1.4} luminanceThreshold={0.18} luminanceSmoothing={0.4} mipmapBlur />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0009, 0.0012)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
          <Noise opacity={0.06} blendFunction={BlendFunction.OVERLAY} />
          <Glitch
            delay={new THREE.Vector2(6, 11)}
            duration={new THREE.Vector2(0.15, 0.4)}
            strength={new THREE.Vector2(0.05, 0.15)}
            mode={GlitchMode.SPORADIC}
            ratio={0.85}
            active
          />
        </EffectComposer>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// HTML CHROME
// ---------------------------------------------------------------------------
function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)",
        opacity: 0.5,
      }}
    />
  );
}

function VignetteOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[55]"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 40%, rgba(10,0,20,0.55) 75%, rgba(0,0,0,0.9) 100%)",
      }}
    />
  );
}

function GridOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[58] opacity-25"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }}
    />
  );
}

function BootCRT() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[200] bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0.2, 0.9, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, times: [0, 0.2, 0.4, 1] }}
        >
          <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-cyan-300/80" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TopNav() {
  const t = useTime();
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 1200);
    return () => clearInterval(id);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-[1500px] items-center justify-between px-5 font-space text-[10px] uppercase tracking-[0.25em] text-white/70">
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_#ff00ff]" />
          <span className="text-white">PRO_ALGORITHM</span>
          <span className="hidden md:inline text-white/40">// v.2026.05.q2</span>
        </div>
        <nav className="hidden items-center gap-7 md:flex">
          <a href="#sc01" className="hover:text-cyan-300 transition-colors">01_CITY</a>
          <a href="#sc02" className="hover:text-cyan-300 transition-colors">02_PROJECT</a>
          <a href="#sc03" className="hover:text-cyan-300 transition-colors">03_PLANS</a>
          <a href="#sc04" className="hover:text-cyan-300 transition-colors">04_CAD</a>
          <a href="#sc05" className="hover:text-cyan-300 transition-colors">05_AI</a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">
            {t.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${pulse ? "bg-lime-400 shadow-[0_0_8px_#00ff88]" : "bg-lime-400/30"}`} />
          <span className="hidden md:inline text-lime-400">// LINK_OK</span>
        </div>
      </div>
    </header>
  );
}

function SideHUD({ scrollY }: { scrollY: MotionValue<number> }) {
  const [pct, setPct] = useState(0);
  useEffect(() => scrollY.on("change", (v) => setPct(Math.round(v * 100))), [scrollY]);
  return (
    <aside className="pointer-events-none fixed right-3 top-1/2 z-[90] hidden -translate-y-1/2 md:block">
      <div className="flex flex-col items-center gap-3 rounded-md border border-white/15 bg-black/40 px-3 py-4 font-space text-[9px] uppercase tracking-[0.3em] text-white/65 backdrop-blur">
        <div className="text-cyan-300">SCROLL</div>
        <div className="font-display text-lg text-white">{pct.toString().padStart(2, "0")}<span className="text-fuchsia-400">%</span></div>
        <div className="h-32 w-px bg-white/15 relative">
          <div
            className="absolute left-1/2 -translate-x-1/2 w-1.5 rounded-full bg-fuchsia-400 shadow-[0_0_8px_#ff00ff]"
            style={{ top: `${pct}%`, height: 8 }}
          />
        </div>
        <div className="text-fuchsia-400">SYS_OK</div>
      </div>
    </aside>
  );
}

function GlitchText({ text, className, intensity = 0.04 }: { text: string; className?: string; intensity?: number }) {
  const [active, setActive] = useState(false);
  const out = useGlitchText(text, active, intensity);
  return (
    <span
      className={`relative inline-block ${className ?? ""}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <span className="relative z-10">{out}</span>
      <span aria-hidden className="absolute inset-0 z-0 translate-x-[2px] text-fuchsia-500/60 mix-blend-screen pointer-events-none">{out}</span>
      <span aria-hidden className="absolute inset-0 z-0 -translate-x-[2px] text-cyan-400/60 mix-blend-screen pointer-events-none">{out}</span>
    </span>
  );
}

function HUDFrame({ children, label, accent = COLOR.cyan }: { children: React.ReactNode; label?: string; accent?: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 border border-white/10 pointer-events-none" />
      <div className="absolute -left-1 -top-1 h-3 w-3 border-l border-t pointer-events-none" style={{ borderColor: accent }} />
      <div className="absolute -right-1 -top-1 h-3 w-3 border-r border-t pointer-events-none" style={{ borderColor: accent }} />
      <div className="absolute -bottom-1 -left-1 h-3 w-3 border-b border-l pointer-events-none" style={{ borderColor: accent }} />
      <div className="absolute -bottom-1 -right-1 h-3 w-3 border-b border-r pointer-events-none" style={{ borderColor: accent }} />
      {label && (
        <div className="absolute -top-2.5 left-3 bg-black px-1.5 font-space text-[9px] uppercase tracking-[0.3em] z-10" style={{ color: accent }}>
          {label}
        </div>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SCENE PANELS
// ---------------------------------------------------------------------------
function HeroPanel() {
  const sc = scenes[0];
  return (
    <section id="sc01" className="relative min-h-[150vh] flex items-end pb-32 pt-32 px-5 md:px-10">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="border border-cyan-400/40 w-[60vmin] h-[60vmin] max-w-[600px] max-h-[600px] relative">
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-fuchsia-400" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-fuchsia-400" />
          <div className="absolute inset-0 flex items-center justify-center font-space text-[10px] tracking-[0.4em] text-white/40">
            <span>// TARGET ACQUIRED · {brand.cityHe}</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-7">
            <motion.div
              className="font-space text-[10px] uppercase tracking-[0.4em] text-fuchsia-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              {sc.eyebrow} <span className="text-white/40">— {brand.taglineEn}</span>
            </motion.div>
            <motion.h1
              className="font-display font-black text-[12vw] md:text-[7vw] leading-[0.9] uppercase"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.9 }}
              style={{
                textShadow: `0 0 28px ${COLOR.magenta}, 0 0 60px ${COLOR.magenta}55`,
              }}
            >
              <GlitchText text={brand.nameHe} className="text-white" />
            </motion.h1>
            <motion.h2
              className="mt-6 font-heebo text-2xl md:text-4xl leading-tight text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.7 }}
            >
              {sc.title}
            </motion.h2>
            <motion.p
              className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {sc.body}
            </motion.p>
          </div>
          <div className="col-span-12 md:col-span-5 md:pl-8">
            <motion.div
              className="grid grid-cols-2 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.1 }}
            >
              {stats.map((s, i) => (
                <HUDFrame key={i} label={`STAT_${i + 1}`} accent={i % 2 === 0 ? COLOR.cyan : COLOR.magenta}>
                  <div className="px-4 py-5">
                    <div className="font-display text-3xl md:text-5xl font-black text-white">
                      {s.value}
                      <span className={i % 2 === 0 ? "text-cyan-300" : "text-fuchsia-400"}>{s.suffix}</span>
                    </div>
                    <div className="mt-2 font-heebo text-sm text-white/85">{s.label}</div>
                    <div className="font-space text-[9px] uppercase tracking-[0.25em] text-white/40 mt-1">{s.desc}</div>
                  </div>
                </HUDFrame>
              ))}
            </motion.div>
            <motion.div
              className="mt-6 font-space text-[10px] uppercase tracking-[0.3em] text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
            >
              <div>:: {sc.audience}</div>
              <div className="mt-1">:: EST_{brand.est} · NODE_{brand.cityHe}</div>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 flex items-center gap-4">
          <motion.div
            className="font-space text-[10px] uppercase tracking-[0.4em] text-white/40 flex items-center gap-2"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <span>SCROLL</span>
            <span className="block h-px w-12 bg-white/30" />
            <span>BOOT_NEXT_SECTOR</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectPanel() {
  const sc = scenes[1];
  return (
    <section id="sc02" className="relative min-h-[150vh] px-5 md:px-10 py-32 flex items-center">
      <div className="relative z-10 max-w-[1500px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <div className="font-space text-[10px] uppercase tracking-[0.4em] text-cyan-300 mb-4">
              {sc.eyebrow}
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.95] uppercase text-white"
                style={{ textShadow: `0 0 24px ${COLOR.cyan}88` }}>
              <GlitchText text={sc.title} />
            </h2>
            <p className="mt-6 font-heebo text-base md:text-lg text-white/75 leading-relaxed">
              {sc.body}
            </p>
            <div className="mt-6 font-space text-[10px] uppercase tracking-[0.3em] text-fuchsia-400">
              :: {sc.audience}
            </div>

            <div className="mt-10 space-y-2 font-space text-xs">
              {[
                { code: "L01", he: "שלד יסוד · structural", v: "2.4Hz" },
                { code: "L02", he: "מעטפת · envelope", v: "0.8Hz" },
                { code: "L03", he: "MEP מערכות", v: "1.1Hz" },
                { code: "L04", he: "חדרים · spaces", v: "5.6Hz" },
                { code: "L05", he: "תפוסה חיה · occupancy", v: "PING" },
              ].map((l, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between border-l-2 pl-3 py-1"
                  style={{ borderColor: i % 2 === 0 ? COLOR.cyan : COLOR.magenta }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-white/40">{l.code}</span>
                  <span className="text-white/80 font-heebo">{l.he}</span>
                  <span className="text-cyan-300">{l.v}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlansPanel() {
  const sc = scenes[2];
  return (
    <section id="sc03" className="relative min-h-[150vh] px-5 md:px-10 py-32 flex items-center">
      <div className="relative z-10 max-w-[1500px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-5">
            <div className="font-space text-[10px] uppercase tracking-[0.4em] text-fuchsia-400 mb-4">
              {sc.eyebrow}
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.95] uppercase text-white"
                style={{ textShadow: `0 0 24px ${COLOR.magenta}88` }}>
              <GlitchText text={sc.title} />
            </h2>
            <p className="mt-6 font-heebo text-base md:text-lg text-white/75 leading-relaxed">
              {sc.body}
            </p>
            <div className="mt-6 font-space text-[10px] uppercase tracking-[0.3em] text-cyan-300">
              :: {sc.audience}
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <HUDFrame label="OUTPUT_FORMAT" accent={COLOR.cyan}>
              <div className="px-5 py-5 font-space text-xs space-y-3">
                {[
                  { k: "DWG", v: "AutoCAD 2018+", c: COLOR.cyan },
                  { k: "IFC", v: "BuildingSMART 4.3", c: COLOR.magenta },
                  { k: "RVT", v: "Revit 2024+", c: COLOR.lime },
                  { k: "PDF", v: "ISO A1 · A2 · A3", c: COLOR.purple },
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    className="grid grid-cols-12 items-center gap-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="col-span-2 font-display text-base font-black" style={{ color: f.c }}>{f.k}</span>
                    <div className="col-span-7 h-px" style={{ background: `linear-gradient(90deg, ${f.c}, transparent)` }} />
                    <span className="col-span-3 text-white/60 text-[10px] uppercase tracking-[0.2em]">{f.v}</span>
                  </motion.div>
                ))}
                <div className="border-t border-white/10 pt-3 mt-4 flex items-center justify-between">
                  <span className="text-white/40 uppercase tracking-[0.3em] text-[9px]">latency</span>
                  <span className="text-lime-400 font-display text-2xl">~ 04:12</span>
                  <span className="text-white/40 uppercase tracking-[0.3em] text-[9px]">avg/plan</span>
                </div>
              </div>
            </HUDFrame>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {["INPUT", "PROCESS", "OUTPUT"].map((label, i) => (
                <HUDFrame key={i} label={`STAGE_${i + 1}`} accent={[COLOR.lime, COLOR.cyan, COLOR.magenta][i]}>
                  <div className="px-3 py-3">
                    <div className="font-display text-sm" style={{ color: [COLOR.lime, COLOR.cyan, COLOR.magenta][i] }}>{label}</div>
                    <div className="mt-1 font-space text-[9px] uppercase tracking-[0.2em] text-white/50">
                      {["sketch · text · ifc", "diffusion + bim", "dwg · rvt · pdf"][i]}
                    </div>
                  </div>
                </HUDFrame>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CADPanel() {
  const sc = scenes[3];
  return (
    <section id="sc04" className="relative min-h-[150vh] px-5 md:px-10 py-32 flex items-center">
      <div className="relative z-10 max-w-[1500px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <div className="font-space text-[10px] uppercase tracking-[0.4em] text-lime-400 mb-4">
              {sc.eyebrow}
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl leading-[0.95] uppercase text-white"
                style={{ textShadow: `0 0 24px ${COLOR.lime}88` }}>
              <GlitchText text={sc.title} />
            </h2>
            <p className="mt-6 font-heebo text-base md:text-lg text-white/75 leading-relaxed">
              {sc.body}
            </p>
            <div className="mt-6 font-space text-[10px] uppercase tracking-[0.3em] text-fuchsia-400">
              :: {sc.audience}
            </div>
          </div>

          <div className="col-span-12 mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products.map((p, i) => {
              const accents = [COLOR.cyan, COLOR.magenta, COLOR.lime, COLOR.purple];
              const a = accents[i % accents.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1 }}
                >
                  <HUDFrame label={`PRODUCT_${p.n}`} accent={a}>
                    <div className="p-5 min-h-[260px] flex flex-col bg-black/40 backdrop-blur-sm">
                      <div className="font-space text-[9px] uppercase tracking-[0.3em]" style={{ color: a }}>
                        {p.tag}
                      </div>
                      <div className="mt-3 font-display text-lg font-bold uppercase text-white">
                        {p.title}
                      </div>
                      <p className="mt-3 font-heebo text-sm text-white/65 leading-relaxed flex-1">
                        {p.body}
                      </p>
                      <div className="mt-4 border-t border-white/10 pt-3 space-y-1">
                        {p.tools.map((tool, j) => (
                          <div key={j} className="flex items-center gap-2 font-space text-[10px] text-white/50">
                            <span className="inline-block h-1 w-1" style={{ background: a }} />
                            {tool}
                          </div>
                        ))}
                      </div>
                    </div>
                  </HUDFrame>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalCTA() {
  const sc = scenes[4];
  const lines = useMemo(() => [
    "$ pa --connect node://tel-aviv",
    "  > AUTH ........... OK",
    "  > MODEL .......... claude-3.5-sonnet · custom diffusion",
    "  > SOURCE ......... pro_algorithm.io/firm-style",
    "  > TARGET ......... your_studio.dwg",
    "$ pa --train --house-style",
    "  > epoch 01/12 ... loss 0.21 ........ OK",
    "  > epoch 12/12 ... loss 0.04 ........ OK",
    "$ pa --draw --autonomous",
    "  > הקווים מצטיירים מעצמם.",
  ], []);

  const [shown, setShown] = useState<string[]>([]);
  const [active, setActive] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !active && !done) setActive(true);
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [active, done]);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    let cancel = false;
    setShown([]);
    const tick = () => {
      if (cancel) return;
      if (i >= lines.length) {
        setDone(true);
        return;
      }
      setShown((s) => [...s, lines[i]]);
      i++;
      const delay = lines[i - 1]?.startsWith("$") ? 480 : 220;
      setTimeout(tick, delay);
    };
    tick();
    return () => { cancel = true; };
  }, [active, lines]);

  const cta = sc.cta;

  return (
    <section id="sc05" className="relative min-h-[180vh] px-5 md:px-10 py-32 flex items-center" ref={ref}>
      <div className="relative z-10 max-w-[1500px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 md:col-span-5">
            <div className="font-space text-[10px] uppercase tracking-[0.4em] text-lime-400 mb-4">
              {sc.eyebrow}
            </div>
            <h2 className="font-display font-black text-5xl md:text-7xl leading-[0.9] uppercase text-white"
                style={{ textShadow: `0 0 32px ${COLOR.lime}88, 0 0 60px ${COLOR.magenta}44` }}>
              <GlitchText text={sc.title} intensity={0.06} />
            </h2>
            <p className="mt-6 font-heebo text-base md:text-lg text-white/80 leading-relaxed">
              {sc.body}
            </p>
            <div className="mt-4 font-space text-[10px] uppercase tracking-[0.3em] text-fuchsia-400">
              :: {sc.audience}
            </div>
          </div>

          <div className="col-span-12 md:col-span-7">
            <HUDFrame label="// TERMINAL · pa.exec" accent={COLOR.lime}>
              <div className="bg-black/70 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-space text-[10px] uppercase tracking-[0.3em]">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-500" />
                    <span className="inline-block h-2 w-2 rounded-full bg-yellow-400" />
                    <span className="inline-block h-2 w-2 rounded-full bg-lime-400" />
                    <span className="ml-3 text-white/60">node://tel-aviv ~ pro_algorithm</span>
                  </div>
                  <span className="text-cyan-300">{done ? "READY" : active ? "EXECUTING..." : "STANDBY"}</span>
                </div>
                <div className="px-5 py-5 font-space text-[12px] md:text-[13px] leading-7 min-h-[340px]">
                  {shown.map((l, i) => (
                    <div
                      key={i}
                      className={
                        l.startsWith("$")
                          ? "text-lime-400"
                          : l.includes("OK")
                          ? "text-cyan-300"
                          : "text-white/80"
                      }
                    >
                      {l}
                    </div>
                  ))}
                  {!done && active && (
                    <span className="inline-block h-4 w-2 bg-lime-400 animate-pulse align-middle" />
                  )}
                </div>
                <div className="border-t border-white/10 px-5 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="font-space text-[10px] uppercase tracking-[0.3em] text-white/50">
                    {done ? ":: SESSION_READY · PRESS_RUN_TO_DEPLOY" : ":: COMPILING_PIPELINE..."}
                  </div>
                  <a
                    href={cta?.href || "mailto:hello@proalgorithm.io"}
                    className="group relative inline-flex items-center gap-3 border border-lime-400/60 bg-lime-400/10 px-5 py-3 font-space text-[12px] uppercase tracking-[0.3em] text-lime-300 transition hover:bg-lime-400 hover:text-black"
                    style={{ boxShadow: `0 0 24px ${COLOR.lime}55` }}
                  >
                    <span className="font-display font-bold">RUN</span>
                    <span className="text-lime-200 group-hover:text-black/80">{cta?.primary}</span>
                    <span className="text-lime-200 group-hover:text-black/80">→</span>
                  </a>
                </div>
              </div>
            </HUDFrame>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a href={cta?.href || "mailto:hello@proalgorithm.io"}
                 className="border border-white/15 bg-black/40 px-4 py-3 font-space text-[11px] uppercase tracking-[0.3em] text-white/80 hover:border-fuchsia-400 hover:text-fuchsia-300 transition">
                <span className="text-white/40">02 ·</span> {cta?.secondary}
              </a>
              <a href={`mailto:${brand.email}`} className="border border-white/15 bg-black/40 px-4 py-3 font-space text-[11px] uppercase tracking-[0.3em] text-white/80 hover:border-cyan-400 hover:text-cyan-300 transition">
                <span className="text-white/40">03 ·</span> {brand.email}
              </a>
              <a href={`tel:${brand.phone}`} className="border border-white/15 bg-black/40 px-4 py-3 font-space text-[11px] uppercase tracking-[0.3em] text-white/80 hover:border-lime-400 hover:text-lime-300 transition">
                <span className="text-white/40">04 ·</span> {brand.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersMarquee() {
  const items = [...partners, ...partners, ...partners];
  return (
    <section className="relative py-14 border-y border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
      <div className="relative z-10 max-w-[1500px] mx-auto px-5">
        <div className="flex items-center justify-between mb-6 font-space text-[10px] uppercase tracking-[0.4em] text-white/50">
          <span className="text-cyan-300">// CONNECTED_NODES</span>
          <span>14 חברות בנייה גדולות</span>
        </div>
      </div>
      <div className="relative w-full">
        <div className="flex gap-12 animate-marquee whitespace-nowrap font-display text-2xl md:text-4xl font-black text-white/70 uppercase tracking-[0.18em]">
          {items.map((p, i) => (
            <span key={i} className="flex items-center gap-12">
              <span className="hover:text-fuchsia-400 transition-colors">{p}</span>
              <span className="text-cyan-400/60">◇</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsPanel() {
  return (
    <section className="relative px-5 md:px-10 py-28">
      <div className="relative z-10 max-w-[1500px] mx-auto w-full">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="font-space text-[10px] uppercase tracking-[0.4em] text-cyan-300">// FIELD_REPORTS</div>
            <h3 className="mt-3 font-display text-4xl md:text-5xl font-black uppercase text-white"
                style={{ textShadow: `0 0 18px ${COLOR.cyan}66` }}>
              <GlitchText text="עדויות מהשטח" />
            </h3>
          </div>
          <div className="hidden md:block font-space text-[10px] uppercase tracking-[0.3em] text-white/40">
            N=120 · 2024–2026 · TLV
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => {
            const a = [COLOR.magenta, COLOR.cyan, COLOR.lime][i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1 }}
              >
                <HUDFrame label={`REPORT_${String(i + 1).padStart(2, "0")}`} accent={a}>
                  <div className="p-6 bg-black/50 backdrop-blur-sm min-h-[240px] flex flex-col">
                    <div className="font-display text-3xl mb-3" style={{ color: a }}>“</div>
                    <blockquote className="font-heebo text-base text-white/85 leading-relaxed flex-1">
                      {t.quote}
                    </blockquote>
                    <div className="mt-5 border-t border-white/10 pt-3">
                      <div className="font-heebo text-sm text-white">{t.name}</div>
                      <div className="font-space text-[10px] uppercase tracking-[0.25em] text-white/50">{t.role}</div>
                      <div className="font-space text-[10px] uppercase tracking-[0.25em] mt-0.5" style={{ color: a }}>// {t.project}</div>
                    </div>
                  </div>
                </HUDFrame>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TeamPanel() {
  return (
    <section className="relative px-5 md:px-10 py-24 border-t border-white/10">
      <div className="relative z-10 max-w-[1500px] mx-auto w-full">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <div className="font-space text-[10px] uppercase tracking-[0.4em] text-fuchsia-400">// CORE_TEAM</div>
            <h3 className="mt-3 font-display text-4xl md:text-5xl font-black uppercase text-white"
                style={{ textShadow: `0 0 18px ${COLOR.magenta}66` }}>
              <GlitchText text="הצוות" />
            </h3>
            <p className="mt-4 font-heebo text-white/65 max-w-sm">
              ארבעה מייסדים. בנייה, ML, אדריכלות ומוצר. השילוב הנדיר.
            </p>
          </div>
          <div className="col-span-12 md:col-span-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {team.map((m, i) => {
              const a = [COLOR.cyan, COLOR.magenta, COLOR.lime, COLOR.purple][i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <HUDFrame label={`ID_${String(i + 1).padStart(2, "0")}`} accent={a}>
                    <div className="p-4 min-h-[170px] bg-black/50 backdrop-blur-sm">
                      <div className="aspect-square w-full mb-3 relative overflow-hidden border border-white/10 flex items-center justify-center"
                           style={{ background: `linear-gradient(135deg, ${a}22, transparent)` }}>
                        <span className="font-display font-black text-3xl text-white/80">
                          {m.name.split(" ").map(n => n[0]).join("")}
                        </span>
                        <div className="absolute inset-0 pointer-events-none"
                             style={{
                               backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 4px)",
                             }} />
                      </div>
                      <div className="font-heebo font-bold text-white">{m.name}</div>
                      <div className="font-space text-[9px] uppercase tracking-[0.2em] text-white/50">{m.role}</div>
                      <div className="font-space text-[9px] uppercase tracking-[0.25em] mt-1" style={{ color: a }}>:: {m.bg}</div>
                    </div>
                  </HUDFrame>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-5 md:px-10 py-12 border-t border-white/15 bg-black/60 backdrop-blur">
      <div className="relative z-10 max-w-[1500px] mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <div className="font-display text-2xl font-black text-white tracking-[0.1em]"
               style={{ textShadow: `0 0 14px ${COLOR.magenta}88` }}>
            <GlitchText text={brand.nameHe} />
          </div>
          <div className="mt-2 font-space text-[10px] uppercase tracking-[0.3em] text-white/50">
            {brand.taglineEn} · EST_{brand.est}
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 font-space text-[10px] uppercase tracking-[0.3em] text-white/55 space-y-1">
          <div className="text-cyan-300">// CONTACT</div>
          <div>{brand.email}</div>
          <div>{brand.phone}</div>
        </div>
        <div className="col-span-6 md:col-span-3 font-space text-[10px] uppercase tracking-[0.3em] text-white/55 space-y-1">
          <div className="text-fuchsia-400">// NODE</div>
          <div className="font-heebo">{brand.address}</div>
          <div>{brand.cityHe} · IL</div>
        </div>
        <div className="col-span-12 md:col-span-2 font-space text-[10px] uppercase tracking-[0.3em] text-white/45">
          <div className="text-lime-400">// STATUS</div>
          <div>SYS_ONLINE</div>
          <div>v.2026.05.q2</div>
        </div>
        <div className="col-span-12 mt-4 pt-4 border-t border-white/10 flex items-center justify-between font-space text-[9px] uppercase tracking-[0.3em] text-white/35">
          <span>© {new Date().getFullYear()} PRO_ALGORITHM · ALL FREQUENCIES RESERVED</span>
          <span>BUILT_IN_{brand.cityHe}</span>
        </div>
      </div>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------------
export default function Cyberpunk() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  useEffect(() => {
    document.documentElement.setAttribute("data-variant", "cyberpunk");
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen text-white overflow-hidden" dir="rtl"
         style={{ background: COLOR.bgDeep }}>

      <div className="fixed inset-0 -z-10">
        <Canvas
          dpr={isMobile ? [1, 1.2] : [1, 1.5]}
          camera={{ position: [0, 8, 22], fov: 55 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <color attach="background" args={[COLOR.bgDeep]} />
          <Suspense fallback={null}>
            <SceneHost scrollY={smooth} isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>

      <GridOverlay />
      <VignetteOverlay />
      <ScanlineOverlay />
      <BootCRT />

      <TopNav />
      <SideHUD scrollY={smooth} />

      <main className="relative z-10">
        <HeroPanel />
        <ProjectPanel />
        <PlansPanel />
        <CADPanel />
        <PartnersMarquee />
        <TestimonialsPanel />
        <TeamPanel />
        <TerminalCTA />
        <Footer />
      </main>
    </div>
  );
}
