import { Link } from 'react-router'
import type { Publication } from '../types/content'
import Arrow from './Arrow'

type PublicationCardProps = {
  publication: Publication
  index: number
}

export default function PublicationCard({ publication, index }: PublicationCardProps) {
  return (
    <article className="publication-row">
      <span className="publication-row__index">{String(index + 1).padStart(2, '0')}</span>
      <div className="publication-row__main">
        <div className="publication-row__meta">
          <span>Year {publication.year}</span>
          <a className="publication-row__pdf" href={publication.pdfUrl} target="_blank" rel="noreferrer">View PDF ↗</a>
        </div>
        <h2><Link to={`/publications/${publication.slug}`}>{publication.title}</Link></h2>
        <div className="tag-list" aria-label="Research topics">
          {publication.topics.map((topic) => <span key={topic}>{topic}</span>)}
        </div>
      </div>
      <Link className="icon-link" to={`/publications/${publication.slug}`} aria-label={`Read ${publication.title}`}>
        <Arrow />
      </Link>
    </article>
  )
}
