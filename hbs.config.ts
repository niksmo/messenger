import { Plugin } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'node:path';

export const handlebarsPlugin = handlebars({
  partialDirectory: resolve('src/partials'),
  context: {
    signin: {
      unauth: false,
    },
  },
}) as unknown as Plugin;
