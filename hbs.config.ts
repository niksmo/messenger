import { Plugin } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'node:path';

export const handlebarsPlugin = handlebars({
  partialDirectory: resolve('src/partials'),
  context: {
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
  },
}) as unknown as Plugin;
