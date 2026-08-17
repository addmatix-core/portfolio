import type { InferSelectModel } from "drizzle-orm";
import type { siteContentTable } from "@workspace/db";

export type HxaContent = {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  intro: string;
  stats: Array<{ value: string; label: string }>;
  services: Array<{
    id: string;
    title: string;
    description: string;
    outcome: string;
    tags: string[];
    detailGroups?: Array<{ title: string; items: string[] }>;
  }>;
  caseStudies: Array<{
    id: string;
    client: string;
    industry: string;
    title: string;
    result: string;
    metric: string;
  }>;
  testimonials: Array<{
    quote: string;
    name: string;
    role: string;
    company: string;
  }>;
  faqs: Array<{ question: string; answer: string }>;
  posts: Array<{
    id: string;
    category: string;
    title: string;
    excerpt: string;
    readTime: string;
  }>;
  techStack: string[];
  process: string[];
};

export const DEFAULT_HXA_CONTENT: HxaContent = {
  hero: {
    eyebrow: "AI transformation partner",
    headline: "Make intelligence your unfair advantage.",
    subheadline:
      "AddMatix turns ambitious AI strategy into measurable operating leverage — from intelligent automation to enterprise-grade products and growth systems.",
    primaryCta: "Book a conversation",
    secondaryCta: "Explore our capabilities",
  },
  intro:
    "The next era belongs to companies that can move from AI curiosity to AI capability. We bring strategy, engineering, and growth into one focused transformation partner.",
  stats: [
    { value: "42+", label: "transformations shipped" },
    { value: "18", label: "markets reached" },
    { value: "3.6×", label: "average efficiency lift" },
    { value: "94%", label: "partner renewal rate" },
  ],
  services: [
    {
      id: "ai-transformation",
      title: "AI transformation",
      description:
        "Turn AI potential into a practical operating system for your business.",
      outcome: "From first use case to scaled intelligence.",
      tags: ["AI strategy", "Agents", "Automation"],
      detailGroups: [
        {
          title: "Capabilities",
          items: [
            "AI Consulting",
            "AI Agents",
            "Automation",
            "Generative AI",
            "Business Intelligence",
            "AI Integration",
            "Interactive Demo",
          ],
        },
      ],
    },
    {
      id: "software-engineering",
      title: "Software engineering",
      description:
        "Build resilient products and platforms that become a compounding advantage.",
      outcome: "Enterprise systems made ready for what is next.",
      tags: ["Platforms", "SaaS", "APIs"],
      detailGroups: [
        {
          title: "Software Development",
          items: [
            "Enterprise Software",
            "SaaS",
            "CRM",
            "ERP",
            "API Development",
            "Custom Platforms",
            "Web Development",
          ],
        },
        {
          title: "Web & App Delivery",
          items: [
            "Corporate",
            "Enterprise",
            "E-commerce",
            "Web Applications",
            "Mobile Apps",
            "Android",
            "iOS",
          ],
        },
        {
          title: "Branding",
          items: [
            "Brand Strategy",
            "Identity",
            "Logo",
            "Visual System",
            "UI Brand Design",
            "Marketing Assets",
          ],
        },
      ],
    },
    {
      id: "digital-growth",
      title: "Digital growth",
      description:
        "Connect experience, experimentation, and insight to unlock durable growth.",
      outcome: "Clearer signals. Faster learning. Better conversion.",
      tags: ["SEO", "Experience", "Analytics"],
      detailGroups: [
        {
          title: "Search",
          items: ["SEO", "Technical SEO", "Local SEO", "Enterprise SEO"],
        },
        {
          title: "AI Search",
          items: ["AEO", "GEO", "AI Search Optimization", "LLM Optimization"],
        },
        {
          title: "Experience",
          items: ["SXO", "CRO", "UX Optimization", "Landing Page Optimization"],
        },
        {
          title: "Marketing",
          items: [
            "Google Ads",
            "Meta Ads",
            "LinkedIn Ads",
            "Email Marketing",
            "Content Marketing",
            "Analytics",
          ],
        },
      ],
    },
  ],
  caseStudies: [
    {
      id: "northstar",
      client: "Northstar Health",
      industry: "Healthcare",
      title: "A more intelligent front door to care",
      result:
        "A conversational intake platform reduced manual routing and gave care teams more time for patients.",
      metric: "62% less admin time",
    },
    {
      id: "arc",
      client: "Arc Financial",
      industry: "Financial services",
      title: "From fragmented signals to a confident next move",
      result:
        "A connected intelligence layer turned scattered portfolio data into timely executive decisions.",
      metric: "3.1× faster reporting",
    },
  ],
  testimonials: [
    {
      quote:
        "AddMatix did not hand us a slide deck and disappear. They helped us make the change real.",
      name: "Maya Chen",
      role: "Chief Digital Officer",
      company: "Northstar Health",
    },
    {
      quote:
        "The rare partner that can hold the strategy and the last mile of delivery in the same room.",
      name: "David Okafor",
      role: "VP, Product & Innovation",
      company: "Arc Financial",
    },
  ],
  faqs: [
    {
      question: "Where do we start if our AI roadmap is still forming?",
      answer:
        "We start with a focused opportunity and readiness sprint. In a few weeks, you leave with prioritized use cases, a practical architecture, and a path to the first measurable win.",
    },
    {
      question: "Do you work with existing internal teams?",
      answer:
        "Yes. We are designed to work alongside product, engineering, operations, and executive teams — transferring capability as we deliver.",
    },
    {
      question: "How do you measure transformation?",
      answer:
        "We agree on business outcomes before technology choices: time returned, revenue unlocked, risk reduced, or decisions accelerated. Progress stays visible in those terms.",
    },
  ],
  posts: [
    {
      id: "ai-operating-model",
      category: "Perspective",
      title: "The AI operating model is becoming the new org chart",
      excerpt:
        "Why the winners will design for human judgment and machine leverage together.",
      readTime: "6 min read",
    },
    {
      id: "automation-debt",
      category: "Field notes",
      title: "The hidden cost of waiting on automation",
      excerpt:
        "A practical way to find the friction your teams have learned to ignore.",
      readTime: "4 min read",
    },
    {
      id: "trust-at-scale",
      category: "Research",
      title: "Trust is a product requirement",
      excerpt:
        "What enterprise AI experiences need before adoption can scale.",
      readTime: "8 min read",
    },
  ],
  techStack: [
    "OpenAI",
    "Azure",
    "AWS",
    "Python",
    "React",
    "Node.js",
    "PostgreSQL",
    "Kubernetes",
  ],
  process: [
    "Discover",
    "Prioritize",
    "Design",
    "Build",
    "Activate",
    "Optimize",
  ],
};

export function contentFromRow(
  row: InferSelectModel<typeof siteContentTable> | undefined,
): HxaContent {
  return (row?.content as HxaContent | undefined) ?? DEFAULT_HXA_CONTENT;
}