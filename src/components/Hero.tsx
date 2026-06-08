"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PrimaryButton } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { AmbientGradientLayer } from "@/components/hero/AmbientGradientLayer";
import { Search, CheckCircle, XCircle, Sparkles, MapPin, ShieldCheck, Activity, Headphones, Star } from "lucide-react";

// ─── Reviews ─────────────────────────────────────────────────────────────────

const HERO_REVIEWS = [
  { id: "r1", name: "Mikko Leinonen",  rating: 5, text: "Siirtyminen kotimaisille palvelimille oli paras päätöksemme. Latausajat paranivat heti." },
  { id: "r2", name: "Sari Mäkinen",    rating: 5, text: "Palvelin sijaitsee Suomessa — GDPR-vaatimusten kannalta kriittistä. Uptime täydellinen." },
  { id: "r3", name: "Juhani Korhonen", rating: 5, text: "Suosittelisin kaikille suomalaisille yrityksille. Hinta-laatu on erinomainen." },
  { id: "r4", name: "Leena Virtanen",  rating: 5, text: "Palvelin on pysynyt toiminnassa 100 % ajasta kolmen vuoden aikana." },
  { id: "r5", name: "Pekka Nieminen",  rating: 5, text: "Kolme vuotta, ei yhtäkään häiriötä. Tuki toimii erinomaisesti." },
];

const MAX_CHARS = 88;

function ReviewBadge({ review }: { review: (typeof HERO_REVIEWS)[0] }) {
  const text = review.text.length > MAX_CHARS
    ? review.text.slice(0, MAX_CHARS) + "…"
    : review.text;
  return (
    <div
      className="flex flex-col gap-2 px-5 py-4 rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.10)]"
      style={{
        background: "radial-gradient(ellipse 140% 100% at 50% 0%, rgba(251,220,231,0.85) 0%, rgba(255,255,255,0) 75%), rgba(255,255,255,1)",
        border: "1px solid rgba(255,255,255,0.72)",
        maxWidth: 220,
      }}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-brand-400 text-brand-400" />
        ))}
      </div>
      <p className="text-xs text-brand-900/70 leading-relaxed">"{text}"</p>
      <p className="text-xs font-semibold text-brand-900">{review.name}</p>
    </div>
  );
}

// ─── Feature badge cards ─────────────────────────────────────────────────────

const FEATURE_CARDS = [
  { id: "a", label: "100% Kotimainen",            icon: MapPin,       gradient: "rgba(212,233,249,0.90)" },
  { id: "b", label: "SSL valmiina",                icon: ShieldCheck,  gradient: "rgba(226,250,225,0.90)" },
  { id: "c", label: "24/7 sivustovahti",           icon: Activity,     gradient: "rgba(226,250,225,0.90)" },
  { id: "d", label: "Suomalainen asiakaspalvelu",  icon: Headphones,   gradient: "rgba(251,220,231,0.90)" },
] as const;

type FeatureCard = (typeof FEATURE_CARDS)[number];

function FeatureBadge({ card }: { card: FeatureCard }) {
  const Icon = card.icon;
  return (
    <div
      className="flex items-center gap-3 px-5 py-4 rounded-2xl shadow-[0_8px_32px_rgba(15,23,42,0.10)]"
      style={{
        background: `radial-gradient(ellipse 140% 100% at 50% 0%, ${card.gradient} 0%, rgba(255,255,255,0) 75%), rgba(255,255,255,1)`,
        border: "1px solid rgba(255,255,255,0.72)",
        maxWidth: 180,
      }}
    >
      <Icon className="w-6 h-6 text-brand-700 shrink-0" />
      <span className="text-sm font-semibold text-brand-900 leading-snug">{card.label}</span>
    </div>
  );
}

const EASE = [0.16, 1, 0.3, 1] as const;

