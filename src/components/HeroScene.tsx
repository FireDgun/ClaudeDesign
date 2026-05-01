import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function Crystal() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.18;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.12;
  });
  return (
    <group ref={ref}>
      <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[1.7, 0]} />
          <meshPhysicalMaterial
            color="#7cf9ff"
            roughness={0.05}
            metalness={0.6}
            transmission={0.92}
            thickness={1.4}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={2}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[2.15, 1]} />
          <meshBasicMaterial color="#7cf9ff" wireframe transparent opacity={0.18} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[2.7, 0]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.05} />
        </mesh>
      </Float>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[3.2, 0.004, 8, 120]} />
        <meshBasicMaterial color="#7cf9ff" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[Math.PI / 1.6, Math.PI / 2, 0]}>
        <torusGeometry args={[2.9, 0.004, 8, 120]} />
        <meshBasicMaterial color="#ff6b6b" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "demand"}
    >
      <color attach="background" args={["#050507"]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[10, 10, 10]} intensity={1.6} color="#7cf9ff" />
      <pointLight position={[-10, -10, -5]} intensity={1.1} color="#ff6b6b" />
      <Crystal />
      <Environment preset="night" />
    </Canvas>
  );
}
