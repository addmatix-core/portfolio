import { useEffect, type ReactNode } from 'react';
import { getGetSiteContentQueryKey, useGetSiteContent } from '@workspace/api-client-react';
import { DEFAULT_FONT, getFontCss } from '@/lib/font-options';

export function SiteFontProvider({ children }: { children: ReactNode }) {
  const query = useGetSiteContent({ query: { queryKey: getGetSiteContentQueryKey() } });
  const selectedFont = query.data?.fontFamily ?? DEFAULT_FONT;

  useEffect(() => {
    const font = getFontCss(selectedFont);
    document.documentElement.style.setProperty('--app-font-sans', font);
    document.documentElement.style.setProperty('--app-font-display', font);
  }, [selectedFont]);

  return <>{children}</>;
}