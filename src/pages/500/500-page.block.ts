import { Block } from 'shared/components/block/block';
import { Link } from 'shared/components/router/link.block';
import { WarnStub } from 'shared/ui/warn-stub-page/warn-stub.block';
import { ButtonLight } from 'shared/ui/main-button/button-light.block';
import templateSpec from './500.template.hbs';

interface InternalErrorPageProps {
  warnStub: Block;
  transitionButton: Block;
}

export class InternalErrorPage extends Block<InternalErrorPageProps> {
  constructor() {
    const warnStub = new WarnStub({
      errCode: 500,
      message: 'Something went wrong. But we\xA0are already fixing\xA0it.',
    });

    const transitionButton = new Link({
      href: '/',
      replace: true,
      ariaHidden: true,
      children: new ButtonLight({
        label: 'Back to chats',
        name: 'transitionButton',
        type: 'button',
      }),
    });

    super({ warnStub, transitionButton });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}
