import { Block } from 'shared/components/block/block';
import { DropdownMenu } from 'shared/ui/dropdown/dropdown.block';
import { Avatar } from 'shared/ui/avatar/avatar.block';
import { AddChatUserMenuItem } from 'features/chat-users-add/ui/add-users-menu-item/menu-item.block';
import { RemoveChatUserMenuItem } from 'features/chat-users-delete/ui/delete-users-menu-item/menu-item.block';
import { DeleteChatMenuItem } from 'features/chat-delete/ui/menu-item/menu-item.block';
import templateSpec from './chat-header.template.hbs';
import styles from './styles.module.css';

const NAME = 'Bowie';

interface ChatHeaderProps {
  username: string;
  avatar: Block;
  menu: Block;
}

export class ChatHeader extends Block<ChatHeaderProps> {
  constructor() {
    const username = NAME;

    const avatar = new Avatar({
      name: NAME,
      src: null,
    });

    const menu = new DropdownMenu({
      trigger: { icon: 'dots', style: 'accent' },
      menuPos: { posX: 'right', posY: 'bottom' },
      menuList: [
        new AddChatUserMenuItem(),
        new RemoveChatUserMenuItem(),
        new DeleteChatMenuItem(),
      ],
    });

    super({ avatar, username, menu });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
