import { Block, type BlockProps } from 'shared/components/block';
import type { TUser } from '../../model/chat-user.model.ts';
import templateSpec from './chat-users-list.template.hbs';
import styles from './styles.module.css';
import { ChatUsersItem } from './list-item/index.ts';

type ChatUsersListProps = BlockProps<{
  users: TUser[];
}>;

type InnerProps = BlockProps<{
  items: ChatUsersItem[];
}>;

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

  public setProps({ users }: ChatUsersListProps): void {
    super.setProps({ items: createItems(users) });
  }
}
