import { Block } from 'shared/components/block';
import { Store } from 'shared/components/store/store.ts';
import type { TUser } from 'entites/chat-user/model/chat-user.model.ts';
import type { TAddUsersState } from '../../model/chat-users-add.model.ts';
import { FoundUsersItem } from './list-item/list-item.block.ts';
import templateSpec from './found-list.template.hbs';
import styles from './styles.module.css';

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

function createItems(foundList: TUser[]): FoundUsersItem[] {
  return foundList.map((userParams) => {
    const {
      id: userId,
      avatar,
      first_name: firstName,
      second_name: secondName,
      display_name: displayName,
      login,
    } = userParams;
    return new FoundUsersItem({
      userId,
      avatar,
      firstName,
      secondName,
      displayName,
      isAdded: Math.floor(Math.random() * 100) > 50,
      login,
      onInput(e) {
        e.stopPropagation();
        const { target } = e;
        if (target instanceof HTMLInputElement) {
          if (target.checked) {
            console.log('add to select state: ', target.value);
          } else {
            console.log('remove from select state: ', target.value);
          }
        }
      },
    });
  });
}
