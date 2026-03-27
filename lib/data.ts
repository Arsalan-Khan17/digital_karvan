// Services
export interface Service {
  id: string;
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  approach: string[];
}

export const services: Service[] = [
  {
    id: '1',
    slug: 'website-development',
    title: 'Website Design & Development',
    icon: 'Monitor',
    shortDescription: 'We design and build stunning, high-performance websites tailored to your brand.',
    fullDescription: 'Our website design and development service combines cutting-edge technology with thoughtful design to create digital experiences that convert visitors into customers. From UI/UX design to full-stack development, we handle every aspect of your web presence.',
    features: ['UI/UX Design', 'Responsive Web Design', 'Web App Development', 'CMS Integration', 'Performance Optimization', 'SEO Best Practices'],
    approach: ['Discovery & Research', 'Wireframing & Prototyping', 'Visual Design', 'Development & Testing', 'Launch & Support'],
  },
  {
    id: '2',
    slug: 'branding-identity',
    title: 'Branding & Identity Design',
    icon: 'Palette',
    shortDescription: 'Craft a distinctive brand identity that resonates with your target audience.',
    fullDescription: 'Your brand is more than a logo — it is the complete visual and emotional identity of your business. We create cohesive brand systems that communicate your values and connect with your customers on a deeper level.',
    features: ['UX Audits', 'Design Thinking', 'Brand Methodologies', 'Wireframing', 'Logo Design', 'Brand Guidelines'],
    approach: ['Brand Discovery', 'Competitive Analysis', 'Concept Development', 'Design Refinement', 'Brand Guidelines Delivery'],
  },
  {
    id: '3',
    slug: 'maintenance-support',
    title: 'Website Maintenance & Support',
    icon: 'Shield',
    shortDescription: 'Keep your digital presence secure, up-to-date, and performing at its best.',
    fullDescription: 'Technology never stands still, and neither should your website. Our maintenance and support packages ensure your digital presence remains secure, fast, and aligned with the latest standards.',
    features: ['Regular Updates', 'Performance Monitoring', 'Bug Fixes', 'Backup & Security', 'Uptime Monitoring', '24/7 Support'],
    approach: ['Initial Audit', 'Maintenance Plan Setup', 'Ongoing Monitoring', 'Regular Reporting', 'Continuous Improvement'],
  },
  {
    id: '4',
    slug: 'consultation',
    title: 'Consultation & Technical Guidance',
    icon: 'Lightbulb',
    shortDescription: 'Expert digital strategy and technical guidance to help your business thrive.',
    fullDescription: 'Navigate the complex digital landscape with confidence. Our consultation services provide expert guidance on digital strategy, technology selection, and implementation roadmaps tailored to your business goals.',
    features: ['Expert Digital Strategy', 'Technical Problem-Solving', 'Emerging Technology Advisory', 'Architecture Review', 'Technology Selection', 'Implementation Roadmap'],
    approach: ['Needs Assessment', 'Strategy Development', 'Technology Evaluation', 'Roadmap Creation', 'Ongoing Advisory'],
  },
];

