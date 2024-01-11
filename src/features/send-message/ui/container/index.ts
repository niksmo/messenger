import { Block, type IBlockProps } from 'shared/components/block';
import { DropdownMenu, MenuItem } from 'shared/ui/dropdown';
import { Overlay } from 'shared/ui/overlay';
import { IconButton } from 'shared/ui/button';
import { MessageForm } from '../form';
import templateSpec from './container.template.hbs';
import styles from './styles.module.css';

interface IMessageSenderProps extends IBlockProps {
  menu: Block;
  form: Block;
}

export class MessageSender extends Block<IMessageSenderProps> {
  constructor() {
    const menuItemMedia = new MenuItem({
      label: 'Photo Or Video',
      icon: 'media',
      style: 'primary',
    });
    const menuItemFile = new MenuItem({
      label: 'File',
      icon: 'file',
      style: 'primary',
    });

    const overlay = new Overlay();

    const dropdown = new DropdownMenu({
      menuList: [menuItemMedia, menuItemFile],
      overlay,
      posX: 'left',
      posY: 'top',
    });

    const menu = new IconButton({
      type: 'button',
      style: 'primary',
      icon: 'paperclip',
      ariaLabel: 'Attach media',
      role: 'menu',
      children: dropdown,
      onClick() {
        dropdown.toggle();
        overlay.toggle();
      },
    });

    const form = new MessageForm();

    super({ menu, form });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
