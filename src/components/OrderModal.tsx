"use client";
import { useState, useEffect, useLayoutEffect, useCallback, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { OrderPage } from "./OrderPage";

const PANEL_EASE = [0.16, 1, 0.3, 1] as const;

export function OrderModal() {
  const router        = useRouter();
  const pathname      = usePathname();
  const [out, setOut] = useState(false);
  const wrapRef       = useRef<HTMLDivElement>(null);

  // Runs on mount AND whenever pathname changes back to /tilaa (component reuse).
  // This handles the case where Next.js keeps the @modal slot mounted across
  // navigations instead of fully unmounting it.
  useLayoutEffect(() => {
    if (!pathname?.includes('tilaa')) return;
    setOut(false);
    const el = wrapRef.current;
    if (el) { el.style.visibility = ''; el.style.pointerEvents = ''; }
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [pathname]);

  const close = useCallback(() => {
    if (out) return;
    setOut(true);
    setTimeout(() => {
      document.body.style.overflow = '';
      // Hide via DOM ref — removes blocking elements without React state
      // so there's no stale boolean that persists across component reuse
      const el = wrapRef.current;
      if (el) { el.style.visibility = 'hidden'; el.style.pointerEvents = 'none'; }
      // router.back() treats hash-URLs (/#pricing) as hash-only changes,
      // so Next.js skips updating the @modal slot → modal never unmounts.
      // replace('/') forces a clean route change that clears the slot.
      router.replace('/', { scroll: false });
    }, 380);
  }, [out, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div ref={wrapRef} data-overlay className="fixed inset-0 z-100">

      {/* Backdrop — white 60% + 2 gradient blobs anchored to viewport bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: out ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 70% 55% at 25% 100%, rgba(0,95,125,0.50) 0%, transparent 70%)",
            "radial-gradient(ellipse 65% 50% at 78% 100%, rgba(27,173,195,0.38) 0%, transparent 65%)",
            "rgba(255,255,255,0.60)",
          ].join(", "),
        }}
      />

      {/* Scroll container — inset-0 so scrollbar sits at viewport right edge */}
      <div className="absolute inset-0 overflow-y-auto" onClick={close}>
      <motion.div onClick={e => e.stopPropagation()}
        initial={{ y: 72, opacity: 0, scale: 0.98 }}
        animate={out
          ? { y: 56, opacity: 0, scale: 0.97 }
          : { y: 0,  opacity: 1, scale: 1 }
        }
        transition={out
          ? { duration: 0.35, ease: "easeIn" }
          : { duration: 0.52, ease: PANEL_EASE }
        }
        className="mx-auto max-w-7xl mt-[10vh] pb-16"
      >
        {/* Close button — sticks to viewport top as content scrolls */}
        <div className="sticky top-4 z-10 flex justify-end pr-5 py-3 pointer-events-none">
          <button
            onClick={close}
            aria-label="Sulje"
            className="pointer-events-auto w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-900 hover:border-slate-300 transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <OrderPage />
      </motion.div>
      </div>

    </div>
  );
}
