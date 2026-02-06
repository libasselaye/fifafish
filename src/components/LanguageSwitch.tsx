'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const locales = ['en', 'fr', 'es', 'zh'] as const;
const defaultLocale = 'en';
type Locale = (typeof locales)[number];

const languageOptions: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLanguage =
    languageOptions.find((option) => option.code === locale) ?? languageOptions[0];

  const buildLocalizedPath = (nextLocale: Locale) => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const hasLocalePrefix = locales.includes(pathSegments[0] as Locale);
    const restPath = hasLocalePrefix ? pathSegments.slice(1) : pathSegments;
    const basePath = restPath.length ? `/${restPath.join('/')}` : '/';
    const localizedPath = `/${nextLocale}${basePath === '/' ? '' : basePath}`;
    const query = searchParams.toString();

    return query ? `${localizedPath}?${query}` : localizedPath;
  };

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    router.push(buildLocalizedPath(nextLocale));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 rounded-full border-slate-200 bg-white/80 backdrop-blur-md px-3 text-slate-700 shadow-sm hover:bg-slate-50/80"
        >
          <span className="text-base leading-none">{currentLanguage.flag}</span>
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-44 overflow-hidden rounded-lg border-slate-200/50 bg-white/90 backdrop-blur-md p-0 shadow-lg"
      >
        <DropdownMenuLabel className="px-3 py-2 text-xs font-medium text-slate-600">
          LANGUE
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-0 bg-slate-200/50" />
        <div className="py-1">
          {languageOptions.map((option) => (
            <DropdownMenuItem
              key={option.code}
              onSelect={() => switchLocale(option.code)}
              className="h-9 cursor-pointer px-3 text-sm font-medium text-slate-800 hover:bg-slate-100/50"
            >
              <span className="mr-2 text-base leading-none">{option.flag}</span>
              <span className="flex-1">{option.label}</span>
              {locale === option.code ? <Check className="h-4 w-4 text-blue-500" /> : null}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
