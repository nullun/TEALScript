import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      social: {
        github: 'https://github.com/withastro/starlight',
      },
      plugins: [
        // Generate the documentation.
        starlightTypeDoc({
          entryPoints: ['../src/lib/index.ts', '../types/global.d.ts'],
          tsconfig: '../tsconfig.json',
          typeDoc: {
            plugin: ['typedoc-plugin-merge-modules'],
          },
          sidebar: { collapsed: true },
        }),
      ],
      sidebar: [
        {
          label: 'Guides',
          collapsed: true,
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Tutorials',
          collapsed: true,
          autogenerate: { directory: 'tutorials' },
        },
        // Add the generated sidebar group to the sidebar.
        typeDocSidebarGroup,
      ],
    }),
  ],
});
