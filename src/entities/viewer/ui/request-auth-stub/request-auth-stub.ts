import { Block } from 'shared/components/block/block';
import { viewerController } from '../../controller/viewer.controller';
import templateSpec from './request-auth-stub.template.hbs';

export class RequestAuthStub extends Block {
  public didMount(): void {
    void viewerController.requestCredentials();
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}
