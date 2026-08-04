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
  titleZh: string
  eyebrow: string
  eyebrowZh: string
  summary: string
  summaryZh: string
  question: string
  questionZh: string
  approach: string
  approachZh: string
  themes: string[]
  themesZh: string[]
  relatedPublications: string[]
  status: string
  statusZh: string
  draft: boolean
}

export type Person = {
  slug: string
  name: string
  role: string
  roleZh: string
  affiliation: string
  affiliationZh: string
  bio: string
  bioZh: string
  interests: string[]
  interestsZh: string[]
  image?: string
  links: Array<{ label: string; labelZh: string; url: string }>
  draft: boolean
}

export type Resource = {
  slug: string
  title: string
  titleZh: string
  type: 'Blog' | 'Seminar'
  typeZh: string
  summary: string
  summaryZh: string
  url?: string
  draft: boolean
}

export type NewsPost = {
  slug: string
  title: string
  titleZh: string
  date: string
  summary: string
  summaryZh: string
  body: string[]
  bodyZh: string[]
  relatedProject?: string
  draft: boolean
}

export type BlogPost = {
  slug: string
  title: string
  titleZh: string
  date: string
  summary: string
  summaryZh: string
  body: string[]
  bodyZh: string[]
  authors: string[]
  tags: string[]
  tagsZh: string[]
  relatedPublications: string[]
  readingMinutes: number
  draft: boolean
}

export type Seminar = {
  slug: string
  title: string
  titleZh: string
  summary: string
  summaryZh: string
  abstract: string
  abstractZh: string
  speaker: string
  speakerZh: string
  speakerAffiliation: string
  speakerAffiliationZh: string
  startAt: string
  endAt?: string
  timezone: string
  format: 'online' | 'offline' | 'hybrid'
  location: string
  locationZh: string
  registrationUrl?: string
  slidesUrl?: string
  recordingUrl?: string
  eventStatus: 'scheduled' | 'completed' | 'cancelled'
  topics: string[]
  topicsZh: string[]
  draft: boolean
}
