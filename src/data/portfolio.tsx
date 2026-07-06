export type Metric = { value: string; label: string };

export type Project = {
  slug: string;
  title: string;
  tags: string[];
  date: string;
  client: string;
  overview: string;
  challenge: string;
  solution: string;
  results?: string;
  metrics: Metric[];
  technologies: string[];
  deliverables?: { heading: string; items: string[] };
  cover: string;
  logo: string;
  gallery: string[];
};

const P = "/images/portfolio";

export const projects: Project[] = [
  {
    slug: "smartflyer-website",
    title: "Smartflyer Website & Portal",
    tags: ["Website"],
    date: "Jul 27, 2025",
    client: "Smartflyer Travel",
    overview:
      "A premium travel website and agent portal for Smartflyer, a luxury travel concierge service. The project involved redesigning their full digital presence to reflect the brand's exclusivity and improve conversion performance.",
    challenge:
      "The original website generated a 72% bounce rate and a 0.8% conversion rate. The design felt generic, booking forms were difficult to locate, and the mobile experience was poor.",
    solution:
      "A complete redesign featuring full-bleed destination photography, a three-step streamlined enquiry flow, and a secure agent portal with CRM integration, document management, and trip-tracking capabilities.",
    results:
      "Conversion improved from 0.8% to 1.45% within 30 days. Mobile conversion reached 1.2%, and the portal reduced administrative time significantly per booking.",
    metrics: [
      { value: "+45%", label: "Conversion rate increase" },
      { value: "-60%", label: "Bounce rate reduction" },
      { value: "3 Hrs", label: "Saved per booking (admin)" },
      { value: "29%", label: "New bounce rate (from 72%)" },
    ],
    technologies: ["PHP", "Laravel 9", "AWS", "Bootstrap", "MySQL", "Figma", "Firebase"],
    cover: `${P}/smartflyer/smartflyer.png`,
    logo: `${P}/smartflyer/logo-transparent.png`,
    gallery: [`${P}/smartflyer/smartflyer-ui-1.png`, `${P}/smartflyer/smartflyer-ui-2.png`],
  },
  {
    slug: "lms",
    title: "LMS",
    tags: ["Technology", "Website"],
    date: "Nov 14, 2023",
    client: "EduTech Institute",
    overview:
      "A comprehensive Learning Management System designed for scalability, serving thousands of concurrent learners across educational and corporate settings. The platform replaced an aging third-party system that limited course-creation flexibility and struggled with concurrent user loads.",
    challenge:
      "The legacy platform couldn't support more than 1,200 concurrent users without performance degradation, limiting enrollment growth. Instructors faced inflexible course-authoring tools, and completion rates lagged industry standards at 41%.",
    solution:
      "A cloud-native LMS featuring a React frontend, Node.js/GraphQL backend, and MongoDB storage. AWS auto-scaling infrastructure supports 50,000+ concurrent users, while a CDN delivers adaptive-bitrate video streaming. It includes rich course authoring, adaptive learning recommendations, WebRTC-powered live sessions, and automated certification.",
    results:
      "Completion rates increased to 78% within six months, supporting 10,000+ active learners with zero downtime during peak enrollment periods.",
    metrics: [
      { value: "78%", label: "Course completion (from 41%)" },
      { value: "10,000+", label: "Active learners" },
      { value: "9,400", label: "Peak concurrent users" },
      { value: "60%", label: "Faster course authoring" },
    ],
    technologies: ["Vue.js", "Laravel 9", "MongoDB", "MySql", "AWS", "WebRTC", "Cloud Functions"],
    cover: `${P}/LMS/courses.png`,
    logo:`${P}/LMS/logo-transparent.png`,
    gallery: [`${P}/LMS/LMS_SIGN.png`],
  },
  {
    slug: "gemscosmo",
    title: "Gemscosmo Online Store",
    tags: ["Website"],
    date: "Apr 15, 2025",
    client: "Gemscosmo",
    overview:
      "A WooCommerce storefront for Gemscosmo, a retailer of natural gemstones, crystals, and minerals ethically sourced from around the world. We designed and built an online shopping experience that captures the brand's premium, natural aesthetic — 'Exquisite crystals, ethically sourced and crafted to perfection' — and turns browsers into buyers.",
    challenge:
      "Gemscosmo needed a trustworthy online store to sell high-value, one-of-a-kind stones to an international audience. Because each piece is unique, the catalogue had to handle single-quantity inventory, multiple currencies, and worldwide shipping, while conveying the authenticity and quality that justify premium pricing.",
    solution:
      "A custom WooCommerce build on WordPress with a clean, gallery-led product experience. It includes categorised collections (Facet Rough, Loose Stones, and Minerals & Crystals), rich product pages with origin details, multi-currency and language selection, promotional banners with weekly discount codes, secure checkout with convenient payment options, and a 7-day return policy — all wrapped in a responsive, conversion-focused design.",
    results:
      "Gemscosmo launched with a polished, global-ready storefront that presents their premium gemstones with the credibility of an established brand — ready to convert international visitors across desktop and mobile.",
    metrics: [
      { value: "3+", label: "Gemstone categories curated" },
      { value: "Global", label: "Worldwide shipping enabled" },
      { value: "100%", label: "Mobile-responsive storefront" },
      { value: "7-Day", label: "Return policy integrated" },
    ],
    technologies: ["WordPress", "WooCommerce", "PHP", "MySQL", "Elementor", "PayPal"],
    deliverables: {
      heading: "What We Delivered",
      items: [
        "Custom WooCommerce storefront on WordPress",
        "Categorised gemstone collections and rich product pages",
        "Single-quantity inventory for one-of-a-kind stones",
        "Multi-currency and language selection",
        "Secure checkout with multiple payment options",
        "Promotional banners and weekly discount codes",
        "Worldwide shipping and 7-day return flows",
      ],
    },
    cover: `${P}/gemscosmo/homepage.png`,
    logo: `${P}/gemscosmo/logo-transparent.png`,
    gallery: [`${P}/gemscosmo/shop-page.png`],
  },
  {
    slug: "timeless-digital-media",
    title: "Timeless Digital Media",
    tags: ["Website"],
    date: "Mar 3, 2025",
    client: "Timeless Digital Media",
    overview:
      "A brand-forward marketing website for Timeless Digital Media, a full-service media production and advertising agency built around the promise 'Bridging the Gap Between Vision and Execution.' We designed and built their complete digital presence on WordPress to showcase their production work and convert visiting SMEs and corporations into enquiries.",
    challenge:
      "As a fast-growing media house serving 4,200+ clients across advertising, video, branding, social, events, and documentaries, Timeless had no single place that presented their six service verticals cohesively, made their portfolio easy to browse, or reliably captured leads. Their site needed to match the production quality of the work itself.",
    solution:
      "A custom WordPress build using Elementor, structured around their brand narrative — 'Driven by Vision. Defined by Impact.' It features a cinematic hero, dedicated sections for each of the six services, a filterable 'Our Work' showcase, a team page, and streamlined contact and enquiry flows. The site is fully responsive, SEO-optimised, and tuned for fast load times.",
    results:
      "The new site gave Timeless a single, polished home for their brand and portfolio, improving how prospective SMEs and corporate clients discover their services, browse past work, and get in touch — reinforcing their position as 'the media production experts you can count on.'",
    metrics: [
      { value: "4,200+", label: "Clients showcased as social proof" },
      { value: "6", label: "Core services presented" },
      { value: "100%", label: "Responsive across devices" },
      { value: "<2s", label: "Average page load time" },
    ],
    technologies: ["WordPress", "Elementor", "PHP", "MySQL", "Yoast SEO", "Cloudflare"],
    deliverables: {
      heading: "What We Delivered",
      items: [
        "Custom WordPress theme built with Elementor",
        "Cinematic homepage and brand storytelling",
        "Dedicated pages for all six service verticals",
        "Filterable 'Our Work' portfolio showcase",
        "Team and About sections",
        "Contact and enquiry lead-capture flows",
        "On-page SEO and performance optimisation",
      ],
    },
    cover: `${P}/timeless/timelessdigitalmedia.com.png`,
    logo: `${P}/timeless/logo.svg`,
    gallery: [`${P}/timeless/timelessdigitalmedia.com.png`],
  },
  {
    slug: "ai-voice-cloning",
    title: "AI Voice Cloning Technology",
    tags: ["AI", "Website"],
    date: "Mar 10, 2026",
    client: "VoiceAI Studios",
    overview:
      "A real-time voice-synthesis platform enabling professionals and content creators to clone voices from brief audio samples and generate natural-sounding voiceovers at scale — reducing production timelines and eliminating costly re-recording sessions.",
    challenge:
      "Professional voiceover production required studio bookings, talent coordination, and multi-day revision cycles costing thousands per project. Existing voice tools produced unconvincing output, and independent creators faced prohibitive costs.",
    solution:
      "A custom PyTorch-based synthesis stack extracts speaker embeddings from 30-second samples, conditioning a neural vocoder that produces 24kHz audio. A React interface enables script input, playback, editing, and export, with WebRTC powering real-time preview.",
    metrics: [
      { value: "10×", label: "Faster content production" },
      { value: "500+", label: "Creators onboarded in Q1" },
      { value: "10,000+", label: "Hours of audio generated" },
      { value: "4.3/5", label: "Blind quality score" },
    ],
    technologies: ["React", "PyTorch", "FastAPI", "WebRTC", "AWS EC2 GPUs", "S3"],
    deliverables: {
      heading: "Key Deliverables",
      items: [
        "30-second voice cloning with neural embedding",
        "Real-time audio preview via WebRTC",
        "Emotion and pacing controls",
        "Multi-speaker project management",
        "Export to MP3, WAV, AAC formats",
        "API access for batch workflows",
      ],
    },
    cover: `${P}/vocal-fusion/vocal-fusion-featured.png`,
    logo:`${P}/vocal-fusion/logo-transparent.png`,
    gallery: [`${P}/vocal-fusion/vocal-fusion.png`],
  },
  {
    slug: "bank-of-khyber-dashboard",
    title: "Bank of Khyber Dashboard",
    tags: ["Technology"],
    date: "Mar 10, 2026",
    client: "Bank of Khyber",
    overview:
      "A unified analytics platform surfacing real-time performance data across branches, product lines, and regional divisions. It consolidated feeds from multiple core banking systems into an interactive view with role-based dashboards for branch managers, regional directors, and executives.",
    challenge:
      "Disparate data sources and legacy systems made consolidated reporting nearly impossible. The bank operated across 40+ branches with incompatible data schemas, requiring manual monthly reports that took up to 5 days to compile.",
    solution:
      "Node.js ETL pipelines normalized data from four core banking systems into a centralized SQL Server warehouse. A React frontend rendered interactive D3.js visualizations with role-scoped dashboards and 15-minute refresh cycles.",
    results:
      "Monthly reporting dropped from 5 days to 15 minutes with full adoption across all branches. The executive team achieved real-time visibility for the first time.",
    metrics: [
      { value: "15 min", label: "Reporting cycle (from 5 days)" },
      { value: "40+", label: "Branches connected" },
      { value: "60+", label: "KPIs tracked" },
      { value: "200+", label: "Daily active users" },
    ],
    technologies: ["React", "D3.js", "Node.js", "SQL Server", "Azure Data Factory", "Power BI"],
    cover: `${P}/bok/BOK-dash.png`,
    logo:`${P}/bok/logo-transparent.png`,
    gallery: [`${P}/bok/logo-transparent.jpg`],
  },
  {
    slug: "sales-performance-dashboard",
    title: "Sales Performance Dashboard – PowerBI",
    tags: ["Technology"],
    date: "Mar 8, 2026",
    client: "Enterprise Sales Corp",
    overview:
      "An enterprise solution providing sales leadership with unified visibility into pipeline health, team performance, and revenue forecasting across 1,200+ active opportunities spanning 6 regions. It replaced fragmented spreadsheet reports and legacy CRM exports with a self-service analytics platform.",
    challenge:
      "Regional managers manually aggregated forecasts via spreadsheets with ±22% variance and 2-day processing cycles. The organization faced poor pipeline hygiene due to inconsistent CRM usage and a lack of standardized stage definitions.",
    solution:
      "A star-schema data model in Azure Synapse powers the PowerBI frontend with 150+ custom DAX measures, AI-assisted forecasting, territory heat maps, rep-level scorecards, drill-through capabilities, and row-level security for regional data isolation.",
    results:
      "Forecast variance decreased to ±14%, saving approximately £180,000 in resource-allocation costs. Sales-cycle length dropped 12%, and manager reporting time fell from 6 hours to under 30 minutes weekly.",
    metrics: [
      { value: "35%", label: "Forecast accuracy improvement" },
      { value: "20%", label: "Team productivity increase" },
      { value: "150+", label: "Custom DAX measures" },
      { value: "6", label: "Regions connected & unified" },
    ],
    technologies: ["PowerBI", "DAX", "Azure Synapse", "SQL Server", "Power Automate", "Salesforce API"],
    cover: `${P}/addidas/adidas_featured.png`,
    logo: `${P}/addidas/logo-transparent.png`,
    gallery: [`${P}/addidas/adidas.png`],
  },
  {
    slug: "ai-video-automation",
    title: "AI Video Automation – PoC",
    tags: ["AI", "Website"],
    date: "Mar 4, 2026",
    client: "MediaGen Corp",
    overview:
      "An end-to-end AI system converting text briefs into completed marketing videos featuring voiceover, text overlays, background music, and B-roll — with zero manual editing. Built for a digital marketing agency managing video campaigns for 30+ clients to validate replacing manual production with automated processing. The workflow accepts campaign briefs, generates scripts via LLM, creates voiceovers, sources stock footage through semantic search, composites elements via FFmpeg, and delivers MP4 files in under 10 minutes.",
    challenge:
      "Marketing teams required scalable video content but lacked production capacity. The agency produced 40–60 videos monthly, with each consuming 6–8 hours of editor time. Growing client demand made manual scaling economically unfeasible.",
    solution:
      "A composition pipeline that turns briefs into finished videos: LLM-powered scripts, AI voice synthesis, semantic stock-footage search, and automated FFmpeg assembly with captions, lower-thirds, and music mixing.",
    results:
      "The PoC produced 12 campaign videos during the pilot, reducing per-video cost by 80% and production time from 7 hours to 8 minutes. Creative evaluation rated outputs acceptable for tier-2 social content, and the board approved full product development.",
    metrics: [
      { value: "80%", label: "Production cost reduction" },
      { value: "8 min", label: "End-to-end generation time" },
      { value: "12", label: "Videos produced in pilot" },
      { value: "4.5/5", label: "Creative quality score" },
    ],
    technologies: ["Python", "FFmpeg", "OpenAI GPT-4", "CLIP", "React", "AWS Lambda"],
    deliverables: {
      heading: "Key Challenges Addressed",
      items: [
        "LLM-powered script generation from campaign briefs",
        "AI voice synthesis with tone and pacing controls",
        "Semantic stock-footage search using CLIP embeddings",
        "Automated FFmpeg composition pipeline",
        "Captions, lower-thirds, and music mixing",
        "React review and export interface",
      ],
    },
    cover: `${P}/streamVi/video-featured.png`,
    logo:`${P}/streamVi/logo-transparent.png`,
    gallery: [`${P}/streamVi/video-strem.png`],
  },
  {
    slug: "docextract",
    title: "DocExtract",
    tags: ["AI", "Website"],
    date: "Mar 10, 2026",
    client: "DocExtract Ltd",
    overview:
      "An enterprise-grade document-intelligence platform built to eliminate the bottleneck of manual data entry. It automates data extraction from complex documents using AI and machine learning, processing documents in seconds while integrating with existing enterprise systems via REST API.",
    challenge:
      "Manual document processing required staff to key data from thousands of PDFs and forms weekly, with accuracy around 94% — creating errors in downstream systems and limiting scalability.",
    solution:
      "Delivered across five phases: discovery and workflow mapping, model training on 5,000+ annotated documents, parallel platform development, a 30-day pilot, and enterprise rollout with SSO integration and role-based access controls.",
    metrics: [
      { value: "90%", label: "Reduction in processing time" },
      { value: "99.2%", label: "Extraction accuracy" },
      { value: "15,000+", label: "Documents processed monthly" },
      { value: "200", label: "Staff hours saved weekly" },
    ],
    technologies: ["Next.js", "Python", "TensorFlow", "FastAPI", "PostgreSQL", "Redis"],
    deliverables: {
      heading: "Capabilities Delivered",
      items: [
        "AI-powered layout detection",
        "Real-time review interface",
        "Continuous model improvement from operator feedback",
        "REST API integration",
        "Audit-trail compliance reporting",
        "Support for multiple formats, including handwritten forms",
      ],
    },
    cover: `${P}/docx/DocExtract-feature.png`,
    logo:`${P}/docx/logo-transparent.png`,
    gallery: [`${P}/docx/DocExtract.png`],
  },
];

export const portfolioFilters = ["All", "Technology", "Website", "AI"] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
