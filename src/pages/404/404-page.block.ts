import { Block } from 'shared/components/block/block';
import { WarnStub } from 'shared/ui/warn-stub-page/warn-stub.block';
import { Link } from 'shared/components/router/link.block';
import { ButtonLight } from 'shared/ui/main-button/button-light.block';
import templateSpec from './404.template.hbs';

interface NotFoundPageProps {
  warnStub: Block;
  transitionButton: Block;
}

export class NotFoundPage extends Block<NotFoundPageProps> {
  constructor() {
    const warnStub = new WarnStub({
      errCode: 404,
      message: 'The page no\xA0longer exists or\xA0it\xA0never existed.',
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
