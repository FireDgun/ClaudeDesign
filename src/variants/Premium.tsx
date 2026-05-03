// Premium Dark Glassmorphism — variant 4 of 5
// Stripe x Linear x Apple Vision Pro: deep navy, gold, soft bloom, real glass.

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { brand, scenes, stats, products, partners, testimonials, team } from "../data";

/* ──────────────────────────────────────────────────────────────────────────
   COLOR TOKENS
   ────────────────────────────────────────────────────────────────────────── */
const C = {
  bg: "#0a0e1a",
  bg2: "#131826",
  navy: "#0e1422",
  gold: "#d4af37",
  goldSoft: "#e8c875",
  silver: "#c0c0c0",
  blue: "#4a90e2",
  blueDeep: "#2a5fae",
  ink: "#f4f6fb",
};

const SPRING = { type: "spring" as const, stiffness: 110, damping: 22, mass: 0.9 };
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ──────────────────────────────────────────────────────────────────────────
   R3F SCENE — instanced bloomed night cityscape that morphs across scroll
   ────────────────────────────────────────────────────────────────────────── */

type ProgRef = { current: number };

function NightCity({ progress }: { progress: ProgRef }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const count = 220;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const data = useMemo(() => {
    const arr: { x: number; z: number; h: number }[] = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 60,
        z: (Math.random() - 0.5) * 60,
        h: 1.2 + Math.random() * 7,
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const p = progress.current;
    const collapse = Math.min(1, Math.max(0, p * 1.4));
    for (let i = 0; i < count; i++) {
      const d = data[i];
      const cx = THREE.MathUtils.lerp(d.x, d.x * 0.05, collapse);
      const cz = THREE.MathUtils.lerp(d.z, d.z * 0.05, collapse);
      const ch = THREE.MathUtils.lerp(d.h, d.h * (0.4 + 0.6 * (1 - collapse)), collapse);
      dummy.position.set(cx, ch / 2 - 4, cz);
      dummy.scale.set(0.45, ch, 0.45);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.rotation.y = t * 0.04 + p * 0.6;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#0a0f1a"
        emissive={new THREE.Color(C.blue)}
        emissiveIntensity={0.15}
        metalness={0.7}
        roughness={0.4}
      />
    </instancedMesh>
  );
}

function WindowLights({ progress }: { progress: ProgRef }) {
  const ref = useRef<THREE.Points>(null!);
  const N = 1200;
  const positions = useMemo(() => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      a[i * 3] = (Math.random() - 0.5) * 60;
      a[i * 3 + 1] = -3.5 + Math.random() * 7;
      a[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return a;
  }, []);
  const colors = useMemo(() => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const cool = Math.random() < 0.18;
      if (cool) {
        a[i * 3] = 0.29; a[i * 3 + 1] = 0.56; a[i * 3 + 2] = 0.89;
      } else {
        a[i * 3] = 0.83; a[i * 3 + 1] = 0.69; a[i * 3 + 2] = 0.22;
      }
    }
    return a;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const p = progress.current;
    ref.current.rotation.y = t * 0.04 + p * 0.6;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.lerp(0.95, 0.0, Math.min(1, p * 2));
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={N} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={N} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} vertexColors transparent depthWrite={false} sizeAttenuation />
    </points>
  );
}

function HeroBuilding({ progress }: { progress: ProgRef }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const p = progress.current;
    const t = clock.getElapsedTime();
    const appear = THREE.MathUtils.smoothstep(p, 0.2, 0.5);
    const fade = 1 - THREE.MathUtils.smoothstep(p, 0.7, 1);
    const o = appear * fade;
    ref.current.position.y = THREE.MathUtils.lerp(-6, -0.5, appear);
    ref.current.rotation.y = t * 0.18 + p * 1.2;
    ref.current.scale.setScalar(THREE.MathUtils.lerp(0.6, 1.4, appear));
    ref.current.traverse((c: THREE.Object3D) => {
      const m = (c as THREE.Mesh).material as THREE.Material | undefined;
      if (m && "opacity" in m) {
        (m as THREE.Material).transparent = true;
        (m as { opacity: number }).opacity = o;
      }
    });
  });

  return (
    <group ref={ref}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 6, 1.6]} />
        <meshStandardMaterial
          color="#1a2236"
          emissive={new THREE.Color(C.gold)}
          emissiveIntensity={0.18}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, 3.4, 0]}>
        <boxGeometry args={[1.1, 1.4, 1.1]} />
        <meshStandardMaterial color="#0e1422" emissive={new THREE.Color(C.gold)} emissiveIntensity={0.3} metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 4.4, 0]}>
        <boxGeometry args={[0.5, 0.8, 0.5]} />
        <meshStandardMaterial color={C.gold} emissive={new THREE.Color(C.gold)} emissiveIntensity={0.7} />
      </mesh>
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[0, -2.7 + i * 0.5, 0.81]}>
          <planeGeometry args={[1.4, 0.04]} />
          <meshBasicMaterial color={C.goldSoft} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function GlassPlanes({ progress }: { progress: ProgRef }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const p = progress.current;
    const t = clock.getElapsedTime();
    const appear = THREE.MathUtils.smoothstep(p, 0.55, 0.85);
    ref.current.children.forEach((c, i) => {
      c.position.x = Math.sin(t * 0.4 + i) * 0.4 + (i - 1.5) * 1.6;
      c.position.y = Math.cos(t * 0.3 + i) * 0.3 + (i % 2 === 0 ? 0.2 : -0.2);
      c.position.z = -i * 0.6 + appear * 1.4;
      c.rotation.y = Math.sin(t * 0.3 + i) * 0.15 + 0.2;
      const m = (c as THREE.Mesh).material as THREE.Material | undefined;
      if (m && "opacity" in m) {
        (m as THREE.Material).transparent = true;
        (m as { opacity: number }).opacity = appear * 0.65;
      }
    });
  });
  return (
    <group ref={ref} position={[0, 0, 0]}>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i}>
          <planeGeometry args={[2.2, 1.4]} />
          <meshPhysicalMaterial
            color={i % 2 ? C.blue : "#1a2236"}
            transparent
            opacity={0.3}
            transmission={0.8}
            roughness={0.15}
            metalness={0.1}
            ior={1.4}
            thickness={0.3}
            emissive={new THREE.Color(i % 2 ? C.blue : C.gold)}
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

