"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  Globe, ChevronDown, Search, Menu, X, ArrowRight,
  Server, ExternalLink,
} from "lucide-react";
import { GhostButton, PrimaryButton } from "@/components/Button";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MenuLink {
  label: string;
  description: string;
  href: string;
}

export interface MenuColumn {
  title: string;
  links: MenuLink[];
}

export interface MenuPromoCard {
  type: "domain" | "status";
}

export interface MenuItem {
  id: string;
  label: string;
  href?: string;
  columns?: MenuColumn[];
  promo?: MenuPromoCard;
}


// ─── Promo cards ──────────────────────────────────────────────────────────────

const STATUS_REGIONS = [
  { name: "EU-West (Helsinki)",   ping: 8  },
  { name: "EU-Central (Tampere)", ping: 11 },
  { name: "EU-North (Oulu)",      ping: 14 },
  { name: "Arctic (Rovaniemi)",   ping: 18 },
];

function StatusPromoCard() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Server className="w-5 h-5 text-indigo-500" />
        <span className="text-sm font-semibold text-slate-900">Infrastruktuuri</span>
      </div>
      <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-emerald-50 rounded-xl border border-emerald-100">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span className="text-xs font-semibold text-emerald-700">Kaikki järjestelmät toiminnassa</span>
      </div>
      <div className="flex-1 divide-y divide-slate-100">
        {STATUS_REGIONS.map((r) => (
          <div key={r.name} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-600">{r.name}</span>
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-600">{r.ping}ms</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100">
        <p className="text-xs text-slate-400 mb-2.5">99.99% uptime — viimeiset 30 pv</p>
        <a href="#" className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          Tarkista tila <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

const TLD_PRICES = [
  { tld: ".fi",  price: "€7.99"  },
  { tld: ".com", price: "€12.99" },
  { tld: ".io",  price: "€34.99" },
  { tld: ".eu",  price: "€9.99"  },
];

function DomainPromoCard() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-indigo-500" />
        <span className="text-sm font-semibold text-slate-900">Suosituimmat TLD:t</span>
      </div>
      <div className="flex-1 divide-y divide-slate-100">
        {TLD_PRICES.map(({ tld, price }) => (
          <div key={tld} className="flex items-center justify-between py-2.5">
            <span className="text-sm font-mono font-bold text-slate-800">{tld}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">{price}/v</span>
              <span className="px-1.5 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full">
                Saatavilla
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">+ 500 muuta TLD:tä</span>
        <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          Selaa kaikkia <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

const PROMO_COMPONENTS: Record<MenuPromoCard["type"], React.ComponentType> = {
  domain: DomainPromoCard,
  status: StatusPromoCard,
};

// ─── Directional slide variants ───────────────────────────────────────────────
// dir:  1 = new item is to the right → enter from right, exit to left
// dir: -1 = new item is to the left  → enter from left,  exit to right
// dir:  0 = first open               → neutral fade

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir === 0 ? 0 : dir * 28,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.16, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: (dir: number) => ({
    x: dir === 0 ? 0 : dir * -28,
    opacity: 0,
    transition: { duration: 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

// ─── Mega menu content ────────────────────────────────────────────────────────

function MegaMenuContent({ item }: { item: MenuItem }) {
  if (!item.columns) return null;

  const PromoComponent = item.promo ? PROMO_COMPONENTS[item.promo.type] : null;
  const gridCols = [
    ...item.columns.map(() => "1fr"),
    ...(PromoComponent ? ["260px"] : []),
  ].join(" ");

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: gridCols, gap: "1.5rem" }}
      className="p-6"
    >
      {item.columns.map((col) => (
        <div key={col.title}>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3 px-3">
            {col.title}
          </p>
          <ul className="space-y-0.5">
            {col.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group flex flex-col px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug">
                    {link.label}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5 leading-snug">{link.description}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {PromoComponent && (
        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
          <PromoComponent />
        </div>
      )}
    </div>
  );
}

// ─── Mobile accordion item ────────────────────────────────────────────────────

function MobileNavItem({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);

  if (!item.columns) {
    return (
      <a
        href={item.href ?? "#"}
        className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-colors"
      >
        {item.label}
      </a>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors"
      >
        {item.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0 }}
        transition={{ duration: 0.24, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pb-2 pl-4 space-y-3">
          {item.columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mt-3 mb-1 px-1">
                {col.title}
              </p>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2 text-sm text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

interface NavbarProps {
  items: MenuItem[];
}

export function Navbar({ items }: NavbarProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Ref so openMenu always reads the latest index without stale closures
  const activeIndexRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const openMenu = useCallback((newIndex: number) => {
    clearTimer();
    const curr = activeIndexRef.current;
    setDirection(curr === null ? 0 : newIndex > curr ? 1 : -1);
    activeIndexRef.current = newIndex;
    setActiveIndex(newIndex);
  }, [clearTimer]);

  const scheduleClose = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setActiveIndex(null);
      activeIndexRef.current = null;
    }, 250);
  }, []);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 p-3"
      onMouseLeave={scheduleClose}
    >
      {/* ── Floating navbar ─────────────────────────────────────────────────── */}
      <nav className="max-w-7xl mx-auto bg-white border border-slate-100 shadow-sm rounded-2xl px-4 md:px-5">
        <div className="flex items-center h-14 gap-1">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 flex-shrink-0 mr-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-[15px] font-bold text-slate-900 hidden sm:block tracking-tight">
              NexaHost
            </span>
          </a>

          {/* Desktop links — index from map() drives direction logic */}
          <div className="hidden md:flex items-center gap-0.5 flex-1">
            {items.map((item, index) => {
              const hasMega = Boolean(item.columns);
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => hasMega ? openMenu(index) : clearTimer()}
                  onClick={() => {
                    if (!hasMega && item.href) window.location.href = item.href;
                    else if (hasMega) isActive ? setActiveIndex(null) : openMenu(index);
                  }}
                  className={cn(
                    "flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-xl transition-colors whitespace-nowrap select-none",
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {item.label}
                  {hasMega && (
                    <motion.span animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </motion.span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={() => setSearchOpen((p) => !p)}
              aria-label="Haku"
              className={cn(
                "p-2 rounded-xl transition-colors",
                searchOpen
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              )}
            >
              <Search className="w-4 h-4" />
            </button>

            <span className="hidden md:inline-flex">
              <GhostButton href="#" arrow={false}>Kirjaudu</GhostButton>
            </span>

            <PrimaryButton arrow>Aloita</PrimaryButton>

            {/* Hamburger */}
            <button
              className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Valikko"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Inline search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              key="search"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden border-t border-slate-100"
            >
              <div className="py-3 px-1">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                  <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    placeholder="Etsi palveluita, ohjeita..."
                    className="flex-1 bg-transparent text-sm text-slate-800 placeholder-slate-400 outline-none"
                  />
                  <kbd className="hidden sm:block text-xs text-slate-300 font-mono bg-white border border-slate-200 px-1.5 py-0.5 rounded">Esc</kbd>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Desktop mega menu ──────────────────────────────────────────────────
          Outer shell mounts/unmounts once (null ↔ active).
          Inner content slides directionally between items.               ───── */}
      <AnimatePresence>
        {activeItem?.columns && (
          <motion.div
            key="mega-shell"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="hidden md:block max-w-7xl mx-auto mt-2 bg-white border border-slate-100 shadow-lg rounded-2xl overflow-hidden"
            onMouseEnter={clearTimer}
          >
            <AnimatePresence custom={direction} mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <MegaMenuContent item={activeItem} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden max-w-7xl mx-auto mt-2 bg-white border border-slate-100 shadow-lg rounded-2xl overflow-hidden"
          >
            <div className="p-3 max-h-[80vh] overflow-y-auto">
              <div className="space-y-0.5">
                {items.map((item) => (
                  <MobileNavItem key={item.id} item={item} />
                ))}
              </div>

              <div className="border-t border-slate-100 mt-3 pt-3 flex flex-col gap-2">
                <a
                  href="#"
                  className="block text-center py-2.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Kirjaudu
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Aloita <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
