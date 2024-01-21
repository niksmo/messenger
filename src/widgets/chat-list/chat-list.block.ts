import { Block } from 'shared/components/block/block';
import { DropdownMenu } from 'shared/ui/dropdown/dropdown.block';
import { OpenSettingsButton } from 'features/profile-settings/ui/settings-button/settings-button.block';
import { SearchBar } from 'features/search-chat/ui/search-input';
import { AddChatMenuItem } from 'features/chat-add/ui/menu-item/menu-item.block';
import { ChatList } from 'entites/chat/ui/chat-list/chat-list.block';
import templateSpec from './chat-list.template.hbs';
import styles from './styles.module.css';

interface ChatListWidgetProps {
  settingsButton: Block;
  search: Block;
  addChat: Block;
  chatList: Block;
}

export class ChatListWidget extends Block<ChatListWidgetProps> {
  constructor() {
    const settingsButton = new OpenSettingsButton();

    const search = new SearchBar();

    const addChat = new DropdownMenu({
      trigger: { icon: 'add-chat', style: 'accent' },
      menuPos: { posX: 'left', posY: 'bottom' },
      menuList: [new AddChatMenuItem()],
    });

    const chatList = new ChatList();

    super({ settingsButton, search, addChat, chatList });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
