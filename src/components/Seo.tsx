import { Helmet } from "react-helmet-async";

const SITE_URL = "https://outworx.ai";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
}

/**
 * Per-route head tags. Renders nothing visible — purely SEO.
 * `path` is the route path (e.g. "/pricing"); canonical/og:url are absolute.
 */
export function Seo({ title, description, path, type = "website", noindex }: SeoProps) {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {noindex && <meta name="robots" content="noindex,follow" />}
    </Helmet>
  );
}

export default Seo;
