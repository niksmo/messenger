import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default defineConfig({
  css: { postcss: { plugins: [autoprefixer, cssnano] } },
  plugins: [],
  publicDir: 'src/app/assets/public',
});
