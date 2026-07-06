import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import SplashCursor from "@/components/fx/SplashCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Karvan — Design, Build, Launch",
  description:
    "We partner with ambitious businesses — from startups to enterprise — to design and build websites, brand identities, and digital products that convert.",
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
        <SmoothScroll />
        <SplashCursor />
        {children}
      </body>
    </html>
  );
}
