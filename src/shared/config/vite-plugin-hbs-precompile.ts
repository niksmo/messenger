import { PluginOption } from 'vite';
import Handlebars from 'handlebars';

export default function handlebarsPrecompilePlugin(): PluginOption {
  return {
    name: 'vite-plugin-hbs-precompile',
    transform(code, path) {
      if (path.endsWith('template.hbs')) {
        const templateSpec = Handlebars.precompile(code, { noEscape: true });
        code = `export default ${templateSpec};\n`;

        return { code };
      }
    },
  };
}