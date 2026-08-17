import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'wouter';
import { BrandMark } from '@/components/BrandMark';
import { WhatsAppButton } from '@/components/WhatsAppButton';

const processDetails: Record<string, { number: string; title: string; description: string; points: string[] }> = {
  discover: { number: '01', title: 'Discover', description: 'Find the highest-leverage opportunities hiding inside the way your business works today.', points: ['Map the current operating reality', 'Identify valuable friction and unmet demand', 'Align leaders around a clear opportunity'] },
  prioritize: { number: '02', title: 'Prioritize', description: 'Turn a wide field of possibilities into a focused sequence of moves the business can actually support.', points: ['Score opportunities by value and feasibility', 'Define the first measurable outcome', 'Build a roadmap people can act on'] },
  design: { number: '03', title: 'Design', description: 'Shape the experience, system, and operating model before the build begins.', points: ['Design the future-state journey', 'Choose the right data and technology patterns', 'Create guardrails for adoption and trust'] },
  build: { number: '04', title: 'Build', description: 'Prove the idea in the real world with a focused release that creates useful momentum.', points: ['Ship a working first release', 'Connect the right systems and workflows', 'Learn quickly with the teams who will use it'] },
  activate: { number: '05', title: 'Activate', description: 'Make the change usable, understood, and owned by the people closest to the work.', points: ['Enable teams through practical adoption', 'Transfer capability as we deliver', 'Measure early business impact'] },
  optimize: { number: '06', title: 'Optimize', description: 'Scale what works and keep improving the system as your business and the technology evolve.', points: ['Expand proven workflows and products', 'Create a continuous improvement rhythm', 'Keep performance, trust, and value visible'] },
};

export default function ProcessDetailPage({ stepId }: { stepId: string }) {
  const detail = processDetails[stepId];
  if (!detail) return <div className="min-h-[100dvh] bg-[#08101f] px-6 py-10 text-[#e9f3ff]"><Link href="/" className="text-sm text-[#83bdff]">Return home</Link><h1 className="mt-20 font-display text-5xl">Step not found.</h1></div>;

  return <div className="hxa-noise min-h-[100dvh] bg-[#08101f] text-[#e9f3ff]">
    <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 lg:px-8"><BrandMark /><div className="flex items-center gap-3"><WhatsAppButton label="WhatsApp" compact /><Link href="/#capabilities" className="inline-flex items-center gap-2 text-sm text-[#a7bdd6] hover:text-[#e9f3ff]"><ArrowLeft className="h-4 w-4" />Back to process</Link></div></header>
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pb-36 lg:pt-24">
      <div className="max-w-4xl"><div className="eyebrow">Process / {detail.number}</div><h1 className="mt-6 font-display text-6xl leading-[.98] tracking-[-.07em] text-[#edf6ff] sm:text-8xl">{detail.title}</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-[#9aacc2]">{detail.description}</p></div>
       <section className="mt-20 max-w-4xl rounded-2xl border border-[#456485]/35 bg-[#0d192b]/70 p-7 sm:p-10"><div className="eyebrow">What happens here</div><ul className="mt-8 space-y-5">{detail.points.map((point) => <li key={point} className="flex items-center gap-3 text-lg text-[#c8d9eb]"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#4286f5]/15 text-[#7ebcff]"><Check className="h-3.5 w-3.5" /></span>{point}</li>)}</ul><div className="mt-10 flex flex-wrap gap-3"><Link href="/#contact" className="inline-flex items-center gap-2 rounded-full bg-[#4286f5] px-5 py-3 text-sm font-semibold text-[#071226] hover:bg-[#83bdff]">Talk to AddMatix <ArrowUpRight className="h-4 w-4" /></Link><WhatsAppButton /></div></section>
    </main>
  </div>;
}