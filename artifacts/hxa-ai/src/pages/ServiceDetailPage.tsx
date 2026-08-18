import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'wouter';
import { getGetSiteContentQueryKey, useGetSiteContent, type SiteContent } from '@workspace/api-client-react';
import { BrandMark } from '@/components/BrandMark';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { fallbackContent } from '@/lib/content';

function DetailGroup({ group }: { group: NonNullable<SiteContent['services'][number]['detailGroups']>[number] }) {
  return <div className="rounded-2xl border border-[#456485]/35 bg-[#0d192b]/70 p-6 sm:p-8">
    <h2 className="font-display text-2xl tracking-[-.04em] text-[#e5f1ff]">{group.title}</h2>
    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
      {group.items.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-[#a7bdd6]"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#4286f5]/15 text-[#7ebcff]"><Check className="h-3 w-3" /></span>{item}</li>)}
    </ul>
  </div>;
}

export default function ServiceDetailPage({ serviceId }: { serviceId: string }) {
  const query = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });
  const content = query.data ?? fallbackContent;
  const service = content.services.find((item) => item.id === serviceId);

  if (!service) {
    return <div className="min-h-[100dvh] bg-[#08101f] px-6 py-10 text-[#e9f3ff]"><Link href="/" className="text-sm text-[#83bdff]">Return home</Link><h1 className="mt-20 font-display text-5xl">Service not found.</h1></div>;
  }

  const groups = service.detailGroups ?? [{ title: 'Capabilities', items: service.tags }];
  return <div className="hxa-noise min-h-[100dvh] bg-[#08101f] text-[#e9f3ff]">
     <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 lg:px-8">
      <BrandMark />
      <div className="flex items-center gap-3"><WhatsAppButton label="WhatsApp" compact /><Link href="/#capabilities" className="inline-flex items-center gap-2 text-sm text-[#a7bdd6] transition-colors hover:text-[#e9f3ff]"><ArrowLeft className="h-4 w-4" />Back to services</Link></div>
    </header>
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pb-36 lg:pt-24">
      <div className="max-w-4xl">
        <div className="eyebrow">Service / {service.id === 'ai-transformation' ? '01' : service.id === 'software-engineering' ? '02' : '03'}</div>
        <h1 className="mt-5 font-display text-3xl leading-tight tracking-[-.05em] text-[#8fa9c5] sm:text-5xl">{service.title}</h1>
        <p className="mt-8 max-w-5xl border-l-2 border-[#6faef2] pl-5 font-display text-4xl leading-[1.05] tracking-[-.055em] text-[#e8f4ff] sm:pl-7 sm:text-6xl lg:text-7xl">{service.description}</p>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#4f7199]/45 bg-[#0d1b30] px-4 py-2 text-sm text-[#b7d0eb]"><span className="h-2 w-2 rounded-full bg-[#6faef2]" />{service.outcome}</div>
      </div>
      <section className="mt-20">
        <div className="mb-8 flex items-end justify-between gap-6"><div><div className="eyebrow">What we deliver</div><h2 className="mt-3 font-display text-3xl tracking-[-.05em] text-[#e7f3ff]">A focused set of capabilities.</h2></div><Link href="/#contact" className="hidden items-center gap-2 text-sm text-[#83bdff] sm:inline-flex">Talk to AddMatix <ArrowUpRight className="h-4 w-4" /></Link></div>
        <div className="grid gap-4 md:grid-cols-2">{groups.map((group) => <DetailGroup key={group.title} group={group} />)}</div>
      </section>
       <div className="mt-16 rounded-2xl border border-[#456485]/35 bg-[#0d192b]/70 p-8 sm:p-10"><div className="max-w-2xl"><div className="eyebrow">Make the next move</div><h2 className="mt-4 font-display text-3xl tracking-[-.05em] text-[#e7f3ff]">Have a signal worth following?</h2><p className="mt-3 text-sm leading-6 text-[#91a5bd]">Tell us where you are headed. We will bring a point of view, not a pitch.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/#contact" className="inline-flex items-center gap-2 rounded-full bg-[#4286f5] px-5 py-3 text-sm font-semibold text-[#071226] transition-colors hover:bg-[#83bdff]">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link><WhatsAppButton /></div></div></div>
    </main>
  </div>;
}