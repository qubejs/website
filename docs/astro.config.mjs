// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// import catppuccin from 'starlight-theme-catppuccin';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  build: {
    inlineStylesheets: 'never',
  },
  integrations: [
    starlight({
      title: 'My Docs',
      social: {
        github: 'https://github.com/qubejs/qubejs',
      },
      sidebar: [
        {
          label: 'Guides',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Example Guide', slug: 'guides/example' },
          ],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],

  vite: {
    css: {
      transformer: "lightningcss",
    },
    plugins: [
      tailwindcss(),
      // catppuccin({ dark: 'macchiato-sky', light: 'latte-sky' }),
    ],
  },
});
