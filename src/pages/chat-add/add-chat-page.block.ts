import { Link } from 'shared/components/router/link.block';
import { ButtonLight } from 'shared/ui/main-button/button-light.block';
import { ROUTE_PATH } from 'shared/constants/routes';
import { AddChatForm } from 'features/chat-add/ui/add-chat-form/add-chat-form.block';
import templateSpec from './add-chat-page.template.hbs';
import styles from './styles.module.css';
import { Block } from 'shared/components/block/block';

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
