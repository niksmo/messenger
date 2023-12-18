import { Block } from 'shared/components/block';
import templateSpec from './app.template.hbs';
import './styles/index.css';

export class App extends Block {
  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}

export default new App();
