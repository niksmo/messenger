import { Block, type IBlockProps } from 'shared/components/block';
import templateSpec from './chat-list.template.hbs';
import styles from './styles.module.css';
import { ChatItem } from 'entites/chat';

export interface IChatListItem {
  id?: string;
  src?: string;
  name: string;
  time: string;
  status?: 'delivered' | 'readed';
  message: string;
  unread?: number;
  active: boolean;
}

interface IChatListProps {
  search: Block;
  settingsButton: Block;
  addContact?: Block;
  chatList: IChatListItem[];
}

interface IInnerProps extends IChatListProps {
  list: Block[];
}

type ComponentProps = IBlockProps & IInnerProps;

export class ChatList extends Block {
  constructor(props: IChatListProps) {
    const blockProps = props as ComponentProps;

    const { chatList } = blockProps;

    blockProps.list = chatList.map((itemData) => {
      const { src: imageSrc, ...rest } = itemData;
      return new ChatItem({
        imageSrc,
        ...rest,
      });
    });

    super(blockProps);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
