import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Seo } from "@/components/Seo";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Seo
      title="Blog — Notes from the Outworx team"
      description="Practical writing on AI bookkeeping, VAT, MTD, and how modern accounting firms run their back-office."
      path="/blog"
    />
    <Header />
    <main className="flex-1">
      <section className="container mx-auto px-4 py-20 lg:py-24 max-w-5xl">
        <p className="text-sm font-medium text-primary mb-3">Blog</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Notes from the Outworx team
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Product updates, compliance deep-dives, and what we're learning from the firms running on Outworx.
        </p>
      </section>

      <section className="container mx-auto px-4 pb-24 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
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
              <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read article <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Blog;
