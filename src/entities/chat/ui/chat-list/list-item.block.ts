import { Block } from 'shared/components/block/block';
import { Avatar } from 'shared/ui/avatar/avatar.block';
import { Counter } from 'shared/ui/counter/counter.block';
import { normalizeTime } from './_lib';
import templateSpec from './list-item.template.hbs';
import styles from './list-item.styles.module.css';
import { chatListController } from 'entites/chat/controller/chat-list.controller';

export interface ChatListItemProps {
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
  private readonly _avatar;
  private readonly _unread;
  constructor(props: ChatListItemProps) {
    const {
      id,
      title,
      avatar: src,
      unread: count,
      content,
      time,
      active,
    } = props;

    const avatar = new Avatar({ name: title, src });
    const unread = new Counter({ count });

    super({
      active,
      title,
      content,
      time: normalizeTime(time),
      avatar,
      unread,
      onClick: () => {
        chatListController.openChat(id);
      },
    });

    this._avatar = avatar;
    this._unread = unread;
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }

  public setProps(props: Partial<ChatListItemProps & InnerProps>): void {
    const { unread: count, avatar: src, title, ...rest } = props;
    this._avatar.setProps({ src, name: title });
    this._unread.setProps({ count });
    super.setProps({ title, ...rest });
  }
}
