import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { news } from '../content'

export default function NewsPage() {
  return (
    <>
      <Seo title="News" description="Research notes and announcements from Stats-Powered AI Lab." path="/news" />
      <PageHero
        index="05"
        eyebrow="Notes & announcements"
        title="What changed, and why it matters."
        description="A record of releases, research updates, talks, and lab announcements—published only when there is something concrete to say."
      />
      <section className="container-shell page-section">
        {news.length ? (
          <div className="news-list">
            {news.map((post) => (
              <article key={post.slug}>
                <time dateTime={post.date}>{post.date}</time><h2>{post.title}</h2><p>{post.summary}</p>
                <Link className="text-link" to={`/news/${post.slug}`}>Read note <Arrow /></Link>
              </article>
            ))}
          </div>
        ) : <EmptyState index="N" title="No announcements yet" body="The lab will use this space for verified releases and substantive updates rather than filler content." link={{ label: 'Read our research agenda', to: '/research' }} />}
      </section>
    </>
  )
}
