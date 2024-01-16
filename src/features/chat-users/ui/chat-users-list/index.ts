import { Block, type BlockProps } from 'shared/components/block';
import templateSpec from './chat-users-list.template.hbs';
import styles from './styles.module.css';

type ChatUsersListProps = BlockProps<{
  items: Block[];
}>;

export class ChatUsersList extends Block<ChatUsersListProps> {
  constructor() {
    const items: Block[] = [];

    super({ items });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
