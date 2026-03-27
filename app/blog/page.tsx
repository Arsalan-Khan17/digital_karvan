import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, articles, and updates from the Digital Karvan team.",
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 bg-bg-primary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
            Our Blog
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-text-primary leading-tight max-w-3xl">
            Insights &amp; Articles
          </h1>
          <p className="mt-6 text-base sm:text-xl text-text-secondary max-w-xl leading-relaxed">
            Thoughts on design, development, digital strategy, and the ever-evolving
            landscape of the web.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-12 md:py-16 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="group rounded-2xl overflow-hidden bg-bg-card border border-border-subtle hover:border-white/20 transition-all duration-300">
                  <div className={`aspect-video bg-gradient-to-br ${post.imageGradient}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge>{post.category}</Badge>
                      <span className="text-xs text-text-muted">{post.date}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-text-primary group-hover:text-text-secondary transition-colors leading-snug mb-3">
                      {post.title}
                    </h2>
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-muted">By {post.author}</span>
                      <span className="flex items-center gap-2 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                        Read more
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination placeholder */}
          <div className="mt-16 flex items-center justify-center gap-2">
            <button className="px-4 py-2 rounded-lg border border-border-default text-text-secondary text-sm hover:text-text-primary hover:border-text-primary/30 transition-colors">
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-text-primary font-medium">1</span>
            <button className="px-4 py-2 rounded-lg border border-border-default text-text-secondary text-sm hover:text-text-primary hover:border-text-primary/30 transition-colors">
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
