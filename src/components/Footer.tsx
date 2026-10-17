import Link from "next/link";
import CurrentYear from "@/components/CurrentYear";

/* Site footer: brand, quick links, course links, legal links. */

const exploreLinks = [
  { href: "/courses", label: "All Courses" },
  { href: "/courses/n5", label: "N5 Course" },
  { href: "/courses/n4", label: "N4 Course" },
  { href: "/pricing", label: "Pricing" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/refund-policy", label: "Refund Policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line/60 bg-panel/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-glow to-sakura font-display text-lg font-bold text-midnight"
              aria-hidden="true"
            >
              桜
            </span>
            <span className="font-display text-xl font-bold text-ink">
              Nihongo<span className="text-sakura">Verse</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Learn Japanese. Live the Journey. Anime-inspired JLPT courses with
            Hinglish explanations, made for Indian learners.
          </p>
        </div>

        {/* Explore */}
        <nav aria-label="Explore">
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-faint">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5">
            {exploreLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted hover:text-sakura">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label="Company">
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-faint">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5">
            {companyLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted hover:text-sakura">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Legal */}
        <nav aria-label="Legal">
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-faint">
            Legal
          </h3>
          <ul className="mt-4 space-y-2.5">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-muted hover:text-sakura">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-faint sm:flex-row sm:px-6">
          <p>© <CurrentYear /> NihongoVerse. All rights reserved.</p>
          <p>Built with care in India 🇮🇳 — 桜</p>
        </div>
      </div>
    </footer>
  );
}
