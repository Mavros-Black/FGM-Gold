export function SectionHeading({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className={light ? "section-heading light" : "section-heading"}>
    <span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}
  </div>;
}