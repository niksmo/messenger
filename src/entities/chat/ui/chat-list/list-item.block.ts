import { Block } from 'shared/components/block/block';
import { Avatar } from 'shared/ui/avatar/avatar.block';
import { Counter } from 'shared/ui/counter/counter.block';
import { normalizeTime } from './_lib';
import templateSpec from './list-item.template.hbs';
import styles from './list-item.styles.module.css';
import { chatListController } from 'entites/chat/controller/chat-list.controller';

interface ChatListItemProps {
  id: number;
  active: boolean;
  avatar: string | null;
  title: string;
  time: string;
  content: string;
  unread: number;
}

interface InnerProps {
  active: boolean;
  avatar: Avatar;
  title: string;
  time: string;
  content: string;
  unread: Counter;
  onClick: (e: Event) => void;
}

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
        chatListController.openChat(id);
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
