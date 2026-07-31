import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import PublicationCard from '../components/PublicationCard'
import Seo from '../components/Seo'
import { publications } from '../content'
import { pick, useLanguage } from '../i18n/LanguageContext'

export default function PublicationsPage() {
  const { language } = useLanguage()
  const [query, setQuery] = useState('')
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return publications.filter((publication) => {
      return !normalized
        || publication.title.toLowerCase().includes(normalized)
        || publication.authors.some((author) => author.toLowerCase().includes(normalized))
        || publication.topics.some((item) => item.toLowerCase().includes(normalized))
    })
  }, [query])

  const categories = [
    {
      index: '01',
      title: pick(language, 'Policy Learning & Decision Systems', '策略学习与决策系统'),
      description: pick(language, 'LLM alignment, policy evaluation, offline RL, and safe decisions.', '大模型对齐、策略评估、离线强化学习与安全决策。'),
      to: '/research/policy-learning-for-llms',
    },
    {
      index: '02',
      title: pick(language, 'AI Verification & AIGC Detection', 'AI 验证与 AIGC 检测'),
      description: pick(language, 'AIGC provenance and reasoning faithfulness, with calibrated and causal verification.', 'AIGC 溯源与推理忠实性，以及校准和因果验证。'),
      to: '/research/aigc-detection',
    },
    {
      index: '03',
      title: pick(language, 'Frontiers in Statistics', '前沿统计'),
      description: pick(language, 'Classical inference for high-dimensional, sequential, causal, and adaptive AI systems.', '面向高维、序列、因果及自适应 AI 系统的经典推断。'),
      to: '/research/frontiers-in-statistics',
    },
  ]

  return (
    <>
      <Seo
        title={pick(language, 'Paper Bank', '论文库')}
        description={pick(language, 'The research paper bank of Stats-Powered AI Lab.', '思达 AI Lab 的研究论文库。')}
        path="/publications"
      />
      <PageHero
        index="02"
        eyebrow={pick(language, 'Paper bank', '论文库')}
        title={pick(language, 'A structured bank of research papers.', '结构化研究论文库。')}
        description={pick(
          language,
          'Enter through one of our three research layers, or search the complete collection by title, author, or topic. Paper titles and abstracts remain in their original English.',
          '可从三个研究层进入，或按标题、作者和主题搜索全部论文。论文标题与摘要保留英文原文。',
        )}
      />
      <section className="container-shell publication-browser">
        <nav className="paper-bank-categories" aria-label={pick(language, 'Paper Bank research categories', '论文库研究分类')}>
          {categories.map((category) => (
            <Link key={category.to} className="paper-bank-category" to={category.to}>
              <span className="paper-bank-category__index">{category.index}</span>
              <div>
                <h2>{category.title}</h2>
                <p>{category.description}</p>
              </div>
              <Arrow />
            </Link>
          ))}
        </nav>
        <div className="publication-controls">
          <label>
            <span>{pick(language, 'Search the Paper Bank', '搜索论文库')}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={pick(language, 'Title, author, or topic', '标题、作者或主题')}
              type="search"
            />
          </label>
        </div>
        <div className="registry-count">
          <span>{String(filtered.length).padStart(2, '0')} {pick(language, 'records', '条记录')}</span>
          <span>{pick(language, 'Source', '来源')}: Google Scholar & arXiv</span>
        </div>
        <div className="publication-list">
          {filtered.length ? filtered.map((publication, index) => (
            <PublicationCard key={publication.slug} publication={publication} index={index} />
          )) : <EmptyState
            index="∅"
            title={pick(language, 'No papers match', '没有匹配的论文')}
            body={pick(language, 'Try a broader title, author name, or research topic.', '请尝试更宽泛的标题、作者姓名或研究主题。')}
          />}
        </div>
      </section>
    </>
  )
}
