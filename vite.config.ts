import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { handlebarsPlugin } from './hbs.config';

function getPagePath(prefix: string) {
  const suffix = 'index.html';

  return prefix !== 'main' ? resolve(prefix + '/' + suffix) : resolve(suffix);
}

const pageList = [
  'main',
  'signin',
  'signup',
  'edit-profile',
  'change-password',
  '404',
  '500',
];

export default defineConfig({
  server: {
    open: true,
  },
  css: { postcss: { plugins: [autoprefixer, cssnano] } },
  plugins: [handlebarsPlugin],
  build: {
    rollupOptions: {
      input: pageList.reduce((path, page) => {
        path[page] = getPagePath(page);
        return path;
      }, {}),
    },
  },
});
