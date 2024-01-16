import { Block, type BlockProps } from 'shared/components/block';
import templateSpec from './day-messages.template.hbs';
import styles from './styles.module.css';
import { getMessageBlocks } from './lib';

export interface MessageProps {
  time: string;
  text: string;
  status?: string;
}

type DayMessagesProps = BlockProps<{
  date: string;
  messageList: MessageProps[];
}>;

export class DayMessages extends Block<DayMessagesProps> {
  constructor(props: DayMessagesProps) {
    const { messageList } = props;

    props.messages = getMessageBlocks(messageList);

    super(props);
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public didUpdate(): void {
    const props = this.props as DayMessagesProps;
    const { messageList } = props;
    props.messages = getMessageBlocks(messageList);
  }

  protected renderInterceptor(
    shouldRender: boolean,
    causeProps: Map<string, unknown>
  ): boolean {
    if (causeProps.has('messages')) {
      shouldRender = false;
    }
    return shouldRender;
  }
}
