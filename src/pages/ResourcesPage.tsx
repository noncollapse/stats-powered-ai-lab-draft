import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { resources } from '../content'
import Arrow from '../components/Arrow'

export default function ResourcesPage() {
  return (
    <>
      <Seo title="Resources" description="Research writing and seminar conversations from Stats-Powered AI Lab." path="/resources" />
      <PageHero
        index="04"
        eyebrow="Ideas in circulation"
        title="Research grows through writing and conversation."
        description="The Blog makes technical ideas easier to inspect. The Seminar Series creates a home for talks, reading discussions, and work in progress."
      />
      <section className="container-shell page-section">
        {resources.length ? (
          <div className="resource-hubs">
            {resources.map((resource, index) => (
              <article key={resource.slug} className={`resource-hub resource-hub--${resource.type.toLowerCase()}`}>
                <div className="resource-hub__top"><span>0{index + 1}</span><span>{resource.type}</span></div>
                <div className="resource-hub__visual" aria-hidden="true">
                  {resource.type === 'Blog' ? <><i /><i /><i /><i /></> : <><b /><b /><b /><b /><b /></>}
                </div>
                <div className="resource-hub__body">
                  <h2>{resource.title}</h2>
                  <p>{resource.summary}</p>
                  {resource.url ? <a className="text-link" href={resource.url}>Open {resource.type.toLowerCase()} <Arrow /></a> : <span className="resource-hub__status">Programme forthcoming</span>}
                </div>
              </article>
            ))}
          </div>
        ) : <EmptyState index="R" title="The resource programme is being prepared" body="Blog posts and seminar schedules will appear here once verified material is ready." link={{ label: 'Browse research directions', to: '/research' }} />}
        <div className="release-standard resource-principles">
          <span className="section-kicker">Editorial standard</span>
          <div><strong>Substantive</strong><p>Every post or session should begin with a real research question.</p></div>
          <div><strong>Accessible</strong><p>Technical depth should come with enough context to follow the argument.</p></div>
          <div><strong>Traceable</strong><p>Notes and discussions should connect back to sources and research records.</p></div>
        </div>
      </section>
    </>
  )
}
