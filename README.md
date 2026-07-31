# Stats-Powered AI Lab

Bilingual English–Chinese research portal for Stats-Powered AI Lab. This project is intentionally separate from `思达AI公司页面/`.

The language control in the top-right corner switches all navigation and institutional copy. The selected language is stored in the browser and remains active across routes and reloads. Publication titles, authors, topics, and abstracts stay in their original English.

## Shareable draft

The `main` branch is deployed automatically to GitHub Pages as a content-preview build:

`https://noncollapse.github.io/stats-powered-ai-lab-draft/`

The Pages workflow supplies the repository base path, generates the public sitemap, and creates a SPA fallback so deep research and publication URLs remain shareable.

## Local preview

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:3001`.

## Content workflow

Portal records live in `src/content/` as typed JSON collections:

- `research.json`
- `publications.json`
- `people.json`
- `resources.json`
- `news.json`

Research, people, resource, and news records pair their English fields with `*Zh` fields. Publications deliberately use one English source of truth and only their surrounding interface labels are translated. The content validator rejects a non-draft bilingual record when either language is incomplete.

Draft records are visible in development and in the explicit content-preview build. Any future record marked as a draft is blocked by the normal production build.

```bash
# Local review build; draft content is visible
npm run build:preview
npm run preview

# Production build; fails if any draft record is incomplete
npm run build
```

Do not infer missing authors, affiliations, venues, dates, links, abstracts, metrics, or biographies. Replace draft fields only with verified information and then set `draft` to `false`.

## Checks

```bash
npm run lint
npm run validate:content:preview
npm run check
```

The build generates `dist/sitemap.xml` and `dist/robots.txt`. Set `SITE_URL` to the final public origin during production deployment; local builds default to the preview address.

## Routes

- `/`
- `/research` and `/research/:slug`
- `/publications` and `/publications/:slug`
- `/people`
- `/resources`
- `/news` and `/news/:slug`
- `/about`
- `/join`

This draft deployment does not modify the existing entry page or company site links.
