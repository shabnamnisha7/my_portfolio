"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

function SparkPoints() {
  const positions = useMemo(() => {
    const count = 1400;
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 16;
      data[i * 3 + 1] = (Math.random() - 0.5) * 10;
      data[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }

    return data;
  }, []);

  return (
    <Points positions={positions} stride={3} frustumCulled>
      <PointMaterial transparent color="#c5dbff" size={0.05} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

function WireSphere() {
  const edges = useMemo(() => {
    const geometry = new THREE.SphereGeometry(2.4, 48, 48);
    return new THREE.EdgesGeometry(geometry);
  }, []);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[2.4, 64, 64]} />
        <meshStandardMaterial color="#2b68ff" transparent opacity={0.12} roughness={0.22} metalness={0.15} />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#9dc8ff" transparent opacity={0.4} linewidth={1} />
      </lineSegments>
    </group>
  );
}

function BlueprintPlane() {
  const geometry = useMemo(() => {
    const radialCount = 40;
    const ringPoints = 64;
    const positions = new Float32Array((radialCount * 2 + ringPoints * 3) * 3);
    let index = 0;

    for (let i = 0; i < radialCount; i += 1) {
      const angle = (i / radialCount) * Math.PI * 2;
      positions[index++] = Math.cos(angle) * 3.8;
      positions[index++] = 0;
      positions[index++] = Math.sin(angle) * 3.8;
      positions[index++] = Math.cos(angle) * 4.9;
      positions[index++] = 0;
      positions[index++] = Math.sin(angle) * 4.9;
    }

    const circles = [3.95, 4.45, 4.85];
    for (const radius of circles) {
      for (let i = 0; i < ringPoints; i += 1) {
        const start = (i / ringPoints) * Math.PI * 2;
        const end = ((i + 1) / ringPoints) * Math.PI * 2;
        positions[index++] = Math.cos(start) * radius;
        positions[index++] = 0;
        positions[index++] = Math.sin(start) * radius;
        positions[index++] = Math.cos(end) * radius;
        positions[index++] = 0;
        positions[index++] = Math.sin(end) * radius;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.85, 0]}>
      <mesh>
        <ringGeometry args={[3.8, 5.0, 90, 1]} />
        <meshBasicMaterial color="#1E4ED8" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#8dceff" transparent opacity={0.24} linewidth={1} />
      </lineSegments>
    </group>
  );
}

function FloatingCube({
  position,
  color,
  scale,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
}) {
  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.16}
          roughness={0.08}
          metalness={0.78}
          clearcoat={0.95}
          clearcoatRoughness={0.14}
        />
      </mesh>
    </Float>
  );
}

function NetworkLines() {
  const geometry = useMemo(() => {
    const count = 96;
    const positions = new Float32Array(count * 6);

    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.5 + Math.random() * 0.4;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 1.2;
      const x2 = Math.cos(angle + 0.9) * (radius + 0.3);
      const y2 = Math.sin(angle + 0.9) * (radius + 0.3);
      const z2 = z + (Math.random() - 0.5) * 0.8;

      positions[i * 6] = x;
      positions[i * 6 + 1] = y;
      positions[i * 6 + 2] = z;
      positions[i * 6 + 3] = x2;
      positions[i * 6 + 4] = y2;
      positions[i * 6 + 5] = z2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  return (
    <lineSegments geometry={geometry}> 
      <lineBasicMaterial color="#70a5ff" transparent opacity={0.22} linewidth={1} />
    </lineSegments>
  );
}

function SceneContent({ reducedMotion }: { reducedMotion: boolean }) {
  const rig = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!rig.current || reducedMotion) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    rig.current.rotation.y = Math.sin(elapsed * 0.04) * 0.1;
    rig.current.rotation.x = Math.cos(elapsed * 0.03) * 0.04;
  });

  return (
    <group ref={rig}>
      <SparkPoints />
      <FloatingCube position={[-3.2, 1.9, -1.4]} color="#1E4ED8" scale={1.6} />
      <FloatingCube position={[3.4, -1.1, -2.3]} color="#F4B400" scale={1.1} />
      <FloatingCube position={[0.6, 2.4, -3.2]} color="#8FB8FF" scale={0.95} />
      <WireSphere />
      <NetworkLines />
      <BlueprintPlane />
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
        <ambientLight intensity={1.4} color="#c5dbff" />
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
