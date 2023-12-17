import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import handlebarsPrecompilePlugin from './src/shared/config/vite-plugin-hbs-precompile';

export default defineConfig({
  css: { postcss: { plugins: [autoprefixer, cssnano] } },
  plugins: [handlebarsPrecompilePlugin()],
  publicDir: 'src/app/assets/public',
  resolve: {
    alias: {
      app: '/src/app',
      entites: '/src/entities',
      features: '/src/features',
      widgets: '/src/widgets',
      pages: '/src/pages',
      shared: '/src/shared',
    },
  },
});
