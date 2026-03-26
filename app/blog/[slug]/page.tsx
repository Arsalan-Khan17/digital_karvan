import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/data";
import Badge from "@/components/ui/Badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  if (postIndex === -1) notFound();

  const post = blogPosts[postIndex];
  const relatedPosts = blogPosts.filter((_, i) => i !== postIndex).slice(0, 2);

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-24 pb-4 bg-bg-primary">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-text-secondary truncate max-w-xs">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Article */}
      <article className="py-12 bg-bg-primary">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <Badge>{post.category}</Badge>
            <span className="text-xs text-text-muted">{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 mb-10 pb-10 border-b border-border-subtle">
            <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border-default flex items-center justify-center text-xs font-bold text-white/40">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{post.author}</p>
            </div>
          </div>

          {/* Cover */}
          <div
            className={`rounded-2xl aspect-video bg-gradient-to-br ${post.imageGradient} mb-12`}
          />

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-text-secondary leading-relaxed text-lg">{post.content}</p>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-bg-secondary border-t border-border-subtle">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`}>
                  <div className="group rounded-2xl overflow-hidden bg-bg-card border border-border-subtle hover:border-white/20 transition-all duration-300">
                    <div className={`aspect-video bg-gradient-to-br ${related.imageGradient}`} />
                    <div className="p-5">
                      <Badge className="mb-3">{related.category}</Badge>
                      <h3 className="font-semibold text-white group-hover:text-text-secondary transition-colors leading-snug mb-2">
                        {related.title}
                      </h3>
                      <span className="flex items-center gap-2 text-sm text-text-secondary group-hover:text-white transition-colors mt-3">
                        Read more
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
