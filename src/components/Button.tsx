"use client";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Shared types ─────────────────────────────────────────────────────────────

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  arrow?: boolean;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

// ─── PrimaryButton ────────────────────────────────────────────────────────────
// Filled dark/blue background, shimmer sweep, lift + shadow on hover, tap scale

export function PrimaryButton({
  children,
  href,
  onClick,
  type,
  arrow = false,
  className,
  disabled,
  fullWidth,
}: ButtonProps) {
  const Tag = href ? "a" : "button";

  return (
    <motion.div
      className={cn("inline-block", fullWidth && "block w-full")}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <Tag
        href={href}
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={cn(
          "group relative inline-flex items-center gap-2 overflow-hidden",
          "transform-[translateZ(0)]",
          "rounded-full bg-indigo-600 px-6 py-2.5",
          "text-sm font-semibold text-white",
          "shadow-md shadow-indigo-500/20",
          "outline-none focus:outline-none",
          "transition-shadow duration-200",
          "hover:shadow-lg hover:shadow-indigo-500/30",
          "disabled:pointer-events-none disabled:opacity-50",
          fullWidth && "w-full justify-center",
          className
        )}
      >
        {/* Shimmer sweep */}
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 -translate-x-full",
            "bg-gradient-to-r from-transparent via-white/20 to-transparent",
            "transition-transform duration-500 ease-in-out",
            "group-hover:translate-x-full"
          )}
        />

        <span className="relative">{children}</span>

        {arrow && (
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
        )}
      </Tag>
    </motion.div>
  );
}

// ─── SecondaryButton ──────────────────────────────────────────────────────────
// White background, animated gradient border on hover, lift + soft shadow

export function SecondaryButton({
  children,
  href,
  onClick,
  type,
  arrow = false,
  className,
  disabled,
  fullWidth,
}: ButtonProps) {
  const Tag = href ? "a" : "button";

  return (
    <motion.div
      className={cn("group inline-block", fullWidth && "block w-full")}
      whileHover={{ y: -1.5 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      {/* Gradient border wrapper */}
      <div
        className={cn(
          "relative rounded-full p-px",
          "bg-slate-200",
          "transition-all duration-200",
          "group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:via-violet-400 group-hover:to-indigo-400",
          "shadow-sm group-hover:shadow-md group-hover:shadow-slate-200/80",
          fullWidth && "block w-full"
        )}
      >
        <Tag
          href={href}
          onClick={onClick}
          type={type}
          disabled={disabled}
          className={cn(
            "relative inline-flex items-center gap-2",
            "rounded-full bg-white px-6 py-2.5",
            "text-sm font-semibold text-slate-700",
            "transition-colors duration-200",
            "hover:text-slate-900",
            "disabled:pointer-events-none disabled:opacity-50",
            fullWidth && "w-full justify-center",
            className
          )}
        >
          {children}
          {arrow && (
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          )}
        </Tag>
      </div>
    </motion.div>
  );
}

// ─── GhostButton ──────────────────────────────────────────────────────────────
// Transparent, text only, arrow slides right, color shift on hover

export function GhostButton({
  children,
  href,
  onClick,
  arrow = true,
  className,
  disabled,
}: ButtonProps) {
  const Tag = href ? "a" : "button";

  return (
    <motion.div
      className="inline-block"
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
    >
      <Tag
        href={href}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "group inline-flex items-center gap-1.5",
          "rounded-full px-3 py-2",
          "text-sm font-medium text-slate-500",
          "transition-colors duration-150",
          "hover:text-slate-900",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
      >
        {children}
        {arrow && (
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition-all duration-200" />
        )}
      </Tag>
    </motion.div>
  );
}

// ─── MegaMenuCtaPill ──────────────────────────────────────────────────────────
// Calm hover: light blue bg, cyan border, arrow slides, 1px lift

export function MegaMenuCtaPill({
  children,
  href = "#",
  className,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn(
        "group inline-flex items-center gap-2",
        "rounded-full border border-slate-200 bg-white px-4 py-2",
        "text-xs font-semibold text-slate-600",
        "transition-colors duration-150",
        "hover:border-cyan-300 hover:bg-blue-50 hover:text-indigo-700",
        "shadow-sm hover:shadow",
        className
      )}
    >
      {children}
      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all duration-150" />
    </motion.a>
  );
}
