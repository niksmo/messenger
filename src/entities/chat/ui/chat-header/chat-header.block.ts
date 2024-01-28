import { Block } from 'shared/components/block/block';
import { DropdownMenu } from 'shared/ui/dropdown/dropdown.block';
import { Avatar } from 'shared/ui/avatar/avatar.block';
import { Store } from 'shared/components/store/store';
import { type TChatListState } from 'entites/chat/model/chat-list.model';
import type { TViewerState } from 'entites/viewer/model/viewer.model';
import { AddChatUserMenuItem } from 'features/chat-users-add/ui/add-users-menu-item/menu-item.block';
import { RemoveChatUserMenuItem } from 'features/chat-users-delete/ui/delete-users-menu-item/menu-item.block';
import { DeleteChatMenuItem } from 'features/chat-delete/ui/menu-item/menu-item.block';
import templateSpec from './chat-header.template.hbs';
import styles from './styles.module.css';

interface ChatHeaderProps {
  title: string;
  avatar: Block;
  menu: Block;
}

const store = Store.instance();

export class ChatHeader extends Block<ChatHeaderProps> {
  private readonly _avatar;

  constructor() {
    const { chatList, viewer } = store.getState<
      TChatListState & TViewerState
    >();

    const avatar = new Avatar({ name: '', src: null });

    const menuList = [new AddChatUserMenuItem(), new RemoveChatUserMenuItem()];

    if (chatList.active?.created_by === viewer.id) {
      menuList.push(new DeleteChatMenuItem());
    }

    const menu = new DropdownMenu({
      trigger: { icon: 'dots', style: 'accent' },
      menuPos: { posX: 'right', posY: 'bottom' },
      menuList,
    });

    super({ title: '', avatar, menu });
    this._avatar = avatar;
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

  private readonly _onStoreUpdate = (state: TChatListState): void => {
    const { active, load } = state.chatList;

    if (load || !active) {
      return;
    }

    this._avatar.setProps({ src: active.avatar, name: active.title });
    this.setProps({ title: active.title });
  };
}
