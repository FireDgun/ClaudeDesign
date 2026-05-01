import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMagnetic } from "../hooks/useMagnetic";

function Wireframe() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  });

  return (
    <group ref={ref}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh>
          <icosahedronGeometry args={[1.6, 1]} />
          <MeshDistortMaterial
            color="#7cf9ff"
            distort={0.45}
            speed={1.6}
            roughness={0.1}
            metalness={0.9}
            emissive="#3b82f6"
            emissiveIntensity={0.3}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[2.1, 1]} />
          <meshBasicMaterial color="#7cf9ff" wireframe transparent opacity={0.18} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[2.6, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.06} />
        </mesh>
      </Float>

      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[3.4, 0.005, 8, 100]} />
        <meshBasicMaterial color="#7cf9ff" transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.0, 0.005, 8, 100]} />
        <meshBasicMaterial color="#ff6b6b" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#050507"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.4} color="#7cf9ff" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#ff6b6b" />
      <Stars radius={50} depth={30} count={2000} factor={3} fade speed={0.5} />
      <Wireframe />
      <Environment preset="night" />
    </>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.4);

  const heroDelay = 2.5;

  const word = (i: number) => ({
    initial: { y: "110%", opacity: 0 },
    animate: { y: "0%", opacity: 1 },
    transition: {
      duration: 0.9,
      ease: [0.65, 0.05, 0.36, 1] as [number, number, number, number],
      delay: heroDelay + i * 0.08,
    },
  });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen overflow-hidden grid-bg"
    >
      <div className="absolute inset-0 gradient-mesh" />

      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 7], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 pt-40 md:pt-56 pb-24"
      >
        <div className="flex items-center gap-3 mb-8 num-display text-xs uppercase tracking-[0.3em] text-white/50">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: heroDelay - 0.2, duration: 0.6 }}
            className="block w-12 h-px bg-accent"
          />
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: heroDelay - 0.1, duration: 0.6 }}
          >
            EST. 2024 — ARCHITECTURE × AI × IoT
          </motion.span>
        </div>

        <h1 className="h-display text-[14vw] md:text-[9.5vw] lg:text-[8vw] font-black mb-10 tracking-tight">
          <span className="block overflow-hidden">
            <motion.span {...word(0)} className="block">
              בונים את
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span {...word(1)} className="block">
              <span className="text-stroke">העתיד</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span {...word(2)} className="block bg-gradient-to-r from-accent via-white to-accent-warm bg-clip-text text-transparent">
              קומה אחר קומה
            </motion.span>
          </span>
        </h1>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: heroDelay + 0.6, duration: 0.8 }}
            className="md:col-span-2 text-lg md:text-xl text-white/70 leading-relaxed"
          >
            סטודיו אדריכלות שמשלב AI, סריקות תלת-ממד ו-IoT לבנייה חכמה.
            כל פרויקט נולד דיגיטלית — מוצג, מחושב, מאושר — לפני שאבן אחת מונחת באתר.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: heroDelay + 0.7, duration: 0.8 }}
            className="flex flex-col gap-4 items-start"
          >
            <a
              ref={ctaRef}
              href="#cta"
              data-cursor="התחל"
              className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white text-ink-900 font-bold text-base relative overflow-hidden hover:bg-accent transition-colors"
            >
              <span className="relative z-10">בואו נתכנן יחד</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="relative z-10 group-hover:translate-x-[-4px] transition-transform">
                <path d="M19 12L5 12M5 12L12 5M5 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#showcase" className="num-display text-xs uppercase tracking-widest text-white/60 hover:text-accent transition pr-1">
              ↓ צפו בעבודות
            </a>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 inset-x-0 z-10 flex justify-between items-end mx-auto max-w-7xl px-5 md:px-8 num-display text-[10px] uppercase tracking-widest text-white/40">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: heroDelay + 1.4 }}
          className="flex items-center gap-2"
        >
          <span className="block w-2 h-2 bg-accent rounded-full animate-pulse" />
          LIVE · TEL AVIV
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: heroDelay + 1.4 }}
          className="hidden md:block"
        >
          SCROLL ↓ TO EXPLORE
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: heroDelay + 1.4 }}
        >
          [01 / 08]
        </motion.div>
      </div>
    </section>
  );
}
