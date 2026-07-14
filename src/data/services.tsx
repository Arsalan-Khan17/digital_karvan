import type { ReactNode } from "react";

export type Service = {
  slug: string;
  title: string;
  /** short line used on the homepage service cards */
  tagline: string;
  /** longer intro used on the /services list + detail pages */
  description: string;
  /** every minor service that lives under this umbrella */
  features: string[];
  process: string[];
  icon: ReactNode;
};

function CodeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 9l-3 3 3 3M16 9l3 3-3 3M13 6l-2 12" />
    </svg>
  );
}
function SparkIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16M7 20V10M12 20V4M17 20v-6" />
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
    slug: "software-development",
    title: "Software Development",
    tagline:
      "Web apps, mobile apps, and the backends that power them — engineered to hold up as you grow.",
    description:
      "Scalable backends, fast frontends, and native mobile apps engineered to hold up as your business grows. From a marketing site to a full platform, we build production-grade software on reliable, modern technology.",
    icon: <CodeIcon />,
    features: [
      "Custom Web Applications",
      "Frontend Engineering (React & Next.js)",
      "Backend & API Development",
      "Mobile Apps (iOS, Android, React Native)",
      "E-Commerce (WooCommerce, Shopify)",
      "CMS & WordPress Development",
      "Cloud & DevOps (AWS, Azure, CI/CD)",
      "QA & Automated Testing",
      "Performance Optimization",
      "Third-Party & Payment Integrations",
    ],
    process: [
      "Discovery & Requirements",
      "Architecture & Planning",
      "Design & Prototyping",
      "Build & Test",
      "Launch & Scale",
    ],
  },
  {
    slug: "ai-intelligent-systems",
    title: "AI & Intelligent Systems",
    tagline:
      "LLMs, chatbots, and automation embedded directly into the workflows that run your business.",
    description:
      "We embed large language models, custom machine learning, and automation into the workflows that run your business — turning manual, repetitive work into systems that run themselves.",
    icon: <SparkIcon />,
    features: [
      "LLM Integration (GPT, Claude, Gemini)",
      "Custom Chatbots & Virtual Assistants",
      "RAG & Knowledge-Base Q&A",
      "Workflow & Process Automation",
      "Document Intelligence (OCR & Extraction)",
      "Predictive & Machine Learning Models",
      "Voice & Speech AI",
      "Computer Vision",
      "AI Readiness Assessment",
      "Model Fine-Tuning & Evaluation",
    ],
    process: [
      "Use-Case Discovery",
      "Data & Feasibility Audit",
      "Prototype & Evaluate",
      "Integrate & Automate",
      "Monitor & Improve",
    ],
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    tagline:
      "Pipelines and dashboards that turn raw, scattered data into decisions you can defend.",
    description:
      "Custom data pipelines and real-time dashboards that turn scattered, raw data into confident decisions — giving your whole team a single source of truth they can actually trust.",
    icon: <ChartIcon />,
    features: [
      "Power BI Dashboards",
      "Data Warehousing (SQL Server, Synapse)",
      "ETL & Data Pipelines",
      "KPI & Metric Design",
      "Real-Time Reporting",
      "Data Modelling (Star Schema, DAX)",
      "Data Cleaning & Migration",
      "Forecasting & Trend Analysis",
      "Self-Service Analytics Enablement",
      "Embedded Analytics",
    ],
    process: [
      "Data Audit & Discovery",
      "Modelling & Warehouse Design",
      "Pipeline Development",
      "Dashboards & Reporting",
      "Enablement & Handover",
    ],
  },
  {
    slug: "branding-design",
    title: "Branding & Design",
    tagline:
      "Identity and interfaces that make your product as intuitive to use as it is polished to look at.",
    description:
      "Research-driven brand identity and product design — from logo and visual system to the interface your customers use every day, all unified by a single design system.",
    icon: <BrushIcon />,
    features: [
      "Brand Identity & Logo Design",
      "Visual Identity Systems",
      "UI/UX Design",
      "Design Systems & Component Libraries",
      "Wireframing & Prototyping (Figma)",
      "User Research & Usability Testing",
      "Graphic Design & Marketing Collateral",
      "Motion & Interaction Design",
      "Brand Guidelines",
      "Presentation & Pitch Design",
    ],
    process: [
      "Brand & User Research",
      "Concept & Direction",
      "Design System Build",
      "UI Design & Prototype",
      "Handoff & Guidelines",
    ],
  },
  {
    slug: "consultation-technical-guidance",
    title: "Consultation & Technical Guidance",
    tagline: "Straight answers and a clear plan — even if you never build with us.",
    description:
      "Not every problem needs an agency. Whether you are choosing a stack, auditing an existing build, or deciding whether AI is worth it, we give you honest technical guidance so you can make the right call — with us or without us.",
    icon: <CompassIcon />,
    features: [
      "Technology Stack Selection",
      "Architecture & Code Review",
      "Product & Feature Roadmapping",
      "Technical Due Diligence",
      "Cost & Scalability Audits",
      "AI Readiness Assessment",
      "Security & Performance Audits",
      "Team Augmentation & Hiring Guidance",
      "Vendor & Agency Selection Advice",
      "One-Off Advisory Sessions",
    ],
    process: [
      "Intro Call",
      "Context & Code Review",
      "Findings & Risks",
      "Recommendations & Roadmap",
      "Follow-Up Support",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
