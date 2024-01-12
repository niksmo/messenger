import { Block, type IBlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { WarnStub } from 'features/warn-stub';
import templateSpec from './500.template.hbs';

interface IInternalErrorPageProps extends IBlockProps {
  warnStub: Block;
  transitionButton: Block;
}

export class InternalErrorPage extends Block<IInternalErrorPageProps> {
  constructor() {
    const warnStub = new WarnStub({
      errCode: 500,
      message: 'Something went wrong. But we\xA0are already fixing\xA0it.',
    });

    const button = new ButtonLight({
      label: 'Back to chats',
      name: 'transitionButton',
      type: 'button',
    });

    const transitionButton = new Link({
      href: '/',
      replace: true,
      ariaHidden: true,
      children: button,
    });

    super({ warnStub, transitionButton });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
