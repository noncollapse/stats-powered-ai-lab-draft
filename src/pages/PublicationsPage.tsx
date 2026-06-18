import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import Arrow from '../components/Arrow'
import EmptyState from '../components/EmptyState'
import PageHero from '../components/PageHero'
import PublicationCard from '../components/PublicationCard'
import Seo from '../components/Seo'
import { publications } from '../content'

export default function PublicationsPage() {
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
      title: 'Policy Learning for LLMs',
      description: 'Reasoning, alignment, feedback, and efficient post-training.',
      to: '/research/policy-learning-for-llms',
    },
    {
      index: '02',
      title: 'AIGC Detection',
      description: 'Detection across generated text, images, and distribution shifts.',
      to: '/research/aigc-detection',
    },
    {
      index: '03',
      title: 'Frontiers in Statistics',
      description: 'New statistical theory and methods for modern AI systems.',
      to: '/research/frontiers-in-statistics',
    },
  ]

  return (
    <>
      <Seo title="Paper Bank" description="The research paper bank of Stats-Powered AI Lab." path="/publications" />
      <PageHero
        index="02"
        eyebrow="Paper bank"
        title="A structured bank of research papers."
        description="Enter through one of our three research programmes, or search the complete collection by title, author, or topic."
      />
      <section className="container-shell publication-browser">
        <nav className="paper-bank-categories" aria-label="Paper Bank research categories">
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
            <span>Search the Paper Bank</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Title, author, or topic" type="search" />
          </label>
        </div>
        <div className="registry-count"><span>{String(filtered.length).padStart(2, '0')} records</span><span>Source: Google Scholar & arXiv</span></div>
        <div className="publication-list">
          {filtered.length ? filtered.map((publication, index) => (
            <PublicationCard key={publication.slug} publication={publication} index={index} />
          )) : <EmptyState index="∅" title="No papers match" body="Try a broader title, author name, or research topic." />}
        </div>
      </section>
    </>
  )
}
