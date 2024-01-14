import { Block, type IBlockProps } from 'shared/components/block';
import { DropdownMenuNew } from 'shared/ui/dropdown';
import { Avatar } from 'shared/ui/avatar';
import { DeleteChatMenuItem } from 'features/chat-delete';
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
      src: 'https://avatars.mds.yandex.net/get-yapic/29310/vQv3RfIXGjDwGSUkUSsdqqXzc-1/islands-retina-middle',
    });

    const menu = new DropdownMenuNew({
      trigger: { icon: 'dots', style: 'accent' },
      menuPos: { posX: 'right', posY: 'bottom' },
      menuList: [new DeleteChatMenuItem()],
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
