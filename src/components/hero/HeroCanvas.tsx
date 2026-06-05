"use client";
import dynamic from "next/dynamic";

// Load the R3F canvas only client-side — Three.js is not SSR-compatible
const FinlandScene = dynamic(() => import("./FinlandScene"), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export function HeroCanvas() {
  return (
    <div className="w-full h-full">
      <FinlandScene />
    </div>
  );
}
