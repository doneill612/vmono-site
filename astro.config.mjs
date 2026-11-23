import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

/**
 * Astro configuration for the vmono site.
 *
 * The output is fully static. Hosting is undecided, so no `site` or `base`
 * is set; once a host is chosen, set `site` here (and `base` if the site is
 * served from a sub-path such as GitHub Pages project pages).
 *
 * Code blocks are highlighted with Shiki using two themes. `defaultColor:
 * false` emits CSS variables for both instead of inlined colors, so the
 * theme toggle can pick one in global.css without re-rendering.
 */
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark-dimmed" },
      defaultColor: false,
      wrap: false,
    },
  },
});
