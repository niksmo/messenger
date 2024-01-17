import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store.ts';
import { ChatUsersItem } from './_list-item/list-item.block.ts';
import templateSpec from './chat-users-list.template.hbs';
import styles from './styles.module.css';

interface ChatUsersListProps {
  users: ChatUsersItem[];
}

const store = Store.instance();

export class ChatUsersList extends Block<ChatUsersListProps> {
  constructor() {
    // const { addUsers } = store.getState<TAddUsersState>();
    // const { found } = addUsers;
    // const users = createItems(found);
    super({ users: [] });
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

  private readonly _onStoreUpdate = (state: TAddUsersState): void => {
    // const { addUsers } = state;
    // const { found } = addUsers;
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
      isAdded,
    } = userParams;
    return new ChatUsersItem({
      userId,
      avatar,
      firstName,
      secondName,
      displayName,
      isAdded,
      login,
      onInput(e) {
        e.stopPropagation();
        addChatUsersController.select(e);
      },
    });
  });
}
