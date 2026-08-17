import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { BrandMark } from './BrandMark';

export function PublicNav() {
  const [open, setOpen] = useState(false);
  const links = [['Approach', '#approach'], ['Capabilities', '#capabilities'], ['Work', '#work'], ['Insights', '#insights']];
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <BrandMark />
        <nav className="hidden items-center gap-8 text-sm text-[#9cacbf] md:flex">
          {links.map(([label, href]) => <a key={href} href={href} data-testid={`link-nav-${label.toLowerCase()}`} className="transition-colors hover:text-[#eef6ff]">{label}</a>)}
        </nav>
        <div className="hidden items-center gap-6 md:flex">
          <a href="#contact" data-testid="link-nav-contact" className="group inline-flex items-center gap-2 rounded-full border border-[#6ea9f2]/40 px-4 py-2 text-sm text-[#dcecff] transition-all hover:border-[#74b3ff] hover:bg-[#4286f5]/10">Talk to AddMatix <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
        </div>
        <button aria-label="Toggle menu" data-testid="button-toggle-menu" onClick={() => setOpen(!open)} className="rounded-lg border border-[#456181] p-2 text-[#c8d8ec] md:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      {open && <div className="mx-4 rounded-2xl border border-[#476487]/40 bg-[#101c31]/95 p-5 shadow-2xl backdrop-blur-xl md:hidden">
        <nav className="flex flex-col gap-1">
          {links.map(([label, href]) => <a onClick={() => setOpen(false)} key={href} href={href} data-testid={`link-mobile-${label.toLowerCase()}`} className="rounded-lg px-3 py-3 text-sm text-[#b7c9de] hover:bg-[#4286f5]/10">{label}</a>)}
          <a onClick={() => setOpen(false)} href="#contact" className="mt-2 rounded-lg bg-[#4286f5] px-3 py-3 text-center text-sm font-semibold text-[#071226]">Talk to AddMatix</a>
        </nav>
      </div>}
    </header>
  );
}