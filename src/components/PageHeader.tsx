/* Simple header for inner pages: eyebrow, title, description. */

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="bg-aurora border-b border-line/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-sakura">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
