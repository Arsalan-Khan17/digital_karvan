import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import NavigationProgress from "@/components/layout/NavigationProgress";
import PageTransition from "@/components/layout/PageTransition";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // Enables safe-area-inset-* for notched iPhones
};

export const metadata: Metadata = {
  title: {
    default: "Digital Karvan — Web Design & Development Agency | UK & UAE",
    template: "%s | Digital Karvan",
  },
  description:
    "Digital Karvan designs and builds high-performance websites, brand identities, and digital products for ambitious businesses across the UK and UAE. Get a free quote today.",
  keywords: ["digital agency", "web development", "branding", "UI/UX design", "Digital Karvan"],
  authors: [{ name: "Digital Karvan" }],
  creator: "Digital Karvan",
  alternates: {
    canonical: "https://digitalkarvan.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://digitalkarvan.com",
    siteName: "Digital Karvan",
    title: "Digital Karvan — Web Design & Development Agency | UK & UAE",
    description:
      "Digital Karvan designs and builds high-performance websites, brand identities, and digital products for ambitious businesses across the UK and UAE. Get a free quote today.",
    images: [
      {
        url: "https://digitalkarvan.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Karvan — Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Karvan — Web Design & Development Agency | UK & UAE",
    description:
      "Digital Karvan designs and builds high-performance websites, brand identities, and digital products for ambitious businesses across the UK and UAE. Get a free quote today.",
    images: ["https://digitalkarvan.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Digital Karvan",
              "url": "https://digitalkarvan.com",
              "logo": "https://digitalkarvan.com/logo.png",
              "description": "Digital Karvan is a digital agency offering website design & development, branding, maintenance, and consultation services across the UK and UAE.",
              "address": [
                {
                  "@type": "PostalAddress",
                  "addressLocality": "Coventry",
                  "addressCountry": "GB",
                },
                {
                  "@type": "PostalAddress",
                  "addressLocality": "Dubai",
                  "addressCountry": "AE",
                },
              ],
              "sameAs": [
                "https://linkedin.com/company/digitalkarvan",
                "https://github.com/digitalkarvan",
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "areaServed": ["GB", "AE"],
                "availableLanguage": "English",
              },
            }),
          }}
        />
        <ThemeProvider>
          <CustomCursor />
          <NavigationProgress />
          <Navbar />
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
