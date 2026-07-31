import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import PageHero from '../components/PageHero'
import Seo from '../components/Seo'
import { pick, useLanguage } from '../i18n/LanguageContext'

const principles = [
  {
    index: '01',
    title: 'Assumptions are part of the result',
    titleZh: '假设也是结果的一部分',
    body: 'We make the conditions behind a method visible enough to question.',
    bodyZh: '我们让方法背后的条件足够清晰，使其能够被检验和质疑。',
  },
  {
    index: '02',
    title: 'Uncertainty is not decoration',
    titleZh: '不确定性不是装饰',
    body: 'A reliable decision needs to communicate what the evidence cannot settle.',
    bodyZh: '可靠决策必须说明现有证据无法确定什么。',
  },
  {
    index: '03',
    title: 'Diagnosis precedes deployment',
    titleZh: '先诊断，再部署',
    body: 'We test causal validity, shifts, and failure modes before systems meet high-cost decisions.',
    bodyZh: '在系统面对高成本决策前，我们检验因果有效性、分布变化与失效模式。',
  },
  {
    index: '04',
    title: 'Decisions must be traceable',
    titleZh: '决策必须有据可循',
    body: 'Claims and policies should connect to records, methods, and evidence that others can inspect.',
    bodyZh: '结论与策略应连接到他人可以检验的记录、方法与证据。',
  },
]

export default function AboutPage() {
  const { language } = useLanguage()

  return (
    <>
      <Seo
        title={pick(language, 'About', '关于')}
        description={pick(language, 'The mission and research principles of Stats-Powered AI Lab.', '思达 AI Lab 的使命与研究原则。')}
        path="/about"
      />
      <PageHero
        index="06"
        eyebrow={pick(language, 'About the lab', '关于实验室')}
        title={pick(language, 'Statistics is how intelligence becomes accountable.', '统计学让智能变得可验证、可负责。')}
        description={pick(
          language,
          'Stats-Powered AI Lab is an independent research identity focused on long-horizon questions in reliable AI.',
          '思达 AI Lab 是一个独立研究品牌，关注可信 AI 中具有长期意义的问题。',
        )}
      />
      <section className="container-shell about-statement">
        <span className="section-kicker">{pick(language, 'Mission', '使命')}</span>
        <div>
          <h2>{pick(language, 'Build methods that remain meaningful after the demo ends.', '构建在演示结束后依然有意义的方法。')}</h2>
          <p>{pick(
            language,
            'Our agenda spans policy learning for reliable decision systems, AI verification across AIGC detection and reasoning faithfulness, and frontier statistics including TabPFN.',
            '我们的研究议程覆盖面向可靠决策系统的策略学习、涵盖 AIGC 检测与推理忠实性的 AI 验证，以及包括 TabPFN 在内的前沿统计。',
          )}</p>
          <p>{pick(
            language,
            'The company turns selected capabilities into deployable systems. The Lab develops the statistical foundations, diagnostic methods, and decision principles that make those systems possible.',
            '公司将经过选择的能力转化为可部署系统；Lab 则研究使这些系统成为可能的统计基础、诊断方法与决策原则。',
          )}</p>
        </div>
      </section>
      <section className="container-shell principles-grid">
        {principles.map((principle) => (
          <article key={principle.index}>
            <span>{principle.index}</span>
            <h2>{pick(language, principle.title, principle.titleZh)}</h2>
            <p>{pick(language, principle.body, principle.bodyZh)}</p>
          </article>
        ))}
      </section>
      <section className="container-shell about-cta">
        <span>{pick(language, 'One lab. Many hard questions.', '一个实验室，许多难题。')}</span>
        <h2>{pick(language, 'Work with people who would rather know than assume.', '与更愿意求证，而不是假设的人一起研究。')}</h2>
        <Link className="primary-button" to="/join">{pick(language, 'Join the lab', '加入实验室')} <Arrow /></Link>
      </section>
    </>
  )
}
