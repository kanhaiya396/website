/**
 * SEO helpers for building JSON-LD blocks consumed by the <Seo> component.
 * Pure functions — no React, no side effects.
 */

const SITE_URL = "https://outworx.ai";

export interface Crumb {
  name: string;
  path: string;
}

/** Build a schema.org BreadcrumbList from an ordered list of crumbs. */
export function breadcrumbList(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}
