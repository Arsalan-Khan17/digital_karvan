import Link from "next/link";
import { Globe, Share2, ExternalLink, Mail, Phone, MapPin } from "lucide-react";
import FooterNewsletter from "./FooterNewsletter";

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-border-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              Digital Karvan
            </Link>
            <p className="mt-4 text-text-secondary text-sm leading-relaxed">
              Where integrity, excellence, and collaboration drive digital innovation. We build
              exceptional digital experiences for forward-thinking businesses.
            </p>
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider">
                Newsletter
              </p>
              <FooterNewsletter />
            </div>
            {/* Socials */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-bg-elevated text-text-secondary hover:text-white hover:bg-bg-card transition-colors"
                aria-label="LinkedIn"
              >
                <Globe size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-bg-elevated text-text-secondary hover:text-white hover:bg-bg-card transition-colors"
                aria-label="Twitter / X"
              >
                <Share2 size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-bg-elevated text-text-secondary hover:text-white hover:bg-bg-card transition-colors"
                aria-label="Instagram"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Blog", href: "/blog" },
                { label: "Careers", href: "/careers" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Website Development", href: "/services/website-development" },
                { label: "Branding & Identity", href: "/services/branding-identity" },
                { label: "Maintenance & Support", href: "/services/maintenance-support" },
                { label: "Consultation", href: "/services/consultation" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-text-muted mb-1">UK Office</p>
                  <p className="text-sm text-text-secondary">Charter Avenue, Coventry</p>
                  <a
                    href="tel:+447377259354"
                    className="text-sm text-text-secondary hover:text-white transition-colors"
                  >
                    +44 737 7259 354
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin size={16} className="text-text-muted mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-text-muted mb-1">UAE Office</p>
                  <p className="text-sm text-text-secondary">Leehove 40, 2678 MC De Lier, Netherlands</p>
                  <a
                    href="tel:+31174705811"
                    className="text-sm text-text-secondary hover:text-white transition-colors"
                  >
                    +31 174 705 811
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-text-muted mt-0.5 shrink-0" />
                <a
                  href="mailto:contact@digitalkarvan.com"
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  contact@digitalkarvan.com
                </a>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-text-muted mt-0.5 shrink-0" />
                <a
                  href="tel:+447377259354"
                  className="text-sm text-text-secondary hover:text-white transition-colors"
                >
                  +44 737 7259 354
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © 2025 Digital Karvan. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-xs text-text-muted hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="text-xs text-text-muted hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/cookie-policy" className="text-xs text-text-muted hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
