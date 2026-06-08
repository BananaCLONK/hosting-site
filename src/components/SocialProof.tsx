"use client";
import { motion } from "motion/react";

const LOGOS = [
  {
    name: "Veritas",
    mark: (
      <path d="M10 1 L19 5.5 L19 14.5 L10 19 L1 14.5 L1 5.5Z" fill="currentColor" />
    ),
    vb: "0 0 20 20",
  },
  {
    name: "Nordex",
    mark: (
      <>
        <path d="M10 2 L18 16 H2Z" fill="currentColor" />
        <rect x="7" y="16" width="6" height="2" fill="currentColor" />
      </>
    ),
    vb: "0 0 20 20",
  },
  {
    name: "Luminos",
    mark: (
      <>
        <circle cx="10" cy="10" r="4" fill="currentColor" />
        <circle cx="2"  cy="10" r="2" fill="currentColor" />
        <circle cx="18" cy="10" r="2" fill="currentColor" />
        <circle cx="10" cy="2"  r="2" fill="currentColor" />
        <circle cx="10" cy="18" r="2" fill="currentColor" />
      </>
    ),
    vb: "0 0 20 20",
  },
  {
    name: "Axiom",
    mark: (
      <>
        <rect x="1"  y="1"  width="8" height="8" rx="1.5" fill="currentColor" />
        <rect x="11" y="1"  width="8" height="8" rx="1.5" fill="currentColor" />
        <rect x="1"  y="11" width="8" height="8" rx="1.5" fill="currentColor" />
        <rect x="11" y="11" width="8" height="8" rx="1.5" fill="currentColor" opacity="0.4" />
      </>
    ),
    vb: "0 0 20 20",
  },
  {
    name: "Forma",
    mark: (
      <path
        d="M2 10 C2 5.6 5.6 2 10 2 C14.4 2 18 5.6 18 10 L18 18 L2 18Z"
        fill="currentColor"
      />
    ),
    vb: "0 0 20 20",
  },
];

export function SocialProof() {
  return (
    <section className="bg-white border-b border-slate-100 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8">
          Meihin luottavat esimerkiksi
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {LOGOS.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex items-center gap-2.5 text-[#1b3042] opacity-40 hover:opacity-70 transition-opacity duration-200"
            >
              <svg viewBox={logo.vb} className="h-5 w-5 shrink-0">
                {logo.mark}
              </svg>
              <span className="text-[17px] font-bold tracking-tight">{logo.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
