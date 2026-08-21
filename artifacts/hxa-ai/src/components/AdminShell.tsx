import { ExternalLink, FilePenLine, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { signOut } from 'firebase/auth';
import { Link, useLocation } from 'wouter';
import { BrandMark } from './BrandMark';
import { getFirebaseAuth } from '@/lib/firebase';

export function AdminShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location, navigate] = useLocation();
  const items = [{ href: '/admin', label: 'Overview', icon: LayoutDashboard }, { href: '/admin/content', label: 'Site content', icon: FilePenLine }];
  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' });
    try {
      await signOut(getFirebaseAuth());
    } catch {
      // The server session is already cleared even if Firebase is unavailable.
    }
    navigate('/admin');
  };
  return <div className="min-h-[100dvh] bg-[#0a1323] text-[#dbeaff]">
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 border-r border-[#3f5b7e]/35 bg-[#0b1629] px-5 py-6 transition-transform md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between"><BrandMark admin /><button onClick={() => setOpen(false)} data-testid="button-close-sidebar" className="rounded p-1 text-[#7e97b7] md:hidden"><X className="h-5 w-5" /></button></div>
      <p className="mb-4 mt-12 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-[#6682a5]">Workspace</p>
      <nav className="space-y-1">{items.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setOpen(false)} data-testid={`link-admin-${label.toLowerCase().replace(' ', '-')}`} className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-colors ${location === href ? 'bg-[#4286f5]/15 text-[#9bccff]' : 'text-[#8ea5c0] hover:bg-[#152743] hover:text-[#dbeaff]'}`}><Icon className="h-4 w-4" />{label}</Link>)}</nav>
      <div className="absolute inset-x-5 bottom-6 rounded-xl border border-[#3f5b7e]/35 bg-[#101f36] p-4"><div className="flex items-center gap-2 text-xs text-[#96b4d8]"><span className="h-2 w-2 rounded-full bg-[#55d7ad] shadow-[0_0_10px_2px_rgba(85,215,173,.4)]" />API connected</div><Link href="/" data-testid="link-back-public" className="mt-3 flex items-center gap-2 text-xs text-[#7baef0]">View public site <ExternalLink className="h-3 w-3" /></Link></div>
    </aside>
    {open && <button aria-label="Close navigation" onClick={() => setOpen(false)} className="fixed inset-0 z-20 bg-[#020711]/70 md:hidden" />}
    <div className="md:pl-64"><header className="flex h-20 items-center justify-between border-b border-[#3f5b7e]/30 px-5 sm:px-8"><button onClick={() => setOpen(true)} data-testid="button-open-sidebar" className="rounded-lg border border-[#486486]/40 p-2 text-[#9cb5d2] md:hidden"><Menu className="h-5 w-5" /></button><div className="hidden text-xs uppercase tracking-[.16em] text-[#6885a8] md:block">AddMatix / Control room</div><div className="ml-auto flex items-center gap-4"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#4286f5]/20 text-xs font-semibold text-[#98caff]">AM</div><span className="hidden text-sm text-[#a8bdd6] sm:block">Admin workspace</span><button onClick={logout} data-testid="button-admin-logout" className="inline-flex items-center gap-2 text-xs text-[#8fa7c2] transition-colors hover:text-[#e5f1ff]"><LogOut className="h-4 w-4" />Log out</button></div></header><main className="mx-auto max-w-[1400px] p-5 sm:p-8">{children}</main></div>
  </div>;
}