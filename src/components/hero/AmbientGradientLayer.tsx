"use client";
import { motion, useReducedMotion } from "motion/react";

const BLOBS = [
  {
    gradient: "radial-gradient(circle, rgba(18,154,181,0.55) 0%, transparent 65%)",
    size: 520,
    top: "-15%",
    left: "8%",
    blur: 100,
    duration: 22,
    delay: 0,
    x: [0, 45, -25, 30, 0],
    y: [0, -35, 25, -20, 0],
    scale: [1, 1.08, 0.93, 1.05, 1],
    opacity: [0.42, 0.52, 0.18, 0.48, 0.42],
  },
  {
    gradient: "radial-gradient(circle, rgba(90,60,200,0.48) 0%, transparent 65%)",
    size: 400,
    top: "32%",
    left: "42%",
    blur: 88,
    duration: 18,
    delay: 7,
    x: [0, -42, 28, -22, 0],
    y: [0, 32, -38, 18, 0],
    scale: [1, 0.88, 1.14, 0.95, 1],
    opacity: [0.32, 0.14, 0.46, 0.24, 0.32],
  },
  {
    gradient: "radial-gradient(circle, rgba(0,117,153,0.50) 0%, transparent 65%)",
    size: 300,
    top: "58%",
    left: "62%",
    blur: 72,
    duration: 26,
    delay: 14,
    x: [0, 28, -38, 22, 0],
    y: [0, -22, 34, -28, 0],
    scale: [1, 1.18, 0.87, 1.10, 1],
    opacity: [0.28, 0.44, 0.10, 0.38, 0.28],
  },
];

export function AmbientGradientLayer() {
  const shouldReduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute top-0 right-0 bottom-0 w-3/4 pointer-events-none overflow-hidden"
    >
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: blob.left,
            background: blob.gradient,
            filter: `blur(${blob.blur}px)`,
            willChange: "transform, opacity",
          }}
          animate={
            shouldReduce
              ? { opacity: blob.opacity[0] }
              : {
                  x: blob.x,
                  y: blob.y,
                  scale: blob.scale,
                  opacity: blob.opacity,
                }
          }
          transition={{
            duration: blob.duration,
            delay: blob.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
