import { Block } from 'shared/components/block/block';

import { MessageForm } from '../form';
import { AttachMediaMenuItem, AttachFileMenuItem } from '../menu-item';
import templateSpec from './container.template.hbs';
import styles from './styles.module.css';
import { DropdownMenu } from 'shared/ui/dropdown/dropdown.block';

interface MessageSenderProps {
  menu: Block;
  form: Block;
}

export class MessageSender extends Block<MessageSenderProps> {
  constructor() {
    const menu = new DropdownMenu({
      trigger: { icon: 'paperclip', style: 'primary' },
      menuPos: { posX: 'left', posY: 'top' },
      menuList: [new AttachMediaMenuItem(), new AttachFileMenuItem()],
    });

    const form = new MessageForm();

    super({ menu, form });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
