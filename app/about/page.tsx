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
  { value: "50+", label: "Projects Delivered", description: "AI, web, branding & enterprise" },
  { value: "3+", label: "Years of Craft", description: "Consistent delivery since day one" },
  { value: "20+", label: "Happy Clients", description: "From startups to global institutions" },
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
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-bg-primary border-b border-border-subtle overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full" style={{ background: "radial-gradient(circle, rgba(225,29,72,0.08) 0%, transparent 65%)", filter: "blur(40px)" }} />
          <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(225,29,72,0.05) 0%, transparent 70%)", filter: "blur(30px)" }} />
          <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-3xl border border-accent/10 rotate-12" />
          <div className="absolute top-1/3 right-1/3 w-20 h-20 rounded-2xl border border-accent/8 -rotate-6" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h1
            className="text-4xl md:text-6xl leading-tight max-w-3xl"
            style={{ color: "var(--accent)", fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}
          >
            Who We Are
          </h1>
          <p className="mt-6 text-2xl text-text-secondary max-w-2xl leading-relaxed">
            Digital Karvan is a digital agency founded on the belief that exceptional
            digital work requires integrity, excellence, and genuine collaboration.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="relative py-14 md:py-20 bg-bg-primary overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none">
          <div className="absolute top-0 left-0 w-[400px] h-[400px]" style={{ background: "radial-gradient(circle, rgba(225,29,72,0.06) 0%, transparent 65%)", filter: "blur(50px)" }} />
          <div className="absolute bottom-0 right-0 w-80 h-80" style={{ background: "radial-gradient(circle, rgba(225,29,72,0.04) 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2
            className="text-4xl md:text-6xl leading-tight mb-6"
            style={{ color: "var(--accent)", fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}
          >
            Our Mission
          </h2>
          <p className="text-2xl text-text-secondary max-w-2xl leading-relaxed mb-6">
            We exist to help businesses thrive in the digital world. Our mission is to
            deliver innovative, high quality digital solutions that create real, measurable
            impact for our clients and their customers.
          </p>
          <p className="text-2xl text-text-secondary max-w-2xl leading-relaxed">
            Founded by experienced practitioners in design, development, and strategy, Digital
            Karvan brings a multidisciplinary approach to every project. We combine technical
            rigour with creative thinking to produce work that is both beautiful and effective.
          </p>
        </div>
      </section>

      {/* Stats */}

      <section className="relative py-14 md:py-20 bg-bg-secondary border-y border-border-subtle overflow-hidden">

        {/* Decorative shapes */}
        <div aria-hidden="true" className="pointer-events-none">
          {/* Top-left large circle */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full border border-accent/10" />
          <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full border border-accent/15" />
          {/* Top-right rounded square */}
          <div className="absolute -top-10 right-24 w-28 h-28 rounded-3xl border border-accent/10 rotate-12" />
          <div className="absolute top-4 right-16 w-16 h-16 rounded-2xl border border-accent/20 rotate-6" />
          {/* Bottom-right large circle */}
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full border border-accent/10" />
          <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full border border-accent/15" />
          {/* Bottom-left rounded square */}
          <div className="absolute -bottom-10 left-24 w-28 h-28 rounded-3xl border border-accent/10 -rotate-12" />
          <div className="absolute bottom-4 left-16 w-16 h-16 rounded-2xl border border-accent/20 -rotate-6" />
          {/* Centre glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(225,29,72,0.05) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center px-8 py-10 rounded-3xl border border-accent/20 bg-bg-card"
              >
                <p
                  className="text-5xl md:text-6xl leading-none mb-3"
                  style={{ color: "var(--accent)", fontFamily: "'Century Gothic', CenturyGothic, AppleGothic, sans-serif" }}
                >
                  {stat.value}
                </p>
                <p className="text-base font-medium text-text-primary mb-1">{stat.label}</p>
                <p className="text-sm text-text-muted">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-14 md:py-20 bg-bg-primary overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-60" style={{ background: "radial-gradient(ellipse, rgba(225,29,72,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />
          <div className="absolute bottom-10 -right-20 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(225,29,72,0.05) 0%, transparent 70%)", filter: "blur(30px)" }} />
          <div className="absolute top-20 -left-10 w-32 h-32 rounded-3xl border border-accent/8 rotate-45" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-accent mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.number}
                className="p-8 rounded-2xl bg-bg-card border border-border-subtle"
              >
                <span className="value-number text-5xl font-bold block mb-6">
                  {value.number}
                </span>
                <h3 className="text-xl text-accent mb-4">{value.title}</h3>
                <p className="text-text-secondary text-base leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-14 md:py-20 bg-bg-secondary border-t border-border-subtle overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none">
          <div className="absolute top-0 right-0 w-[450px] h-[450px]" style={{ background: "radial-gradient(circle, rgba(225,29,72,0.06) 0%, transparent 65%)", filter: "blur(50px)" }} />
          <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(225,29,72,0.04) 0%, transparent 70%)", filter: "blur(35px)" }} />
          <div className="absolute top-10 left-1/2 w-24 h-24 rounded-3xl border border-accent/8 rotate-12" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-accent mb-12">Meet the Team</h2>
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
                <h3 className="text-accent">{member.name}</h3>
                <p className="text-sm text-text-secondary mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 md:py-20 bg-bg-primary border-t border-border-subtle overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(225,29,72,0.07) 0%, transparent 70%)" }} />
          <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full border border-accent/10" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full border border-accent/10" />
          <div className="absolute top-6 right-20 w-16 h-16 rounded-2xl border border-accent/12 rotate-12" />
          <div className="absolute bottom-6 left-20 w-16 h-16 rounded-2xl border border-accent/12 -rotate-12" />
        </div>
        <div className="relative max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-3xl text-accent mb-4">
            Partner With Us
          </h2>
          <p className="text-text-secondary mb-8 text-xl">
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
