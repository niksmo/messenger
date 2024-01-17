import { Block } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUTE_PATH } from 'shared/constants';
import { AddChatForm } from 'features/chat-add/ui/form';
import templateSpec from './add-chat-page.template.hbs';
import styles from './styles.module.css';

interface AddChatPageProps {
  form: Block;
  transitionButton: Block;
}

export class AddChatPage extends Block<AddChatPageProps> {
  constructor() {
    const transitionButton = new Link({
      href: ROUTE_PATH.MAIN,
      ariaHidden: true,
      children: new ButtonLight({
        label: 'Back to chats',
        name: 'transitionButton',
        type: 'button',
      }),
    });

    const form = new AddChatForm();

    super({ form, transitionButton });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
