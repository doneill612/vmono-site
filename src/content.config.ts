import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * The `docs` collection: one MDX file per documentation page under
 * `src/content/docs/`. The entry id is the file name without its extension,
 * and `index` is the docs landing page served at `/docs`.
 *
 * Sidebar grouping and ordering are not part of the frontmatter; they live in
 * `src/lib/nav.ts` so the whole navigation can be read in one place.
 */
const docs = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = { docs };
