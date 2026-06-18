import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  path?: string
  type?: 'website' | 'article'
  structuredData?: Record<string, unknown>
}

const upsertMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

export default function Seo({ title, description, path = '/', type = 'website', structuredData }: SeoProps) {
  useEffect(() => {
    const siteName = 'Stats-Powered AI Lab'
    const fullTitle = title === siteName ? title : `${title} — ${siteName}`
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')
    const canonicalUrl = new URL(`${basePath}${path}`, window.location.origin).toString()
    document.title = fullTitle
    upsertMeta('meta[name="description"]', 'name', 'description', description)
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description)
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', type)
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    document.getElementById('page-structured-data')?.remove()
    if (structuredData) {
      const script = document.createElement('script')
      script.id = 'page-structured-data'
      script.type = 'application/ld+json'
      script.text = JSON.stringify(structuredData)
      document.head.appendChild(script)
    }

    return () => document.getElementById('page-structured-data')?.remove()
  }, [description, path, structuredData, title, type])

  return null
}
