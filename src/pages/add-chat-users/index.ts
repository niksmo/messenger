import { Block, type BlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUTE_PATH } from 'shared/constants';
import { AddUsersForm } from 'features/chat-users/ui/add-users-form';
import templateSpec from './add-chat-users-page.template.hbs';
import styles from './styles.module.css';

type IPageAddChatUsersProps = BlockProps<{
  form: Block;
  usersList: Block;
  transitionButton: Block;
}>;

export class PageAddChatUsers extends Block<IPageAddChatUsersProps> {
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
    // const usersList = new ChatUsersList();

    super({ form, transitionButton });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
