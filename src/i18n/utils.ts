import { ui, defaultLang, type Lang } from './ui';

/** Reads the locale from the URL. Falls back to the default. */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  return seg in ui ? (seg as Lang) : defaultLang;
}

/** Returns a `t()` bound to a locale, with {placeholder} interpolation. */
export function useTranslations(lang: Lang) {
  return function t(
    key: keyof (typeof ui)[typeof defaultLang],
    vars?: Record<string, string | number>
  ): string {
    let str: string = ui[lang][key] ?? ui[defaultLang][key];
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  };
}

/** The other locale — used by the toggle. */
export function getAltLang(lang: Lang): Lang {
  return lang === 'en' ? 'pt-br' : 'en';
}