function ConvergingParticles({ progress }: { progress: ProgRef }) {
  const ref = useRef<THREE.Points>(null!);
  const N = 1800;
  const targets = useMemo(() => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 1.6 + (Math.random() - 0.5) * 0.2;
      const theta = (i / N) * Math.PI * 2 + Math.random() * 0.05;
      a[i * 3] = Math.cos(theta) * r;
      a[i * 3 + 1] = Math.sin(theta) * r;
      a[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
    }
    return a;
  }, []);
  const starts = useMemo(() => {
    const a = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      a[i * 3] = (Math.random() - 0.5) * 30;
      a[i * 3 + 1] = (Math.random() - 0.5) * 18;
      a[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return a;
  }, []);
  const positions = useMemo(() => new Float32Array(starts), [starts]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const p = progress.current;
    const t = clock.getElapsedTime();
    const k = THREE.MathUtils.smoothstep(p, 0.85, 1.0);
    const arr = (ref.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < N; i++) {
      const j = i * 3;
      arr[j] = THREE.MathUtils.lerp(starts[j], targets[j], k) + Math.sin(t + i) * 0.01;
      arr[j + 1] = THREE.MathUtils.lerp(starts[j + 1], targets[j + 1], k) + Math.cos(t + i) * 0.01;
      arr[j + 2] = THREE.MathUtils.lerp(starts[j + 2], targets[j + 2], k);
    }
    (ref.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    ref.current.rotation.z = t * 0.05 + p * 0.5;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.smoothstep(p, 0.78, 0.95);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={N} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={C.gold} transparent depthWrite={false} sizeAttenuation />
    </points>
  );
}

function CameraRig({ progress }: { progress: ProgRef }) {
  const { camera } = useThree();
  useFrame(() => {
    const p = progress.current;
    const z = THREE.MathUtils.lerp(14, 6.5, p);
    const y = THREE.MathUtils.lerp(2.4, 0.0, p);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.06);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, z, 0.06);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function R3FStage({ progressRef, mobile }: { progressRef: ProgRef; mobile: boolean }) {
  return (
    <Canvas
      dpr={mobile ? 1 : [1, 1.6]}
      camera={{ position: [0, 2.4, 14], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
    >
      <color attach="background" args={[C.bg]} />
      <fog attach="fog" args={[C.bg, 14, 38]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 4]} intensity={0.5} color={C.gold} />
      <pointLight position={[-6, 3, 4]} intensity={0.6} color={C.blue} />
      <Suspense fallback={null}>
        <NightCity progress={progressRef} />
        <WindowLights progress={progressRef} />
        <HeroBuilding progress={progressRef} />
        <GlassPlanes progress={progressRef} />
        <ConvergingParticles progress={progressRef} />
        <CameraRig progress={progressRef} />
        {!mobile && (
          <EffectComposer multisampling={0}>
            <Bloom intensity={1.05} luminanceThreshold={0.18} luminanceSmoothing={0.7} mipmapBlur />
            <Vignette eskil={false} offset={0.25} darkness={0.85} />
          </EffectComposer>
        )}
      </Suspense>
    </Canvas>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   UI HELPERS
   ────────────────────────────────────────────────────────────────────────── */

function useMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const f = () => setM(window.innerWidth < 768);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return m;
}

/** Mouse-tracked spotlight wrapper — sets CSS vars --mx, --my on the section */
function Spotlight({
  className = "",
  children,
  color = "rgba(212,175,55,0.18)",
  id,
}: {
  className?: string;
  children: React.ReactNode;
  color?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      ref={ref}
      id={id}
      className={`relative isolate ${className}`}
      style={{ ["--spot" as string]: color } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx,50%) var(--my,30%), var(--spot), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}

/** Refined glass card */
function Glass({
  className = "",
  children,
  tilt = false,
  goldEdge = false,
}: {
  className?: string;
  children: React.ReactNode;
  tilt?: boolean;
  goldEdge?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rxs = useSpring(rx, SPRING);
  const rys = useSpring(ry, SPRING);

  const onMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: tilt ? rxs : 0,
        rotateY: tilt ? rys : 0,
        transformStyle: "preserve-3d",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.025) 50%, rgba(255,255,255,0.06) 100%)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.35), 0 30px 60px -30px rgba(0,0,0,0.7), 0 18px 40px -20px rgba(74,144,226,0.2)",
        border: goldEdge ? "1px solid rgba(212,175,55,0.35)" : "1px solid rgba(255,255,255,0.08)",
      }}
      className={`rounded-2xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* Counter */
function CountUp({ to }: { to: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1800;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 4);
      setV(eased * to);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <span>{Number.isInteger(to) ? Math.round(v).toLocaleString() : v.toFixed(1)}</span>;
}

/* ──────────────────────────────────────────────────────────────────────────
   NAV
   ────────────────────────────────────────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96vw,1280px)]"
      dir="rtl"
    >
      <div
        className="rounded-full px-5 sm:px-7 py-3 flex items-center justify-between transition-all duration-500"
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(20,26,42,0.85), rgba(10,14,26,0.7))"
            : "linear-gradient(135deg, rgba(20,26,42,0.55), rgba(10,14,26,0.35))",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.08), 0 22px 50px -20px rgba(0,0,0,0.6)",
        }}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative w-7 h-7">
            <div
              className="absolute inset-0 rounded-md"
              style={{
                background:
                  "conic-gradient(from 220deg, #d4af37, #e8c875, #c0c0c0, #4a90e2, #d4af37)",
                filter: "blur(0.5px)",
              }}
            />
            <div
              className="absolute inset-[3px] rounded-[5px] flex items-center justify-center text-[10px] font-bricolage font-bold"
              style={{ background: C.bg, color: C.gold }}
            >
              PA
            </div>
          </div>
          <div className="font-bricolage text-[15px] tracking-[-0.02em]">
            {brand.name}
          </div>
          <span className="hidden sm:inline text-[11px] font-mono text-white/40 mr-2">
            // {brand.cityHe}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-7 text-[13px] text-white/70 font-sans">
          <a className="hover:text-white transition-colors" href="#platform">פלטפורמה</a>
          <a className="hover:text-white transition-colors" href="#products">מוצרים</a>
          <a className="hover:text-white transition-colors" href="#cad">CAD</a>
          <a className="hover:text-white transition-colors" href="#customers">לקוחות</a>
          <a className="hover:text-white transition-colors" href="#team">צוות</a>
        </nav>

        <a
          href="#contact"
          className="group relative inline-flex items-center gap-2 text-[13px] font-medium px-4 py-2 rounded-full overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #d4af37, #b78b1f)",
            color: "#0a0e1a",
            boxShadow: "0 10px 30px -10px rgba(212,175,55,0.55)",
          }}
        >
          <span>קבע הדגמה</span>
          <span className="text-[11px]">←</span>
        </a>
      </div>
    </motion.header>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <Spotlight className="relative min-h-[100svh] flex items-end pb-32 sm:pb-40 pt-32 px-6">
      <div dir="rtl" className="relative w-full max-w-[1280px] mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(12px)",
            }}>
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full animate-ping" style={{ background: C.gold, opacity: 0.5 }} />
              <span className="relative w-1.5 h-1.5 rounded-full" style={{ background: C.gold }} />
            </span>
            <span className="text-[11px] font-mono tracking-wider text-white/70">SERIES A · LIVE</span>
          </div>
          <div className="text-[11px] font-mono text-white/40">EST. {brand.est} · {brand.cityHe}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="font-mono text-[11px] tracking-[0.4em] mb-4 text-white/50"
        >
          {scenes[0].eyebrow}
        </motion.div>

        <h1 className="font-bricolage tracking-[-0.045em] leading-[0.92] text-[44px] sm:text-[72px] lg:text-[108px]">
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.3 }}
            className="block"
          >
            תשתית ה-AI
          </motion.span>
          <motion.span
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.45 }}
            className="block"
          >
            של תעשיית{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #e8c875 10%, #d4af37 40%, #c0c0c0 70%, #e8c875 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                backgroundSize: "200% 100%",
                animation: "shimmer 6s linear infinite",
              }}
            >
              הבנייה
            </span>
            .
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.6 }}
          className="mt-7 max-w-[560px] text-[15px] sm:text-[17px] leading-[1.55] text-white/65 font-sans"
        >
          {scenes[0].body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-[14px]"
            style={{
              background: "linear-gradient(135deg, #d4af37, #b78b1f)",
              color: "#0a0e1a",
              boxShadow: "0 14px 38px -10px rgba(212,175,55,0.6), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            <span>קבע הדגמה פרטית</span>
            <span>←</span>
          </a>
          <a
            href="#cad"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-[14px]"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="text-white/85">צפה בתוסף ה-Revit</span>
            <span className="text-white/50">↗</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO, delay: 0.95 }}
          className="hidden lg:block absolute right-6 top-32 w-[300px]"
        >
          <Glass className="p-5" tilt goldEdge>
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-mono tracking-[0.3em] text-white/45">LIVE METRICS</div>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.gold }} />
            </div>
            <div className="font-bricolage text-[44px] tracking-[-0.04em] leading-none">
              <CountUp to={240} />K+
            </div>
            <div className="text-[12px] text-white/55 mt-1">תוכניות אדריכליות נוצרו</div>
            <div className="my-4 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.5), transparent)" }} />
            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
              <div>
                <div className="text-white/45">Δ THIS WEEK</div>
                <div style={{ color: C.gold }} className="mt-0.5">+ 4,820</div>
              </div>
              <div>
                <div className="text-white/45">UPTIME</div>
                <div className="text-white/85 mt-0.5">99.97%</div>
              </div>
            </div>
          </Glass>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-8 right-6 flex items-center gap-3 text-[11px] font-mono text-white/40"
        >
          <span>SCROLL</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8"
            style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.7), transparent)" }}
          />
        </motion.div>
      </div>

      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -left-32 top-1/3 w-[520px] h-[520px] rounded-full"
          style={{ background: `radial-gradient(closest-side, ${C.blue}33, transparent 70%)`, filter: "blur(40px)" }}
        />
        <div
          className="absolute -right-24 -bottom-24 w-[600px] h-[600px] rounded-full"
          style={{ background: `radial-gradient(closest-side, ${C.gold}1f, transparent 70%)`, filter: "blur(60px)" }}
        />
      </div>
    </Spotlight>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   GOLD MARQUEE
   ────────────────────────────────────────────────────────────────────────── */

function GoldMarquee() {
  const items = [...partners, ...partners, ...partners];
  return (
    <div className="relative py-8 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to right, ${C.bg}, transparent)` }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
        style={{ background: `linear-gradient(to left, ${C.bg}, transparent)` }}
      />
      <div className="text-center text-[10px] font-mono tracking-[0.4em] text-white/40 mb-5">
        TRUSTED BY ISRAEL'S LARGEST DEVELOPERS
      </div>
      <div className="flex animate-marquee whitespace-nowrap" style={{ width: "200%" }}>
        {items.map((p, i) => (
          <div key={`${p}-${i}`} className="flex items-center gap-10 mx-10 shrink-0">
            <span
              className="font-bricolage text-[20px] sm:text-[26px] tracking-[-0.02em]"
              style={{
                background: "linear-gradient(180deg, #e8c875 0%, #d4af37 60%, #8a6e1d 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "0 1px 0 rgba(0,0,0,0.4)",
              }}
            >
              {p}
            </span>
            <span className="text-[#d4af37]/40 text-xs">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   STATS BAND
   ────────────────────────────────────────────────────────────────────────── */

function StatsBand() {
  return (
    <section className="relative px-6 py-20" id="platform">
      <div dir="rtl" className="max-w-[1280px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
          >
            <Glass className="p-6 h-full">
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">0{i + 1}</div>
              <div className="mt-3 font-bricolage text-[44px] sm:text-[56px] tracking-[-0.04em] leading-none">
                <CountUp to={s.value} />
                <span style={{ color: C.gold }}>{s.suffix}</span>
              </div>
              <div className="mt-3 text-white/85 text-[14px]">{s.label}</div>
              <div className="mt-1 text-white/45 text-[12px]">{s.desc}</div>
            </Glass>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   SCENE 2 — PROJECT (frosted glass that wipes)
   ────────────────────────────────────────────────────────────────────────── */

function ProjectScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const wipe = useTransform(scrollYProgress, [0.1, 0.6], [0, 100]);
  const clip = useTransform(wipe, (v) => `inset(0 0 0 ${v}%)`);
  return (
    <section ref={ref} className="relative px-6 py-32" id="project">
      <div dir="rtl" className="max-w-[1280px] mx-auto grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <div className="font-mono text-[11px] tracking-[0.4em] text-white/45 mb-4">{scenes[1].eyebrow}</div>
          <h2 className="font-bricolage text-[40px] sm:text-[56px] tracking-[-0.04em] leading-[1] mb-5">
            {scenes[1].title}
          </h2>
          <p className="text-white/65 text-[15px] leading-[1.6] max-w-[440px]">{scenes[1].body}</p>
          <div className="mt-6 text-[12px] font-mono text-[#d4af37]/85">{scenes[1].audience}</div>
        </div>

        <div className="lg:col-span-7">
          <Glass className="aspect-[4/3] relative overflow-hidden p-0" tilt>
            <div className="absolute inset-0">
              <FakeBuildingViz />
            </div>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                backdropFilter: "blur(28px) saturate(140%)",
                WebkitBackdropFilter: "blur(28px) saturate(140%)",
                background: "rgba(10,14,26,0.35)",
                clipPath: clip,
              }}
            >
              <div className="absolute bottom-6 left-6 font-mono text-[10px] tracking-[0.3em] text-white/60">
                LAYER · ENVELOPE
              </div>
            </motion.div>
            <div className="absolute top-4 right-4 font-mono text-[10px] text-white/55 tracking-wider">
              REVEAL
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-white/40">
              [scroll to clear]
            </div>
          </Glass>

          <div className="grid grid-cols-3 gap-3 mt-3">
            {["שלד", "מעטפת", "מערכות"].map((l, i) => (
              <Glass key={l} className="px-3 py-2 text-[11px] font-mono text-white/65 flex items-center justify-between">
                <span>L0{i + 1}</span>
                <span>{l}</span>
                <span className="w-1 h-1 rounded-full" style={{ background: i === 1 ? C.gold : "rgba(255,255,255,0.3)" }} />
              </Glass>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FakeBuildingViz() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-full">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0e1422" />
          <stop offset="100%" stopColor="#070a13" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)" />
      <ellipse cx="400" cy="320" rx="360" ry="180" fill="url(#glow)" opacity="0.5" />

      <g stroke="rgba(255,255,255,0.05)" strokeWidth="1">
        {Array.from({ length: 18 }).map((_, i) => (
          <line key={`g1-${i}`} x1={0} y1={i * 40} x2={800} y2={i * 40} />
        ))}
        {Array.from({ length: 22 }).map((_, i) => (
          <line key={`g2-${i}`} x1={i * 40} y1={0} x2={i * 40} y2={600} />
        ))}
      </g>

      <g transform="translate(400 350)">
        <ellipse cx="0" cy="120" rx="200" ry="20" fill="rgba(0,0,0,0.4)" />
        {Array.from({ length: 18 }).map((_, i) => {
          const w = 220 - i * 4;
          const h = 18;
          const y = 100 - i * h;
          return (
            <g key={i}>
              <rect x={-w / 2} y={y} width={w} height={h} fill="#11192b" stroke="rgba(255,255,255,0.08)" />
              {Array.from({ length: Math.floor(w / 14) }).map((_, j) => {
                const lit = ((i * 13 + j * 7) % 100) > 45;
                return (
                  <rect
                    key={j}
                    x={-w / 2 + 6 + j * 14}
                    y={y + 4}
                    width={6}
                    height={10}
                    fill={lit ? "#d4af37" : "#1a2236"}
                    opacity={lit ? 0.85 : 1}
                  />
                );
              })}
            </g>
          );
        })}
        <rect x={-12} y={-240} width={24} height={20} fill="#d4af37" opacity="0.9" />
        <line x1={0} y1={-260} x2={0} y2={-220} stroke="#d4af37" strokeWidth="1" />
      </g>

      <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="rgba(255,255,255,0.45)">
        <text x="20" y="30">PROJECT · HELIX TOWER</text>
        <text x="20" y="50">42 FLOORS · 184m</text>
        <text x="700" y="580" textAnchor="end">TLV · ROTHSCHILD</text>
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   SCENE 3 — PARALLAX PLANS (floating glass cards)
   ────────────────────────────────────────────────────────────────────────── */

function PlansScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y3 = useTransform(scrollYProgress, [0, 1], [180, -180]);
  const rot1 = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const rot2 = useTransform(scrollYProgress, [0, 1], [3, -3]);

  return (
    <section ref={ref} className="relative px-6 py-32" id="plans">
      <div dir="rtl" className="max-w-[1280px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="font-mono text-[11px] tracking-[0.4em] text-white/45 mb-4">{scenes[2].eyebrow}</div>
            <h2 className="font-bricolage text-[40px] sm:text-[60px] tracking-[-0.04em] leading-[1] max-w-[640px]">
              {scenes[2].title}
            </h2>
          </div>
          <p className="max-w-[420px] text-white/65 text-[15px] leading-[1.6]">{scenes[2].body}</p>
        </div>

        <div className="relative h-[640px]" style={{ perspective: "1400px" }}>
          <motion.div style={{ y: y3, rotate: rot1 }} className="absolute left-[3%] top-12 w-[300px] hidden md:block">
            <Glass className="p-5">
              <div className="font-mono text-[10px] text-white/45 tracking-[0.3em]">PLAN · A.01</div>
              <div className="mt-2 text-[14px] text-white/85">קומה 12 · מגורים</div>
              <div className="mt-3 aspect-[4/3] rounded-lg overflow-hidden" style={{ background: C.bg2 }}>
                <FakePlanSVG seed={1} />
              </div>
              <div className="mt-3 flex justify-between text-[10px] font-mono text-white/50">
                <span>240 m²</span>
                <span>3BR</span>
                <span>v.07</span>
              </div>
            </Glass>
          </motion.div>

          <motion.div style={{ y: y1, rotate: rot2 }} className="absolute left-1/2 -translate-x-1/2 top-0 w-[360px] sm:w-[420px] z-20">
            <Glass className="p-5" tilt goldEdge>
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] tracking-[0.3em]" style={{ color: C.gold }}>PLAN · A.07 · LIVE</div>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.gold }} />
              </div>
              <div className="mt-2 text-[15px] text-white/95 font-bricolage tracking-[-0.02em]">קומת קרקע · לובי</div>
              <div className="mt-3 aspect-[4/3] rounded-lg overflow-hidden" style={{ background: C.bg2 }}>
                <FakePlanSVG seed={2} highlight />
              </div>
              <div className="mt-3 grid grid-cols-3 text-[10px] font-mono text-white/65">
                <div><div className="text-white/40">AREA</div>620 m²</div>
                <div><div className="text-white/40">CEILING</div>4.2m</div>
                <div><div className="text-white/40">EXPORT</div>DWG · IFC</div>
              </div>
            </Glass>
          </motion.div>

          <motion.div style={{ y: y2, rotate: rot1 }} className="absolute right-[4%] top-32 w-[300px] hidden md:block">
            <Glass className="p-5">
              <div className="font-mono text-[10px] text-white/45 tracking-[0.3em]">PLAN · A.04</div>
              <div className="mt-2 text-[14px] text-white/85">קומה 8 · משרדים</div>
              <div className="mt-3 aspect-[4/3] rounded-lg overflow-hidden" style={{ background: C.bg2 }}>
                <FakePlanSVG seed={3} />
              </div>
              <div className="mt-3 flex justify-between text-[10px] font-mono text-white/50">
                <span>410 m²</span>
                <span>OPEN</span>
                <span>v.04</span>
              </div>
            </Glass>
          </motion.div>

          <motion.div style={{ y: y2 }} className="absolute left-[14%] bottom-0 w-[230px] hidden md:block">
            <Glass className="p-4">
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/45 mb-2">RENDER QUEUE</div>
              <div className="space-y-2">
                {["A.01 · floor", "A.07 · lobby", "A.12 · roof"].map((q, i) => (
                  <div key={q} className="flex items-center justify-between text-[11px]">
                    <span className="text-white/75">{q}</span>
                    <span className="font-mono text-[10px]" style={{ color: i === 1 ? C.gold : "rgba(255,255,255,0.4)" }}>
                      {i === 1 ? "● live" : "✓ done"}
                    </span>
                  </div>
                ))}
              </div>
            </Glass>
          </motion.div>

          <motion.div style={{ y: y3 }} className="absolute right-[12%] bottom-8 w-[210px] hidden md:block">
            <Glass className="p-4" goldEdge>
              <div className="font-mono text-[10px] tracking-[0.3em] mb-2" style={{ color: "rgba(212,175,55,0.8)" }}>DELIVERED</div>
              <div className="font-bricolage text-[36px] tracking-[-0.04em] leading-none">
                <CountUp to={240} />K+
              </div>
              <div className="text-[11px] text-white/55 mt-1">תוכניות · מצטבר</div>
            </Glass>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FakePlanSVG({ seed = 1, highlight = false }: { seed?: number; highlight?: boolean }) {
  const rooms = useMemo(() => {
    const r: { x: number; y: number; w: number; h: number }[] = [];
    let s = seed * 7919;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    for (let i = 0; i < 8; i++) {
      const w = 30 + Math.floor(rand() * 70);
      const h = 30 + Math.floor(rand() * 60);
      const x = 10 + Math.floor(rand() * (240 - w));
      const y = 10 + Math.floor(rand() * (170 - h));
      r.push({ x, y, w, h });
    }
    return r;
  }, [seed]);
  return (
    <svg viewBox="0 0 260 200" className="w-full h-full">
      <rect width="260" height="200" fill="#0d1322" />
      <g stroke="rgba(255,255,255,0.07)" strokeWidth="0.5">
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 8} y1={0} x2={i * 8} y2={200} />
        ))}
        {Array.from({ length: 22 }).map((_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 8} x2={260} y2={i * 8} />
        ))}
      </g>
      <rect x={8} y={8} width={244} height={184} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      {rooms.map((r, i) => (
        <g key={i}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" />
          {highlight && i === 2 && (
            <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="rgba(212,175,55,0.18)" stroke={C.gold} strokeWidth="1" />
          )}
        </g>
      ))}
      <g stroke={highlight ? C.gold : "rgba(74,144,226,0.6)"} strokeWidth="0.5">
        <line x1={8} y1={196} x2={252} y2={196} />
        <line x1={8} y1={194} x2={8} y2={198} />
        <line x1={252} y1={194} x2={252} y2={198} />
      </g>
      <text x={130} y={200} fontFamily="JetBrains Mono" fontSize="6" fill="rgba(255,255,255,0.5)" textAnchor="middle">
        24.40m
      </text>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   SCENE 4 — REVIT-PLUGIN MOCKUP (the star)
   ────────────────────────────────────────────────────────────────────────── */

function CADScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [22, 0, -10]);
  const lift = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -40]);

  return (
    <Spotlight
      id="cad"
      className="relative px-6 py-32 overflow-hidden"
      color="rgba(74,144,226,0.18)"
    >
      <div ref={ref} dir="rtl" className="relative max-w-[1280px] mx-auto">
        <div className="text-center mb-14">
          <div className="font-mono text-[11px] tracking-[0.4em] text-white/45 mb-4">{scenes[3].eyebrow}</div>
          <h2 className="font-bricolage text-[40px] sm:text-[64px] tracking-[-0.04em] leading-[1] max-w-[820px] mx-auto">
            {scenes[3].title}
          </h2>
          <p className="text-white/65 text-[15px] leading-[1.6] mt-5 max-w-[640px] mx-auto">
            {scenes[3].body}
          </p>
        </div>

        <motion.div
          style={{
            rotateX: tilt,
            y: lift,
            transformStyle: "preserve-3d",
            perspective: 2000,
          }}
          className="relative mx-auto"
        >
          <RevitMockup />
        </motion.div>

        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[80%] h-[200px] pointer-events-none"
          style={{
            background: "radial-gradient(closest-side, rgba(74,144,226,0.35), transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>
    </Spotlight>
  );
}

const REVIT_LAYERS = [
  { code: "L01", name: "WALLS", count: 184, color: "#d4af37", on: true },
  { code: "L02", name: "DOORS", count: 42, color: "#4a90e2", on: true },
  { code: "L03", name: "WINDOWS", count: 96, color: "#e8c875", on: true },
  { code: "L04", name: "MEP · HVAC", count: 320, color: "#c0c0c0", on: true },
  { code: "L05", name: "MEP · ELEC", count: 412, color: "#7aa8e0", on: false },
  { code: "L06", name: "STRUCTURAL", count: 88, color: "#8b9bb8", on: true },
  { code: "L07", name: "FURNITURE", count: 56, color: "#6a7891", on: false },
  { code: "L08", name: "ANNOTATIONS", count: 24, color: "#5a6580", on: true },
];

function RevitMockup() {
  const [typed, setTyped] = useState("");
  const [layers, setLayers] = useState(REVIT_LAYERS);
  const [count, setCount] = useState({ walls: 184, doors: 42, windows: 96 });
  const [cmdIdx, setCmdIdx] = useState(0);

  const cmds = useMemo(
    () => [
      "ai.draft floor 12 → office, 410m², open plan",
      "ai.dim auto-detect 24mm scale 1:50",
      "ai.export → DWG · IFC · RVT",
      "ai.review walls.intersect mep",
    ],
    []
  );

  useEffect(() => {
    let i = 0;
    const cmd = cmds[cmdIdx % cmds.length];
    setTyped("");
    const id = setInterval(() => {
      i++;
      setTyped(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(id);
        setTimeout(() => setCmdIdx((x) => x + 1), 1700);
      }
    }, 38);
    return () => clearInterval(id);
  }, [cmdIdx, cmds]);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => ({
        walls: c.walls + (Math.random() > 0.5 ? 1 : 0),
        doors: c.doors + (Math.random() > 0.85 ? 1 : 0),
        windows: c.windows + (Math.random() > 0.7 ? 1 : 0),
      }));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="rounded-[18px] overflow-hidden mx-auto w-full max-w-[1180px]"
      style={{
        background: "linear-gradient(180deg, rgba(20,26,42,0.9), rgba(10,14,26,0.92))",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.08), 0 60px 120px -40px rgba(0,0,0,0.8), 0 30px 60px -30px rgba(74,144,226,0.3)",
      }}
      dir="ltr"
    >
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <div className="ml-3 text-[11px] font-mono text-white/55">
            Autodesk Revit 2024 · Helix-Tower.rvt · <span style={{ color: C.gold }}>Pro Algorithm Plugin v2.4</span>
          </div>
        </div>
        <div className="text-[10px] font-mono text-white/35">●  CONNECTED · TLV-EAST</div>
      </div>

      <div className="flex items-center gap-1 px-3 py-1.5 text-[10px] font-mono text-white/55"
           style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
        {["File", "Architecture", "Structure", "Steel", "Systems", "Insert", "Annotate"].map((t) => (
          <span key={t} className="px-2 py-1 rounded hover:bg-white/5">{t}</span>
        ))}
        <span className="px-2 py-1 rounded ml-2" style={{ color: C.gold, background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)" }}>
          ◆ Pro Algorithm
        </span>
      </div>

      <div className="grid grid-cols-12 min-h-[440px]">
        <aside className="col-span-3 px-3 py-3 text-[11px]"
               style={{ borderRight: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.012)" }}>
          <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 mb-3">PROJECT BROWSER</div>
          <div className="text-white/85 font-medium mb-2 text-[12px]">Helix Tower · TLV</div>
          <div className="text-[10px] text-white/45 font-mono mb-4">42 floors · 184m</div>

          <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 mb-2 mt-4">LAYERS</div>
          <div className="space-y-1">
            {layers.map((l) => (
              <button
                key={l.code}
                onClick={() => setLayers((arr) => arr.map((x) => x.code === l.code ? { ...x, on: !x.on } : x))}
                className="w-full flex items-center justify-between px-2 py-1.5 rounded text-left transition-colors hover:bg-white/5"
                style={{ background: l.on ? "rgba(255,255,255,0.025)" : "transparent" }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-sm"
                    style={{ background: l.on ? l.color : "transparent", border: `1px solid ${l.color}` }}
                  />
                  <span className={l.on ? "text-white/85" : "text-white/30"}>{l.name}</span>
                </div>
                <span className="font-mono text-[10px] text-white/40">{l.count}</span>
              </button>
            ))}
          </div>

          <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 mb-2 mt-5">VIEWS</div>
          <div className="space-y-1 text-[11px] text-white/60">
            {["Floor Plan · L12", "Section A-A", "3D · Isometric", "Schedule · Doors"].map((v, i) => (
              <div key={v} className={`px-2 py-1 rounded ${i === 0 ? "bg-white/5 text-white/90" : ""}`}>
                {i === 0 ? "▶ " : "○ "}{v}
              </div>
            ))}
          </div>
        </aside>

        <main className="col-span-9 lg:col-span-7 relative" style={{ background: "#070b14" }}>
          <Viewport layers={layers} />
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            {["select", "wall", "door", "window", "dim"].map((t, i) => (
              <div key={t}
                className="px-2 py-1 rounded text-[10px] font-mono"
                style={{
                  background: i === 1 ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.04)",
                  border: i === 1 ? "1px solid rgba(212,175,55,0.4)" : "1px solid rgba(255,255,255,0.06)",
                  color: i === 1 ? C.gold : "rgba(255,255,255,0.6)",
                }}>
                {t}
              </div>
            ))}
          </div>
          <div className="absolute top-3 right-3 z-10">
            <div className="px-2 py-1 rounded text-[10px] font-mono"
                 style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)" }}>
              FLOOR 12 · 1:50
            </div>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10 text-[10px] font-mono text-white/45">
            <div>X: 24.480 · Y: 18.220 · Z: 0.000</div>
            <div>SNAP · ON · GRID 0.5m</div>
          </div>
        </main>

        <aside className="hidden lg:block col-span-2 px-3 py-3 text-[11px]"
               style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.012)" }}>
          <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 mb-3">PROPERTIES</div>
          <div className="space-y-3">
            <div>
              <div className="text-[10px] text-white/45">Element</div>
              <div className="text-white/85">Wall · Generic 200mm</div>
            </div>
            <div>
              <div className="text-[10px] text-white/45">Length</div>
              <div className="text-white/85 font-mono">8.420 m</div>
            </div>
            <div>
              <div className="text-[10px] text-white/45">Material</div>
              <div className="text-white/85">Concrete · CIP</div>
            </div>
          </div>

          <div className="font-mono text-[9px] tracking-[0.3em] text-white/40 mb-3 mt-6">LIVE COUNTERS</div>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-white/65">walls</span>
              <span className="font-mono" style={{ color: C.gold }}>{count.walls}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/65">doors</span>
              <span className="font-mono text-white/85">{count.doors}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/65">windows</span>
              <span className="font-mono text-white/85">{count.windows}</span>
            </div>
          </div>

          <div className="mt-6 p-2 rounded text-[10px] font-mono text-center"
               style={{ background: "rgba(74,144,226,0.1)", border: "1px solid rgba(74,144,226,0.3)", color: "#a8c5ec" }}>
            AI · IDLE
          </div>
        </aside>
      </div>

      <div className="px-4 py-3 flex items-center gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.4)" }}>
        <span style={{ color: C.gold }} className="font-mono text-[11px]">PA &gt;</span>
        <span className="font-mono text-[11px] text-white/85">{typed}</span>
        <span className="inline-block w-1.5 h-3 animate-pulse" style={{ background: C.gold }} />
        <span className="ml-auto font-mono text-[10px] text-white/40">UNDO 24 · REDO 0</span>
      </div>
    </div>
  );
}

