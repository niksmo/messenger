import { Block } from 'shared/components/block';
import { DropdownMenu } from 'shared/ui/dropdown';
import { ChatList } from 'entites/chat';
import { SearchBar } from 'features/search-chat';
import { AddChatMenuItem } from 'features/chat-add';
import { OpenSettingsButton } from 'features/profile-settings';
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
