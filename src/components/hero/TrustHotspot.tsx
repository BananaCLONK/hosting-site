"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { lonLatToXY } from "@/lib/finlandData";

const HOTSPOT_CITIES = [
  { lat: 60.17, lon: 24.94 }, // Helsinki
  { lat: 61.50, lon: 23.77 }, // Tampere
  { lat: 60.45, lon: 22.27 }, // Turku
  { lat: 60.97, lon: 25.66 }, // Lahti
  { lat: 62.24, lon: 25.73 }, // Jyväskylä
  { lat: 62.89, lon: 27.68 }, // Kuopio
  { lat: 61.06, lon: 28.18 }, // Lappeenranta
];

function GlowRing({ x, y, phase }: { x: number; y: number; phase: number }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!matRef.current || !meshRef.current) return;
    const t = ((state.clock.elapsedTime * 0.18 + phase) % 1 + 1) % 1;
    meshRef.current.scale.setScalar(0.1 + t * 1.4);
    matRef.current.opacity = (1 - t) * 0.55;
  });

  return (
    <mesh ref={meshRef} position={[x, y, 0.06]}>
      <ringGeometry args={[0.10, 0.14, 32]} />
      <meshBasicMaterial
        ref={matRef}
        color="#1badc3"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function HotspotCore({ x, y, phase }: { x: number; y: number; phase: number }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!matRef.current) return;
    const t = state.clock.elapsedTime * 0.4 + phase;
    matRef.current.opacity = 0.6 + Math.sin(t) * 0.3;
  });

  return (
    <mesh position={[x, y, 0.07]}>
      <circleGeometry args={[0.07, 24]} />
      <meshBasicMaterial
        ref={matRef}
        color="#ffffff"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export function TrustHotspots() {
  return (
    <>
      {HOTSPOT_CITIES.map((city, i) => {
        const [x, y] = lonLatToXY(city.lon, city.lat);
        const phase = i * 0.7;
        return (
          <group key={i}>
            <GlowRing x={x} y={y} phase={phase} />
            <GlowRing x={x} y={y} phase={phase + 0.4} />
            <HotspotCore x={x} y={y} phase={phase} />
          </group>
        );
      })}
    </>
  );
}
