import { Block, type BlockProps } from 'shared/components/block';
import { Link } from 'shared/components/router';
import { ButtonLight } from 'shared/ui/button';
import { ROUTE_PATH } from 'shared/constants';
// import { AddChatForm } from 'features/chat-add/ui/form';
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

    // const form = new AddChatForm();
    // const usersList = new ChatUsersList();

    super({ transitionButton });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
