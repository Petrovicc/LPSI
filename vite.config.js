import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { languages } from './src/data/site.js';

export default defineConfig({
  base: process.env.BASE_PATH || './',
  build: {
    rollupOptions: {
      input: Object.fromEntries(['index', ...languages].map(lang => [lang, resolve(lang === 'index' ? 'index.html' : `${lang}/index.html`)])),
    },
  },
});
