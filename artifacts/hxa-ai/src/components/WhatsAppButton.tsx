import { MessageCircle } from 'lucide-react';

const whatsappUrl = `https://wa.me/919665316416?text=${encodeURIComponent('Hi AddMatix, I would like to know more about your services.')}`;

export function WhatsAppButton({ label = 'Chat on WhatsApp', compact = false }: { label?: string; compact?: boolean }) {
  return <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={label} className={`inline-flex items-center justify-center gap-2 rounded-full border border-[#25d366]/45 bg-[#25d366]/10 font-medium text-[#9af0b7] transition-colors hover:border-[#25d366] hover:bg-[#25d366]/20 ${compact ? 'px-3 py-2 text-xs' : 'px-4 py-2.5 text-sm'}`}>
    <MessageCircle className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
    {label}
  </a>;
}