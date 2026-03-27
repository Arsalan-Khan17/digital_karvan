import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Digital Karvan team. Explore open positions and learn about our culture.",
};

const jobs = [
  {
    id: "1",
    title: "Senior Full-Stack Developer",
    type: "Full-time",
    location: "Coventry, UK / Remote",
    department: "Engineering",
    description:
      "We are looking for an experienced full-stack developer to join our growing engineering team. You will work on a range of exciting client projects using modern technologies.",
  },
  {
    id: "2",
    title: "UI/UX Designer",
    type: "Full-time",
    location: "Coventry, UK / Remote",
    department: "Design",
    description:
      "We are seeking a talented UI/UX Designer to create exceptional digital experiences. You will work closely with clients and developers to bring ideas to life.",
  },
  {
    id: "3",
    title: "Digital Project Manager",
    type: "Full-time",
    location: "Remote",
    department: "Operations",
    description:
      "Help us deliver world-class digital projects by managing client relationships, project timelines, and cross-functional teams.",
  },
];

const culturePoints = [
  {
    title: "Remote-First",
    description: "We embrace flexible working and trust our team to deliver excellent work from anywhere.",
  },
  {
    title: "Continuous Learning",
    description: "We invest in our team's growth with learning budgets, conferences, and knowledge sharing.",
  },
  {
    title: "Meaningful Work",
    description: "Every project we take on has real impact. We work with clients who share our values.",
  },
  {
    title: "Collaborative Culture",
    description: "We work as a team, celebrate wins together, and support each other through challenges.",
  },
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-16 bg-bg-primary border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <p className="text-xs font-medium text-text-muted uppercase tracking-widest mb-4">
            Work With Us
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-text-primary leading-tight max-w-3xl">
            Join Our Team
          </h1>
          <p className="mt-6 text-base sm:text-xl text-text-secondary max-w-2xl leading-relaxed">
            We are always looking for talented people who share our passion for
            creating exceptional digital experiences. Come build the future with us.
          </p>
        </div>
      </section>

      {/* Culture */}
      <section className="py-14 md:py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 md:mb-12">Life at Digital Karvan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturePoints.map((point) => (
              <div
                key={point.title}
                className="p-6 rounded-2xl bg-bg-card border border-border-subtle"
              >
                <h3 className="font-semibold text-text-primary mb-3">{point.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-14 md:py-20 bg-bg-secondary border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8 md:mb-12">Open Positions</h2>
          <div className="space-y-4 sm:space-y-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group p-5 sm:p-6 md:p-8 rounded-2xl bg-bg-card border border-border-subtle hover:border-white/20 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs px-2.5 py-1.5 rounded-full bg-bg-elevated border border-border-default text-text-secondary">
                        {job.department}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-3 leading-snug">{job.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                      <div className="flex items-center gap-2 text-xs text-text-muted py-1">
                        <Clock size={13} />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-muted py-1">
                        <MapPin size={13} />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-text-muted py-1">
                        <Briefcase size={13} />
                        {job.department}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors min-w-[120px] justify-center"
                    >
                      Apply Now
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-12 p-6 sm:p-8 rounded-2xl border border-border-default text-center">
            <h3 className="text-xl font-semibold text-text-primary mb-3">
              Don&apos;t see the right role?
            </h3>
            <p className="text-text-secondary text-sm mb-6">
              We are always open to speaking with talented individuals. Send us your details.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors"
            >
              Get in Touch
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
