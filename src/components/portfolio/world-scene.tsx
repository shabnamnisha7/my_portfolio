"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function Orb({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) {
      return;
    }

    mesh.current.rotation.x = state.clock.elapsedTime * 0.08;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 16]} />
        <MeshDistortMaterial color={color} roughness={0.1} metalness={0.15} distort={0.3} speed={2.4} />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const points = useMemo(() => {
    const positions = new Float32Array(1200);

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  return (
    <Points positions={points} stride={3} frustumCulled>
      <PointMaterial transparent color="#c5dbff" size={0.035} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

function SceneContent({ reducedMotion }: { reducedMotion: boolean }) {
  const rig = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rig.current || reducedMotion) {
      return;
    }

    rig.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.18;
    rig.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.06) * 0.08;
  });

  return (
    <group ref={rig}>
      <ParticleField />
      <Orb position={[-3.6, 1.8, -1]} color="#1E4ED8" scale={1.65} />
      <Orb position={[3.8, -1.4, -2]} color="#F4B400" scale={1.2} />
      <Orb position={[0.8, 2.6, -3]} color="#89b4ff" scale={0.9} />
      <mesh position={[0, -3.2, -5]} rotation={[-Math.PI / 2.8, 0, 0]}>
        <torusGeometry args={[5.5, 0.24, 32, 120]} />
        <meshBasicMaterial color="#1d5cff" transparent opacity={0.34} />
      </mesh>
    </group>
  );
}

export function WorldScene() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#06142E"]} />
        <fog attach="fog" args={["#06142E", 7, 14]} />
        <ambientLight intensity={1.3} />
        <directionalLight position={[4, 6, 2]} intensity={2.4} color="#dbe7ff" />
        <pointLight position={[-4, 1, 2]} intensity={20} color="#1E4ED8" />
        <pointLight position={[4, -2, 1]} intensity={12} color="#F4B400" />
        <Suspense fallback={null}>
          <SceneContent reducedMotion={Boolean(reducedMotion)} />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_26%),linear-gradient(180deg,rgba(6,20,46,0.08),rgba(6,20,46,0.6))]" />
    </div>
  );
}
