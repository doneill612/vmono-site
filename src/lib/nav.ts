import { getCollection, type CollectionEntry } from "astro:content";

/** Repository the docs describe; used for the header and footer links. */
export const REPO_URL = "https://github.com/doneill612/vmono";

/** Hues from the concept palette in tokens.css, matched by `[data-hue]`. */
export type Hue = "cyan" | "green" | "violet" | "amber" | "rose";

/**
 * Sidebar structure. Each group lists docs entry ids in display order and a
 * hue that tints its sidebar marker, the page kicker and the TOC; the labels
 * come from each page's frontmatter `title`. Adding a page means adding the
 * MDX file and one line here.
 */
const GROUPS: { title: string; hue: Hue; ids: string[] }[] = [
  { title: "Getting started", hue: "cyan", ids: ["index", "install", "quick-start"] },
  { title: "Using vmono", hue: "green", ids: ["concepts", "tui", "finishing-a-session"] },
  { title: "Integrations", hue: "violet", ids: ["claude-code-plugin"] },
  { title: "Reference", hue: "amber", ids: ["commands", "configuration", "authentication", "safety"] },
];

export type NavItem = { id: string; title: string; href: string; group: string; hue: Hue };
export type NavGroup = { title: string; hue: Hue; items: NavItem[] };

/** URL path of a docs entry: `index` is `/docs`, everything else `/docs/<id>`. */
export function docHref(id: string): string {
  return id === "index" ? "/docs" : `/docs/${id}`;
}

/** Prefix a site-absolute path with the configured base, if any. */
export function url(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
}

/**
 * Build the sidebar groups from the docs collection. Throws if a listed id has
 * no file, or a file is missing from `GROUPS`, so a page can never silently
 * drop out of the navigation.
 */
export async function getNav(): Promise<NavGroup[]> {
  const entries = await getCollection("docs");
  const byId = new Map<string, CollectionEntry<"docs">>(entries.map((e) => [e.id, e]));

  const listed = new Set(GROUPS.flatMap((g) => g.ids));
  for (const id of byId.keys()) {
    if (!listed.has(id)) throw new Error(`docs/${id}.mdx is not listed in src/lib/nav.ts`);
  }

  return GROUPS.map((g) => ({
    title: g.title,
    hue: g.hue,
    items: g.ids.map((id) => {
      const entry = byId.get(id);
      if (!entry) throw new Error(`nav.ts lists "${id}" but src/content/docs/${id}.mdx does not exist`);
      return { id, title: entry.data.title, href: url(docHref(id)), group: g.title, hue: g.hue };
    }),
  }));
}

/** The nav entry for `id`, which carries its group name and hue. */
export function findItem(nav: NavGroup[], id: string): NavItem | undefined {
  return nav.flatMap((g) => g.items).find((item) => item.id === id);
}

/** The pages before and after `id` in reading order, for the pager. */
export function neighbors(nav: NavGroup[], id: string): { prev?: NavItem; next?: NavItem } {
  const flat = nav.flatMap((g) => g.items);
  const i = flat.findIndex((item) => item.id === id);
  return { prev: flat[i - 1], next: flat[i + 1] };
}
