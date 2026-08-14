import { Link } from 'wouter';

export function BrandMark({ admin = false }: { admin?: boolean }) {
  return (
    <Link href={admin ? '/admin' : '/'} data-testid={admin ? 'link-admin-brand' : 'link-brand'} className="group inline-flex items-center gap-3">
      <span className="relative grid h-8 w-8 place-items-center rounded-[10px] border border-[#5ea2ff]/50 bg-[#2f73dc]/20 shadow-[0_0_28px_rgba(66,134,245,.22)]">
        <span className="absolute h-3 w-3 rounded-full bg-[#91c8ff] shadow-[0_0_14px_#4286f5]" />
        <span className="absolute h-6 w-6 rounded-full border border-[#72b4ff]/40 transition-transform duration-500 group-hover:rotate-90" />
      </span>
      <span className="font-display text-lg font-bold tracking-[-.06em] text-[#e9f3ff]">ADX<span className="text-[#6eafff]">.</span></span>
    </Link>
  );
}