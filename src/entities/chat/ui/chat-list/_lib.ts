import type { TChatListState } from 'entites/chat/model/chat-list.model';
import { ChatListItem } from './list-item.block';

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
    const { content = '', time = '' } = { ...lastMessage };

    return new ChatListItem({
      active: id === currentChat,
      id,
      avatar,
      content,
      time,
      title,
      unread,
    });
  });
}

export function normalizeTime(time: string): string {
  const date = new Date(time);

  return isNaN(date.valueOf()) ? '' : `${date.getHours()}:${date.getMinutes()}`;
}
