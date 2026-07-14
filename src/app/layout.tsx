import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { JsonLd, organizationSchema, websiteSchema } from "@/components/seo/JsonLd";
import { SITE } from "@/lib/site";
import SplashCursor from "@/components/fx/SplashCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: SITE.url,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} antialiased`}>
      <head>
        <link rel="icon" type="image/png" href="/icon.png" sizes="144x144" />
        {/* If JS is disabled, GSAP never reveals these — show them normally */}
        <noscript>
          <style>{`[data-anim],[data-anim-stagger]>*,[data-process-step]{opacity:1!important;transform:none!important}[data-anim-line]{transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans">
        {/* Sitewide entity graph — anchors every other schema and feeds AI answers */}
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <SmoothScroll />
        {/* <SplashCursor /> */}
        {children}
      </body>
    </html>
  );
}
