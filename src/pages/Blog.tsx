import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { breadcrumbList } from "@/lib/seo";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const SITE_URL = "https://outworx.ai";

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Outworx Blog",
  url: `${SITE_URL}/blog`,
  description:
    "Practical writing on AI bookkeeping, VAT, MTD, and how modern accounting firms run their back-office.",
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: new Date(post.date).toISOString().split("T")[0],
    url: `${SITE_URL}/blog/${post.slug}`,
  })),
};

const crumbsJsonLd = breadcrumbList([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
]);

const Blog = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Seo
      title="Blog — Notes from the Outworx team"
      description="Practical writing on AI bookkeeping, VAT, MTD, and how modern accounting firms run their back-office."
      path="/blog"
      jsonLd={[blogJsonLd, crumbsJsonLd]}
    />
    <Header />
    <main className="flex-1">
      <section className="container mx-auto px-4 py-20 lg:py-24 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="eyebrow mb-4">Blog</div>
          <h1 className="font-display font-extrabold tracking-tight text-4xl md:text-5xl mb-4">
            Notes from the <span className="text-serif text-primary">Outworx team</span>
          </h1>
          <p className="text-[17px] md:text-[18px] text-muted-foreground max-w-2xl leading-[1.6]">
            Product notes, compliance deep-dives, lessons from the field.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 pb-24 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => {
            const excerpt = post.excerpt.length > 110 ? post.excerpt.slice(0, 110).trimEnd() + "…" : post.excerpt;
            return (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:-translate-y-1 hover:shadow-glow-teal transition-all"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-[14px] text-muted-foreground mb-4 leading-relaxed">{excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Blog;
