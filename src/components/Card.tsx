import type { ReactNode } from "react";

/* Simple reusable card: panel background, soft border, rounded corners.
   Pass hover=true for a gentle lift effect on interactive cards. */

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-line bg-panel p-6 shadow-[0_10px_40px_rgba(0,0,0,0.35)] ${
        hover
          ? "transition-all duration-300 hover:-translate-y-1 hover:border-violet-glow/50 hover:shadow-[0_16px_50px_rgba(139,92,246,0.25)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
