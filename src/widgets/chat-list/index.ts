import { Block, type IBlockProps } from 'shared/components/block';
import { DropdownMenu } from 'shared/ui/dropdown';
import { ChatListItem } from 'entites/chat';
import { SearchBar } from 'features/search-chat';
import { AddChatMenuItem } from 'features/chat-add';
import { OpenSettingsButton } from 'features/profile-settings';
import templateSpec from './chat-list.template.hbs';
import styles from './styles.module.css';

import mockData from 'shared/mock-data/chat-list.json';
import { chatListController } from 'entites/chat/controller/chat-list.controller';

const chatListData = mockData as unknown as IChatListItem[];

export interface IChatListItem {
  id?: string;
  src: string | null;
  name: string;
  time: string;
  status?: 'delivered' | 'readed';
  message: string;
  unread?: number;
  active: boolean;
}

interface IChatListProps extends IBlockProps {
  search: Block;
  settingsButton: Block;
  addChat: Block;
  chatList: IChatListItem[];
  list: Block[];
}

export class ChatListWidget extends Block<IChatListProps> {
  constructor() {
    chatListController.start();

    const settingsButton = new OpenSettingsButton();

    const search = new SearchBar();

    const addChat = new DropdownMenu({
      trigger: { icon: 'add-chat', style: 'accent' },
      menuPos: { posX: 'left', posY: 'bottom' },
      menuList: [new AddChatMenuItem()],
    });

    const list = chatListData.map((itemData) => {
      const { src: imageSrc, ...rest } = itemData;
      return new ChatListItem({
        imageSrc,
        ...rest,
      });
    });

    super({ list, addChat, search, settingsButton });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
