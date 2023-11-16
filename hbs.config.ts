import { Plugin } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'node:path';
import { getNamePrefix } from './src/partials/components/avatar/getNamePrefix';

const context = {
  viewer: { firstName: 'Dmitry', lastName: 'Antonovich', username: 'dimosky' },
  signin: {
    unauth: false,
  },
  main: {
    menu: {
      addChat: [
        { style: 'primary', icon: 'new-contact', label: 'New Contact' },
      ],
      chatOpt: [{ style: 'adverse', icon: 'bucket', label: 'Delete Chat' }],
      message: [
        { style: 'primary', icon: 'media', label: 'Photo Or Video' },
        { style: 'primary', icon: 'file', label: 'File' },
      ],
    },
  },
} as const;

export type AppContext = typeof context;

export const handlebarsPlugin = handlebars({
  partialDirectory: resolve('src/partials'),
  context,
  helpers: { getNamePrefix },
}) as unknown as Plugin;
