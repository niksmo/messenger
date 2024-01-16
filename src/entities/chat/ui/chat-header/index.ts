import { Block, type IBlockProps } from 'shared/components/block';
import { DropdownMenu } from 'shared/ui/dropdown';
import { Avatar } from 'shared/ui/avatar';
import { DeleteChatMenuItem } from 'features/chat-delete';
import {
  AddChatUserMenuItem,
  RemoveChatUserMenuItem,
} from 'features/chat-users';
import templateSpec from './header.template.hbs';
import styles from './styles.module.css';

const NAME = 'Bowie';

interface IChatHeaderProps extends IBlockProps {
  username: string;
  avatar: Block;
  menu: Block;
}

export class ChatHeader extends Block<IChatHeaderProps> {
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

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
