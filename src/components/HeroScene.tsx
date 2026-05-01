import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

const RINGS = 24;
const PARTICLES = 600;

function RingTower({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null!);
  const rings = useRef<THREE.Mesh[]>([]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Smoothly track mouse for camera-like rotation
    group.current.rotation.y += (pointer.current.x * 0.6 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (pointer.current.y * 0.3 - group.current.rotation.x) * 0.05;
    rings.current.forEach((m, i) => {
      if (!m) return;
      m.rotation.y = t * (i % 2 ? -0.25 : 0.25) + i * 0.4;
      m.position.y = (i - RINGS / 2) * 0.32 + Math.sin(t + i * 0.5) * 0.05;
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: RINGS }).map((_, i) => {
        const radius = 1.4 + Math.sin(i * 0.3) * 0.3;
        return (
          <mesh
            key={i}
            ref={(m) => {
              if (m) rings.current[i] = m;
            }}
          >
            <torusGeometry args={[radius, 0.02 + Math.sin(i) * 0.01, 16, 80]} />
            <meshStandardMaterial
              color={i % 6 === 0 ? "#7cf9ff" : "#ffffff"}
              emissive={i % 6 === 0 ? "#7cf9ff" : "#3b82f6"}
              emissiveIntensity={i % 6 === 0 ? 1.2 : 0.4}
              metalness={0.95}
              roughness={0.1}
            />
          </mesh>
        );
      })}
      {/* Inner glass core */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[0.85, 1]} />
        <MeshTransmissionMaterial
          backside
          thickness={1.2}
          chromaticAberration={0.6}
          ior={1.6}
          roughness={0.05}
          color="#ffffff"
          background={new THREE.Color("#0a0a18")}
          distortion={0.3}
          distortionScale={0.5}
        />
      </mesh>
      {/* Halo rings */}
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[3.2, 0.005, 8, 120]} />
        <meshBasicMaterial color="#7cf9ff" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 1.6, Math.PI / 2, 0]}>
        <torusGeometry args={[2.9, 0.005, 8, 120]} />
        <meshBasicMaterial color="#ff6b6b" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLES * 3);
    for (let i = 0; i < PARTICLES; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() - 0.5) * 2);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLES} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#7cf9ff" size={0.025} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function CameraRig({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.current.x * 0.6 - camera.position.x) * 0.04;
    camera.position.y += (-pointer.current.y * 0.5 + 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene({ active }: { active: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });

  return (
    <div
      className="absolute inset-0"
      onPointerMove={(e) => {
        const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        pointer.current.x = (e.clientX - r.left) / r.width - 0.5;
        pointer.current.y = (e.clientY - r.top) / r.height - 0.5;
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.5, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={active ? "always" : "demand"}
      >
        <color attach="background" args={["#050507"]} />
        <fog attach="fog" args={["#050507", 6, 18]} />
        <ambientLight intensity={0.35} />
        <pointLight position={[10, 10, 10]} intensity={2.4} color="#7cf9ff" />
        <pointLight position={[-10, -10, -5]} intensity={1.6} color="#ff6b6b" />
        <pointLight position={[0, 4, 4]} intensity={0.8} color="#ffffff" />
        <CameraRig pointer={pointer} />
        <RingTower pointer={pointer} />
        <Particles />
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  );
}
