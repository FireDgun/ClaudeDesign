import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshDistortMaterial,
  MeshWobbleMaterial,
  MeshTransmissionMaterial,
  Float,
  Points,
  PointMaterial,
  Environment,
} from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { motion, useScroll, useTransform, useMotionValue, useSpring, MotionValue } from "framer-motion";
import * as THREE from "three";
import { inSphere } from "maath/random";
import { brand, scenes, stats, products, partners, testimonials, team } from "../data";

/* =========================================================================
   ORGANIC 3D VOLUMETRIC — Variant 5
   Eggplant + hot orange + magenta + royal purple + rare neon yellow
   ========================================================================= */

const PALETTE = {
  bg: "#1a0820",
  orange: "#ff6b35",
  magenta: "#c2185b",
  purple: "#6a1b9a",
  yellow: "#fff200",
  cream: "#f3e9d2",
};

/* ---------- mobile detection ---------- */
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const c = () => setM(window.innerWidth < 768);
    c();
    window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);
  return m;
}

/* ---------- focal morphing blob ---------- */
function FocalBlob({ scrollT, mobile }: { scrollT: { current: number }; mobile: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);
  const matRef = useRef<any>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scrollT.current;
    if (ref.current) {
      ref.current.rotation.x = t * 0.12 + s * Math.PI * 2;
      ref.current.rotation.y = t * 0.18;
      const scale = 1.45 + Math.sin(t * 0.8) * 0.05 + s * 0.4 * Math.sin(s * Math.PI * 4);
      ref.current.scale.setScalar(scale);
      ref.current.position.y = Math.sin(t * 0.6) * 0.15 - s * 1.2;
      ref.current.position.x = Math.sin(s * Math.PI * 2) * 0.4;
    }
    if (matRef.current) {
      const meltZone = Math.exp(-Math.pow((s - 0.5) * 3, 2));
      matRef.current.distort = 0.35 + meltZone * 0.5 + Math.sin(t * 0.4) * 0.05;
      matRef.current.speed = 1.4 + meltZone * 2.2;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.4, mobile ? 24 : 64]} />
        <MeshDistortMaterial
          ref={matRef}
          color={PALETTE.magenta}
          emissive={PALETTE.orange}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.4}
          distort={0.45}
          speed={1.6}
        />
      </mesh>
    </Float>
  );
}

/* ---------- inner glowing core --------- */
function InnerCore() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y = s.clock.elapsedTime * 0.4;
      ref.current.rotation.x = s.clock.elapsedTime * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <icosahedronGeometry args={[0.55, 4]} />
      <meshBasicMaterial color={PALETTE.yellow} toneMapped={false} />
    </mesh>
  );
}

