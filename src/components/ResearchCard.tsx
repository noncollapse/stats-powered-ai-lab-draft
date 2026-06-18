import { Link } from 'react-router'
import type { ResearchProject } from '../types/content'
import Arrow from './Arrow'

export default function ResearchCard({ project }: { project: ResearchProject }) {
  return (
    <article className="research-card">
      <div className="research-card__top">
        <span>{project.index}</span>
        <span>{project.status}</span>
      </div>
      <div className="research-card__signal" aria-hidden="true">
        <span /><span /><span />
      </div>
      <p className="eyebrow">{project.eyebrow}</p>
      <h2>{project.title}</h2>
      <p>{project.summary}</p>
      <Link className="text-link" to={`/research/${project.slug}`}>Explore direction <Arrow /></Link>
    </article>
  )
}
