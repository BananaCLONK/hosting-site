"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SERVER_LOCATIONS } from "@/lib/finlandData";
import { FinlandParticles } from "./FinlandParticles";
import { ServerDot } from "./ServerDot";
import { ConnectionLines } from "./ConnectionLines";

interface Props {
  particleCount: number;
}

export function FinlandMap({ particleCount }: Props) {
  const floatRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!floatRef.current) return;
    const t = state.clock.elapsedTime;
    floatRef.current.rotation.y = Math.sin(t * 0.12) * 0.06;
    floatRef.current.position.y = Math.sin(t * 0.38) * 0.08;
  });

  return (
    <group position={[1.0, 0.5, 0]} ref={floatRef}>
      <group rotation={[-0.28, 0, 0]}>
        <FinlandParticles count={particleCount} />
        <ConnectionLines />
        {SERVER_LOCATIONS.map((server) => (
          <ServerDot key={server.id} server={server} />
        ))}
      </group>
    </group>
  );
}
