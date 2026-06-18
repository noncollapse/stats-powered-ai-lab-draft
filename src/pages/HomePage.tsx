import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import EmptyState from '../components/EmptyState'
import InferenceField from '../components/InferenceField'
import PublicationCard from '../components/PublicationCard'
import ResearchCard from '../components/ResearchCard'
import Seo from '../components/Seo'
import { publications, researchProjects, resources } from '../content'

export default function HomePage() {
  const latestPublications = publications.filter((item) => item.featured).slice(0, 3)

  return (
    <>
      <Seo
        title="Stats-Powered AI Lab"
        description="Stats-Powered AI Lab studies statistical foundations for reliable AI, from LLM policy learning and AIGC detection to frontier statistical research."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ResearchOrganization',
          name: 'Stats-Powered AI Lab',
          description: 'Statistical foundations for reliable generative AI.',
          url: window.location.origin,
        }}
      />

      <section className="home-hero container-shell">
        <div className="home-hero__copy">
          <div className="signal-label"><span className="signal-label__dot" /> Independent research lab</div>
          <h1>Evidence,<br /><em>not instinct.</em></h1>
          <p>We develop statistical foundations for AI systems that must be detected, aligned, and understood—not merely deployed.</p>
          <div className="hero-actions">
            <Link className="primary-button" to="/research">Explore our research <Arrow /></Link>
            <Link className="secondary-button" to="/publications">Open Paper Bank</Link>
          </div>
        </div>
        <InferenceField />
        <div className="home-hero__footnote">
          <span>Stats-Powered · Research System 01</span>
          <span>Scroll to explore <Arrow direction="down" /></span>
        </div>
      </section>

      <section className="principle-strip" aria-label="Research principles">
        <div className="container-shell">
          <span>Statistical rigour</span>
          <span>Inspectable evidence</span>
          <span>Robust decisions</span>
        </div>
      </section>

      <section className="section-block container-shell">
        <div className="section-heading">
          <div><span>[01]</span><span>Research directions</span></div>
          <div>
            <h2>Three ways to make<br />intelligence more accountable.</h2>
            <p>Our programmes connect statistical theory to the changing mechanics of generative and decision-making systems.</p>
          </div>
        </div>
        <div className="research-grid">
          {researchProjects.map((project) => <ResearchCard key={project.slug} project={project} />)}
        </div>
      </section>

      <section className="section-block section-block--ruled container-shell">
        <div className="section-heading section-heading--compact">
          <div><span>[02]</span><span>Selected work</span></div>
          <div>
            <h2>Research records</h2>
            <Link className="text-link" to="/publications">Open Paper Bank <Arrow /></Link>
          </div>
        </div>
        <div className="publication-list">
          {latestPublications.length ? latestPublications.map((publication, index) => (
            <PublicationCard key={publication.slug} publication={publication} index={index} />
          )) : <EmptyState title="Publication records are being prepared" body="Verified metadata will appear here once it is ready for release." />}
        </div>
      </section>

      <section className="section-block container-shell home-split">
        <div className="home-split__visual" aria-hidden="true">
          <span className="orbital orbital--one" />
          <span className="orbital orbital--two" />
          <span className="orbital orbital--three" />
          <span className="home-split__cross">+</span>
          <p>IDEAS IN<br />CIRCULATION</p>
        </div>
        <div className="home-split__content">
          <span className="section-kicker">[03] Open resources</span>
          <h2>Research also lives between papers.</h2>
          <p>Our Blog will unpack ideas and methods; the Seminar Series will create space for talks, reading discussions, and work in progress.</p>
          {resources.length ? (
            <Link className="primary-button" to="/resources">Explore blog & seminars <Arrow /></Link>
          ) : (
            <Link className="secondary-button" to="/resources">Resource registry forthcoming <Arrow /></Link>
          )}
        </div>
      </section>

      <section className="join-band">
        <div className="container-shell">
          <div><span>[04]</span><span>People & collaboration</span></div>
          <h2>Bring a difficult question.</h2>
          <p>We are building a research culture for careful thinkers across statistics, machine learning, and real-world AI systems.</p>
          <Link className="primary-button primary-button--light" to="/join">Join the lab <Arrow /></Link>
        </div>
      </section>
    </>
  )
}
