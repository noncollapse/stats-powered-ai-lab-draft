import PageHero from '../components/PageHero'
import ResearchCard from '../components/ResearchCard'
import Seo from '../components/Seo'
import { researchProjects } from '../content'

export default function ResearchPage() {
  return (
    <>
      <Seo title="Research" description="Explore the core research directions of Stats-Powered AI Lab." path="/research" />
      <PageHero
        index="01"
        eyebrow="Research programmes"
        title="Rigour for systems that keep changing."
        description="We study the statistical structure beneath generative models and learning policies, with an emphasis on evidence that remains meaningful beyond a single benchmark."
      />
      <section className="container-shell page-section">
        <div className="research-grid research-grid--page">
          {researchProjects.map((project) => <ResearchCard key={project.slug} project={project} />)}
        </div>
      </section>
      <section className="container-shell research-method">
        <div className="section-kicker">How we work</div>
        <div>
          <h2>Question → estimator → evidence → revision.</h2>
          <p>Our working method begins with a falsifiable question, makes assumptions visible, and treats uncertainty as part of the result. This page describes a research standard, not a claim about any unpublished outcome.</p>
        </div>
        <ol>
          <li><span>01</span><strong>Frame</strong><p>Define the decision and the uncertainty that matters.</p></li>
          <li><span>02</span><strong>Model</strong><p>Choose statistical objects that expose assumptions.</p></li>
          <li><span>03</span><strong>Stress</strong><p>Test shifts, failure modes, and alternative explanations.</p></li>
          <li><span>04</span><strong>Release</strong><p>Publish only what the evidence can support.</p></li>
        </ol>
      </section>
    </>
  )
}
