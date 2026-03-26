import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Digital Karvan — Digital Agency",
    template: "%s | Digital Karvan",
  },
  description:
    "Digital Karvan is a digital agency where integrity, excellence, and collaboration drive digital innovation. We design and build exceptional websites, brand identities, and digital experiences.",
  keywords: ["digital agency", "web development", "branding", "UI/UX design", "Digital Karvan"],
  authors: [{ name: "Digital Karvan" }],
  creator: "Digital Karvan",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://digitalkarvan.com",
    siteName: "Digital Karvan",
    title: "Digital Karvan — Digital Agency",
    description:
      "Where integrity, excellence, and collaboration drive digital innovation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Karvan — Digital Agency",
    description: "Where integrity, excellence, and collaboration drive digital innovation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
