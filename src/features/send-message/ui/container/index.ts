import { Block, type IBlockProps } from 'shared/components/block';
import { DropdownMenuNew } from 'shared/ui/dropdown';
import { MessageForm } from '../form';
import { AttachMediaMenuItem, AttachFileMenuItem } from '../menu-item';
import templateSpec from './container.template.hbs';
import styles from './styles.module.css';

interface IMessageSenderProps extends IBlockProps {
  menu: Block;
  form: Block;
}

export class MessageSender extends Block<IMessageSenderProps> {
  constructor() {
    const menu = new DropdownMenuNew({
      trigger: { icon: 'paperclip', style: 'primary' },
      menuPos: { posX: 'left', posY: 'top' },
      menuList: [new AttachMediaMenuItem(), new AttachFileMenuItem()],
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
