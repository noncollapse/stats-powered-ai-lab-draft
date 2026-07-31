import { Link } from 'react-router'
import { pick, useLanguage } from '../i18n/LanguageContext'
import type { Publication } from '../types/content'
import Arrow from './Arrow'

type PublicationCardProps = {
  publication: Publication
  index: number
}

export default function PublicationCard({ publication, index }: PublicationCardProps) {
  const { language } = useLanguage()

  return (
    <article className="publication-row">
      <span className="publication-row__index">{String(index + 1).padStart(2, '0')}</span>
      <div className="publication-row__main">
        <div className="publication-row__meta">
          <span>{pick(language, 'Year', '年份')} {publication.year}</span>
          <a className="publication-row__pdf" href={publication.pdfUrl} target="_blank" rel="noreferrer">{pick(language, 'View PDF', '查看 PDF')} ↗</a>
        </div>
        <h2><Link to={`/publications/${publication.slug}`}>{publication.title}</Link></h2>
        <div className="tag-list" aria-label={pick(language, 'Research topics', '研究主题')}>
          {publication.topics.map((topic) => <span key={topic}>{topic}</span>)}
        </div>
      </div>
      <Link className="icon-link" to={`/publications/${publication.slug}`} aria-label={`${pick(language, 'Read', '阅读')} ${publication.title}`}>
        <Arrow />
      </Link>
    </article>
  )
}