function Viewport({ layers }: { layers: typeof REVIT_LAYERS }) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 50);
    return () => clearInterval(id);
  }, []);

  const wallsOn = layers.find((l) => l.name === "WALLS")?.on;
  const doorsOn = layers.find((l) => l.name === "DOORS")?.on;
  const winOn = layers.find((l) => l.name === "WINDOWS")?.on;
  const mepOn = layers.find((l) => l.name === "MEP · HVAC")?.on;
  const strOn = layers.find((l) => l.name === "STRUCTURAL")?.on;

  return (
    <svg viewBox="0 0 800 460" className="w-full h-full">
      <defs>
        <pattern id="vpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        </pattern>
        <pattern id="vpGridMaj" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
        </pattern>
      </defs>
      <rect width="800" height="460" fill="url(#vpGrid)" />
      <rect width="800" height="460" fill="url(#vpGridMaj)" />

      <g stroke={C.blue} strokeWidth="0.7" opacity="0.5">
        <line x1={400} y1={0} x2={400} y2={460} />
        <line x1={0} y1={230} x2={800} y2={230} />
      </g>

      <g transform="translate(180 90)">
        {wallsOn && (
          <g stroke="#d4af37" strokeWidth="2.5" fill="none">
            <rect x={0} y={0} width={440} height={280} />
            <line x1={180} y1={0} x2={180} y2={160} />
            <line x1={180} y1={160} x2={440} y2={160} />
            <line x1={0} y1={200} x2={180} y2={200} />
          </g>
        )}
        {strOn && (
          <g fill="#8b9bb8" stroke="#c0c0c0" strokeWidth="0.5">
            {[0, 1, 2, 3].map((i) => (
              <rect key={`cx-${i}`} x={20 + i * 120} y={20} width={6} height={6} />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <rect key={`cy-${i}`} x={20 + i * 120} y={250} width={6} height={6} />
            ))}
          </g>
        )}
        {doorsOn && (
          <g stroke="#4a90e2" strokeWidth="1.5" fill="none">
            <path d={`M 90 0 A 28 28 0 0 1 118 28`} />
            <line x1={90} y1={0} x2={90} y2={28} />
            <path d={`M 240 200 A 24 24 0 0 1 264 224`} />
            <line x1={240} y1={200} x2={240} y2={224} />
            <path d={`M 320 160 A 22 22 0 0 0 320 204`} />
          </g>
        )}
        {winOn && (
          <g stroke="#e8c875" strokeWidth="1.5">
            <line x1={220} y1={0} x2={300} y2={0} strokeDasharray="4 3" />
            <line x1={340} y1={0} x2={420} y2={0} strokeDasharray="4 3" />
            <line x1={0} y1={60} x2={0} y2={140} strokeDasharray="4 3" />
            <line x1={440} y1={60} x2={440} y2={140} strokeDasharray="4 3" />
            <line x1={440} y1={200} x2={440} y2={260} strokeDasharray="4 3" />
          </g>
        )}
        {mepOn && (
          <g stroke="#c0c0c0" strokeWidth="0.6" opacity="0.55" fill="none" strokeDasharray="3 2">
            <path d="M 20 130 L 220 130 L 220 80 L 420 80" />
            <path d="M 20 220 L 380 220 L 380 130" />
            <circle cx={220} cy={130} r={3} fill="#c0c0c0" />
            <circle cx={380} cy={130} r={3} fill="#c0c0c0" />
          </g>
        )}
        <g>
          <rect
            x={0}
            y={0}
            width={180}
            height={4}
            fill={C.gold}
            opacity={0.5 + 0.4 * Math.sin(t * 0.1)}
          />
        </g>
        <g stroke="#4a90e2" strokeWidth="0.5" opacity="0.6">
          <line x1={0} y1={300} x2={440} y2={300} />
          <line x1={0} y1={296} x2={0} y2={304} />
          <line x1={440} y1={296} x2={440} y2={304} />
          <line x1={180} y1={296} x2={180} y2={304} />
        </g>
        <text x={90} y={314} fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,0.55)" textAnchor="middle">
          18.00m
        </text>
        <text x={310} y={314} fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,0.55)" textAnchor="middle">
          26.00m
        </text>
      </g>

      <g fontFamily="JetBrains Mono" fontSize="9" fill="rgba(255,255,255,0.55)">
        <text x={200} y={108}>OFFICE 12.A</text>
        <text x={460} y={170}>MEETING</text>
        <text x={460} y={300}>OPEN</text>
      </g>

      <g transform={`translate(${480 + Math.sin(t * 0.05) * 60} ${200 + Math.cos(t * 0.04) * 30})`}>
        <circle r={6} fill="none" stroke={C.gold} strokeWidth="1" opacity="0.6" />
        <circle r={2} fill={C.gold} />
        <text x={10} y={4} fontFamily="JetBrains Mono" fontSize="9" fill={C.gold}>AI</text>
      </g>
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   PRODUCTS — pricing-style 3D-tilt cards
   ────────────────────────────────────────────────────────────────────────── */

