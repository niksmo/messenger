import { Block } from 'shared/components/block/block';
import { DropdownMenu } from 'shared/ui/dropdown/dropdown.block';
import { AttachMediaMenuItem } from './_attach-menu-item/menu-item-media.block';
import { AttachFileMenuItem } from './_attach-menu-item/menu-item-file.block';
import { MessageForm } from './_form/form.block';
import templateSpec from './message-sender.template.hbs';
import styles from './styles.module.css';

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
