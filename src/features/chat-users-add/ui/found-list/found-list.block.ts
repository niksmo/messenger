import { Block } from 'shared/components/block/block';
import { Store } from 'shared/components/store/store.ts';
import type {
  TAddUsersState,
  TFoundUser,
} from '../../model/chat-users-add.model.ts';
import { FoundUsersItem } from './_list-item/list-item.block.ts';
import templateSpec from './found-list.template.hbs';
import styles from './styles.module.css';
import { addChatUsersController } from 'features/chat-users-add/controller/chat-users-add.controller.ts';

interface FoundUsersListProps {
  users: FoundUsersItem[];
}

const store = Store.instance();

export class FoundUsersList extends Block<FoundUsersListProps> {
  _cache;
  constructor() {
    const { addUsers } = store.getState<TAddUsersState>();
    const { found } = addUsers;
    const users = createItems(found);
    super({ users });

    this._cache = found;
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
    const { addUsers } = state;
    const { found } = addUsers;
    if (found !== this._cache) {
      const users = createItems(found);
      this.setProps({ users });
      this._cache = found;
    }
  };
}

function createItems(foundList: TFoundUser[]): FoundUsersItem[] {
  return foundList.map((userParams) => {
    const {
      id: userId,
      avatar,
      first_name: firstName,
      second_name: secondName,
      display_name: displayName,
      login,
      isAdded,
    } = userParams;
    return new FoundUsersItem({
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
