import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const STATIC_PATH_NAME = 'static';

export default defineConfig({
  server: {
    open: true,
  },
  publicDir: STATIC_PATH_NAME,
  css: { postcss: { plugins: [autoprefixer, cssnano] } },
});
