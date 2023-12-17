import { Block, IBlockProps } from 'shared/components/block';
import templateSpec from './day-messages.template.hbs';
import styles from './styles.module.css';
import { getMessageBlocks } from './lib';

export interface IMessage {
  time: string;
  text: string;
  status?: string;
}

interface IDayMessagesProps extends IBlockProps {
  date: string;
  messageList: IMessage[];
}

export class DayMessages extends Block<IDayMessagesProps> {
  constructor(props: IDayMessagesProps) {
    const { messageList } = props;

    props.messages = getMessageBlocks(messageList);

    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public didUpdate(): void {
    const props = this.props as IDayMessagesProps;
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
