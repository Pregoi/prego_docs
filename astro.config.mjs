import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.pregoi.com',
  integrations: [
    starlight({
      title: 'Prego Docs',
      description: 'Documentation for the Prego platform — get started, guides, API reference, and more.',
      favicon: '/favicon.svg',
      editLink: {
        baseUrl: 'https://github.com/prego/prego_docs/edit/main/',
      },
      components: {
        Header: './src/components/Header.astro',
        PageFrame: './src/components/PageFrame.astro',
        TwoColumnContent: './src/components/TwoColumnContent.astro',
        PageSidebar: './src/components/PageSidebar.astro',
      },
      sidebar: [
        { label: 'Overview', link: '/' },
        {
          label: 'Get started',
          autogenerate: { directory: 'get-started' },
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'API & Reference',
          autogenerate: { directory: 'api' },
        },
        {
          label: 'SDKs & Tools',
          autogenerate: { directory: 'sdk' },
        },
        {
          label: 'Deploy & Ops',
          autogenerate: { directory: 'deploy' },
        },
        {
          label: 'Resources',
          autogenerate: { directory: 'resources' },
        },
        {
          label: 'Legal Centre',
          autogenerate: { directory: 'legal' },
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
