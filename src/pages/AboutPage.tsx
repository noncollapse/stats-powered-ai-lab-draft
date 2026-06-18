import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'

const principles = [
  ['01', 'Assumptions are part of the result', 'We make the conditions behind a method visible enough to question.'],
  ['02', 'Uncertainty is not decoration', 'A reliable decision needs to communicate what the evidence cannot settle.'],
  ['03', 'Robustness requires an adversary', 'We look for shifts and failure modes before they find the system in practice.'],
  ['04', 'Release only what can be traced', 'Claims should connect to records, methods, and artefacts that others can inspect.'],
]

export default function AboutPage() {
  return (
    <>
      <Seo title="About" description="The mission and research principles of Stats-Powered AI Lab." path="/about" />
      <PageHero
        index="06"
        eyebrow="About the lab"
        title="Statistics is how intelligence becomes accountable."
        description="Stats-Powered AI Lab is an independent research identity focused on long-horizon questions in reliable generative AI."
      />
      <section className="container-shell about-statement">
        <span className="section-kicker">Mission</span>
        <div>
          <h2>Build methods that remain meaningful after the demo ends.</h2>
          <p>Our agenda sits between statistical learning and modern AI systems. We care about LLM policies whose estimators can be understood, detection that explains its evidence, and frontier statistical questions created by adaptive, high-dimensional systems.</p>
          <p>The Lab and the company share a visual identity and a commitment to dependable AI. The Lab foregrounds long-term research; the company translates selected capabilities into products and applied systems.</p>
        </div>
      </section>
      <section className="container-shell principles-grid">
        {principles.map(([index, title, body]) => <article key={index}><span>{index}</span><h2>{title}</h2><p>{body}</p></article>)}
      </section>
      <section className="container-shell about-cta">
        <span>One lab. Many hard questions.</span>
        <h2>Work with people who would rather know than assume.</h2>
        <Link className="primary-button" to="/join">Join the lab <Arrow /></Link>
      </section>
    </>
  )
}