function ProductsSection() {
  return (
    <Spotlight id="products" className="relative px-6 py-32" color="rgba(212,175,55,0.16)">
      <div dir="rtl" className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.4em] text-white/45 mb-3">PRODUCTS · 04</div>
            <h2 className="font-bricolage text-[40px] sm:text-[60px] tracking-[-0.04em] leading-[1] max-w-[640px]">
              ארבעה מוצרים. <span style={{ color: C.gold }}>זרימת עבודה אחת.</span>
            </h2>
          </div>
          <div className="text-[11px] font-mono text-white/45 max-w-[280px]">
            // each product is a thin layer on top of the tools your team already uses
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: i * 0.08 }}
            >
              <Glass tilt goldEdge={i === 0} className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-white/40">{p.tag}</div>
                  <div className="font-bricolage text-[20px] tracking-[-0.04em]" style={{ color: i === 0 ? C.gold : "rgba(255,255,255,0.4)" }}>
                    {p.n}
                  </div>
                </div>

                <div className="font-bricolage text-[22px] tracking-[-0.03em] mt-5 leading-[1.1]">
                  {p.title}
                </div>
                <p className="text-white/65 text-[13px] leading-[1.55] mt-3 flex-1">
                  {p.body}
                </p>

                <div className="my-5 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)" }} />

                <div className="space-y-1.5">
                  {p.tools.map((t) => (
                    <div key={t} className="flex items-center gap-2 text-[11px] text-white/65">
                      <span className="w-1 h-1 rounded-full" style={{ background: i === 0 ? C.gold : "rgba(255,255,255,0.4)" }} />
                      {t}
                    </div>
                  ))}
                </div>

                <button className="mt-6 inline-flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-[12px] font-medium transition-all hover:bg-white/10"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="text-white/85">{i === 0 ? "מומלץ · התחל" : "למד עוד"}</span>
                  <span className="text-white/40">→</span>
                </button>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </Spotlight>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   TESTIMONIALS
   ────────────────────────────────────────────────────────────────────────── */

