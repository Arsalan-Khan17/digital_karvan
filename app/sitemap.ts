import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://digitalkarvan.com";
  const now = new Date();

  const staticRoutes = [
    { url: base, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/about`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/portfolio`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/faq`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/blog`, priority: 0.6, changeFrequency: "weekly" as const },
    { url: `${base}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${base}/terms-and-conditions`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${base}/cookie-policy`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const serviceSlugList = [
    "website-development",
    "branding-identity",
    "maintenance-support",
    "consultation",
  ];

  const projectSlugList = [
    "docextract",
    "ai-voice-cloning",
    "bank-of-khyber-dashboard",
    "sales-performance-dashboard",
    "ai-video-automation",
    "smartflyer-website",
    "ovb-holdings",
    "lms",
  ];

  const serviceRoutes = serviceSlugList.map((slug) => ({
    url: `${base}/services/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  const projectRoutes = projectSlugList.map((slug) => ({
    url: `${base}/portfolio/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
    lastModified: now,
  }));

  return [
    ...staticRoutes.map((r) => ({ ...r, lastModified: now })),
    ...serviceRoutes,
    ...projectRoutes,
  ];
}
