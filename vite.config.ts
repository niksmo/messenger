import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { handlebarsPlugin } from './hbs.config';

function getPagePath(prefix: string) {
  const index = 'index.html';

  return prefix !== 'main' ? resolve(prefix + '/' + index) : resolve(index);
}

const pageList = [
  'main',
  'signin',
  'signup',
  'edit_profile',
  'change_password',
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
      input: pageList.reduce((acc, page) => {
        acc[page] = getPagePath(page);
        return acc;
      }, {}),
    },
  },
});
