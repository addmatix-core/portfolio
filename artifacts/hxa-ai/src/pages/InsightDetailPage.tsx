import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { getGetSiteContentQueryKey, useGetSiteContent } from '@workspace/api-client-react';
import { BrandMark } from '@/components/BrandMark';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { fallbackContent } from '@/lib/content';

export default function InsightDetailPage({ postId }: { postId: string }) {
  const query = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });
  const content = query.data ?? fallbackContent;
  const post = content.posts.find((item) => item.id === postId);
  if (!post) return <div className="min-h-[100dvh] bg-[#08101f] px-6 py-10 text-[#e9f3ff]"><Link href="/" className="text-sm text-[#83bdff]">Return home</Link><h1 className="mt-20 font-display text-5xl">Insight not found.</h1></div>;

  return <div className="hxa-noise min-h-[100dvh] bg-[#08101f] text-[#e9f3ff]">
     <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 lg:px-8"><BrandMark /><div className="flex items-center gap-3"><WhatsAppButton label="WhatsApp" compact /><Link href="/#insights" className="inline-flex items-center gap-2 text-sm text-[#a7bdd6] hover:text-[#e9f3ff]"><ArrowLeft className="h-4 w-4" />Back to insights</Link></div></header>
    <main className="mx-auto max-w-4xl px-6 pb-24 pt-20 lg:px-8 lg:pb-36 lg:pt-28"><div className="eyebrow">{post.category} · {post.readTime}</div><h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-[-.07em] text-[#edf6ff] sm:text-7xl">{post.title}</h1><p className="mt-8 max-w-2xl text-xl leading-8 text-[#a7bad0]">{post.excerpt}</p><article className="mt-16 rounded-2xl border border-[#456485]/35 bg-[#0d192b]/70 p-7 sm:p-10"><div className="eyebrow">AddMatix perspective</div><p className="mt-6 text-base leading-8 text-[#b8cce1]">The most useful ideas become valuable when they change a decision, a workflow, or the way a team sees its next move. This note is a starting point for that conversation.</p><div className="mt-8 flex flex-wrap items-center gap-3"><Link href="/#contact" className="inline-flex items-center gap-2 text-sm text-[#83bdff]">Continue the conversation <ArrowUpRight className="h-4 w-4" /></Link><WhatsAppButton /></div></article></main>
  </div>;
}