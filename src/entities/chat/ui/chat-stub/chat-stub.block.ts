import { Block } from 'shared/components/block/block';
import templateSpec from './chat-stub.template.hbs';
import styles from './styles.module.css';

interface ChatStubProps {
  loaded: boolean;
}

export class ChatStub extends Block<ChatStubProps> {
  constructor(props: ChatStubProps) {
    super({ ...props });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
