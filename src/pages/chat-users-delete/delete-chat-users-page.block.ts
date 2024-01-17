import { Block } from 'shared/components/block/block';
import { Link } from 'shared/components/router/link.block';
import { ButtonLight } from 'shared/ui/main-button/button-light.block';
import { ROUTE_PATH } from 'shared/constants/routes';
import { DeleteChatUsersForm } from 'features/chat-users-delete/ui/delete-users-form/delete-users-form.block';
import templateSpec from './delete-chat-users-page.template.hbs';
import styles from './styles.module.css';

interface DeleteChatUsersPageProps {
  form: Block;
  transitionButton: Block;
}

export class DeleteChatUsersPage extends Block<DeleteChatUsersPageProps> {
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

    const form = new DeleteChatUsersForm();

    super({ form, transitionButton });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
