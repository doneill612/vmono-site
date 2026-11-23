# vmono-site

The landing page and documentation for [vmono](https://github.com/doneill612/vmono), built with [Astro](https://astro.build). The look is monospace throughout (JuliaMono, self-hosted subsets in `src/assets/fonts`), near-black surfaces, a cyan accent, a left sidebar and a right-hand "On this page" rail.

Requires Node 22.23.4 or newer (`.nvmrc` pins 26.13.1).

```sh
npm install
npm run dev       # dev server (search is unavailable here)
npm run build     # static site in dist/, plus the Pagefind search index
npm run preview   # serve dist/ locally; search works here
npm run check     # type-check Astro and TypeScript
```

## Layout

| Path | What |
| --- | --- |
| `src/content/docs/*.mdx` | One file per docs page. Frontmatter is `title` and `description` |
| `src/lib/nav.ts` | Sidebar groups and page order. A page must be listed here or the build fails |
| `src/layouts/` | `Base` (head, fonts, theme bootstrap) and `Docs` (sidebar, article, TOC, pager) |
| `src/components/` | Header, Sidebar, Toc, Search, ThemeToggle, CodeTabs, Callout, Term, Logo, Footer |
| `src/styles/tokens.css` | Colors, type and spacing for light and dark, including the concept palette |
| `public/favicon.svg` | The vmono icon on a dark tile; `src/components/Logo.astro` is the same mark with no background |

## Writing docs

Add `src/content/docs/<name>.mdx` with `title` and `description`, then list `<name>` in a group in `src/lib/nav.ts`. `CodeTabs`, `Callout` and `Term` are available in MDX without imports; see `install.mdx` for tabs and `concepts.mdx` for `Term`.

## Color

Color carries meaning. Package is violet, session is green, active member is cyan, reference member is amber and landing branch is rose (`--c-*` in `tokens.css`), and the landing page, the Concepts table and `Term` all use those. Each sidebar group also has a hue, set in `src/lib/nav.ts`, which tints its sidebar marker, the kicker above the page title, the TOC and the pager.

Links between pages are written as absolute paths (`/docs/install`). If the site is ever served from a sub-path, set `base` in `astro.config.mjs` and update those links.

## Hosting

Not decided yet. `npm run build` produces a static `dist/` that any static host can serve. Set `site` in `astro.config.mjs` once there is a URL.
