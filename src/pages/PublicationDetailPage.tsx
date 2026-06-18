import { Link, useParams } from 'react-router'
import Arrow from '../components/Arrow'
import Seo from '../components/Seo'
import { publicationBySlug } from '../content'
import NotFoundPage from './NotFoundPage'

export default function PublicationDetailPage() {
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
        <Link className="back-link" to="/publications"><Arrow direction="left" /> Paper Bank</Link>
        <header className="detail-header">
          <div className="detail-header__meta">
            <span>Year {publication.year}</span>
            <span>arXiv:{publication.arxivId}</span>
            <a className="publication-detail__pdf" href={publication.pdfUrl} target="_blank" rel="noreferrer">View PDF ↗</a>
          </div>
          <h1>{publication.title}</h1>
          <p className="publication-detail__authors">
            {publication.authors.join(', ')}
          </p>
        </header>

        <div className="detail-grid">
          <aside>
            <span>Topics</span>
            <ul>{publication.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
          </aside>
          <div className="detail-copy">
            <section>
              <span className="section-kicker">Abstract</span>
              <p>{publication.abstract}</p>
              <a className="abstract-full-text" href={publication.pdfUrl} target="_blank" rel="noreferrer">
                Full text <Arrow />
              </a>
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