// Projects
export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectProcess {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  categories: string[];
  date: string;
  imageGradient: string;
  description: string;
  overviewParagraphs: string[];
  challenge: string;
  challengeDetail: string;
  solution: string;
  solutionDetail: string;
  results: string;
  resultsDetail: string;
  metrics: ProjectMetric[];
  keyFeatures: string[];
  process: ProjectProcess[];
  technologies: string[];
  client: string;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'docextract',
    title: 'DocExtract',
    categories: ['Technology', 'Website'],
    date: 'Mar 10, 2026',
    imageGradient: 'from-blue-900 to-purple-900',
    description: 'An intelligent document extraction platform that automates data capture from complex documents using AI.',
    overviewParagraphs: [
      'DocExtract is an enterprise-grade document intelligence platform built to eliminate the bottleneck of manual data entry. Organisations processing hundreds of invoices, contracts, and forms daily were drowning in repetitive extraction tasks that consumed skilled staff time and introduced errors at every step.',
      'We designed and built a full-stack solution combining a custom-trained machine learning pipeline with a clean, intuitive web interface. The result is a platform that processes documents in seconds, learns from corrections, and integrates seamlessly with existing enterprise workflows via REST API.',
    ],
    challenge: 'Manual document processing was time-consuming and error-prone, costing businesses significant resources.',
    challengeDetail: 'The client\'s operations team was manually keying data from thousands of PDFs, scanned invoices, and structured forms every week. Accuracy hovered around 94%, meaning roughly 1 in 17 documents contained errors that propagated downstream into accounting and compliance systems. The process was entirely manual, non-auditable, and impossible to scale without proportional headcount growth.',
    solution: 'Built an AI-powered extraction engine with a clean web interface for real-time document processing.',
    solutionDetail: 'We developed a multi-stage extraction pipeline using TensorFlow for layout detection and field classification, combined with a fine-tuned OCR layer for handwritten and low-resolution inputs. A Next.js frontend provides a real-time review interface where operators can validate, correct, and approve extracted data before it flows into downstream systems. Every correction is fed back into the model, enabling continuous accuracy improvement.',
    results: '90% reduction in manual processing time with 99.2% extraction accuracy across all document types.',
    resultsDetail: 'Within 90 days of deployment, the operations team reduced document processing time by 90%, freeing up over 200 staff-hours per week. Extraction accuracy improved from 94% to 99.2%. The platform now handles 15,000+ documents per month with a fully auditable trail, and the client has expanded usage to three additional business units.',
    metrics: [
      { value: '90%', label: 'Reduction in processing time' },
      { value: '99.2%', label: 'Extraction accuracy' },
      { value: '15K+', label: 'Documents processed monthly' },
      { value: '200hrs', label: 'Staff hours saved weekly' },
    ],
    keyFeatures: [
      'AI-powered layout detection and field classification',
      'Real-time document review and correction interface',
      'Continuous model improvement from operator feedback',
      'REST API integration with enterprise ERP systems',
      'Full audit trail and compliance reporting',
      'Support for PDFs, scans, images, and handwritten forms',
    ],
    process: [
      { title: 'Discovery & Audit', description: 'Mapped existing workflows, document types, and downstream system integrations to define the full scope of extraction requirements.' },
      { title: 'Model Training', description: 'Collected and annotated a training dataset of 5,000+ documents across all target categories to train the layout detection and field classification models.' },
      { title: 'Platform Development', description: 'Built the Next.js frontend and Python/FastAPI backend in parallel sprints, with continuous integration testing against the live document corpus.' },
      { title: 'Pilot & Iteration', description: 'Deployed to a single operations team for a 30-day pilot, gathered correction data, and retrained the model before full rollout.' },
      { title: 'Enterprise Rollout', description: 'Scaled the platform to the full organisation with SSO integration, role-based access controls, and dedicated onboarding support.' },
    ],
    technologies: ['Next.js', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Redis'],
    client: 'DocExtract Ltd',
  },
  {
    id: '2',
    slug: 'ai-voice-cloning',
    title: 'AI Voice Cloning Technology',
    categories: ['Technology', 'Website'],
    date: 'Mar 10, 2026',
    imageGradient: 'from-green-900 to-teal-900',
    description: 'A cutting-edge voice synthesis platform enabling realistic voice cloning for content creators.',
    overviewParagraphs: [
      'AI Voice Cloning Technology is a real-time voice synthesis platform built for professional content creators, podcasters, and media production teams. The platform enables users to clone any voice from a short audio sample and generate natural-sounding voiceovers at scale, eliminating costly re-recording sessions.',
      'We engineered the full stack — from the deep learning inference pipeline to the browser-based audio studio — with a focus on output quality, latency, and ease of use. The platform handles multi-speaker projects, emotion-aware synthesis, and direct export to major distribution formats.',
    ],
    challenge: 'Content creators needed efficient ways to produce voiceovers without expensive studio sessions.',
    challengeDetail: 'Professional voiceover production required booking studios, coordinating with voice talent, and waiting days for revisions — a process that cost thousands per project and made iteration nearly impossible. Independent creators and small studios were priced out entirely. Existing off-the-shelf voice tools produced robotic output that audiences immediately rejected.',
    solution: 'Developed a real-time voice cloning system requiring only a 30-second sample, producing broadcast-quality output.',
    solutionDetail: 'We built a custom voice synthesis stack using a fine-tuned PyTorch model trained on high-quality speech datasets. The system extracts a speaker embedding from a 30-second audio sample, which is then used to condition a neural vocoder producing 24kHz audio. A React-based studio interface handles script input, playback, segment editing, and export. WebRTC enables real-time preview without server round-trips.',
    results: '10x faster content production, adopted by over 500 creators within the first quarter of launch.',
    resultsDetail: 'The platform cut average voiceover production time from 3 days to 4 hours. Over 500 content creators adopted the platform in the first quarter, collectively producing more than 10,000 hours of synthesised audio. Output quality scores from blind listening tests averaged 4.3/5 — indistinguishable from human voice for 78% of respondents.',
    metrics: [
      { value: '10×', label: 'Faster content production' },
      { value: '500+', label: 'Creators onboarded in Q1' },
      { value: '10K hrs', label: 'Audio generated' },
      { value: '4.3/5', label: 'Blind quality score' },
    ],
    keyFeatures: [
      '30-second voice cloning with neural embedding',
      'Real-time audio preview via WebRTC',
      'Emotion and pacing controls',
      'Multi-speaker project management',
      'Export to MP3, WAV, and AAC',
      'API access for batch generation workflows',
    ],
    process: [
      { title: 'Research & Benchmarking', description: 'Evaluated leading voice synthesis architectures and conducted quality benchmarking to select the optimal model backbone.' },
      { title: 'Model Development', description: 'Fine-tuned a transformer-based TTS model on curated speech datasets, with a custom neural vocoder for high-fidelity output.' },
      { title: 'Studio Interface', description: 'Designed and built the browser-based audio studio with real-time preview, waveform editing, and project management.' },
      { title: 'Infrastructure', description: 'Deployed GPU inference on auto-scaling cloud infrastructure to maintain sub-2-second latency under peak load.' },
      { title: 'Creator Beta', description: 'Ran a closed beta with 50 professional creators, iterated on UX and model quality based on structured feedback before public launch.' },
    ],
    technologies: ['React', 'PyTorch', 'FastAPI', 'WebRTC', 'AWS EC2 GPU', 'S3'],
    client: 'VoiceAI Studios',
  },
  {
    id: '3',
    slug: 'bank-of-khyber-dashboard',
    title: 'Bank of Khyber Dashboard',
    categories: ['Technology'],
    date: 'Mar 10, 2026',
    imageGradient: 'from-yellow-900 to-orange-900',
    description: 'Enterprise banking dashboard providing real-time financial analytics and branch performance metrics.',
    overviewParagraphs: [
      'Bank of Khyber required a unified analytics platform that could surface real-time performance data across all branches, product lines, and regional divisions. The existing reporting infrastructure relied on manual spreadsheet exports and weekly summaries — too slow and fragmented for executive decision-making.',
      'We delivered a comprehensive data dashboard that consolidates feeds from multiple core banking systems into a single, interactive view. Branch managers, regional directors, and C-suite executives each have tailored role-based dashboards surfacing the KPIs most relevant to their responsibilities.',
    ],
    challenge: 'Disparate data sources and legacy systems made consolidated reporting nearly impossible.',
    challengeDetail: 'The bank operated across 40+ branches, each running slightly different legacy systems with incompatible data schemas. Monthly performance reports were produced manually by a dedicated team of analysts, taking up to 5 days to compile. Real-time visibility into deposits, lending, and branch KPIs simply did not exist, making it impossible to identify and act on performance trends quickly.',
    solution: 'Built a unified analytics dashboard integrating multiple data sources with real-time updates and role-based views.',
    solutionDetail: 'We built a data integration layer using Node.js ETL pipelines that normalise and stream data from four core banking systems into a centralised SQL Server warehouse. The React frontend renders interactive D3.js visualisations covering 60+ KPIs across deposits, lending, branch performance, and risk metrics. Dashboards are role-scoped, with drill-down from national level to individual teller performance. Data refreshes every 15 minutes with delta updates.',
    results: 'Reporting time reduced from 5 days to under 15 minutes, with full adoption across all 40+ branches.',
    resultsDetail: 'Monthly reporting cycles dropped from 5 days to 15 minutes. The executive team gained real-time visibility for the first time, enabling the identification of a regional lending anomaly within 48 hours that would previously have taken weeks to surface. Branch manager satisfaction scores improved from 3.1 to 4.6/5. The platform is now used daily by 200+ staff across all 40 branches.',
    metrics: [
      { value: '5 days → 15min', label: 'Reporting cycle time' },
      { value: '40+', label: 'Branches connected' },
      { value: '60+', label: 'KPIs tracked' },
      { value: '200+', label: 'Daily active users' },
    ],
    keyFeatures: [
      'Real-time ETL from 4 core banking systems',
      'Interactive D3.js visualisations for 60+ KPIs',
      'Role-based dashboards for branch, regional, and executive views',
      'Drill-down from national to individual transaction level',
      'Automated anomaly detection and alerting',
      'Scheduled PDF report generation',
    ],
    process: [
      { title: 'Systems Audit', description: 'Documented all data sources, schemas, and refresh cadences across the four core banking platforms to design the integration architecture.' },
      { title: 'Data Integration', description: 'Built normalisation pipelines and a centralised warehouse schema, handling schema mismatches and historical data migration.' },
      { title: 'Dashboard Design', description: 'Conducted workshops with branch managers and executives to define role-specific KPI priorities and dashboard layouts.' },
      { title: 'Development', description: 'Built the React/D3 frontend and Node.js API layer over four sprints with weekly stakeholder reviews.' },
      { title: 'Rollout & Training', description: 'Phased rollout starting with head office, followed by regional hubs and branch network, with in-person training sessions.' },
    ],
    technologies: ['React', 'D3.js', 'Node.js', 'SQL Server', 'Azure Data Factory', 'Power BI'],
    client: 'Bank of Khyber',
  },
  {
    id: '4',
    slug: 'sales-performance-dashboard',
    title: 'Sales Performance Dashboard – PowerBI',
    categories: ['Technology'],
    date: 'Mar 8, 2026',
    imageGradient: 'from-red-900 to-pink-900',
    description: 'Comprehensive PowerBI sales analytics dashboard for enterprise sales teams with custom KPIs and AI-driven forecasting.',
    overviewParagraphs: [
      'This enterprise PowerBI solution gives sales leadership and individual contributors a single pane of glass for pipeline health, team performance, and revenue forecasting. Built for a multinational sales organisation managing 1,200+ active opportunities across 6 regions, the dashboard replaced a fragmented mix of spreadsheet reports and legacy CRM exports.',
      'We designed a custom data model in Azure Synapse that powers an intuitive PowerBI frontend, complete with AI-assisted forecasting, territory heat maps, and rep-level performance scorecards. The solution is fully self-service — managers can slice by region, product, or time period without analyst support.',
    ],
    challenge: 'Sales managers lacked real-time visibility into team performance and pipeline health across regions.',
    challengeDetail: 'Revenue forecasting was done manually in spreadsheets, with regional managers submitting weekly updates that were aggregated by a central analyst. The process took 2 days per cycle and produced forecasts with a ±22% variance. Pipeline hygiene was poor — no standardised stage definitions, inconsistent CRM usage, and no early-warning system for at-risk deals.',
    solution: 'Created an interactive PowerBI solution with custom DAX measures, AI forecasting, and drill-through to individual opportunities.',
    solutionDetail: 'We built a star-schema data model in Azure Synapse fed by CRM, ERP, and HR data. Over 150 custom DAX measures power the PowerBI frontend, including AI-assisted forecast models, rolling quota attainment, and pipeline velocity metrics. Drill-through reports let any manager navigate from a regional aggregate down to an individual opportunity in two clicks. Row-level security enforces data isolation between regions.',
    results: '35% improvement in forecast accuracy and 20% increase in team productivity within 60 days.',
    resultsDetail: 'Forecast variance dropped from ±22% to ±14% in the first quarter, saving approximately £180,000 in over/under-resourcing costs. Sales cycle length decreased by 12% as reps gained visibility into their pipeline gaps earlier. Manager time spent on reporting fell from 6 hours to under 30 minutes per week. The solution was recognised internally as the most-used BI asset across the organisation.',
    metrics: [
      { value: '35%', label: 'Improvement in forecast accuracy' },
      { value: '20%', label: 'Increase in team productivity' },
      { value: '150+', label: 'Custom DAX measures' },
      { value: '6 regions', label: 'Connected & unified' },
    ],
    keyFeatures: [
      'AI-assisted revenue forecasting with variance tracking',
      'Territory heat maps with real-time pipeline data',
      'Rep-level performance scorecards',
      'Drill-through from region to individual opportunity',
      'Row-level security for regional data isolation',
      'Automated weekly digest emails via Power Automate',
    ],
    process: [
      { title: 'Requirements Workshop', description: 'Facilitated workshops with VP Sales, regional directors, and individual contributors to map KPI priorities and reporting gaps.' },
      { title: 'Data Modelling', description: 'Designed a star-schema in Azure Synapse integrating Salesforce, SAP, and Workday as source systems.' },
      { title: 'DAX Development', description: 'Built 150+ custom measures covering quota attainment, pipeline velocity, win rates, and forecast accuracy.' },
      { title: 'Visual Design', description: 'Designed the dashboard layout with the sales enablement team, balancing information density with clarity for non-technical users.' },
      { title: 'Training & Adoption', description: 'Delivered role-based training sessions and produced a self-service guide to drive adoption across the sales organisation.' },
    ],
    technologies: ['PowerBI', 'DAX', 'Azure Synapse', 'SQL Server', 'Power Automate', 'Salesforce API'],
    client: 'Enterprise Sales Corp',
  },
  {
    id: '5',
    slug: 'ai-video-automation',
    title: 'AI Video Automation – PoC',
    categories: ['Technology', 'Website'],
    date: 'Mar 4, 2026',
    imageGradient: 'from-indigo-900 to-blue-900',
    description: 'Proof of concept for automated video generation using AI — from script to finished video without human editing.',
    overviewParagraphs: [
      'This proof of concept demonstrates an end-to-end AI pipeline that transforms a text brief into a finished marketing video — complete with voiceover, on-screen text, background music, and B-roll clips — with zero manual editing. Built for a digital marketing agency managing video campaigns for 30+ clients, the PoC was designed to validate the feasibility of replacing manual video production with an automated pipeline.',
      'The system accepts a campaign brief, generates a script via LLM, synthesises a voiceover, selects relevant stock footage using semantic search, composites all elements via FFmpeg, and delivers a rendered MP4 in under 10 minutes. The PoC was validated against a real campaign and presented to the client\'s board as the basis for a full product build.',
    ],
    challenge: 'Marketing teams needed scalable video content but lacked the production resources to meet client demand.',
    challengeDetail: 'The agency was producing 40–60 short-form videos per month manually — each taking 6–8 hours of editor time for scripting, recording, editing, and delivery. As client demand grew, the bottleneck became critical. Hiring more editors was not economically viable, and the quality of rushed output was deteriorating. A scalable automated solution was needed urgently.',
    solution: 'Built an AI pipeline that takes a text brief and produces a fully composed, broadcast-ready video in under 10 minutes.',
    solutionDetail: 'The pipeline consists of five stages: (1) GPT-4 generates a structured video script from the campaign brief; (2) a voice synthesis model produces the voiceover; (3) a CLIP-based semantic search selects the most relevant clips from a licensed stock library; (4) FFmpeg composites clips, voiceover, captions, and background audio into a timed edit; (5) the finished MP4 is delivered via a simple React review interface. Total runtime: 6–9 minutes.',
    results: '80% cost reduction in video production, validated across a live campaign pilot.',
    resultsDetail: 'The PoC successfully produced 12 campaign videos during the pilot, reducing per-video production cost by 80% and time from 7 hours to 8 minutes. Blind evaluation by the client\'s creative director rated PoC output at 3.8/5 versus 4.1/5 for manually produced videos — a gap the team deemed acceptable for tier-2 social content. The board approved a full product build based on the PoC results.',
    metrics: [
      { value: '80%', label: 'Production cost reduction' },
      { value: '8 min', label: 'End-to-end generation time' },
      { value: '12 videos', label: 'Produced in pilot' },
      { value: '3.8/5', label: 'Creative quality score' },
    ],
    keyFeatures: [
      'LLM-powered script generation from campaign brief',
      'AI voice synthesis with tone and pacing controls',
      'Semantic stock footage search with CLIP embeddings',
      'Automated FFmpeg composition pipeline',
      'Captions, lower-thirds, and music track mixing',
      'React review and export interface',
    ],
    process: [
      { title: 'Scoping', description: 'Defined the PoC success criteria with the client: quality threshold, cost target, and acceptable generation time.' },
      { title: 'Pipeline Architecture', description: 'Designed the five-stage pipeline architecture, selected model components, and identified the stock footage API.' },
      { title: 'Component Development', description: 'Built and tested each pipeline stage independently before integrating into the end-to-end flow.' },
      { title: 'Pilot Production', description: 'Ran the pipeline against 12 real campaign briefs, comparing output quality and cost against manual production.' },
      { title: 'Board Presentation', description: 'Compiled results into an executive summary and presented the PoC findings and full-product roadmap to the client\'s board.' },
    ],
    technologies: ['Python', 'FFmpeg', 'OpenAI GPT-4', 'CLIP', 'React', 'AWS Lambda'],
    client: 'MediaGen Corp',
  },
  {
    id: '6',
    slug: 'smartflyer-website',
    title: 'Smartflyer Website & Portal',
    categories: ['Website'],
    date: 'Jul 27, 2025',
    imageGradient: 'from-cyan-900 to-blue-900',
    description: "A premium travel website and agent portal for Smartflyer, a luxury travel concierge service.",
    overviewParagraphs: [
      "Smartflyer is a luxury travel concierge agency specialising in bespoke itineraries for high-net-worth clients. Their existing website was built on an aging template that communicated none of the exclusivity their brand commanded — a direct factor in a conversion rate that sat well below industry benchmarks for their tier.",
      "We redesigned and rebuilt the full digital presence: a premium marketing website showcasing their destinations and services, and a secure agent portal for managing client trip requests, itinerary documents, and communications. The result is a cohesive digital experience that reflects the quality of the service itself.",
    ],
    challenge: "An outdated website was failing to convert high-intent luxury travellers, undermining a premium brand.",
    challengeDetail: "Despite a strong reputation and a high-value client base, Smartflyer's website generated a bounce rate of 72% and a conversion rate of just 0.8%. The design felt generic, the booking enquiry form was buried, and the mobile experience was unusable. Competitors with inferior service offerings were winning enquiries purely on digital presentation.",
    solution: "Designed a premium, responsive marketing site with an intuitive enquiry flow and a secure CRM-integrated agent portal.",
    solutionDetail: "We led the full design process — from brand alignment workshops to pixel-perfect Figma prototypes — before building the Next.js frontend and Strapi CMS backend. The marketing site features full-bleed destination photography, editorial-style destination guides, and a streamlined three-step enquiry form. The agent portal provides a secure dashboard for managing active trips, uploading itinerary documents, and tracking client communications, all connected to their CRM via webhook.",
    results: "45% increase in conversion rate and 60% reduction in bounce rate within 30 days of launch.",
    resultsDetail: "Conversion rate improved from 0.8% to 1.45% within 30 days — a 45% increase that translated directly into additional high-value enquiries. Bounce rate fell from 72% to 29%. Mobile traffic conversion, previously negligible, reached 1.2%. The agent portal reduced itinerary administration time by 3 hours per booking, and the client reported that the new site was referenced positively by clients in introductory calls for the first time.",
    metrics: [
      { value: '+45%', label: 'Conversion rate increase' },
      { value: '-60%', label: 'Bounce rate reduction' },
      { value: '3hrs', label: 'Saved per booking (admin)' },
      { value: '29%', label: 'New bounce rate (from 72%)' },
    ],
    keyFeatures: [
      'Full-bleed destination showcase with editorial photography',
      'Three-step streamlined enquiry flow',
      'Secure agent portal with trip management',
      'Itinerary document upload and client sharing',
      'CRM webhook integration',
      'Strapi CMS for destination and content management',
    ],
    process: [
      { title: 'Brand Alignment', description: 'Ran a brand workshop to extract the visual language, tone of voice, and competitive positioning that should inform the new design.' },
      { title: 'UX & Prototyping', description: 'Mapped the user journey from landing to enquiry submission and designed high-fidelity Figma prototypes tested with target users.' },
      { title: 'Design & Development', description: 'Built the Next.js frontend and Strapi CMS in parallel, with weekly design reviews against the approved prototypes.' },
      { title: 'Portal Development', description: 'Built the agent portal with role-based access, document management, and CRM integration.' },
      { title: 'Launch & Optimisation', description: 'Soft-launched to a subset of traffic for two weeks before full go-live, using heatmaps and session recordings to optimise the enquiry flow.' },
    ],
    technologies: ['Next.js', 'Tailwind CSS', 'Strapi', 'PostgreSQL', 'Figma', 'Vercel'],
    client: 'Smartflyer Travel',
  },
  {
    id: '7',
    slug: 'ovb-holdings',
    title: 'OVB Holdings AG Case Study',
    categories: ['Technology'],
    date: 'Nov 14, 2023',
    imageGradient: 'from-gray-800 to-zinc-900',
    description: 'Digital transformation case study for OVB Holdings AG, a leading pan-European financial services group.',
    overviewParagraphs: [
      'OVB Holdings AG is one of Europe\'s largest independent financial advisory networks, operating across 14 countries with over 5,000 financial consultants. When growth stalled and client retention declined, leadership commissioned a comprehensive digital audit to identify the root causes and a roadmap for modernisation.',
      'We conducted a 12-week diagnostic engagement spanning web properties, internal tooling, client onboarding journeys, and consultant-facing platforms. The output was a phased transformation roadmap, three of whose priority initiatives we subsequently delivered — resulting in measurable improvements across NPS, onboarding time, and consultant productivity.',
    ],
    challenge: 'Legacy digital infrastructure and fragmented client journeys were causing client churn and stalling growth.',
    challengeDetail: 'OVB\'s digital estate had grown organically across 14 country operations with minimal central governance. Each market operated a different client portal, consultant CRM, and onboarding workflow. Cross-border client management was nearly impossible. New consultant onboarding took an average of 22 days due to manual verification and document processes. Client NPS sat at 31 — well below the industry benchmark of 47.',
    solution: 'A phased digital transformation: unified client portal, automated onboarding, and a consultant productivity platform.',
    solutionDetail: 'Phase 1 delivered a unified client portal built on Vue.js, replacing 14 country-specific portals with a single localised platform. Phase 2 automated the consultant onboarding workflow using a Java Spring microservice, reducing the process to 7 days. Phase 3 delivered a consultant productivity dashboard that consolidated pipeline, compliance, and client communication tools. All three phases were containerised on Kubernetes for scalable multi-region deployment.',
    results: 'NPS improved by 28 points, consultant onboarding reduced from 22 to 7 days across all 14 markets.',
    resultsDetail: 'Client NPS increased from 31 to 59 within 18 months of the portal launch — a 28-point improvement that placed OVB above the industry benchmark for the first time. Consultant onboarding time dropped from 22 days to 7 days, reducing the time-to-revenue for new hires by 68%. Consultant satisfaction with digital tools improved from 2.8 to 4.2/5. The transformation was cited in OVB\'s annual report as a key driver of 12% growth in new client acquisitions.',
    metrics: [
      { value: '+28pts', label: 'NPS improvement' },
      { value: '22 → 7 days', label: 'Consultant onboarding' },
      { value: '14 markets', label: 'Unified on one platform' },
      { value: '+12%', label: 'New client acquisitions' },
    ],
    keyFeatures: [
      'Unified multi-market client portal with localisation',
      'Automated consultant onboarding microservice',
      'Integrated compliance and document verification',
      'Consultant productivity and pipeline dashboard',
      'Cross-border client management capabilities',
      'Multi-region Kubernetes deployment',
    ],
    process: [
      { title: 'Digital Audit', description: 'Conducted a 12-week diagnostic covering all 14 country operations, mapping the full digital estate and identifying the highest-impact improvement areas.' },
      { title: 'Roadmap Design', description: 'Prioritised initiatives by impact vs. complexity and developed a phased transformation roadmap approved by the OVB board.' },
      { title: 'Phase 1 — Client Portal', description: 'Built and launched the unified Vue.js client portal, replacing 14 legacy portals with a single localised platform.' },
      { title: 'Phase 2 — Onboarding', description: 'Automated the consultant onboarding workflow, reducing time from 22 days to 7 through document automation and digital verification.' },
      { title: 'Phase 3 — Productivity Platform', description: 'Delivered the consultant dashboard consolidating pipeline, compliance, and communication tools into a single workspace.' },
    ],
    technologies: ['Vue.js', 'Java Spring', 'Oracle DB', 'Kubernetes', 'Docker', 'Azure'],
    client: 'OVB Holdings AG',
  },
  {
    id: '8',
    slug: 'lms',
    title: 'LMS',
    categories: ['Technology', 'Website'],
    date: 'Nov 14, 2023',
    imageGradient: 'from-violet-900 to-purple-900',
    description: 'A comprehensive Learning Management System built for scale — serving thousands of concurrent learners across educational and corporate environments.',
    overviewParagraphs: [
      'EduTech Institute needed a modern, scalable LMS to replace an aging third-party platform that was limiting course creation flexibility, straining under concurrent user load, and delivering a learner experience that felt dated. With 8,000 enrolled learners and ambitious growth targets, a custom-built platform was the only viable path.',
      'We designed and delivered a full-featured LMS from the ground up: a rich course authoring environment for instructors, a fluid learning interface for students, live cohort sessions, progress analytics, and a certification engine — all running on a cloud-native architecture designed to scale to 50,000+ concurrent users.',
    ],
    challenge: 'A legacy third-party LMS was limiting growth, causing performance issues, and delivering a poor learner experience.',
    challengeDetail: 'The existing platform could not support more than 1,200 concurrent users without degraded performance, forcing the institute to throttle enrolments. The course authoring tools were inflexible, preventing instructors from creating the interactive content types that modern learners expect. Completion rates sat at 41% — far below the 70%+ industry benchmark — largely attributed to a disengaging learner UX. Switching to a custom platform was a strategic imperative.',
    solution: 'Built a cloud-native LMS with rich course authoring, adaptive learning paths, and an infrastructure that scales to 50K+ users.',
    solutionDetail: 'The platform was built on a React frontend with a Node.js/GraphQL API layer and MongoDB for flexible course content storage. AWS infrastructure with auto-scaling handles concurrent load, while a CDN delivers video content with adaptive bitrate streaming. The course authoring tool supports video, quizzes, assignments, code sandboxes, and branching scenarios. A recommendation engine suggests next-best content based on learner behaviour. Live cohort sessions are powered by WebRTC.',
    results: 'Completion rates rose from 41% to 78%, serving 10,000+ active learners with zero downtime during peak enrolment.',
    resultsDetail: 'Course completion rates improved from 41% to 78% within the first six months — attributed to the improved UX, progress nudges, and adaptive content pathways. The platform successfully handled a peak of 9,400 concurrent users during the first major enrolment period with zero downtime. Active learner count grew from 8,000 to 10,000+ within the year. Instructor course creation time dropped by 60% due to the improved authoring tools.',
    metrics: [
      { value: '41% → 78%', label: 'Course completion rate' },
      { value: '10K+', label: 'Active learners' },
      { value: '9,400', label: 'Peak concurrent users' },
      { value: '60%', label: 'Faster course authoring' },
    ],
    keyFeatures: [
      'Rich course authoring with video, quizzes, and branching scenarios',
      'Adaptive learning path recommendations',
      'Live cohort sessions via WebRTC',
      'Progress tracking and learner analytics dashboard',
      'Automated certification engine',
      'Auto-scaling infrastructure for 50K+ concurrent users',
    ],
    process: [
      { title: 'Discovery & Migration Planning', description: 'Audited the existing platform, mapped all courses and learner data, and planned a zero-disruption migration strategy.' },
      { title: 'Architecture Design', description: 'Designed the cloud-native architecture on AWS with auto-scaling, CDN video delivery, and a flexible MongoDB schema for course content.' },
      { title: 'Core Platform Build', description: 'Built the learner interface, course authoring tool, and API layer over three months in parallel squads.' },
      { title: 'Data Migration', description: 'Migrated 1,200+ courses and 8,000 learner records from the legacy platform with full progress history preserved.' },
      { title: 'Launch & Scale', description: 'Launched to the full learner base and monitored infrastructure performance through the first two major enrolment windows.' },
    ],
    technologies: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'AWS', 'WebRTC', 'CloudFront'],
    client: 'EduTech Institute',
  },
];

