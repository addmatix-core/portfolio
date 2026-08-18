import { LockKeyhole, LogIn } from 'lucide-react';
import { useState } from 'react';
import { BrandMark } from '@/components/BrandMark';

export function AdminLogin({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setPending(true);
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, password }),
      });
      if (!response.ok) throw new Error('Invalid ID or password.');
      onAuthenticated();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Unable to sign in.');
    } finally {
      setPending(false);
    }
  };

  return <main className="grid min-h-[100dvh] place-items-center bg-[#08101f] px-6 text-[#e9f3ff]">
    <section className="w-full max-w-md rounded-2xl border border-[#456485]/40 bg-[#0d192b] p-8 shadow-2xl sm:p-10">
      <BrandMark admin />
      <div className="mt-12"><div className="eyebrow">Private workspace</div><h1 className="mt-3 font-display text-4xl tracking-[-.06em]">Admin sign in</h1><p className="mt-3 text-sm leading-6 text-[#8fa5bd]">Manage the words and information published across AddMatix.</p></div>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <label className="block"><span className="mb-2 block text-xs uppercase tracking-[.14em] text-[#7d97b7]">Admin ID</span><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[#6d8bad]" /><input required autoComplete="username" value={id} onChange={(event) => setId(event.target.value)} className="w-full rounded-lg border border-[#415c7c]/60 bg-[#0b172a] py-3 pl-10 pr-3 text-sm text-[#ddecff] outline-none focus:border-[#6caffc]" /></div></label>
        <label className="block"><span className="mb-2 block text-xs uppercase tracking-[.14em] text-[#7d97b7]">Password</span><input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-[#415c7c]/60 bg-[#0b172a] px-3 py-3 text-sm text-[#ddecff] outline-none focus:border-[#6caffc]" /></label>
        {error && <p role="alert" className="rounded-lg border border-[#d86d7b]/35 bg-[#301a28] px-3 py-2 text-sm text-[#ffb6bf]">{error}</p>}
        <button disabled={pending} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#4286f5] px-4 py-3 text-sm font-semibold text-[#071226] transition-colors hover:bg-[#83bdff] disabled:opacity-50"><LogIn className="h-4 w-4" />{pending ? 'Signing in…' : 'Sign in'}</button>
      </form>
    </section>
  </main>;
}