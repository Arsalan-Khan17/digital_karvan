import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Digital Karvan. We would love to hear about your project.",
};

const faqs = [
  {
    q: "How long does a typical website project take?",
    a: "Most website projects take between 4–12 weeks depending on scope and complexity. We provide a detailed timeline during our initial consultation.",
  },
  {
    q: "Do you work with clients outside the UK?",
    a: "Yes, absolutely. We work with clients across the UK, UAE, Europe, and beyond. All our processes are designed to work remotely.",
  },
  {
    q: "What is your typical pricing?",
    a: "Pricing varies based on project requirements. Small websites start from £3,000 while comprehensive solutions can range from £15,000 upwards. We provide detailed quotes after understanding your needs.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes, we offer maintenance and support packages to keep your website secure, fast, and up-to-date after launch.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-bg-primary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
            Let&apos;s Talk
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-3xl">
            Get In Touch
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-xl leading-relaxed">
            Have a project in mind? We would love to hear from you. Send us a message
            and we will get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left: Contact info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Contact Information</h2>
                <ul className="space-y-5">
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border-default flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Email</p>
                      <a
                        href="mailto:contact@digitalkarvan.com"
                        className="text-white hover:text-text-secondary transition-colors text-sm"
                      >
                        contact@digitalkarvan.com
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border-default flex items-center justify-center shrink-0">
                      <Phone size={16} className="text-text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Phone</p>
                      <a
                        href="tel:+447377259354"
                        className="text-white hover:text-text-secondary transition-colors text-sm"
                      >
                        +44 737 7259 354
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border-default flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">UK Office</p>
                      <p className="text-sm text-white">Charter Avenue, Coventry</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border-default flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Netherlands Office</p>
                      <p className="text-sm text-white">Leehove 40, 2678 MC De Lier</p>
                      <a
                        href="tel:+31174705811"
                        className="text-text-secondary hover:text-white transition-colors text-sm"
                      >
                        +31 174 705 811
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border-default flex items-center justify-center shrink-0">
                      <Clock size={16} className="text-text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted mb-1">Business Hours</p>
                      <p className="text-sm text-white">Mon – Fri: 9:00 – 18:00 GMT</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <div className="p-8 rounded-2xl bg-bg-card border border-border-subtle">
                <h2 className="text-xl font-bold text-white mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-bg-secondary border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-bg-card border border-border-subtle"
              >
                <h3 className="font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
