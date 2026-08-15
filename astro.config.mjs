import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://brunocesarr.github.io',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt-br'],
    routing: {
      prefixDefaultLocale: false, // / = English, /pt-br/ = Portuguese
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
          'pt-br': 'pt-BR',
        },
      },
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],

  vite: { plugins: [tailwindcss()] },
});