"use client";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
          {
            "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-sm": variant === "primary",
            "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-500 shadow-sm": variant === "secondary",
            "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 focus:ring-slate-300": variant === "outline",
            "text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-300": variant === "ghost",
          },
          {
            "text-sm px-3.5 py-2": size === "sm",
            "text-sm px-5 py-2.5": size === "md",
            "text-base px-7 py-3.5": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
