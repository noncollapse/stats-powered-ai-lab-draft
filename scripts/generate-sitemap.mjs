import { mkdir, readFile, writeFile } from 'node:fs/promises'

const allowDrafts = process.argv.includes('--allow-drafts')
const baseUrl = (process.env.SITE_URL || 'http://127.0.0.1:4174').replace(/\/$/, '')
const read = async (name) => JSON.parse(await readFile(new URL(`../src/content/${name}.json`, import.meta.url), 'utf8'))

const [research, publications, news] = await Promise.all([
  read('research'),
  read('publications'),
  read('news'),
])

const routes = [
  '/',
  '/research',
  '/publications',
  '/people',
  '/resources',
  '/news',
  '/about',
  '/join',
  ...research.filter((item) => allowDrafts || !item.draft).map((item) => `/research/${item.slug}`),
  ...publications.filter((item) => allowDrafts || !item.draft).map((item) => `/publications/${item.slug}`),
  ...news.filter((item) => allowDrafts || !item.draft).map((item) => `/news/${item.slug}`),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${baseUrl}${route}</loc></url>`).join('\n')}
</urlset>
`

await mkdir(new URL('../dist/', import.meta.url), { recursive: true })
await writeFile(new URL('../dist/sitemap.xml', import.meta.url), xml)
await writeFile(
  new URL('../dist/robots.txt', import.meta.url),
  `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`,
)

console.log(`Generated sitemap with ${routes.length} routes for ${baseUrl}.`)
