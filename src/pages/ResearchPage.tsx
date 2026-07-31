import PageHero from '../components/PageHero'
import ResearchCard from '../components/ResearchCard'
import Seo from '../components/Seo'
import { researchProjects } from '../content'
import { pick, useLanguage } from '../i18n/LanguageContext'

export default function ResearchPage() {
  const { language } = useLanguage()

  return (
    <>
      <Seo
        title={pick(language, 'Research', '研究')}
        description={pick(language, 'Explore the core research directions of Stats-Powered AI Lab.', '探索思达 AI Lab 的核心研究方向。')}
        path="/research"
      />
      <PageHero
        index="01"
        eyebrow={pick(language, 'Research programmes', '研究体系')}
        title={pick(language, 'From statistical foundations to reliable decisions.', '从统计基础走向可靠决策。')}
        description={pick(
          language,
          'We study three connected directions: policy learning for decision systems, AI verification across AIGC detection and reasoning faithfulness, and frontier statistics for modern AI.',
          '我们研究三个相互连接的方向：面向决策系统的策略学习、涵盖 AIGC 检测与推理忠实性的 AI 验证，以及面向现代 AI 的前沿统计。',
        )}
      />
      <section className="container-shell page-section">
        <div className="research-grid research-grid--page">
          {researchProjects.map((project) => <ResearchCard key={project.slug} project={project} />)}
        </div>
      </section>
      <section className="container-shell research-method">
        <div className="section-kicker">{pick(language, 'How we work', '研究方法')}</div>
        <div>
          <h2>{pick(language, 'Precise questions. Explicit assumptions. Testable claims.', '问题清晰，假设明确，结论可检验。')}</h2>
          <p>{pick(
            language,
            'We combine statistical theory, simulation, and empirical evaluation. Each project states its assumptions, identifies what the available evidence can support, and reports where the method succeeds or fails.',
            '我们结合统计理论、模拟实验与实证评估。每个项目都会明确假设，说明现有证据能够支持什么结论，并如实报告方法的适用条件与失效边界。',
          )}</p>
        </div>
        <ol>
          <li><span>01</span><strong>{pick(language, 'Question', '提出问题')}</strong><p>{pick(language, 'Turn a broad concern into a precise and consequential research question.', '把宽泛的关注转化为清晰且重要的研究问题。')}</p></li>
          <li><span>02</span><strong>{pick(language, 'Formalise', '形式化')}</strong><p>{pick(language, 'Specify the data, assumptions, target, and sources of uncertainty.', '明确数据、假设、研究目标与不确定性来源。')}</p></li>
          <li><span>03</span><strong>{pick(language, 'Develop', '发展方法')}</strong><p>{pick(language, 'Build theory, statistical methods, and algorithms appropriate to the question.', '围绕问题发展相应的理论、统计方法与算法。')}</p></li>
          <li><span>04</span><strong>{pick(language, 'Test', '检验')}</strong><p>{pick(language, 'Use proofs, simulations, and empirical studies to map performance and limits.', '通过理论证明、模拟与实证研究检验性能及其边界。')}</p></li>
        </ol>
      </section>
    </>
  )
}
