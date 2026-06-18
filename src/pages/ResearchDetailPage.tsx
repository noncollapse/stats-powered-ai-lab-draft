import { Link, useParams } from 'react-router'
import Arrow from '../components/Arrow'
import DraftBadge from '../components/DraftBadge'
import PublicationCard from '../components/PublicationCard'
import Seo from '../components/Seo'
import { publicationBySlug, researchBySlug } from '../content'
import NotFoundPage from './NotFoundPage'

export default function ResearchDetailPage() {
  const { slug } = useParams()
  const project = researchBySlug(slug)
  if (!project) return <NotFoundPage />
  const related = project.relatedPublications.map(publicationBySlug).filter((item) => item !== undefined)

  return (
    <>
      <Seo title={project.title} description={project.summary} path={`/research/${project.slug}`} />
      <article className="detail-page container-shell">
        <Link className="back-link" to="/research"><Arrow direction="left" /> All research</Link>
        <header className="detail-header">
          <div className="detail-header__meta">
            <span>[{project.index}]</span>
            <span>{project.status}</span>
            {project.draft ? <DraftBadge /> : null}
          </div>
          <p className="eyebrow">{project.eyebrow}</p>
          <h1>{project.title}</h1>
          <p className="detail-header__summary">{project.summary}</p>
        </header>

        <div className="detail-grid">
          <aside>
            <span>Research themes</span>
            <ul>{project.themes.map((theme) => <li key={theme}>{theme}</li>)}</ul>
          </aside>
          <div className="detail-copy">
            <section>
              <span className="section-kicker">The question</span>
              <h2>{project.question}</h2>
            </section>
            <section>
              <span className="section-kicker">The programme</span>
              <p>{project.approach}</p>
            </section>
          </div>
        </div>

        <section className="related-section">
          <div className="section-heading section-heading--compact">
            <div><span>[R]</span><span>Related records</span></div>
            <h2>Papers</h2>
          </div>
          {related.length ? related.map((publication, index) => (
            <PublicationCard key={publication.slug} publication={publication} index={index} />
          )) : <p className="muted-note">No verified publication record is linked to this direction yet.</p>}
        </section>
      </article>
    </>
  )
}
