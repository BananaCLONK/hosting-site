"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { FinlandMap } from "./FinlandMap";
import { Stats } from "@react-three/drei";

const PARTICLE_DESKTOP = 9000;
const PARTICLE_MOBILE = 2500;

function getParticleCount(): number {
  if (typeof window === "undefined") return PARTICLE_DESKTOP;
  return window.innerWidth < 768 ? PARTICLE_MOBILE : PARTICLE_DESKTOP;
}

export default function FinlandScene() {
  const count = getParticleCount();

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <FinlandMap particleCount={count} />
      </Suspense>
      {process.env.NODE_ENV === "development" && <Stats />}
    </Canvas>
  );
}
