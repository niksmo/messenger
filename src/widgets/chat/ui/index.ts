import { Block, type IBlockProps } from 'shared/components/block';
import { ChatHeader } from 'entites/chat';
import { DayMessages } from 'entites/message';
import templateSpec from './chat-widget.template.hbs';
import styles from './styles.module.css';

import data from 'shared/mock-data/messages.json';

interface IChatWidgetProps extends IBlockProps {
  header: Block;
  messages: Block[];
  sender: Block;
}

export class Chat extends Block<IChatWidgetProps> {
  constructor() {
    const messages = data.map((day) => {
      const { date, messages: messageList } = day;
      return new DayMessages({ date, messageList });
    });

    const header = new ChatHeader();

    super({ header, messages });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
