import type { SiteContent } from '@workspace/api-client-react';

export const fallbackContent: SiteContent = {
  hero: {
    eyebrow: 'AI transformation partner',
    headline: 'Make intelligence operational.',
    subheadline: 'HXA helps ambitious enterprise teams move from AI ambition to measurable advantage — with the strategy, systems, and operating model to make it stick.',
    primaryCta: 'Start a conversation',
    secondaryCta: 'Explore our work',
  },
  intro: 'We work where business clarity meets technical possibility. From the first signal to scaled adoption, HXA turns complex AI programs into calm, compounding momentum.',
  stats: [
    { value: '3.6×', label: 'average return on AI programs' },
    { value: '14 wk', label: 'to first production workflow' },
    { value: '92%', label: 'adoption across trained teams' },
    { value: '18', label: 'markets reached globally' },
  ],
  services: [
    { id: '01', title: 'AI strategy & portfolio', description: 'A clear line of sight from executive intent to the few AI bets that deserve to ship.', outcome: 'A decision-ready roadmap your organisation can fund and own.', tags: ['Opportunity mapping', 'Operating model'] },
    { id: '02', title: 'Intelligent operations', description: 'We redesign the workflows that matter, then build the agents and automations that make them run better.', outcome: 'Less friction in the work. More capacity for the people doing it.', tags: ['Workflow design', 'Agent systems'] },
    { id: '03', title: 'Data & AI foundations', description: 'The dependable data products, platforms, and guardrails that let experimentation become a capability.', outcome: 'A foundation built for pace without compromising trust.', tags: ['Data products', 'Responsible AI'] },
  ],
  caseStudies: [
    { id: 'northstar', client: 'Northstar Health', industry: 'Healthcare', title: 'Giving clinicians their time back', result: 'An ambient intelligence layer removed the administrative drag from every patient conversation.', metric: '11.4 hrs / clinician / week recovered' },
    { id: 'atlas', client: 'Atlas Industrial', industry: 'Manufacturing', title: 'From reactive to predictive', result: 'A connected operations model turned maintenance signals into a competitive advantage.', metric: '28% fewer unplanned stoppages' },
    { id: 'meridian', client: 'Meridian Capital', industry: 'Financial services', title: 'A faster path to conviction', result: 'Research teams now synthesize thousands of signals into a shared point of view in minutes.', metric: '6.2× faster research cycles' },
  ],
  testimonials: [
    { quote: 'HXA gave our ambition a shape the whole business could move behind. We are no longer piloting AI; we are operating with it.', name: 'Elena Marquez', role: 'Chief Digital Officer', company: 'Northstar Health' },
    { quote: 'The difference was not just technical depth. It was the way HXA made a complex transformation feel navigable.', name: 'David Okonkwo', role: 'Group COO', company: 'Atlas Industrial' },
  ],
  faqs: [
    { question: 'When should we bring HXA in?', answer: 'Bring us in when an AI opportunity is important enough to need a cross-functional point of view. That may be before a strategy exists, during a platform decision, or when pilots need to become a portfolio.' },
    { question: 'Do you build, or only advise?', answer: 'Both, in the right sequence. We leave behind working systems and a team that knows how to run them — not a deck that slowly loses relevance.' },
    { question: 'How do you approach responsible AI?', answer: 'Trust is designed into the operating model from the start: clear ownership, traceable data, human review where it matters, and controls that can evolve with the technology.' },
    { question: 'What does a first engagement look like?', answer: 'Usually a focused 3–4 week diagnostic with the leaders and teams closest to the work. We align on the value pool, surface the constraints, and define a credible first release.' },
  ],
  posts: [
    { id: 'signal', category: 'Point of view', title: 'The AI operating model is the real product', excerpt: 'Why the organisations creating durable advantage are redesigning decisions, not just deploying models.', readTime: '6 min read' },
    { id: 'agents', category: 'Field notes', title: 'Beyond the chatbot: designing agentic work', excerpt: 'A practical lens for finding the workflows where autonomy creates leverage — and where it creates risk.', readTime: '8 min read' },
    { id: 'trust', category: 'Briefing', title: 'Trust is a systems property', excerpt: 'The new architecture of confidence for teams building with intelligent systems.', readTime: '4 min read' },
  ],
  techStack: ['Azure AI', 'AWS', 'Databricks', 'Snowflake', 'OpenAI', 'Anthropic', 'dbt', 'Kubernetes'],
  process: ['See the signal', 'Shape the ambition', 'Build the first proof', 'Scale what works'],
};