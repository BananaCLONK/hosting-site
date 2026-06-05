"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { generateFinlandPoints } from "@/lib/finlandData";

// ── Glow sprite ───────────────────────────────────────────────────────────────
function makeGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0.0, "rgba(200, 230, 255, 1)");
  g.addColorStop(0.3, "rgba(80, 160, 255, 0.7)");
  g.addColorStop(1.0, "rgba(20, 80, 255, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

// ── Physics ───────────────────────────────────────────────────────────────────
const RADIUS       = 0.9;
const PUSH_FORCE   = 0.02;  // equilibrium displacement = PUSH_FORCE / RETURN_FORCE ≈ 0.25
const RETURN_FORCE = 0.08;
const DAMPING      = 0.9;

// GLSL-style smoothstep — works correctly with edge0 > edge1
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

interface Props { count: number }

export function FinlandParticles({ count }: Props) {
  const pointsRef = useRef<THREE.Points>(null);
  const tweenRef  = useRef<gsap.core.Tween | null>(null);
  const originRef = useRef<Float32Array | null>(null);

  // Per-particle physics state — allocated once with geometry
  const velRef    = useRef<Float32Array | null>(null);
  const displRef  = useRef<Float32Array | null>(null);
  const readyRef  = useRef(false);

  // ── Window-level mouse tracking ───────────────────────────────────────────
  // The canvas wrapper has pointer-events: none, so state.pointer never updates.
  // We bypass this by listening on window and converting to canvas NDC ourselves.
  const mouseClientRef = useRef({ x: -1e9, y: -1e9 });
  const canvasRectRef  = useRef<DOMRect | null>(null);
  const rectDirtyRef   = useRef(true);

  // Reusable Three.js objects — zero allocations inside frame loop
  const _ndc    = useRef(new THREE.Vector2());
  const _caster = useRef(new THREE.Raycaster());
  const _plane  = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const _wPos   = useRef(new THREE.Vector3());
  const _lPos   = useRef(new THREE.Vector3());
  const _invM   = useRef(new THREE.Matrix4());

  const reducedRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseClientRef.current.x = e.clientX;
      mouseClientRef.current.y = e.clientY;
    };
    const markDirty = () => { rectDirtyRef.current = true; };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize",      markDirty, { passive: true });
    window.addEventListener("scroll",      markDirty, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize",      markDirty);
      window.removeEventListener("scroll",      markDirty);
    };
  }, []);

  const finalPositions = useMemo(() => generateFinlandPoints(count), [count]);

  const { geometry, material } = useMemo(() => {
    const startPos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) startPos[i] = (Math.random() - 0.5) * 22;
    originRef.current = startPos;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(startPos.slice(), 3));

    velRef.current   = new Float32Array(count * 3);
    displRef.current = new Float32Array(count * 3);

    const mat = new THREE.PointsMaterial({
      color: new THREE.Color("#5aacff"),
      size: 0.07,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: makeGlowTexture(),
      sizeAttenuation: true,
    });
    return { geometry: geo, material: mat };
  }, [count]);

  // ── GSAP intro ────────────────────────────────────────────────────────────
  useEffect(() => {
    const posAttr  = geometry.attributes.position as THREE.BufferAttribute;
    const startArr = originRef.current!;
    const proxy    = { t: 0 };

    readyRef.current = false;
    velRef.current!.fill(0);
    displRef.current!.fill(0);

    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count * 3; i++) arr[i] = startArr[i];
    posAttr.needsUpdate = true;

    tweenRef.current = gsap.to(proxy, {
      t: 1,
      duration: 3.0,
      ease: "power3.out",
      delay: 0.5,
      onUpdate() {
        const p = proxy.t;
        for (let i = 0; i < count * 3; i++) {
          arr[i] = startArr[i] + (finalPositions[i] - startArr[i]) * p;
        }
        posAttr.needsUpdate = true;
      },
      onComplete() {
        for (let i = 0; i < count * 3; i++) arr[i] = finalPositions[i];
        posAttr.needsUpdate = true;
        readyRef.current = true;
      },
    });

    return () => { tweenRef.current?.kill(); };
  }, [geometry, finalPositions, count]);

  // ── Per-frame physics ─────────────────────────────────────────────────────
  useFrame((state) => {
    if (!pointsRef.current) return;

    pointsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;

    if (!readyRef.current || reducedRef.current) return;

    // Refresh canvas rect on resize / scroll (not every frame)
    if (rectDirtyRef.current) {
      canvasRectRef.current = state.gl.domElement.getBoundingClientRect();
      rectDirtyRef.current  = false;
    }

    // ── Mouse in particle local-space ──────────────────────────────────────
    let mx = 1e9, my = 1e9;
    const rect = canvasRectRef.current;
    if (rect && mouseClientRef.current.x > -1e8) {
      const ndcX =  ((mouseClientRef.current.x - rect.left) / rect.width)  * 2 - 1;
      const ndcY = -((mouseClientRef.current.y - rect.top)  / rect.height) * 2 + 1;
      _ndc.current.set(ndcX, ndcY);
      _caster.current.setFromCamera(_ndc.current, state.camera);

      // Force fresh world matrix before inversion
      pointsRef.current.updateWorldMatrix(true, false);
      const hit = _caster.current.ray.intersectPlane(_plane.current, _wPos.current);
      if (hit) {
        _invM.current.copy(pointsRef.current.matrixWorld).invert();
        _lPos.current.copy(_wPos.current).applyMatrix4(_invM.current);
        mx = _lPos.current.x;
        my = _lPos.current.y;
      }
    }

    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const arr     = posAttr.array as Float32Array;
    const vel     = velRef.current!;
    const disp    = displRef.current!;
    const R2      = RADIUS * RADIUS;
    let anyMotion = false;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const px = finalPositions[i3]     + disp[i3];
      const py = finalPositions[i3 + 1] + disp[i3 + 1];

      // ── Repulsion with smoothstep magnetic-field falloff ─────────────────
      let fx = 0, fy = 0;
      const dx    = px - mx;
      const dy    = py - my;
      const dist2 = dx * dx + dy * dy;

      if (dist2 < R2 && dist2 > 1e-6) {
        const dist      = Math.sqrt(dist2);
        const influence = smoothstep(RADIUS, 0, dist); // 1 at center → 0 at edge
        const mag       = influence * PUSH_FORCE;
        fx = (dx / dist) * mag;
        fy = (dy / dist) * mag;
      }

      // ── Spring-damper ────────────────────────────────────────────────────
      vel[i3]     = (vel[i3]     + fx - RETURN_FORCE * disp[i3])     * DAMPING;
      vel[i3 + 1] = (vel[i3 + 1] + fy - RETURN_FORCE * disp[i3 + 1]) * DAMPING;
      vel[i3 + 2] = (vel[i3 + 2]      - RETURN_FORCE * disp[i3 + 2]) * DAMPING;

      disp[i3]     += vel[i3];
      disp[i3 + 1] += vel[i3 + 1];
      disp[i3 + 2] += vel[i3 + 2];

      arr[i3]     = finalPositions[i3]     + disp[i3];
      arr[i3 + 1] = finalPositions[i3 + 1] + disp[i3 + 1];
      arr[i3 + 2] = finalPositions[i3 + 2] + disp[i3 + 2];

      if (
        Math.abs(vel[i3])      > 1e-5 ||
        Math.abs(vel[i3 + 1])  > 1e-5 ||
        Math.abs(disp[i3])     > 1e-4 ||
        Math.abs(disp[i3 + 1]) > 1e-4
      ) anyMotion = true;
    }

    if (anyMotion || mx < 1e8) posAttr.needsUpdate = true;
  });

  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
