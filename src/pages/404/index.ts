import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './404.template.hbs';
import { WarnStub } from 'features/warn-stub';
import { ButtonLight } from 'shared/ui/button';
import { Link } from 'shared/components/router/link';

interface INotFoundPageProps extends IBlockProps {
  warnStub: Block;
  transitionButton: Block;
}

export class NotFoundPage extends Block<INotFoundPageProps> {
  constructor() {
    const warnStub = new WarnStub({
      errCode: 404,
      message: 'The page no\xA0longer exists or\xA0it\xA0never existed.',
    });

    const button = new ButtonLight({
      label: 'Back to chats',
      name: 'transitionButton',
      type: 'button',
    });

    const transitionButton = new Link({
      href: '/',
      ariaHidden: true,
      children: button,
    });

    super({ warnStub, transitionButton });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  public setVisible(): void {
    this.getContent().style.display = 'flex';
  }
}