/* ---------- orbital wobble satellites = the "city" ---------- */
function CityOrbs({ scrollT, mobile }: { scrollT: { current: number }; mobile: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const orbs = useMemo(() => {
    const arr: { p: [number, number, number]; s: number; c: string; sp: number }[] = [];
    const colors = [PALETTE.orange, PALETTE.magenta, PALETTE.purple, PALETTE.yellow];
    const count = mobile ? 7 : 14;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = 3.4 + (i % 3) * 0.4;
      arr.push({
        p: [Math.cos(a) * r, (Math.random() - 0.5) * 0.6, Math.sin(a) * r],
        s: 0.16 + Math.random() * 0.32,
        c: colors[i % colors.length],
        sp: 0.4 + Math.random() * 1.4,
      });
    }
    return arr;
  }, [mobile]);
  useFrame((state) => {
    if (group.current) {
      const t = state.clock.elapsedTime;
      const s = scrollT.current;
      group.current.rotation.y = t * 0.05 + s * 0.6;
      const collapse = Math.max(0, 1 - s * 2.5);
      group.current.scale.setScalar(0.5 + collapse * 0.8);
    }
  });
  return (
    <group ref={group}>
      {orbs.map((o, i) => (
        <Float key={i} speed={o.sp} rotationIntensity={1} floatIntensity={1.4}>
          <mesh position={o.p}>
            <icosahedronGeometry args={[o.s, 3]} />
            <MeshWobbleMaterial
              color={o.c}
              emissive={o.c}
              emissiveIntensity={0.9}
              factor={0.6}
              speed={2}
              roughness={0.3}
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ---------- transmission glass blob ---------- */
function GlassBlob({ scrollT }: { scrollT: { current: number } }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const sc = scrollT.current;
    if (ref.current) {
      ref.current.position.x = 2.4 + Math.sin(t * 0.5) * 0.3;
      ref.current.position.y = -1.2 + Math.cos(t * 0.3) * 0.4 + sc * 1.5;
      ref.current.position.z = -0.4;
      ref.current.rotation.y = t * 0.3;
    }
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.5, 0.18, 96, 24, 2, 3]} />
      <MeshTransmissionMaterial
        thickness={0.6}
        roughness={0.05}
        transmission={1}
        ior={1.4}
        chromaticAberration={0.3}
        backside
        color={PALETTE.cream}
      />
    </mesh>
  );
}

/* ---------- fluid particle cloud ---------- */
function FluidParticles({ scrollT, mobile }: { scrollT: { current: number }; mobile: boolean }) {
  const ref = useRef<THREE.Points>(null!);
  const count = mobile ? 600 : 1500;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    inSphere(arr, { radius: 3.6 });
    return arr;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scrollT.current;
    if (ref.current) {
      ref.current.rotation.y = t * 0.04 + s * 0.8;
      ref.current.rotation.x = t * 0.02;
      const conv = 0.55 + s * 0.55;
      ref.current.scale.setScalar(conv);
    }
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={PALETTE.orange}
        size={0.024}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </Points>
  );
}

/* ---------- volumetric magenta cone (faked god-ray) ---------- */
function VolumetricLight() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.z = s.clock.elapsedTime * 0.06;
    }
  });
  return (
    <mesh ref={ref} position={[-3, 1.5, -3]} rotation={[0, 0, 0.4]}>
      <coneGeometry args={[2.4, 7, 32, 1, true]} />
      <meshBasicMaterial
        color={PALETTE.magenta}
        transparent
        opacity={0.06}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ---------- the full scene ---------- */
function Scene({ scrollT, mobile }: { scrollT: { current: number }; mobile: boolean }) {
  return (
    <>
      <color attach="background" args={[PALETTE.bg]} />
      <fog attach="fog" args={[PALETTE.bg, 6, 16]} />
      <ambientLight intensity={0.35} color={PALETTE.purple} />
      <pointLight position={[4, 4, 4]} intensity={2.2} color={PALETTE.orange} />
      <pointLight position={[-4, -2, 3]} intensity={2} color={PALETTE.magenta} />
      <pointLight position={[0, 5, -3]} intensity={1.4} color={PALETTE.purple} />
      <directionalLight position={[5, 8, 5]} intensity={0.5} color={PALETTE.yellow} />

      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <FocalBlob scrollT={scrollT} mobile={mobile} />
        <InnerCore />
        <CityOrbs scrollT={scrollT} mobile={mobile} />
        <GlassBlob scrollT={scrollT} />
        <FluidParticles scrollT={scrollT} mobile={mobile} />
        <VolumetricLight />
      </Suspense>

      {!mobile && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={1.1} luminanceThreshold={0.18} luminanceSmoothing={0.9} mipmapBlur />
          <ChromaticAberration
            offset={new THREE.Vector2(0.0022, 0.0022)}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={false}
            modulationOffset={0}
          />
          <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
          <Vignette eskil={false} offset={0.18} darkness={0.85} />
        </EffectComposer>
      )}
    </>
  );
}

