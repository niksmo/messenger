import { Block, type IBlockProps } from 'shared/components/block';
import { Avatar } from 'shared/ui/avatar';
import { Counter } from 'shared/ui/counter';
import { AppRouter } from 'shared/components/router';
import { ROUTE_PATH } from 'shared/constants';
import { normalizeTime } from './lib';
import templateSpec from './chat-list-item.template.hbs';
import styles from './styles.module.css';

interface IChatListItemProps extends IBlockProps {
  id: number;
  active: boolean;
  avatar: string | null;
  title: string;
  time: string;
  content: string;
  unread: number;
}

interface IInnerProps extends IBlockProps {
  active: boolean;
  avatar: Avatar;
  title: string;
  time: string;
  content: string;
  unread: Counter;
  onClick: (e: Event) => void;
}

const router = AppRouter.instance();

export class ChatListItem extends Block<IInnerProps> {
  constructor(props: IChatListItemProps) {
    const { id, title, avatar, unread, content, time, active } = props;

    super({
      active,
      title,
      content,
      time: normalizeTime(time),
      avatar: new Avatar({ name: title, src: avatar }),
      unread: new Counter({ count: unread }),
      onClick: () => {
        router.go(ROUTE_PATH.MAIN + '/' + id);
      },
    });
  }

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }

  protected _getStylesModule(): CSSModuleClasses {
    return styles;
  }
}
