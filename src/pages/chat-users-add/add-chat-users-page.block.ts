import { Block } from 'shared/components/block/block';
import { Link } from 'shared/components/router/link.block';
import { ButtonLight } from 'shared/ui/main-button/button-light.block';
import { ROUTE_PATH } from 'shared/constants/routes';
import { AddUsersForm } from 'features/chat-users-add/ui/add-users-form/add-users-form.block';
import templateSpec from './add-chat-users-page.template.hbs';
import styles from './styles.module.css';

interface AddChatUsersPageProps {
  form: Block;
  transitionButton: Block;
}

export class AddChatUsersPage extends Block<AddChatUsersPageProps> {
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

    const form = new AddUsersForm();

    super({ form, transitionButton });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
