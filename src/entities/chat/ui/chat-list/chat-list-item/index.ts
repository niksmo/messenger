import { Block, type BlockProps } from 'shared/components/block';
import { Avatar } from 'shared/ui/avatar';
import { Counter } from 'shared/ui/counter';
import { AppRouter } from 'shared/components/router';
import { ROUTE_PATH } from 'shared/constants';
import { normalizeTime } from './lib';
import templateSpec from './chat-list-item.template.hbs';
import styles from './styles.module.css';

type ChatListItemProps = BlockProps<{
  id: number;
  active: boolean;
  avatar: string | null;
  title: string;
  time: string;
  content: string;
  unread: number;
}>;

type InnerProps = BlockProps<{
  active: boolean;
  avatar: Avatar;
  title: string;
  time: string;
  content: string;
  unread: Counter;
  onClick: (e: Event) => void;
}>;

const router = AppRouter.instance();

export class ChatListItem extends Block<InnerProps> {
  constructor(props: ChatListItemProps) {
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

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
