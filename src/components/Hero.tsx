"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { PrimaryButton } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { HeroCanvas } from "@/components/hero/HeroCanvas";
import { Search, CheckCircle, XCircle, Sparkles, Wifi } from "lucide-react";

const domainResults = [
  { domain: "yourcompany.com", available: true, price: "€12.99/yr" },
  { domain: "yourcompany.io", available: true, price: "€34.99/yr" },
  { domain: "yourcompany.net", available: false, price: null },
  { domain: "yourcompany.co", available: true, price: "€9.99/yr" },
];

const trustItems = [
  "99.99% Uptime SLA",
  "Free SSL certificates",
  "24/7 expert support",
  "30-day money back",
];

export function Hero() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) setSearched(true);
  };

  return (
    <section
      className="relative z-1 min-h-screen overflow-hidden"
      style={{ background: "#1b3042" }}
    >
      {/* ── 3D Finland particle map ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroCanvas />
      </div>

      {/* ── Gradient overlays for text readability ─────────────── */}
      {/* Left-to-right: dark on left, transparent on right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #1b3042 38%, rgba(27,48,66,0.75) 55%, rgba(27,48,66,0.1) 80%, transparent 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #1b3042 0%, transparent 35%)",
        }}
      />
      {/* Top fade (under header) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(27,48,66,0.6) 0%, transparent 15%)",
        }}
      />

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
          <div className="max-w-xl lg:max-w-2xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                className="mb-6 bg-brand-500/15 text-brand-300 border border-brand-500/30"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Trusted by 50,000+ businesses worldwide
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight"
            >
              Your business deserves{" "}
              <span className="text-brand-400">fast, reliable</span> hosting
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-6 text-lg text-slate-400 leading-relaxed"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <PrimaryButton arrow>Start for free</PrimaryButton>
              <motion.a
                href="#pricing"
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/15 transition-colors"
              >
                View pricing
              </motion.a>
            </motion.div>

            {/* Domain search */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10"
            >
              <div
                className="rounded-2xl border p-5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Find your perfect domain
                </p>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div
                    className="flex-1 flex items-center gap-2 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="yourcompany.com"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1 bg-transparent text-white placeholder-slate-500 text-sm font-medium outline-none"
                    />
                  </div>
                  <PrimaryButton type="submit">Search</PrimaryButton>
                </form>

                {searched && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 space-y-1.5"
                  >
                    {domainResults.map((result) => (
                      <div
                        key={result.domain}
                        className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          {result.available ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                          <span className="text-sm font-medium text-slate-200">
                            {result.domain}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {result.available ? (
                            <>
                              <span className="text-sm font-semibold text-white">
                                {result.price}
                              </span>
                              <PrimaryButton className="px-3 py-1.5 text-xs">Add</PrimaryButton>
                            </>
                          ) : (
                            <span className="text-sm text-slate-500">Taken</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {!searched && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[".com", ".io", ".net", ".co", ".app", ".dev"].map((ext) => (
                      <span
                        key={ext}
                        className="px-2.5 py-1 text-xs font-medium text-slate-500 rounded-lg"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        {ext}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Trust bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-8 flex flex-wrap gap-5"
            >
              {trustItems.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Map legend — bottom-right corner hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 3.5 }}
            className="hidden lg:flex items-center gap-2 absolute bottom-8 right-8 text-xs text-slate-600"
          >
            <Wifi className="w-3.5 h-3.5 text-brand-500" />
            <span>NexaHost Nordic Infrastructure · 4 active regions</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
