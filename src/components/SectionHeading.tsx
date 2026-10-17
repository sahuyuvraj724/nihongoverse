/* Eyebrow + title + optional description for page sections. */

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls} mb-10`}>
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-sakura mb-3">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-muted leading-relaxed">{description}</p>
      )}
    </div>
  );
}
