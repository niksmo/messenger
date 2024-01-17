import { Block } from 'shared/components/block';
import type { TUser } from '../../model/chat-user.model.ts';
import templateSpec from './chat-users-list.template.hbs';
import styles from './styles.module.css';
import { ChatUsersItem } from './list-item/index.ts';

interface ChatUsersListProps {
  users: TUser[];
}

interface InnerProps {
  items: ChatUsersItem[];
}

function createItems(usersList: TUser[]): ChatUsersItem[] {
  return usersList.map((userParams) => {
    const {
      id: userId,
      avatar,
      first_name: firstName,
      second_name: secondName,
      display_name: displayName,
    } = userParams;
    return new ChatUsersItem({
      userId,
      avatar,
      firstName,
      secondName,
      displayName,
    });
  });
}

export class ChatUsersList extends Block<InnerProps> {
  constructor({ users }: ChatUsersListProps) {
    super({ items: createItems(users) });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public setProps(
    props: Partial<{ items: ChatUsersItem[]; users: TUser[] }>
  ): void {
    const { users } = props;
    if (users) {
      super.setProps({ items: createItems(users) });
    }
  }
}
