import blogData from './blog.json'
import newsData from './news.json'
import peopleData from './people.json'
import publicationsData from './publications.json'
import researchData from './research.json'
import resourcesData from './resources.json'
import seminarsData from './seminars.json'
import type { BlogPost, NewsPost, Person, Publication, ResearchProject, Resource, Seminar } from '../types/content'

export const showDrafts = import.meta.env.DEV || import.meta.env.VITE_SHOW_DRAFTS === 'true'

const visible = <T extends { draft: boolean }>(items: T[]) =>
  items.filter((item) => showDrafts || !item.draft)

export const publications = visible(publicationsData as Publication[])
export const researchProjects = visible(researchData as ResearchProject[])
export const people = visible(peopleData as Person[])
export const resources = visible(resourcesData as Resource[])
export const news = visible(newsData as NewsPost[])
export const blogPosts = visible(blogData as BlogPost[])
export const seminars = visible(seminarsData as Seminar[])

export const publicationBySlug = (slug?: string) => publications.find((item) => item.slug === slug)
export const researchBySlug = (slug?: string) => researchProjects.find((item) => item.slug === slug)
export const newsBySlug = (slug?: string) => news.find((item) => item.slug === slug)
export const blogBySlug = (slug?: string) => blogPosts.find((item) => item.slug === slug)
export const seminarBySlug = (slug?: string) => seminars.find((item) => item.slug === slug)
