"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/* Site navigation. Sticky top bar + a mobile menu that opens/closes.
   Links: Home, Courses, Pricing, About, Contact. */

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-midnight/85 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-glow to-sakura font-display text-lg font-bold text-midnight"
            aria-hidden="true"
          >
            桜
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            Nihongo<span className="text-sakura">Verse</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(l.href)
                    ? "bg-violet-glow/15 text-sakura"
                    : "text-muted hover:bg-white/5 hover:text-ink"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/courses"
            className="rounded-full bg-gradient-to-r from-sakura to-sakura-soft px-5 py-2.5 font-display text-sm font-semibold text-midnight transition-transform hover:-translate-y-0.5"
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-white/5 md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="border-t border-line/60 bg-midnight/95 px-4 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium ${
                    isActive(l.href)
                      ? "bg-violet-glow/15 text-sakura"
                      : "text-muted hover:bg-white/5 hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/courses"
                onClick={() => setOpen(false)}
                className="block rounded-full bg-gradient-to-r from-sakura to-sakura-soft px-5 py-3 text-center font-display font-semibold text-midnight"
              >
                Start Learning
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