function TestimonialsSection() {
  return (
    <section className="relative px-6 py-32" id="customers">
      <div dir="rtl" className="max-w-[1280px] mx-auto">
        <div className="font-mono text-[11px] tracking-[0.4em] text-white/45 mb-3">VOICES · 03</div>
        <h2 className="font-bricolage text-[40px] sm:text-[60px] tracking-[-0.04em] leading-[1] mb-14 max-w-[840px]">
          הצוותים שכבר משתמשים — <span style={{ color: C.silver }}>בשפה שלהם.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: i * 0.1 }}
            >
              <Glass className="p-7 h-full flex flex-col">
                <div className="font-bricolage text-[28px] tracking-[-0.04em] leading-none" style={{ color: C.gold }}>"</div>
                <p className="text-white/85 text-[15px] leading-[1.6] mt-2 flex-1">{t.quote}</p>
                <div className="my-5 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                <div>
                  <div className="text-white/95 text-[14px] font-medium">{t.name}</div>
                  <div className="text-white/55 text-[12px] mt-0.5">{t.role}</div>
                  <div className="text-[10px] font-mono mt-2 tracking-wider" style={{ color: "rgba(212,175,55,0.7)" }}>
                    {t.project.toUpperCase()}
                  </div>
                </div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   TEAM
   ────────────────────────────────────────────────────────────────────────── */

