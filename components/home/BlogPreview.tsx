import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import Badge from "@/components/ui/Badge";

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 2);

  return (
    <section className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-3">
              From Our Blog
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Insights & Articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors group"
          >
            View all posts
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="group rounded-2xl overflow-hidden bg-bg-card border border-border-subtle hover:border-white/20 transition-all duration-300">
                <div
                  className={`aspect-video bg-gradient-to-br ${post.imageGradient}`}
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge>{post.category}</Badge>
                    <span className="text-xs text-text-muted">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-text-secondary transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="flex items-center gap-2 text-sm text-text-secondary group-hover:text-white transition-colors">
                    Read more
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