// Team
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  isFounder: boolean;
  imageUrl: string;
}

export const team: TeamMember[] = [
  { id: '1', name: 'Azam Tariq', role: 'Co-Founder & Managing Director', isFounder: true, imageUrl: '' },
  { id: '2', name: 'Muhammad Arsalan Khan', role: 'Technical Lead, Web Development', isFounder: false, imageUrl: '' },
  { id: '3', name: 'Shaheryar Khan', role: 'Lead AI Engineer', isFounder: false, imageUrl: '' },
  { id: '4', name: 'Touseef Khan', role: 'Project Manager', isFounder: false, imageUrl: '' },
];

// Testimonials
export interface Testimonial {
  id: string;
  name: string;
  source: string;
  text: string;
}

export const testimonials: Testimonial[] = [
  { id: '1', name: 'Sarah Coleman', source: 'Head of Marketing, Smartflyer Travel', text: 'Working with Digital Karvan was an incredible experience. Their attention to detail and commitment to excellence truly sets them apart. Our new website exceeded all expectations — and our conversion rate proves it.' },
  { id: '2', name: 'James Trueman', source: 'CTO, DocExtract Ltd', text: 'The team at Digital Karvan brought our vision to life with remarkable precision. Their collaborative approach made the entire process smooth — from the initial discovery right through to launch and beyond.' },
  { id: '3', name: 'Oscar Patel', source: 'Founder, VoiceAI Studios', text: 'Outstanding work from start to finish. Digital Karvan delivered a world-class digital solution on time and within budget. The platform they built is the backbone of our product. Highly recommended.' },
  { id: '4', name: 'Priya Whitmore', source: 'Operations Director, Bank of Khyber', text: 'We have worked with many agencies over the years, but Digital Karvan stands out for their integrity and the quality of their deliverables. They understood our enterprise constraints and delivered anyway.' },
  { id: '5', name: 'Alex Nouri', source: 'CEO, MediaGen Corp', text: 'Digital Karvan transformed our digital presence completely. The results speak for themselves — our conversion rate increased by 45% within the first month of the new site going live.' },
  { id: '6', name: 'David Henriksen', source: 'Product Manager, EduTech Institute', text: 'The level of technical expertise combined with creative excellence at Digital Karvan is genuinely rare. They built us a platform that scaled to 9,400 concurrent users on the first major enrolment day.' },
  { id: '7', name: 'Bruce Alderton', source: 'VP Technology, OVB Holdings AG', text: 'From the initial consultation to final rollout across 14 markets, Digital Karvan was professional, responsive, and delivered exactly what we needed. A true strategic partner.' },
];

