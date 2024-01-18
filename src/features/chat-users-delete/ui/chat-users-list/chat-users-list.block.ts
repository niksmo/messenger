import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store.ts';
import type { TUser } from 'entites/chat-user/model/chat-user.model.ts';
import type { TDeleteUsersState } from 'features/chat-users-delete/model/chat-users-delete.model.ts';
import { deleteChatUsersController } from 'features/chat-users-delete/controller/chat-users-delete.controller.ts';
import { ChatUsersItem } from './_list-item/list-item.block.ts';
import templateSpec from './chat-users-list.template.hbs';
import styles from './styles.module.css';

interface ChatUsersListProps {
  users: ChatUsersItem[];
}

const store = Store.instance();

export class ChatUsersList extends Block<ChatUsersListProps> {
  constructor() {
    const { deleteUsers } = store.getState<TDeleteUsersState>();
    const { currentUsers } = deleteUsers;
    const users = createItems(currentUsers);
    super({ users });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public didMount(): void {
    store.on(this._onStoreUpdate);
  }

  public willUnmount(): void {
    store.off(this._onStoreUpdate);
  }

  private readonly _onStoreUpdate = (state: TDeleteUsersState): void => {
    const { deleteUsers } = state;
    const { currentUsers } = deleteUsers;
    const users = createItems(currentUsers);
    this.setProps({ users });
  };
}

function createItems(chatUsersList: TUser[]): ChatUsersItem[] {
  return chatUsersList.map((userParams) => {
    const {
      id: userId,
      avatar,
      first_name: firstName,
      second_name: secondName,
      display_name: displayName,
      login,
      role,
    } = userParams;
    return new ChatUsersItem({
      userId,
      avatar,
      firstName,
      secondName,
      displayName,
      login,
      role,
      disabled: role === 'admin',
      onInput(e) {
        e.stopPropagation();
        deleteChatUsersController.select(e);
      },
    });
  });
}
