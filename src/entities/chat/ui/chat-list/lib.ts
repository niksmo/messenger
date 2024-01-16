import type { TChatListState } from 'entites/chat/model/chat-list.model';
import { ChatListItem } from './chat-list-item';

export function createItems(store: TChatListState): ChatListItem[] {
  const { chatList } = store;
  const { currentChat = null, chats = [] } = { ...chatList };

  return chats.map((chatParams) => {
    const {
      id,
      avatar,
      last_message: lastMessage,
      title,
      unread_count: unread,
    } = chatParams;
    const { content = '', time = '' } = { ...lastMessage };

    const active = id === currentChat;

    return new ChatListItem({
      id,
      active,
      avatar,
      content,
      time,
      title,
      unread,
    });
  });
}
