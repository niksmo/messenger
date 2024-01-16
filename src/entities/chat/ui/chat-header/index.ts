import { Block, type BlockProps } from 'shared/components/block';
import { DropdownMenu } from 'shared/ui/dropdown';
import { Avatar } from 'shared/ui/avatar';
import { AddChatUserMenuItem } from 'features/chat-users/ui/add-users-menu-item';
import { RemoveChatUserMenuItem } from 'features/chat-users/ui/delete-users-menu-item';
import { DeleteChatMenuItem } from 'features/chat-delete/ui/menu-item';
import templateSpec from './header.template.hbs';
import styles from './styles.module.css';

const NAME = 'Bowie';

type ChatHeaderProps = BlockProps<{
  username: string;
  avatar: Block;
  menu: Block;
}>;

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
