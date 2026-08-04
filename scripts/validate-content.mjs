import { readFile } from 'node:fs/promises'

const allowDrafts = process.argv.includes('--allow-drafts')
const collections = ['publications', 'research', 'people', 'resources', 'news', 'blog', 'seminars']
const errors = []

for (const collection of collections) {
  const path = new URL(`../src/content/${collection}.json`, import.meta.url)
  const items = JSON.parse(await readFile(path, 'utf8'))

  if (!Array.isArray(items)) {
    errors.push(`${collection}.json must contain an array.`)
    continue
  }

  const slugs = new Set()
  for (const [index, item] of items.entries()) {
    const location = `${collection}[${index}]`
    if (!item.slug || typeof item.slug !== 'string') {
      errors.push(`${location} is missing a string slug.`)
    } else if (slugs.has(item.slug)) {
      errors.push(`${location} duplicates slug "${item.slug}".`)
    } else {
      slugs.add(item.slug)
    }

    if (!item.title && !item.name) {
      errors.push(`${location} needs a title or name.`)
    }

    if (item.draft && !allowDrafts) {
      errors.push(`${location} is still marked as draft.`)
    }

    if (collection === 'publications' && !item.draft) {
      if (!Array.isArray(item.authors) || item.authors.length === 0) {
        errors.push(`${location} needs at least one author.`)
      }
      if (!Number.isInteger(item.year)) errors.push(`${location} needs a publication year.`)
      if (!item.abstract) errors.push(`${location} needs an abstract.`)
      if (!item.arxivId) errors.push(`${location} needs an arXiv identifier.`)
      if (!item.pdfUrl) errors.push(`${location} needs an arXiv PDF URL.`)
    }

    if (collection === 'research' && !item.draft) {
      for (const field of ['titleZh', 'eyebrowZh', 'summaryZh', 'questionZh', 'approachZh', 'statusZh']) {
        if (!item[field]) errors.push(`${location} needs bilingual field "${field}".`)
      }
      if (!Array.isArray(item.themesZh)) errors.push(`${location} needs bilingual research themes.`)
    }

    if (collection === 'people' && !item.draft) {
      for (const field of ['roleZh', 'affiliationZh', 'bioZh']) {
        if (!item[field]) errors.push(`${location} needs bilingual field "${field}".`)
      }
      if (!Array.isArray(item.interestsZh)) errors.push(`${location} needs bilingual research interests.`)
      if (!Array.isArray(item.links) || item.links.some((link) => !link.labelZh)) {
        errors.push(`${location} needs bilingual link labels.`)
      }
    }

    if (collection === 'resources' && !item.draft) {
      for (const field of ['titleZh', 'typeZh', 'summaryZh']) {
        if (!item[field]) errors.push(`${location} needs bilingual field "${field}".`)
      }
    }

    if (collection === 'news' && !item.draft) {
      for (const field of ['titleZh', 'summaryZh']) {
        if (!item[field]) errors.push(`${location} needs bilingual field "${field}".`)
      }
      if (!Array.isArray(item.bodyZh)) errors.push(`${location} needs a bilingual article body.`)
    }

    if (collection === 'blog' && !item.draft) {
      for (const field of ['titleZh', 'summaryZh']) {
        if (!item[field]) errors.push(`${location} needs bilingual field "${field}".`)
      }
      if (!Array.isArray(item.body) || item.body.length === 0) errors.push(`${location} needs an article body.`)
      if (!Array.isArray(item.bodyZh) || item.bodyZh.length === 0) errors.push(`${location} needs a bilingual article body.`)
      if (!Array.isArray(item.authors) || item.authors.length === 0) errors.push(`${location} needs at least one author.`)
      if (!Array.isArray(item.tags) || !Array.isArray(item.tagsZh)) errors.push(`${location} needs bilingual tags.`)
      if (!item.date) errors.push(`${location} needs a publication date.`)
      if (!Number.isInteger(item.readingMinutes)) errors.push(`${location} needs an integer reading time.`)
    }

    if (collection === 'seminars' && !item.draft) {
      for (const field of ['titleZh', 'summaryZh', 'abstractZh', 'speaker', 'speakerZh', 'speakerAffiliation', 'speakerAffiliationZh', 'startAt', 'timezone', 'format', 'locationZh', 'eventStatus']) {
        if (!item[field]) errors.push(`${location} needs field "${field}".`)
      }
      if (!Array.isArray(item.topics) || !Array.isArray(item.topicsZh)) errors.push(`${location} needs bilingual topics.`)
      if (!['online', 'offline', 'hybrid'].includes(item.format)) errors.push(`${location} has an invalid seminar format.`)
      if (!['scheduled', 'completed', 'cancelled'].includes(item.eventStatus)) errors.push(`${location} has an invalid event status.`)
    }
  }
}

if (errors.length) {
  console.error('\nContent validation failed:\n')
  for (const error of errors) console.error(`  - ${error}`)
  console.error('\nUse the preview validation command only for local draft review.\n')
  process.exit(1)
}

console.log(`Content validation passed${allowDrafts ? ' (draft preview enabled)' : ''}.`)
