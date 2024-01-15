import { Block, type IBlockProps } from 'shared/components/block';
import { StatusBadge, type TStatus } from 'shared/ui/status-badge';
import { Avatar } from 'shared/ui/avatar';
import { Counter } from 'shared/ui/counter';
import templateSpec from './chat-item.template.hbs';
import styles from './styles.module.css';

interface IChatListItemProps extends IBlockProps {
  active: boolean;
  imageSrc: string | null;
  name: string;
  time: string;
  message: string;
  status?: 'readed' | 'delivered';
  unread?: number;
}

interface innerProps {
  avatar: Avatar;
  statusBadge: StatusBadge;
  unreadCounter: Counter;
}

export class ChatListItem extends Block {
  constructor(props: IChatListItemProps) {
    const { name, imageSrc: src, status, unread: count } = props;

    const avatar = new Avatar({ name, src });
    const statusBadge = new StatusBadge({ status: status ?? 'none' });
    const unreadCounter = new Counter({ count });

    Object.assign(props, { avatar, statusBadge, unreadCounter });

    super(props);
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }

  public didUpdate(): void {}

  protected renderInterceptor(
    shouldRender: boolean,
    _causeProps: Map<string, unknown>,
    _oldProps: IBlockProps,
    _block: Block<IChatListItemProps>
  ): boolean {
    const props = this.props as unknown as innerProps;
    const causeProps = _causeProps;

    if (causeProps.has('imageSrc')) {
      const { avatar } = props;
      const src = causeProps.get('imageSrc') as string;
      avatar.setProps({ src });
    }

    if (causeProps.has('status')) {
      const { statusBadge } = props;
      statusBadge.setProps({ status: causeProps.get('status') as TStatus });
    }

    if (causeProps.has('unread')) {
      const { unreadCounter } = props;
      unreadCounter.setProps({ count: causeProps.get('unread') as number });
    }

    return shouldRender;
  }
}
