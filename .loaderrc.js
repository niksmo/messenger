import Handlebars from 'handlebars';
const { precompile } = Handlebars;

const HBS_MODULE_TYPE = 'module';

const hbsLoader = {
  resolve(specifier, opts) {
    if (specifier.endsWith('.hbs')) {
      const { parentURL } = opts;
      const { href } = new URL(specifier, parentURL);
      return { url: href };
    }
  },
  format(url) {
    if (url.endsWith('.hbs')) {
      return { format: HBS_MODULE_TYPE };
    }
  },

  transform(source, opts) {
    if (opts.url.endsWith('.hbs')) {
      source = `export default ${precompile(source.toString())};\n`;
      return { source };
    }
  },
};

export default {
  loaders: [hbsLoader, 'esm-loader-typescript'],
};
