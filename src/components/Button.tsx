import Link from "next/link";
import type { ReactNode } from "react";

/* Simple reusable button. Renders as a <Link> when href is given,
   otherwise as a <button>. Variants: primary / secondary / ghost. */

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-display font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<string, string> = {
  primary:
    "bg-gradient-to-r from-sakura to-sakura-soft text-midnight shadow-[0_8px_30px_rgba(255,158,187,0.35)] hover:shadow-[0_8px_40px_rgba(255,158,187,0.55)] hover:-translate-y-0.5",
  secondary:
    "border border-violet-glow/50 text-ink bg-violet-glow/10 hover:bg-violet-glow/20 hover:border-violet-glow hover:-translate-y-0.5",
  ghost: "text-muted hover:text-sakura hover:bg-white/5",
};

const sizes: Record<string, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
