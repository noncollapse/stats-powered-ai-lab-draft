type PageHeroProps = {
  index: string
  eyebrow: string
  title: string
  description: string
}

export default function PageHero({ index, eyebrow, title, description }: PageHeroProps) {
  return (
    <header className="page-hero container-shell">
      <div className="page-hero__meta">
        <span>[{index}]</span>
        <span>{eyebrow}</span>
      </div>
      <div className="page-hero__body">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  )
}
