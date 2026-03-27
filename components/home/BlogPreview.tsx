import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import Badge from "@/components/ui/Badge";

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 2);

  return (
    <section className="py-16 md:py-24 bg-bg-primary border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
              From Our Blog
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary">
              Insights &amp; Articles
            </h2>
            <p className="mt-3 text-text-secondary text-sm sm:text-base max-w-lg">
              Perspectives on digital strategy, design craft, and the work behind the work.
            </p>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group shrink-0"
          >
            All posts
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block">
              <div className="group rounded-2xl overflow-hidden bg-bg-card border border-border-subtle hover:border-text-primary/20 hover:shadow-md transition-all duration-300 h-full flex flex-col">
                <div
                  className={`aspect-[16/9] bg-gradient-to-br ${post.imageGradient}`}
                />
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge>{post.category}</Badge>
                    <span className="text-xs text-text-muted">{post.date}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-primary group-hover:text-text-secondary transition-colors leading-snug mb-2 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
                    <span className="text-xs text-text-muted">By {post.author}</span>
                    <span className="flex items-center gap-1.5 text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                      Read
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
