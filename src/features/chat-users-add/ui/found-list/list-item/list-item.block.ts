import uuid from 'shared/packages/uuid';
import { Block } from 'shared/components/block';
import { ChatUsersItem } from 'shared/ui/chat-user-line/chat-user-line.block';
import styles from './styles.module.css';
import templateSpec from './list-item.template.hbs';

interface FoundUsersItemProps {
  userId: number;
  avatar: string | null;
  firstName: string;
  secondName: string;
  displayName: string | null;
  login: string;
  isAdded: boolean;
  onInput?: (e: Event) => void;
}

interface InnerProps {
  id: string;
  userId: number;
  isAdded: boolean;
  userLine: Block;
  onInput?: (e: Event) => void;
}

function createUserLine({
  isAdded,
  ...rest
}: FoundUsersItemProps): ChatUsersItem {
  const status = isAdded ? 'Added' : null;

  return new ChatUsersItem({
    status,
    ...rest,
  });
}

export class FoundUsersItem extends Block<InnerProps> {
  constructor(props: FoundUsersItemProps) {
    const { isAdded, userId, onInput } = props;
    const userLine = createUserLine(props);
    super({
      id: uuid(),
      userLine,
      isAdded,
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
