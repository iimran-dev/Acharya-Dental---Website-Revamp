"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------
   LuxuryButton — restrained, premium button system
   Variants: primary (navy), gold, outline, light (for dark bg), ghost
   Sizes: sm, md, lg
   --------------------------------------------------------------- */

type Variant = "primary" | "gold" | "outline" | "light" | "whatsapp";
type Size = "sm" | "md" | "lg";

export interface LuxuryButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  as?: "button" | "link";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  ariaLabel?: string;
  disabled?: boolean;
}

const base =
  "btn-lux inline-flex items-center justify-center gap-2.5 rounded-md select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--navy)] text-white hover:bg-[var(--navy-700)] shadow-[0_10px_30px_-15px_rgba(16,35,63,0.5)]",
  gold:
    "bg-[var(--gold)] text-[var(--navy)] hover:bg-[var(--gold-soft)] shadow-[0_10px_30px_-15px_rgba(200,161,90,0.55)]",
  outline:
    "bg-transparent text-[var(--navy)] border border-[var(--navy)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)]",
  light:
    "bg-white/0 text-white border border-white/40 hover:border-[var(--gold-soft)] hover:text-[var(--gold-soft)] backdrop-blur-sm",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1da851] shadow-[0_10px_30px_-15px_rgba(37,211,102,0.5)]",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.72rem]",
  md: "px-7 py-3.5 text-[0.78rem]",
  lg: "px-9 py-4 text-[0.82rem]",
};

export function LuxuryButton({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  href,
  onClick,
  type = "button",
  className,
  icon,
  iconRight,
  fullWidth = false,
  ariaLabel,
  disabled = false,
}: LuxuryButtonProps) {
  const classes = cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );

  const inner = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </>
  );

  if (as === "link" && href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={cn(classes, disabled && "opacity-50 cursor-not-allowed")}
    >
      {inner}
    </button>
  );
}
