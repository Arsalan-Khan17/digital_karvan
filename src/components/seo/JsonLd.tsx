import { SITE, abs } from "@/lib/site";

/** Renders a JSON-LD block. Server component — no client JS shipped. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: the data is authored by us, not users.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const ORG_ID = `${SITE.url}/#organization`;

/** Sitewide Organization entity — the anchor for every other schema. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  url: SITE.url,
  logo: abs("/images/logo-header.svg"),
  image: abs(SITE.ogImage),
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.phone,
  sameAs: [...SITE.socials],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: SITE.email,
    telephone: SITE.phone,
    availableLanguage: ["English"],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  publisher: { "@id": ORG_ID },
};

/** Breadcrumbs render as a trail in Google results — worth it on every inner page. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function serviceSchema(s: { title: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.description,
    url: abs(`/services/${s.slug}`),
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
  };
}
