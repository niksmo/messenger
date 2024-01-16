import { Block } from 'shared/components/block';
import { DropdownMenu } from 'shared/ui/dropdown';
import { OpenSettingsButton } from 'features/profile-settings/ui/settings-button';
import { SearchBar } from 'features/search-chat/ui';
import { AddChatMenuItem } from 'features/chat-add/ui/menu-item';
import { ChatList } from 'entites/chat/ui/chat-list';
import templateSpec from './chat-list.template.hbs';
import styles from './styles.module.css';

export class ChatListWidget extends Block {
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

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
