import type { ReactNode } from "react";

export type Service = {
  slug: string;
  title: string;
  description: string;
  features: string[];
  process: string[];
  icon: ReactNode;
};

function MonitorIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}
function BrushIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20c2 0 3-1 3-3 0-1.5 1-2.5 2.5-2.5S12 16 12 17.5C12 20 9.5 22 6 22M14 7l3 3M19.5 3.5a2.1 2.1 0 010 3L11 15l-3-3 8.5-8.5a2.1 2.1 0 013 0z" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function CompassIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </svg>
  );
}

export const services: Service[] = [
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    description:
      "Combines modern technology with design to create conversion-focused digital experiences, handling UI/UX through full-stack development.",
    icon: <MonitorIcon />,
    features: [
      "UI/UX Design",
      "Responsive Web Design",
      "Web App Development",
      "CMS Integration",
      "Performance Optimization",
      "SEO Best Practices",
    ],
    process: [
      "Discovery & Research",
      "Wireframing & Prototyping",
      "Visual Design",
      "Development & Testing",
      "Launch & Support",
    ],
  },
  {
    slug: "branding-identity-design",
    title: "Branding & Identity Design",
    description:
      "Creates comprehensive brand systems communicating business values through visual and emotional identity beyond logos.",
    icon: <BrushIcon />,
    features: [
      "UX Audits",
      "Design Thinking",
      "Brand Methodologies",
      "Wireframing",
      "Logo Design",
      "Brand Guidelines",
    ],
    process: [
      "Brand Discovery",
      "Competitive Analysis",
      "Concept Development",
      "Design Refinement",
      "Brand Guidelines Delivery",
    ],
  },
  {
    slug: "website-maintenance-support",
    title: "Website Maintenance & Support",
    description:
      "Maintains digital presence security, speed, and current standards through ongoing technical management.",
    icon: <ShieldIcon />,
    features: [
      "Regular Updates",
      "Performance Monitoring",
      "Bug Fixes",
      "Backup & Security",
      "Uptime Monitoring",
      "24/7 Support",
    ],
    process: [
      "Initial Audit",
      "Maintenance Plan Setup",
      "Ongoing Monitoring",
      "Regular Reporting",
      "Continuous Improvement",
    ],
  },
  {
    slug: "consultation-technical-guidance",
    title: "Consultation & Technical Guidance",
    description:
      "Delivers expert direction navigating digital strategy, technology decisions, and implementation plans aligned with business objectives.",
    icon: <CompassIcon />,
    features: [
      "Expert Digital Strategy",
      "Technical Problem-Solving",
      "Emerging Technology Advisory",
      "Architecture Review",
      "Technology Selection",
      "Implementation Roadmap",
    ],
    process: [
      "Needs Assessment",
      "Strategy Development",
      "Technology Evaluation",
      "Roadmap Creation",
      "Ongoing Advisory",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
