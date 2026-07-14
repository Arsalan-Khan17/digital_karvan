import type { MetadataRoute } from "next";
import { SITE, abs } from "@/lib/site";

/**
 * We WANT to be crawled, indexed, and cited by both search engines and AI
 * assistants, so everything is allowed. Only non-content routes are blocked.
 *
 * The explicit AI user-agents below are redundant with `*` — they're listed so
 * the stance is self-documenting and easy to flip if you ever want to opt out.
 */
const AI_CRAWLERS = [
  // training crawlers
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Meta-ExternalAgent",
  // AI-search index crawlers (these power citations in AI answers)
  "OAI-SearchBot",
  "Claude-SearchBot",
  "PerplexityBot",
  "DuckAssistBot",
  "Amazonbot",
  // agent fetchers (a human asked an assistant to read the page — highest intent)
  "ChatGPT-User",
  "Claude-User",
  "Perplexity-User",
  "Meta-ExternalFetcher",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
      },
    ],
    sitemap: abs("/sitemap.xml"),
    host: SITE.url,
  };
}
