import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";
import { services } from "@/data/services";
import { projects } from "@/data/portfolio";

/**
 * NOTE: `priority` and `changeFrequency` are deliberately omitted — Google
 * ignores both. `lastModified` is only set where we have a REAL content date
 * (case studies); a lastmod that changes on every deploy trains crawlers to
 * ignore it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["/", "/about", "/services", "/portfolio", "/contact"].map((path) => ({
    url: abs(path),
  }));

  const servicePages = services.map((s) => ({
    url: abs(`/services/${s.slug}`),
  }));

  const casePages = projects.map((p) => {
    const parsed = new Date(p.date);
    return {
      url: abs(`/portfolio/${p.slug}`),
      ...(Number.isNaN(parsed.getTime()) ? {} : { lastModified: parsed }),
    };
  });

  return [...staticPages, ...servicePages, ...casePages];
}
