import Image from "next/image";

/* The NihongoVerse teacher mascot (original illustration, public/mascot.png).
   Shown with a soft glow ring so it sits nicely on the dark background. */

type MascotImageProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export default function MascotImage({
  size = 420,
  className = "",
  priority = false,
}: MascotImageProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow behind the mascot */}
      <div
        aria-hidden="true"
        className="absolute inset-6 rounded-full bg-violet-glow/25 blur-3xl"
      />
      <Image
        src="/mascot.png"
        alt="Sakura-sensei, the NihongoVerse anime teacher mascot, waving hello"
        width={size}
        height={size}
        priority={priority}
        className="relative rounded-[2rem] border border-line/60 shadow-[0_20px_80px_rgba(139,92,246,0.35)]"
      />
    </div>
  );
}
