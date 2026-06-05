"use client";
import { Line } from "@react-three/drei";
import { SERVER_LOCATIONS, SERVER_CONNECTIONS, lonLatToXY } from "@/lib/finlandData";

export function ConnectionLines() {
  const posMap = Object.fromEntries(
    SERVER_LOCATIONS.map((s) => {
      const [x, y] = lonLatToXY(s.lon, s.lat);
      return [s.id, [x, y, 0.05] as [number, number, number]];
    })
  );

  return (
    <>
      {SERVER_CONNECTIONS.map(([a, b]) => {
        const p1 = posMap[a];
        const p2 = posMap[b];
        if (!p1 || !p2) return null;
        return (
          <group key={`${a}-${b}`}>
            {/* Wide faint glow */}
            <Line
              points={[p1, p2]}
              color="#3377ff"
              lineWidth={4}
              transparent
              opacity={0.1}
            />
            {/* Narrow bright core */}
            <Line
              points={[p1, p2]}
              color="#88ccff"
              lineWidth={1}
              transparent
              opacity={0.45}
            />
          </group>
        );
      })}
    </>
  );
}
