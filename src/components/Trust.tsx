"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import dynamic from "next/dynamic";
import { PrimaryButton } from "@/components/Button";

const TrustCanvas = dynamic(
  () => import("@/components/hero/TrustScene"),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

const REVIEWS = [
  {
    name: "Mikko Leinonen",
    role: "Toimitusjohtaja",
    company: "Leinonen & Partners",
    text: "Siirtyminen kotimaisille palvelimille oli paras päätöksemme. Latausajat paranivat heti ja tuki on aina tavoitettavissa.",
    rating: 5,
  },
  {
    name: "Sari Mäkinen",
    role: "CTO",
    company: "Mäkinen Digital",
    text: "Palvelin sijaitsee Suomessa — tämä on meille GDPR-vaatimusten kannalta kriittistä. Uptime on ollut täydellinen.",
    rating: 5,
  },
  {
    name: "Juhani Korhonen",
    role: "Yrittäjä",
    company: "Korhonen Commerce",
    text: "Suosittelisin kaikille suomalaisille yrityksille. Hinta-laatu-suhde on erinomainen ja tekninen osaaminen vakuuttavaa.",
    rating: 5,
  },
  {
    name: "Leena Virtanen",
    role: "Markkinointijohtaja",
    company: "Virtanen Media",
    text: "Palvelin on pysynyt toiminnassa 100 % ajasta kolmen vuoden aikana. Nopea tuki tekee tästä huippuvalinnan.",
    rating: 5,
  },
  {
    name: "Pekka Nieminen",
    role: "Teknologiajohtaja",
    company: "Nieminen Solutions",
    text: "Kolme vuotta, ei yhtäkään häiriötä. Tuki toimii erinomaisesti ja hinnoittelu on rehellinen ja selkeä.",
    rating: 5,
  },
];

const CARD_W   = 288;
const CARD_GAP = 16;
const TRACK_W  = REVIEWS.length * (CARD_W + CARD_GAP);

function ReviewCard({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    <div
      className="flex-none rounded-2xl border border-brand-900/10 p-5 flex flex-col gap-3 select-none"
      style={{ width: CARD_W, background: "rgba(27,48,66,0.06)" }}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-brand-400 text-brand-400" />
        ))}
      </div>
      <p className="text-sm text-brand-900/75 leading-relaxed flex-1">"{review.text}"</p>
      <div>
        <p className="text-sm font-semibold text-brand-900">{review.name}</p>
        <p className="text-xs text-brand-900/40">{review.role} · {review.company}</p>
      </div>
    </div>
  );
}

export function Trust() {
  // Start at middle copy so rightward drag has content immediately
  const x             = useMotionValue(-TRACK_W);
  const isDraggingRef = useRef(false);
  const rafRef        = useRef<number>(0);
  const [dragging, setDragging] = useState(false);

  // Normalize x to [-TRACK_W, 0] on every change — seamless in both directions
  useEffect(() => {
    return x.on("change", (val) => {
      if (val < -TRACK_W) x.set(val + TRACK_W);
      else if (val > 0)   x.set(val - TRACK_W);
    });
  }, [x]);

  // Auto-scroll — normalizer above handles wraparound
  useEffect(() => {
    const SPEED = 0.11;
    const tick = () => {
      if (!isDraggingRef.current) x.set(x.get() - SPEED);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [x]);

  const onDragStart = () => { isDraggingRef.current = true;  setDragging(true);  };
  const onDragEnd   = () => { isDraggingRef.current = false; setDragging(false); };

  const scrollBy = (dir: 1 | -1) => {
    isDraggingRef.current = true;
    animate(x, x.get() + dir * -(CARD_W + CARD_GAP), {
      duration: 0.45,
      ease: [0.25, 0.1, 0.25, 1],
      onComplete: () => { isDraggingRef.current = false; },
    });
  };

  const tripled = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden shadow-[0_24px_80px_rgba(15,23,42,0.12)]" style={{ background: "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(255,240,190,0.9) 0%, rgba(255,255,255,0) 80%), #ffffff" }}>

          {/* ── Top: headline + map ──────────────────────────────── */}
          <div className="flex flex-col lg:flex-row min-h-95">
            {/* Left: text */}
            <div className="flex-1 p-10 lg:p-14 flex flex-col justify-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-900 leading-tight">
                Luotettavat<br />kotimaiset palvelimet
              </h2>
              <p className="mt-4 text-brand-900/55 text-base leading-relaxed max-w-sm">
                Palvelimemme sijaitsevat Suomessa. Nopea, turvallinen ja GDPR-yhteensopiva hosting yrityksellesi.
              </p>
              <div className="mt-8">
                <PrimaryButton arrow>Aloita</PrimaryButton>
              </div>
            </div>

            {/* Right: Finland map */}
            <div className="relative w-full lg:w-[48%] h-72 lg:h-auto pointer-events-none">
              <TrustCanvas />
            </div>
          </div>

          {/* ── Divider ──────────────────────────────────────────── */}
          <div className="border-t border-brand-900/10 mx-8" />

          {/* ── Bottom: reviews carousel ─────────────────────────── */}
          <div className="px-8 lg:px-12 py-8">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-900/35">
                Asiakaskokemukset
              </p>
              <div className="flex gap-2">
                  <button
                  onClick={() => scrollBy(-1)}
                  className="w-8 h-8 rounded-full border border-brand-900/20 flex items-center justify-center text-brand-900/50 hover:text-brand-900 hover:border-brand-900/50 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollBy(1)}
                  className="w-8 h-8 rounded-full border border-brand-900/20 flex items-center justify-center text-brand-900/50 hover:text-brand-900 hover:border-brand-900/50 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
              <motion.div
                style={{ x, gap: CARD_GAP }}
                drag="x"
                dragConstraints={{ left: -99999, right: 99999 }}
                dragElastic={0.04}
                dragMomentum={false}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                className={`flex pb-2 ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
              >
                {tripled.map((review, i) => (
                  <ReviewCard key={i} review={review} />
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