// Blog Posts
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageGradient: string;
  content: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'hello-world',
    title: 'Hello World!',
    category: 'Company News',
    date: 'May 27, 2024',
    excerpt: 'Welcome to the Digital Karvan blog. We are excited to share our journey, insights, and expertise with you.',
    imageGradient: 'from-gray-800 to-gray-900',
    content: 'Welcome to the Digital Karvan blog! We are thrilled to launch this space where we will share our expertise, industry insights, and company news. Digital Karvan was founded on the principles of integrity, excellence, and collaboration. As we continue to grow and serve clients across the globe, we felt it was time to create a platform where we could share the knowledge we have accumulated over years of building digital solutions. Stay tuned for articles on web development, branding, digital strategy, and much more.',
    author: 'Emma Newman',
  },
  {
    id: '2',
    slug: 'how-to-become-graphic-designer',
    title: 'How to Become a Graphic Designer in 10 Simple Steps',
    category: 'Design',
    date: 'Dec 2, 2023',
    excerpt: 'Thinking about a career in graphic design? Here are 10 actionable steps to launch your creative career.',
    imageGradient: 'from-purple-900 to-blue-900',
    content: 'Graphic design is one of the most rewarding creative careers you can pursue. Whether you are starting from scratch or looking to transition from another field, the path to becoming a professional graphic designer is more accessible than ever. Here are 10 steps to guide your journey: 1. Understand the fundamentals of design. 2. Learn industry-standard tools like Adobe Creative Suite. 3. Study typography, color theory, and layout principles. 4. Build a portfolio of your best work. 5. Seek feedback from experienced designers. 6. Take on freelance projects to gain real-world experience. 7. Study the work of designers you admire. 8. Stay current with design trends and emerging tools. 9. Network with other creatives. 10. Never stop learning and iterating on your craft.',
    author: 'Anna Oldman',
  },
];

// Nav Links
export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Services',
    href: '/services',
    dropdown: [
      { label: 'Website Design & Development', href: '/services/website-development' },
      { label: 'Branding & Identity Design', href: '/services/branding-identity' },
      { label: 'Maintenance & Support', href: '/services/maintenance-support' },
      { label: 'Consultation & Guidance', href: '/services/consultation' },
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
