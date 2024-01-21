import { Block } from 'shared/components/block/block';
import { IconButton } from 'shared/ui/icon-button/icon-button.block';
import { sendMessageController } from '../../../controller/send-message.controller';
import { MessageInput } from '../_input/input.block';
import templateSpec from './form.template.hbs';
import styles from './styles.module.css';

interface MessageFormProps {
  input: Block;
  submitButton: Block;
  onInput?: (e: Event) => void;
  onSubmit?: (e: Event) => void;
}

export class MessageForm extends Block<MessageFormProps> {
  constructor() {
    const input = new MessageInput();

    const submitButton = new IconButton({
      type: 'submit',
      id: 'send-msg',
      icon: 'paperplane',
      style: 'secondary',
      role: 'button',
      ariaLabel: 'Send message',
    });

    super({
      input,
      submitButton,
      onSubmit(e) {
        e.preventDefault();

        sendMessageController.send();

        const { target: form } = e;
        if (form instanceof HTMLFormElement) {
          form.reset();
        }
      },
    });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
