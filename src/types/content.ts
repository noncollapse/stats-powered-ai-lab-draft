export type Publication = {
  slug: string
  title: string
  authors: string[]
  year: number
  abstract: string
  topics: string[]
  arxivId: string
  pdfUrl: string
  featured: boolean
  draft: boolean
}

export type ResearchProject = {
  slug: string
  index: string
  title: string
  eyebrow: string
  summary: string
  question: string
  approach: string
  themes: string[]
  relatedPublications: string[]
  status: string
  draft: boolean
}

export type Person = {
  slug: string
  name: string
  role: string
  affiliation: string
  bio: string
  interests: string[]
  image?: string
  links: Array<{ label: string; url: string }>
  draft: boolean
}

export type Resource = {
  slug: string
  title: string
  type: 'Blog' | 'Seminar'
  summary: string
  url?: string
  draft: boolean
}

export type NewsPost = {
  slug: string
  title: string
  date: string
  summary: string
  body: string[]
  relatedProject?: string
  draft: boolean
}
