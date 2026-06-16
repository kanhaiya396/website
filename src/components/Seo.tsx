import { Helmet } from "react-helmet-async";

const SITE_URL = "https://outworx.ai";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/outworx-cover.png`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  image?: string;
  imageAlt?: string;
  /** One or more JSON-LD objects rendered as <script type="application/ld+json"> blocks. */
  jsonLd?: object | object[];
}

/**
 * Per-route head tags. Renders nothing visible — purely SEO.
 * `path` is the route path (e.g. "/pricing"); canonical/og:url are absolute.
 * `image` may be absolute or a site-relative path (e.g. "/og/blog.png").
 */
export function Seo({
  title,
  description,
  path,
  type = "website",
  noindex,
  image,
  imageAlt,
  jsonLd,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const resolvedImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`
    : DEFAULT_OG_IMAGE;
  const resolvedAlt = imageAlt ?? "Outworx — AI Bookkeeping Autopilot for Accountants";
  const ldBlocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:image:width" content="1216" />
      <meta property="og:image:height" content="640" />
      <meta property="og:image:alt" content={resolvedAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:image:alt" content={resolvedAlt} />
      {noindex && <meta name="robots" content="noindex,follow" />}
      {ldBlocks.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}

export default Seo;
