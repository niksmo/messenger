import { Block } from 'shared/components/block/block';
import { DropdownMenu } from 'shared/ui/dropdown/dropdown.block';
import { Avatar } from 'shared/ui/avatar/avatar.block';
import { Store } from 'shared/components/store/store';
import { type TChatListState } from 'entites/chat/model/chat-list.model';
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
    const avatar = new Avatar({ name: '', src: null });

    const menu = new DropdownMenu({
      trigger: { icon: 'dots', style: 'accent' },
      menuPos: { posX: 'right', posY: 'bottom' },
      menuList: [
        new AddChatUserMenuItem(),
        new RemoveChatUserMenuItem(),
        new DeleteChatMenuItem(),
      ],
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
    const { chats, currentChat, load } = state.chatList;

    if (load) {
      return;
    }

    const curChatData = chats.find((chat) => chat.id === currentChat);

    if (curChatData) {
      const { avatar, title } = curChatData;
      this._avatar.setProps({ src: avatar, name: title });
      this.setProps({ title });
    }
  };
}
