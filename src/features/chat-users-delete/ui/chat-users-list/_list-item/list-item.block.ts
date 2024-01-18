import uuid from 'shared/packages/uuid/uuid';
import { Block } from 'shared/components/block/block';
import { ChatUsersLine } from 'shared/ui/chat-user-line/chat-user-line.block';
import styles from './styles.module.css';
import templateSpec from './list-item.template.hbs';

interface ChatUsersItemProps {
  userId: number;
  avatar: string | null;
  firstName: string;
  secondName: string;
  displayName: string | null;
  login: string;
  onInput?: (e: Event) => void;
}

interface InnerProps {
  id: string;
  userId: number;
  userLine: Block;
  onInput?: (e: Event) => void;
}

function createUserLine({ ...rest }: ChatUsersItemProps): ChatUsersLine {
  return new ChatUsersLine({
    status: null,
    ...rest,
  });
}

export class ChatUsersItem extends Block<InnerProps> {
  constructor(props: ChatUsersItemProps) {
    const { userId, onInput } = props;
    const userLine = createUserLine(props);
    super({
      id: uuid(),
      userLine,
      userId,
      onInput,
    });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    return styles;
  }
}
