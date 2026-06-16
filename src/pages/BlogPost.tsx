import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { breadcrumbList } from "@/lib/seo";
import { blogPosts } from "@/data/blogPosts";
import NotFound from "./NotFound";

const SITE_URL = "https://outworx.ai";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: new Date(post.date).toISOString().split("T")[0],
    articleSection: post.category,
    image: `${SITE_URL}/og/outworx-cover.png`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Outworx",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
    },
  };

  const crumbsJsonLd = breadcrumbList([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Seo
        title={`${post.title} — Outworx`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={[articleJsonLd, crumbsJsonLd]}
      />
      <Header />
      <main className="flex-1">
        <article className="container mx-auto px-4 py-16 max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
              {post.category}
            </span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{post.title}</h1>
          <p className="text-lg text-muted-foreground mb-10">By {post.author}</p>
          <div className="prose prose-invert max-w-none space-y-6">
            {post.content.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/90">{para}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
