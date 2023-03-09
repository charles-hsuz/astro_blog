import { defineConfig } from 'astro/config';
import { configs } from "./src/config"
import { remarkNotePlugin } from './src/utils/remarkPlugins/note.js'
import remarkGfm from 'remark-gfm'
import smartypants from 'remark-smartypants'
import remarkDirective from 'remark-directive';
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.krahsu.top',
  integrations: [vue()],
  output: "static",
  markdown: {
    shikiConfig: {
      theme: configs.posts.highlight,
      langs: [],
      wrap: true
    },
    remarkPlugins: [[remarkGfm, {}],[smartypants, {}],[remarkDirective, {}], [remarkNotePlugin, {}]],
  },
});