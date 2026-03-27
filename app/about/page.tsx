import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { team } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Digital Karvan — our story, mission, values, and the team behind the work.",
};

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "3+", label: "Years Experience" },
  { value: "20+", label: "Happy Clients" },
  { value: "2", label: "Global Offices" },
];

const values = [
  {
    number: "01",
    title: "Integrity",
    description:
      "We operate with complete transparency and honesty. Our clients trust us because we always deliver on our promises and communicate openly at every stage.",
  },
  {
    number: "02",
    title: "Excellence",
    description:
      "We hold ourselves to the highest standards of quality. Every pixel, every line of code, every strategy is crafted with precision and care for maximum impact.",
  },
  {
    number: "03",
    title: "Collaboration",
    description:
      "The best results emerge from true partnership. We work alongside our clients as an extension of their team, sharing knowledge and building together.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-bg-primary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-text-primary leading-tight max-w-3xl">
            Who We Are
          </h1>
          <p className="mt-6 text-xl text-text-secondary max-w-2xl leading-relaxed">
            Digital Karvan is a digital agency founded on the belief that exceptional
            digital work requires integrity, excellence, and genuine collaboration.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 md:py-20 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Our Mission</h2>
          <p className="text-text-secondary leading-relaxed text-lg mb-6">
            We exist to help businesses thrive in the digital world. Our mission is to
            deliver innovative, high-quality digital solutions that create real, measurable
            impact for our clients and their customers.
          </p>
          <p className="text-text-secondary leading-relaxed text-lg">
            Founded by experienced practitioners in design, development, and strategy, Digital
            Karvan brings a multidisciplinary approach to every project. We combine technical
            rigour with creative thinking to produce work that is both beautiful and effective.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 bg-bg-secondary border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-text-primary">{stat.value}</p>
                <p className="text-text-secondary mt-2 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-14 md:py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.number}
                className="p-8 rounded-2xl bg-bg-card border border-border-subtle"
              >
                <span className="text-5xl font-bold text-text-primary/10 block mb-6">
                  {value.number}
                </span>
                <h3 className="text-xl font-semibold text-text-primary mb-4">{value.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 md:py-20 bg-bg-secondary border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary mb-12">Meet the Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="text-center">
                <div className="relative mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-bg-elevated to-bg-card border border-border-default flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-text-primary/30">
                    {member.name.charAt(0)}
                  </span>
                  {member.isFounder && (
                    <span className="absolute -top-1 -right-1 px-2 py-0.5 rounded-full bg-accent text-white text-xs font-semibold whitespace-nowrap">
                      Co-Founder
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-text-primary">{member.name}</h3>
                <p className="text-sm text-text-secondary mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-bg-primary border-t border-border-subtle">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Partner With Us
          </h2>
          <p className="text-text-secondary mb-8 text-lg">
            Ready to build something exceptional together? Let us start a conversation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-medium rounded-full hover:bg-red-700 transition-colors"
          >
            Get in Touch
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
