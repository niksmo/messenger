import { Block, type BlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUTE_PATH } from 'shared/constants';
import { AddUsersForm } from 'features/chat-users-add/ui/add-users-form';
import templateSpec from './add-chat-users-page.template.hbs';
import styles from './styles.module.css';

type AddChatUsersPageProps = BlockProps<{
  form: Block;
  transitionButton: Block;
}>;

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
