import { useEffect, useState, type ReactNode } from 'react';
import { AdminLogin } from '@/pages/AdminLogin';

export function AdminGate({ children }: { children: ReactNode }) {
  const [state, setState] = useState<'checking' | 'signed-out' | 'signed-in'>('checking');

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'include' })
      .then((response) => response.json())
      .then((result: { authenticated?: boolean }) => setState(result.authenticated ? 'signed-in' : 'signed-out'))
      .catch(() => setState('signed-out'));
  }, []);

  if (state === 'checking') return <main className="grid min-h-[100dvh] place-items-center bg-[#08101f] text-sm text-[#91a7c0]">Checking workspace access…</main>;
  if (state === 'signed-out') return <AdminLogin onAuthenticated={() => setState('signed-in')} />;
  return <>{children}</>;
}