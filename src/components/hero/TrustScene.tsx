"use client";
import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FinlandParticles } from "./FinlandParticles";
import { ConnectionLines } from "./ConnectionLines";
import { TrustHotspots } from "./TrustHotspot";

function TrustMap() {
  const floatRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!floatRef.current) return;
    const t = state.clock.elapsedTime;
    floatRef.current.rotation.y = Math.sin(t * 0.12) * 0.04;
    floatRef.current.position.y = Math.sin(t * 0.38) * 0.05;
  });

  return (
    <group position={[1.0, 0.5, 0]} ref={floatRef}>
      <group rotation={[-0.28, 0, 0]}>
        <FinlandParticles count={7000} />
        <ConnectionLines />
        <TrustHotspots />
      </group>
    </group>
  );
}

export default function TrustScene() {
  return (
    <Canvas
      camera={{ position: [1.0, -1.2, 5.5], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      onCreated={(state) => {
        state.camera.lookAt(1.0, -1.2, 0);
      }}
    >
      <Suspense fallback={null}>
        <TrustMap />
      </Suspense>
    </Canvas>
  );
}
