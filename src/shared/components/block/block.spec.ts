import { Block } from './block.ts';
import templateSpec from './block.template.hbs';

class Component extends Block {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}

const component = new Component();

describe('Component', () => {
  it('should...', () => {
    console.log(component.getContent());
  });
});
