import { Block } from 'shared/components/block/block';
import { sendMessageController } from '../../../controller/send-message.controller';
import templateSpec from './input.template.hbs';
import styles from './styles.module.css';

export class MessageInput extends Block {
  constructor() {
    super({
      name: 'message',
      onInput: (e: InputEvent) => {
        sendMessageController.input(e);
      },
    });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  protected renderInterceptor(
    shouldRender: boolean,
    causeProps: Map<string, string>
  ): boolean {
    if (causeProps.has('value')) {
      shouldRender = false;
    }

    return shouldRender;
  }
}
