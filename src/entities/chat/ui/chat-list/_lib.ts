import type {
  TChatListState,
  TChatParams,
} from 'entites/chat/model/chat-list.model';
import { ChatListItem, type ChatListItemProps } from './list-item.block';

export function createItems({
  currentChat,
  chats,
}: TChatListState['chatList']): ChatListItem[] {
  return chats.map((chatParams) => {
    const {
      id,
      avatar,
      last_message: lastMessage,
      title,
      unread_count: unread,
    } = chatParams;
    const { content = '', time } = { ...lastMessage };

    return new ChatListItem({
      active: id === currentChat,
      id,
      avatar,
      content,
      time: normalizeTime(time),
      title,
      unread,
    });
  });
}

export function createView(
  chatData: TChatParams,
  currentChat: number | null
): ChatListItem {
  const {
    id,
    avatar,
    last_message: lastMessage,
    title,
    unread_count: unread,
  } = chatData;
  const { content = '', time } = { ...lastMessage };

  return new ChatListItem({
    active: id === currentChat,
    id,
    avatar,
    content,
    time: normalizeTime(time),
    title,
    unread,
  });
}

export function propsAdapter(
  chatData: TChatParams,
  currentChat: number | null
): ChatListItemProps {
  const {
    id,
    avatar,
    last_message: lastMessage,
    title,
    unread_count: unread,
  } = chatData;
  const { content = '', time } = { ...lastMessage };

  return {
    active: id === currentChat,
    id,
    avatar,
    content,
    time: normalizeTime(time),
    title,
    unread,
  };
}

export function normalizeTime(time?: string): string {
  if (!time) {
    return '';
  }

  const date = new Date(time);
  return isNaN(date.valueOf()) ? '' : `${date.getHours()}:${date.getMinutes()}`;
}
