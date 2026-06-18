import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'

const profiles = [
  ['Statistical depth', 'You enjoy finding the estimator or assumption hiding beneath a fashionable method.'],
  ['Engineering discipline', 'You make experiments reproducible and know that infrastructure shapes evidence.'],
  ['Intellectual generosity', 'You can disagree precisely, revise openly, and make other people’s thinking better.'],
]

export default function JoinPage() {
  return (
    <>
      <Seo title="Join the Lab" description="Future opportunities to join or collaborate with Stats-Powered AI Lab." path="/join" />
      <PageHero
        index="07"
        eyebrow="Join & collaborate"
        title="Bring a difficult question. Stay for the evidence."
        description="We welcome future conversations with researchers and engineers working across statistics, machine learning, and reliable AI systems."
      />
      <section className="container-shell join-layout">
        <div className="join-layout__main">
          <span className="section-kicker">Who may thrive here</span>
          {profiles.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{body}</p></div></article>)}
        </div>
        <aside className="join-status">
          <span className="signal-label"><span className="signal-label__dot signal-label__dot--quiet" /> Contact channel pending</span>
          <h2>No open call is published yet.</h2>
          <p>A real email address and application process have not been supplied, so this preview does not transmit or collect any personal information.</p>
          <button type="button" disabled>Contact the lab <Arrow /></button>
          <span>Applications will open here when a verified channel is available.</span>
        </aside>
      </section>
      <section className="container-shell collaboration-note">
        <div><span>[C]</span><span>Collaboration</span></div>
        <div><h2>Already working on a related problem?</h2><p>Future collaboration notes should identify the research question, the evidence available, and what a useful joint outcome would look like.</p><Link className="text-link" to="/research">See our research directions <Arrow /></Link></div>
      </section>
    </>
  )
}
