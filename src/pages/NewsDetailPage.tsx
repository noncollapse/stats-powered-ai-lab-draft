import { Link, useParams } from 'react-router'
import Arrow from '../components/Arrow'
import Seo from '../components/Seo'
import { newsBySlug } from '../content'
import NotFoundPage from './NotFoundPage'

export default function NewsDetailPage() {
  const { slug } = useParams()
  const post = newsBySlug(slug)
  if (!post) return <NotFoundPage />

  return (
    <>
      <Seo title={post.title} description={post.summary} path={`/news/${post.slug}`} type="article" />
      <article className="detail-page container-shell prose-page">
        <Link className="back-link" to="/news"><Arrow direction="left" /> All news</Link>
        <header className="detail-header"><time dateTime={post.date}>{post.date}</time><h1>{post.title}</h1><p className="detail-header__summary">{post.summary}</p></header>
        <div className="prose-copy">{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </article>
    </>
  )
}