function TeamSection() {
  return (
    <section id="team" className="relative px-6 py-32">
      <div dir="rtl" className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="font-mono text-[11px] tracking-[0.4em] text-white/45 mb-3">FOUNDING TEAM</div>
            <h2 className="font-bricolage text-[40px] sm:text-[56px] tracking-[-0.04em] leading-[1]">
              אנשים שבונים את הבנייה הבאה.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: i * 0.07 }}
            >
              <Glass className="p-6 h-full">
                <div className="aspect-square mb-4 rounded-xl overflow-hidden relative"
                     style={{ background: `linear-gradient(135deg, ${C.bg2}, ${C.navy})` }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="font-bricolage text-[60px] tracking-[-0.06em]"
                         style={{
                           background: `linear-gradient(135deg, ${C.gold}, ${C.silver})`,
                           WebkitBackgroundClip: "text",
                           backgroundClip: "text",
                           color: "transparent",
                         }}>
                      {m.name.split(" ").map((s) => s[0]).join("")}
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 text-[9px] font-mono text-white/45 tracking-wider">0{i + 1}</div>
                </div>
                <div className="text-[15px] text-white/95 font-medium">{m.name}</div>
                <div className="text-[12px] text-white/60 mt-0.5">{m.role}</div>
                <div className="text-[11px] font-mono mt-3 tracking-wider" style={{ color: "rgba(212,175,55,0.75)" }}>{m.bg.toUpperCase()}</div>
              </Glass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   SCENE 5 — AI / FINAL CTA
   ────────────────────────────────────────────────────────────────────────── */

function FinalCTA() {
  return (
    <Spotlight id="contact" className="relative px-6 py-40" color="rgba(212,175,55,0.22)">
      <div dir="rtl" className="max-w-[1080px] mx-auto text-center relative">
        <div className="font-mono text-[11px] tracking-[0.4em] text-white/45 mb-5">{scenes[4].eyebrow}</div>
        <h2 className="font-bricolage text-[44px] sm:text-[80px] tracking-[-0.045em] leading-[0.95]">
          ה-AI לומד <br />
          את הסטייל של{" "}
          <span style={{
            background: "linear-gradient(120deg, #e8c875 10%, #d4af37 50%, #c0c0c0 90%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}>
            המשרד שלך
          </span>.
        </h2>
        <p className="mt-7 max-w-[560px] mx-auto text-white/65 text-[15px] leading-[1.6]">
          {scenes[4].body}
        </p>
        <div className="mt-4 text-[12px] font-mono" style={{ color: "rgba(212,175,55,0.85)" }}>{scenes[4].audience}</div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <a
            href={scenes[4].cta?.href}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-medium text-[14px]"
            style={{
              background: "linear-gradient(135deg, #d4af37, #b78b1f)",
              color: "#0a0e1a",
              boxShadow: "0 18px 50px -10px rgba(212,175,55,0.6), inset 0 1px 0 rgba(255,255,255,0.4)",
            }}
          >
            <span>{scenes[4].cta?.primary}</span>
            <span>←</span>
          </a>
          <a
            href={scenes[4].cta?.href}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[14px]"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="text-white/85">{scenes[4].cta?.secondary}</span>
          </a>
        </div>
      </div>
    </Spotlight>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   FOOTER
   ────────────────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="relative px-6 pb-12 pt-24" dir="rtl">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-12 gap-8 pb-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center font-bricolage text-[11px] font-bold"
                style={{
                  background: "linear-gradient(135deg, #d4af37, #b78b1f)",
                  color: C.bg,
                }}
              >
                PA
              </div>
              <div className="font-bricolage text-[18px] tracking-[-0.02em]">{brand.name}</div>
            </div>
            <p className="mt-5 max-w-[360px] text-white/55 text-[13px] leading-[1.6]">
              {brand.tagline} · {brand.taglineEn}.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-4">CONTACT</div>
            <div className="space-y-1.5 text-[13px] text-white/70">
              <div>{brand.email}</div>
              <div>{brand.phone}</div>
              <div>{brand.address}</div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-4">PRODUCT</div>
            <div className="space-y-1.5 text-[13px] text-white/70">
              <div>Plugin</div>
              <div>API</div>
              <div>Plans Engine</div>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 mb-4">COMPANY</div>
            <div className="space-y-1.5 text-[13px] text-white/70">
              <div>About</div>
              <div>Careers</div>
              <div>Press</div>
            </div>
          </div>
        </div>
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-white/40">
          <div>© {brand.est}–2026 · {brand.name} · {brand.cityHe}</div>
          <div>SOC2 · GDPR · ISO 27001</div>
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   ROOT
   ────────────────────────────────────────────────────────────────────────── */

export default function Premium() {
  const mobile = useMobile();
  const progressRef = useRef<ProgRef>({ current: 0 });
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      progressRef.current.current = v;
    });
    return unsub;
  }, [scrollYProgress]);

  useEffect(() => {
    document.documentElement.style.background = C.bg;
    return () => {
      document.documentElement.style.background = "";
    };
  }, []);

  return (
    <div className="relative" style={{ background: C.bg, color: C.ink }}>
      <R3FStage progressRef={progressRef.current} mobile={mobile} />

      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(80% 60% at 50% 0%, rgba(74,144,226,0.10), transparent 60%), radial-gradient(70% 50% at 50% 100%, rgba(212,175,55,0.08), transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <Nav />
        <Hero />
        <GoldMarquee />
        <StatsBand />
        <ProjectScene />
        <PlansScene />
        <CADScene />
        <ProductsSection />
        <TestimonialsSection />
        <TeamSection />
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}