/* ---------- gradient mesh CSS blobs ---------- */
function GradientMeshes() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      <motion.div
        className="absolute -top-[20%] -left-[15%] w-[70vw] h-[70vw] rounded-full blur-[140px] opacity-50"
        style={{ background: `radial-gradient(circle, ${PALETTE.magenta} 0%, transparent 65%)` }}
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-40"
        style={{ background: `radial-gradient(circle, ${PALETTE.orange} 0%, transparent 60%)` }}
        animate={{ x: [0, -90, 30, 0], y: [0, 50, -40, 0], scale: [1, 0.9, 1.2, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full blur-[160px] opacity-35"
        style={{ background: `radial-gradient(circle, ${PALETTE.purple} 0%, transparent 70%)` }}
        animate={{ x: [0, 60, -80, 0], y: [0, -40, 30, 0], scale: [1, 1.2, 0.85, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ---------- noise grain overlay ---------- */
function GrainOverlay() {
  const svg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0"/></filter><rect width="100%25" height="100%25" filter="url(%23n)" opacity="0.5"/></svg>`;
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay opacity-[0.18]"
      style={{ backgroundImage: `url("${svg}")`, backgroundSize: "240px 240px" }}
    />
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-end px-6 md:px-12 pb-20 pt-32">
      <div className="flex items-start justify-between text-[10px] md:text-xs font-major uppercase tracking-[0.25em] text-white/55 mix-blend-screen">
        <span dir="ltr">{scenes[0].eyebrow}</span>
        <span dir="ltr">{brand.est} · {brand.cityHe}</span>
      </div>

      <div className="mt-10 md:mt-16">
        <div className="text-[10px] md:text-xs font-major uppercase tracking-[0.3em] text-[#fff200]/70 mb-5" dir="ltr">
          {brand.taglineEn}
        </div>

        <h1
          dir="rtl"
          className="font-heebo font-black text-[14vw] md:text-[10vw] leading-[0.86] tracking-[-0.04em] mix-blend-screen"
          style={{ textShadow: "0 0 60px rgba(255,107,53,0.25)" }}
        >
          תשתית ה-AI
          <br />
          <span className="italic font-serif font-black text-[#ff6b35]">של הבנייה</span>
        </h1>

        <div className="mt-10 grid md:grid-cols-12 gap-8 items-end">
          <p
            dir="rtl"
            className="md:col-span-6 font-dm text-base md:text-lg leading-relaxed text-white/75 max-w-xl"
          >
            {scenes[0].body}
          </p>
          <div className="md:col-span-3 md:col-start-10">
            <div className="text-[10px] font-major uppercase tracking-[0.25em] text-white/45 mb-2" dir="ltr">
              audience
            </div>
            <p className="font-dm text-sm text-white/85" dir="rtl">
              {scenes[0].audience}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 text-[9px] font-major uppercase tracking-[0.2em] text-white/40" dir="ltr">
        N 32.0853° · E 34.7818°
      </div>
      <div className="absolute bottom-6 left-6 text-[9px] font-major uppercase tracking-[0.2em] text-white/40" dir="ltr">
        SCENE_01 · CITY VIEW · LIVE
      </div>
      <div className="absolute bottom-6 right-6 text-[9px] font-major uppercase tracking-[0.2em] text-[#fff200]/70" dir="ltr">
        SCROLL ↓
      </div>
    </section>
  );
}

/* ---------- big italic display section ---------- */
function SceneBlock({ s, idx }: { s: typeof scenes[number]; idx: number }) {
  const reverse = idx % 2 === 1;
  const words = s.title.split(" ");
  const head = words.slice(0, Math.max(1, words.length - 2)).join(" ");
  const tail = words.slice(Math.max(1, words.length - 2)).join(" ");
  return (
    <section className="relative min-h-[100vh] px-6 md:px-12 py-32 flex items-center">
      <div className="grid md:grid-cols-12 gap-10 w-full">
        <div className={`md:col-span-7 ${reverse ? "md:order-2 md:col-start-6" : ""}`}>
          <div className="text-[10px] font-major uppercase tracking-[0.3em] text-[#ff6b35] mb-6" dir="ltr">
            {s.eyebrow}
          </div>
          <h2
            dir="rtl"
            className="font-heebo font-black text-[10vw] md:text-[7vw] leading-[0.88] tracking-[-0.035em] mix-blend-screen"
          >
            {head}{" "}
            <span className="italic font-serif text-[#c2185b]">{tail}</span>
          </h2>
        </div>
        <div className={`md:col-span-4 ${reverse ? "md:order-1" : "md:col-start-9"}`}>
          <p dir="rtl" className="font-dm text-base md:text-lg text-white/75 leading-relaxed">
            {s.body}
          </p>
          <div className="mt-8 pt-6 border-t border-white/15">
            <div className="text-[10px] font-major uppercase tracking-[0.25em] text-white/45 mb-2" dir="ltr">
              · {s.n} ·
            </div>
            <p className="font-dm text-sm text-white/85" dir="rtl">
              {s.audience}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- text-mask interlude ---------- */
function TextMaskSection() {
  return (
    <section className="relative py-32 px-6 md:px-12">
      <div className="text-[10px] font-major uppercase tracking-[0.3em] text-[#fff200]/70 mb-6" dir="ltr">
        — interlude · liquid type
      </div>
      <div
        className="relative font-serif italic font-black leading-[0.85] tracking-[-0.045em]"
        style={{
          fontSize: "clamp(70px, 22vw, 360px)",
          background: `linear-gradient(135deg, ${PALETTE.orange} 0%, ${PALETTE.magenta} 40%, ${PALETTE.purple} 75%, ${PALETTE.yellow} 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          mixBlendMode: "screen",
        }}
      >
        liquid<br />
        <span className="not-italic font-heebo font-black" dir="rtl">בנייה</span>
      </div>
      <div className="mt-8 max-w-md mr-auto">
        <p className="font-dm text-sm text-white/65 leading-relaxed" dir="rtl">
          הקווים מצטיירים מעצמם. הצורות נוצרות מתוך תיאור. החומר זורם.
        </p>
      </div>
    </section>
  );
}

/* ---------- stats ---------- */
function StatsBlock() {
  return (
    <section className="relative px-6 md:px-12 py-28">
      <div className="flex items-center justify-between mb-12">
        <div className="text-[10px] font-major uppercase tracking-[0.3em] text-white/55" dir="ltr">
          ◐ vital signs · ‘24-‘26
        </div>
        <div className="text-[10px] font-major uppercase tracking-[0.3em] text-[#ff6b35]" dir="ltr">
          live
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-6 md:gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative p-7 rounded-[28px] border border-white/10 backdrop-blur-md"
            style={{
              background: `radial-gradient(circle at 30% 20%, ${PALETTE.purple}25, transparent 60%), rgba(255,255,255,0.02)`,
            }}
          >
            <div className="font-serif italic font-black text-6xl md:text-7xl leading-none">
              <span className="text-white">{s.value}</span>
              <span className="text-[#ff6b35]">{s.suffix}</span>
            </div>
            <div className="mt-4 font-dm text-sm text-white/85" dir="rtl">{s.label}</div>
            <div className="mt-1 font-dm text-xs text-white/45" dir="rtl">{s.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- products ---------- */
function ProductsBlock() {
  return (
    <section className="relative px-6 md:px-12 py-28">
      <div className="grid md:grid-cols-12 gap-10 mb-16">
        <div className="md:col-span-5">
          <div className="text-[10px] font-major uppercase tracking-[0.3em] text-[#fff200]/70 mb-4" dir="ltr">
            — products / 2026
          </div>
          <h3
            dir="rtl"
            className="font-heebo font-black text-5xl md:text-7xl leading-[0.9] tracking-[-0.03em]"
          >
            ארבעה <span className="italic font-serif text-[#ff6b35]">מנועים</span> חיים.
          </h3>
        </div>
        <div className="md:col-span-5 md:col-start-8 self-end">
          <p className="font-dm text-base text-white/75 leading-relaxed" dir="rtl">
            כל מוצר הוא יצור מחושב — מקבל קלט, נושם, ומחזיר תוצרת בתבנית שאתם צריכים.
            הם מחוברים זה לזה, אבל פועלים בנפרד.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {products.map((p, i) => (
          <motion.article
            key={p.n}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: (i % 2) * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.4 } }}
            className="group relative overflow-hidden rounded-[36px] border border-white/12 p-8 md:p-10"
            style={{
              background: `linear-gradient(135deg, rgba(106,27,154,0.18) 0%, rgba(194,24,91,0.12) 100%)`,
              backdropFilter: "blur(8px)",
            }}
          >
            <div
              className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700"
              style={{
                background: `radial-gradient(circle, ${
                  i % 2 ? PALETTE.orange : PALETTE.magenta
                }, transparent 70%)`,
              }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div className="font-major text-xs uppercase tracking-[0.25em] text-[#fff200]/80" dir="ltr">
                  {p.tag}
                </div>
                <div className="font-major text-xs text-white/40" dir="ltr">
                  {p.n} / 04
                </div>
              </div>
              <h4 className="font-serif italic font-black text-3xl md:text-5xl leading-[1] tracking-tight mb-6" dir="ltr">
                {p.title}
              </h4>
              <p className="font-dm text-sm md:text-base text-white/75 leading-relaxed mb-8" dir="rtl">
                {p.body}
              </p>
              <div className="flex flex-wrap gap-2">
                {p.tools.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full text-[10px] font-major uppercase tracking-[0.18em] border border-white/15 text-white/75"
                    dir="ltr"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ---------- partners marquee ---------- */
function PartnersMarquee() {
  const items = [...partners, ...partners, ...partners];
  return (
    <section className="relative py-20 border-y border-white/10">
      <div className="text-[10px] font-major uppercase tracking-[0.3em] text-white/45 px-6 md:px-12 mb-6" dir="ltr">
        ✦ trusted by · 14 partners · israel
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {items.map((p, i) => (
            <span
              key={i}
              className="font-serif italic font-black text-4xl md:text-6xl text-white/45 hover:text-white transition-colors duration-500"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials ---------- */
function Testimonials() {
  return (
    <section className="relative px-6 md:px-12 py-28">
      <div className="text-[10px] font-major uppercase tracking-[0.3em] text-[#fff200]/70 mb-12" dir="ltr">
        — voices from the field
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative p-8 rounded-[32px] border border-white/12"
            style={{
              background: `linear-gradient(160deg, rgba(255,107,53,0.08) 0%, rgba(106,27,154,0.12) 100%)`,
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="font-serif italic text-7xl text-[#ff6b35] leading-none mb-3">“</div>
            <p className="font-dm text-base leading-relaxed text-white/85 mb-8" dir="rtl">
              {t.quote}
            </p>
            <div className="pt-5 border-t border-white/15">
              <div className="font-dm font-medium text-white" dir="rtl">{t.name}</div>
              <div className="font-major text-[10px] uppercase tracking-[0.18em] text-white/55 mt-1" dir="ltr">
                {t.role}
              </div>
              <div className="font-dm text-xs text-[#c2185b] mt-2" dir="rtl">{t.project}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- team ---------- */
function TeamBlock() {
  return (
    <section className="relative px-6 md:px-12 py-28">
      <div className="grid md:grid-cols-12 gap-10 mb-16">
        <div className="md:col-span-6">
          <div className="text-[10px] font-major uppercase tracking-[0.3em] text-white/55 mb-4" dir="ltr">
            — founders & crew
          </div>
          <h3
            dir="rtl"
            className="font-heebo font-black text-5xl md:text-7xl leading-[0.9] tracking-[-0.03em]"
          >
            הצוות. <span className="italic font-serif text-[#fff200]">קטן.</span> טוב.
          </h3>
        </div>
      </div>
      <div className="grid md:grid-cols-4 gap-4 md:gap-3">
        {team.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="relative aspect-[3/4] rounded-[28px] overflow-hidden border border-white/10 p-6 flex flex-col justify-between"
            style={{
              background: `radial-gradient(circle at 50% 30%, ${
                [PALETTE.orange, PALETTE.magenta, PALETTE.purple, PALETTE.yellow][i % 4]
              }45 0%, ${PALETTE.bg} 75%)`,
            }}
          >
            <div className="font-major text-xs text-white/55" dir="ltr">
              {String(i + 1).padStart(2, "0")} / 04
            </div>
            <div>
              <h4 className="font-heebo font-black text-2xl md:text-3xl tracking-tight" dir="rtl">
                {m.name}
              </h4>
              <div className="font-major text-[10px] uppercase tracking-[0.18em] text-white/70 mt-2" dir="ltr">
                {m.role}
              </div>
              <div className="font-dm text-xs text-white/60 mt-1" dir="ltr">{m.bg}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- closing scene ---------- */
function ClosingScene() {
  const s = scenes[4];
  return (
    <section className="relative min-h-[100vh] px-6 md:px-12 py-32 flex flex-col justify-center">
      <div className="text-[10px] font-major uppercase tracking-[0.3em] text-[#fff200]/80 mb-8" dir="ltr">
        {s.eyebrow}
      </div>
      <h2
        dir="rtl"
        className="font-heebo font-black text-[12vw] md:text-[8.5vw] leading-[0.84] tracking-[-0.04em] mix-blend-screen"
      >
        ה-AI <span className="italic font-serif text-[#ff6b35]">לומד</span> את
        <br />
        הסטייל <span className="italic font-serif text-[#c2185b]">שלך.</span>
      </h2>
      <div className="grid md:grid-cols-12 gap-10 mt-14">
        <p className="md:col-span-5 font-dm text-base md:text-lg text-white/75 leading-relaxed" dir="rtl">
          {s.body}
        </p>
        <div className="md:col-span-4 md:col-start-8">
          <div className="text-[10px] font-major uppercase tracking-[0.25em] text-white/45 mb-4" dir="ltr">
            status · beta
          </div>
          <div className="font-serif italic text-3xl text-white/85" dir="ltr">
            {s.audience}
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col md:flex-row gap-4">
        <a
          href={s.cta?.href || "#"}
          className="group relative px-9 py-5 rounded-full overflow-hidden font-dm text-base font-medium text-white border border-transparent"
          style={{
            background: `linear-gradient(135deg, ${PALETTE.orange} 0%, ${PALETTE.magenta} 100%)`,
          }}
        >
          <span className="relative z-10" dir="rtl">{s.cta?.primary}</span>
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: `linear-gradient(135deg, ${PALETTE.purple} 0%, ${PALETTE.orange} 100%)` }}
          />
        </a>
        <a
          href={s.cta?.href || "#"}
          className="px-9 py-5 rounded-full font-dm text-base text-white/90 border border-white/25 hover:bg-white/10 transition-colors duration-500"
          dir="rtl"
        >
          {s.cta?.secondary} ↗
        </a>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer className="relative px-6 md:px-12 pt-24 pb-12 border-t border-white/10">
      <div className="grid md:grid-cols-12 gap-10 mb-20">
        <div className="md:col-span-5">
          <div
            className="font-serif italic font-black text-7xl md:text-9xl leading-[0.85]"
            style={{
              background: `linear-gradient(135deg, ${PALETTE.orange}, ${PALETTE.magenta}, ${PALETTE.purple})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
            dir="ltr"
          >
            Pro.
            <br />
            Algo.
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="font-major text-[10px] uppercase tracking-[0.25em] text-white/45 mb-4" dir="ltr">
            contact
          </div>
          <div className="font-dm text-sm text-white/85 space-y-1" dir="ltr">
            <div>{brand.email}</div>
            <div>{brand.phone}</div>
            <div dir="rtl">{brand.address}</div>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="font-major text-[10px] uppercase tracking-[0.25em] text-white/45 mb-4" dir="ltr">
            navigate
          </div>
          <div className="font-dm text-sm text-white/85 space-y-1.5">
            <div dir="rtl">פלטפורמה</div>
            <div dir="rtl">פרויקטים</div>
            <div dir="rtl">קריירה</div>
            <div dir="ltr">Press kit</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between text-[10px] font-major uppercase tracking-[0.25em] text-white/45 pt-6 border-t border-white/10">
        <span dir="ltr">© {new Date().getFullYear()} {brand.name} · all rights reserved</span>
        <span dir="ltr">· organic build · v5 / 5 ·</span>
      </div>
    </footer>
  );
}

/* ---------- nav ---------- */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between mix-blend-difference">
      <div className="font-serif italic font-black text-2xl text-white" dir="ltr">
        Pro<span className="text-[#ff6b35]">.</span>Algo
      </div>
      <div className="hidden md:flex gap-8 font-major text-[11px] uppercase tracking-[0.2em] text-white/85">
        <a href="#">platform</a>
        <a href="#">products</a>
        <a href="#">studio</a>
        <a href="#">contact</a>
      </div>
      <div className="font-major text-[10px] uppercase tracking-[0.2em] text-white/85" dir="ltr">
        He / En
      </div>
    </nav>
  );
}

/* ---------- camera tilt wrapper ---------- */
function CameraTilted({
  camX,
  camY,
  children,
}: {
  camX: MotionValue<number>;
  camY: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="w-full h-full"
      style={{ rotateY: camX, rotateX: camY, transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================================
   ROOT
   ========================================================================= */
export default function Organic() {
  const mobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const scrollT = useRef(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      scrollT.current = v;
    });
    return () => unsub();
  }, [scrollYProgress]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smX = useSpring(mx, { stiffness: 80, damping: 20 });
  const smY = useSpring(my, { stiffness: 80, damping: 20 });
  const camX = useTransform(smX, [-1, 1], [-0.6, 0.6]);
  const camY = useTransform(smY, [-1, 1], [0.4, -0.4]);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  useEffect(() => {
    document.documentElement.setAttribute("data-variant", "organic");
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#1a0820] text-white"
      style={{ fontFamily: "'DM Sans', Heebo, sans-serif" }}
    >
      <GradientMeshes />

      <div className="fixed inset-0 z-0">
        <CameraTilted camX={camX} camY={camY}>
          <Canvas
            dpr={[1, mobile ? 1.4 : 1.8]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 5], fov: 45 }}
          >
            <Scene scrollT={scrollT} mobile={mobile} />
          </Canvas>
        </CameraTilted>
      </div>

      <Nav />
      <GrainOverlay />

      <main className="relative z-10">
        <Hero />
        <SceneBlock s={scenes[1]} idx={1} />
        <TextMaskSection />
        <SceneBlock s={scenes[2]} idx={2} />
        <StatsBlock />
        <ProductsBlock />
        <SceneBlock s={scenes[3]} idx={3} />
        <PartnersMarquee />
        <Testimonials />
        <TeamBlock />
        <ClosingScene />
        <Footer />
      </main>
    </div>
  );
}
