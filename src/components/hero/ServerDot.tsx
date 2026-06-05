"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { lonLatToXY, type ServerLocation } from "@/lib/finlandData";

function makeDotTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0.0, "rgba(255, 255, 255, 1)");
  g.addColorStop(0.2, "rgba(180, 230, 255, 0.9)");
  g.addColorStop(0.5, "rgba(80, 160, 255, 0.4)");
  g.addColorStop(1.0, "rgba(20, 80, 255, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

// A single pulsing ring expanding outward
function PulseRing({ phase }: { phase: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;
    const t = ((state.clock.elapsedTime * 0.6 + phase) % 1 + 1) % 1;
    const s = 0.15 + t * 1.8;
    meshRef.current.scale.setScalar(s);
    matRef.current.opacity = (1 - t) * 0.55;
  });

  return (
    <mesh ref={meshRef}>
      <ringGeometry args={[0.12, 0.16, 32]} />
      <meshBasicMaterial
        ref={matRef}
        color="#4499ff"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface Props {
  server: ServerLocation;
}

export function ServerDot({ server }: Props) {
  const [x, y] = lonLatToXY(server.lon, server.lat);

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3)
    );
    const tex = makeDotTexture();
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color("#ffffff"),
      size: 0.35,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: tex,
      sizeAttenuation: true,
    });
    return { geometry: geo, material: mat };
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <group position={[x, y, 0.05]}>
      {/* Pulsing rings — staggered phases */}
      <PulseRing phase={0} />
      <PulseRing phase={0.35} />
      <PulseRing phase={0.7} />

      {/* Bright glow dot */}
      <points geometry={geometry} material={material} />

      {/* HTML label — always faces camera */}
      <Html
        center
        distanceFactor={14}
        position={[0.3, 0.18, 0]}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div
          style={{
            background: "rgba(3, 13, 31, 0.75)",
            border: "1px solid rgba(68, 153, 255, 0.35)",
            backdropFilter: "blur(6px)",
            borderRadius: 8,
            padding: "4px 8px",
            whiteSpace: "nowrap",
            color: "#e0f0ff",
            fontSize: 11,
            fontFamily: "monospace",
            lineHeight: 1.4,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 12 }}>{server.name}</div>
          <div style={{ color: "#88ccff", fontSize: 10 }}>
            {server.servers} servers · {server.ping}ms
          </div>
          <div style={{ color: "#50e870", fontSize: 10 }}>{server.uptime}</div>
        </div>
      </Html>
    </group>
  );
}