function HeroFeatureCards() {
  const [tl, setTl] = useState(0);
  const [br, setBr] = useState(0);
  const brRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const i = setInterval(() => setTl(v => (v + 1) % 2), 4500);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      brRef.current = setInterval(() => setBr(v => (v + 1) % HERO_REVIEWS.length), 4500);
    }, 2200);
    return () => {
      clearTimeout(t);
      if (brRef.current) clearInterval(brRef.current);
    };
  }, []);

  const tlCard  = tl === 0 ? FEATURE_CARDS[0] : FEATURE_CARDS[2];
  const review  = HERO_REVIEWS[br];

  return (
    <>
      {/* Top-left: feature badge — enters/exits vertically */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tlCard.id}
          className="absolute -top-4 -left-4 z-20"
          variants={{
            hidden: { y: -22, opacity: 0 },
            show:   { y: 0,   opacity: 1, transition: { duration: 0.80, ease: EASE } },
            exit:   { y:  8,  opacity: 0, transition: { duration: 1.0,  ease: "easeIn" } },
          }}
          initial="hidden" animate="show" exit="exit"
        >
          <FeatureBadge card={tlCard} />
        </motion.div>
      </AnimatePresence>

      {/* Bottom-right: review badge — enters from left, exits to right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={review.id}
          className="absolute -bottom-4 -right-4 z-20"
          variants={{
            hidden: { x: -28, opacity: 0 },
            show:   { x: 0,   opacity: 1, transition: { duration: 0.80, ease: EASE } },
            exit:   { x: 28,  opacity: 0, transition: { duration: 1.0,  ease: "easeIn" } },
          }}
          initial="hidden" animate="show" exit="exit"
        >
          <ReviewBadge review={review} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

// ─── Domain search data ───────────────────────────────────────────────────────

const domainResults = [
  { domain: "yourcompany.com", available: true,  price: "€12.99/yr" },
  { domain: "yourcompany.io",  available: true,  price: "€34.99/yr" },
  { domain: "yourcompany.net", available: false, price: null },
  { domain: "yourcompany.co",  available: true,  price: "€9.99/yr" },
];

const trustItems = [
  "99.99% Uptime SLA",
  "Free SSL certificates",
  "24/7 expert support",
  "30-day money back",
];

export function Hero() {
  const [query, setQuery]       = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (query.trim()) setSearched(true);
  };

  return (
    <section className="relative z-1 min-h-screen overflow-hidden bg-white">
      {/* Ambient gradient — right side, behind content */}
      <AmbientGradientLayer />

      {/* Content */}
      <div className="relative z-10 flex items-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-20">
            <div className="flex-1 min-w-0">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-6 bg-brand-500/10 text-brand-700 border border-brand-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                Trusted by 50,000+ businesses worldwide
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-5xl sm:text-6xl font-bold text-brand-900 leading-tight tracking-tight"
            >
              Your business deserves{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(90deg, #007599, #1badc3, #0988a7, #007599)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradient-sweep 5s linear infinite",
                }}
              >fast, reliable</span> hosting
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-6 text-lg text-brand-900/55 leading-relaxed"
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
              <PrimaryButton href="/tilaa" arrow>Aloita</PrimaryButton>
              <motion.a
                href="#pricing"
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-brand-900 border border-brand-900/15 hover:bg-brand-900/5 transition-colors"
                style={{ background: "rgba(27,48,66,0.06)" }}
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
                  background: "rgba(27,48,66,0.04)",
                  borderColor: "rgba(27,48,66,0.10)",
                }}
              >
                <p className="text-xs font-semibold text-brand-900/40 uppercase tracking-widest mb-3">
                  Find your perfect domain
                </p>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <div
                    className="flex-1 flex items-center gap-2 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(27,48,66,0.04)",
                      border: "1px solid rgba(27,48,66,0.08)",
                    }}
                  >
                    <Search className="w-4 h-4 shrink-0" style={{ color: "rgba(27,48,66,0.30)" }} />
                    <input
                      type="text"
                      placeholder="yourcompany.com"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="flex-1 bg-transparent text-brand-900 text-sm font-medium outline-none placeholder:text-brand-900/30"
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
                          background: "rgba(27,48,66,0.03)",
                          border: "1px solid rgba(27,48,66,0.07)",
                        }}
                      >
                        <div className="flex items-center gap-2.5">
                          {result.available ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                          <span className="text-sm font-medium text-brand-900">
                            {result.domain}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          {result.available ? (
                            <>
                              <span className="text-sm font-semibold text-brand-900">
                                {result.price}
                              </span>
                              <PrimaryButton className="px-3 py-1.5 text-xs">Add</PrimaryButton>
                            </>
                          ) : (
                            <span className="text-sm text-brand-900/35">Taken</span>
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
                        className="px-2.5 py-1 text-xs font-medium text-brand-900/40 rounded-lg"
                        style={{ background: "rgba(27,48,66,0.05)" }}
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
                <div key={item} className="flex items-center gap-2 text-sm text-brand-900/50">
                  <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
            </div>{/* end left column */}

            {/* Right: hero image card */}
            <div className="hidden lg:block shrink-0">
              <div
                className="hero-card-border rounded-3xl p-0.5 relative"
                style={{ boxShadow: "0 24px 80px rgba(15,23,42,0.12)" }}
              >
                <HeroFeatureCards />
                <div className="rounded-[22px] p-8 bg-white/60 backdrop-blur-2xl">
                  <div className="rounded-2xl overflow-hidden" style={{ width: 420, height: 560 }}>
                    <img
                      src="/hero-image.png"
                      alt=""
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>{/* end flex row */}
        </div>
      </div>
    </section>
  );
}
