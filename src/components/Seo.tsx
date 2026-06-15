import { Helmet } from "react-helmet-async";

const SITE_URL = "https://outworx.ai";
const DEFAULT_OG_IMAGE = `${SITE_URL}/favicon.svg`;

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  image?: string;
  imageAlt?: string;
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
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const resolvedImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`
    : DEFAULT_OG_IMAGE;
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
      {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedImage} />
      {noindex && <meta name="robots" content="noindex,follow" />}
    </Helmet>
  );
}

export default Seo;
