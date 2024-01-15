import { Block } from 'shared/components/block';
import { viewerController } from '../../controller';
import templateSpec from './request-auth-stub.template.hbs';

export class RequestAuthStub extends Block {
  constructor() {
    super();
    void viewerController.requestCredentials();
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
