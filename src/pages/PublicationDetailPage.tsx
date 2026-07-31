import { Link, useParams } from 'react-router'
import Arrow from '../components/Arrow'
import Seo from '../components/Seo'
import { publicationBySlug } from '../content'
import { pick, useLanguage } from '../i18n/LanguageContext'
import NotFoundPage from './NotFoundPage'

export default function PublicationDetailPage() {
  const { language } = useLanguage()
  const { slug } = useParams()
  const publication = publicationBySlug(slug)
  if (!publication) return <NotFoundPage />

  const description = publication.abstract

  return (
    <>
      <Seo
        title={publication.title}
        description={description}
        path={`/publications/${publication.slug}`}
        type="article"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ScholarlyArticle',
          headline: publication.title,
          datePublished: String(publication.year),
          author: publication.authors.map((name) => ({ '@type': 'Person', name })),
          url: `https://arxiv.org/abs/${publication.arxivId}`,
        }}
      />
      <article className="detail-page container-shell publication-detail">
        <Link className="back-link" to="/publications"><Arrow direction="left" /> {pick(language, 'Paper Bank', '论文库')}</Link>
        <header className="detail-header">
          <div className="detail-header__meta">
            <span>{pick(language, 'Year', '年份')} {publication.year}</span>
            <span>arXiv:{publication.arxivId}</span>
            <a className="publication-detail__pdf" href={publication.pdfUrl} target="_blank" rel="noreferrer">{pick(language, 'View PDF', '查看 PDF')} ↗</a>
          </div>
          <h1>{publication.title}</h1>
          <p className="publication-detail__authors">
            {publication.authors.join(', ')}
          </p>
        </header>

        <div className="detail-grid">
          <aside>
            <span>{pick(language, 'Topics', '主题')}</span>
            <ul>{publication.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
          </aside>
          <div className="detail-copy">
            <section>
              <span className="section-kicker">{pick(language, 'Abstract', '英文摘要')}</span>
              <p>{publication.abstract}</p>
              <a className="abstract-full-text" href={publication.pdfUrl} target="_blank" rel="noreferrer">
                {pick(language, 'Full text', '查看全文')} <Arrow />
              </a>
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
