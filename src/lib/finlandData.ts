export interface ServerLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  servers: number;
  uptime: string;
  ping: number;
  region: string;
}

// ~70-vertex polygon — geographically correct silhouette [lon, lat]
export const FINLAND_POLYGON: [number, number][] = [
  // Southern coast (Gulf of Finland), east → west
  [27.8, 60.5], [27.0, 60.3], [26.5, 60.2], [26.0, 60.2],
  [25.2, 60.1], [24.5, 60.1], [24.0, 60.0], [23.5, 59.9],
  [23.0, 59.8], // Hanko area — southernmost
  [22.5, 59.9], [22.0, 60.1], [21.5, 60.4], // Turku area

  // West coast (Gulf of Bothnia), south → north
  [21.3, 60.7], [21.2, 61.0], [21.0, 61.5], [21.0, 62.0],
  [21.0, 62.5], [21.0, 63.0], [21.2, 63.5], [21.5, 64.0],
  [21.8, 64.5], [22.5, 65.0],
  [24.0, 65.5], // Oulu/Kemi coast bulges east
  [24.1, 65.8], // Tornio — Swedish border starts

  // Swedish border (NW toward Norway)
  [23.8, 66.2], [23.5, 66.8], [23.0, 67.3],
  [22.5, 67.8], [22.0, 68.2], [21.0, 68.6],
  [20.8, 69.0], // Kilpisjärvi — Norwegian border starts

  // Norwegian border (NE to Nuorgam)
  [21.0, 69.2], [22.0, 69.4], [23.0, 69.5],
  [24.0, 69.6], [25.0, 69.8], [26.0, 70.0],
  [27.0, 70.0], [27.9, 70.1], // Nuorgam — northernmost

  // North arm eastern side, going south
  [28.2, 69.8], [28.5, 69.2], [29.0, 68.8],
  [29.0, 68.3], [28.5, 67.9], [28.5, 67.3],

  // Russian border, north → south
  [29.0, 67.0], [29.5, 66.5], [30.0, 66.0], [30.1, 65.5],
  [29.8, 65.0], [29.5, 64.5], [29.5, 64.0], [29.8, 63.5],
  [30.5, 63.2], [31.0, 63.0],
  [31.3, 62.8], // Ilomantsi area — easternmost ~31.3°E
  [31.0, 62.5], [30.5, 62.2], [30.0, 62.0],
  [29.5, 61.7], [29.0, 61.4],
  [28.9, 61.2], // Imatra
  [28.5, 61.0], [28.2, 60.8],
  [27.8, 60.5], // back to SE start
];

// Bounds covering all of Finland + margin
const LON_MIN = 19.5;
const LON_MAX = 32.0;
const LAT_MIN = 59.5;
const LAT_MAX = 70.5;
const LON_RANGE = LON_MAX - LON_MIN; // 12.5
const LAT_RANGE = LAT_MAX - LAT_MIN; // 11.0

// Geographic km dimensions at ~65°N:
//   width  12.5° × 46.7 km/° ≈ 584 km
//   height 11.0° × 111  km/° ≈ 1221 km  → aspect ≈ 2.09
const SCENE_WIDTH  = 3.5;
const SCENE_HEIGHT = 7.3; // SCENE_WIDTH × 2.09

export function lonLatToXY(lon: number, lat: number): [number, number] {
  const nx = (lon - LON_MIN) / LON_RANGE;
  const ny = (lat - LAT_MIN) / LAT_RANGE;
  return [(nx - 0.5) * SCENE_WIDTH, (ny - 0.5) * SCENE_HEIGHT];
}

function pointInPolygon(lon: number, lat: number, polygon: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if ((yi > lat) !== (yj > lat) && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

export function generateFinlandPoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  let filled = 0;
  let attempts = 0;
  const maxAttempts = count * 25;

  while (filled < count && attempts < maxAttempts) {
    const lon = LON_MIN + Math.random() * LON_RANGE;
    const lat = LAT_MIN + Math.random() * LAT_RANGE;
    if (pointInPolygon(lon, lat, FINLAND_POLYGON)) {
      const [x, y] = lonLatToXY(lon, lat);
      positions[filled * 3 + 0] = x;
      positions[filled * 3 + 1] = y;
      positions[filled * 3 + 2] = (Math.random() - 0.5) * 0.1;
      filled++;
    }
    attempts++;
  }

  // Fallback: shouldn't be needed with a correct polygon
  while (filled < count) {
    const lon = LON_MIN + Math.random() * LON_RANGE;
    const lat = LAT_MIN + Math.random() * LAT_RANGE;
    const [x, y] = lonLatToXY(lon, lat);
    positions[filled * 3 + 0] = x;
    positions[filled * 3 + 1] = y;
    positions[filled * 3 + 2] = 0;
    filled++;
  }

  return positions;
}

export const SERVER_LOCATIONS: ServerLocation[] = [
  { id: "helsinki",  name: "Helsinki",  lat: 60.17, lon: 24.94, servers: 48, uptime: "99.99%", ping: 8,  region: "EU-South"  },
  { id: "tampere",   name: "Tampere",   lat: 61.50, lon: 23.77, servers: 24, uptime: "99.98%", ping: 11, region: "EU-Central" },
  { id: "oulu",      name: "Oulu",      lat: 65.01, lon: 25.47, servers: 16, uptime: "99.97%", ping: 14, region: "EU-North"  },
  { id: "rovaniemi", name: "Rovaniemi", lat: 66.50, lon: 25.73, servers: 8,  uptime: "99.96%", ping: 18, region: "EU-Arctic" },
];

export const SERVER_CONNECTIONS: [string, string][] = [
  ["helsinki", "tampere"],
  ["tampere", "oulu"],
  ["oulu", "rovaniemi"],
  ["helsinki", "oulu"],
];
