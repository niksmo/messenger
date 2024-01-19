import { Block } from 'shared/components/block/block';
import templateSpec from './auth-guard.template.hbs';

export class RequestAuthStub extends Block {
  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}
