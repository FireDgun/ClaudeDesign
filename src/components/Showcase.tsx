import { useRef, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

const projects = [
  {
    title: "Helix Tower",
    location: "תל אביב",
    year: "2026",
    type: "מגדל מגורים",
    floors: 47,
    color: "#7cf9ff",
  },
  {
    title: "Sky Gardens",
    location: "הרצליה",
    year: "2025",
    type: "מתחם משרדים",
    floors: 22,
    color: "#ff6b6b",
  },
  {
    title: "Nexus Hub",
    location: "ירושלים",
    year: "2026",
    type: "מרכז טכנולוגי",
    floors: 14,
    color: "#a78bfa",
  },
  {
    title: "Coral Block",
    location: "אילת",
    year: "2027",
    type: "מלון בוטיק",
    floors: 9,
    color: "#fbbf24",
  },
];

function Building({ color }: { color: string }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.4;
  });
  return (
    <group ref={ref}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.5 - 1.7, 0]}>
            <boxGeometry args={[1.6 - i * 0.06, 0.4, 1.6 - i * 0.06]} />
            <meshPhysicalMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.2}
              metalness={0.7}
              roughness={0.2}
              transmission={0.2}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`w-${i}`} position={[0, i * 0.5 - 1.7, 0]}>
            <boxGeometry args={[1.61 - i * 0.06, 0.41, 1.61 - i * 0.06]} />
            <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.4} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function Showcase() {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="showcase" ref={ref} className="relative py-32 md:py-44 overflow-hidden bg-ink-800/30">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <div className="num-display text-xs uppercase tracking-[0.3em] text-accent mb-6">
              [ 03 ] הפרויקטים
            </div>
            <h2 className="h-display text-5xl md:text-6xl lg:text-7xl">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.65, 0.05, 0.36, 1] }}
                  className="block"
                >
                  עבודה מהאקדמיה
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.65, 0.05, 0.36, 1] }}
                  className="block text-stroke"
                >
                  לאופק האמיתי.
                </motion.span>
              </span>
            </h2>
          </div>
          <motion.a
            href="#cta"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="num-display text-xs uppercase tracking-widest text-white/50 hover:text-accent transition pb-2"
          >
            כל הפרויקטים →
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: [0.65, 0.05, 0.36, 1] }}
      className="group relative"
      data-cursor="פרויקט"
    >
      <motion.div
        style={{ y }}
        className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-ink-700 to-ink-900"
      >
        <Canvas
          camera={{ position: [3, 1.5, 4], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.4} color={project.color} />
            <pointLight position={[-5, -5, 5]} intensity={0.8} color="#ffffff" />
            <Building color={project.color} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>

        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent pointer-events-none" />

        <div className="absolute top-6 right-6 left-6 flex justify-between items-start">
          <div className="num-display text-[10px] text-white/50 uppercase tracking-widest">
            [ 0{index + 1} ]
          </div>
          <div className="num-display text-[10px] text-white/50 uppercase tracking-widest">
            {project.year}
          </div>
        </div>

        <div className="absolute bottom-6 right-6 left-6">
          <div className="num-display text-[10px] uppercase tracking-widest mb-2" style={{ color: project.color }}>
            {project.type} · {project.floors} קומות
          </div>
          <h3 className="h-display text-3xl md:text-4xl mb-1">{project.title}</h3>
          <div className="text-white/60 text-sm">{project.location}</div>
        </div>

        <div className="absolute inset-0 ring-1 ring-inset ring-white/0 group-hover:ring-white/30 transition-all duration-700 rounded-3xl pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}
