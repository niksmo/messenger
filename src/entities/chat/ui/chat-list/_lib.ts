import { normalizeTime } from 'shared/helpers/normalize';
import type { TChatListState, TChat } from 'entites/chat/model/chat-list.model';
import { ChatListItem, type ChatListItemProps } from './list-item.block';

export function createItems({
  active,
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
      active: id === active?.id,
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
  chatData: TChat,
  activeChatId: number | null
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
    active: id === activeChatId,
    id,
    avatar,
    content,
    time: normalizeTime(time),
    title,
    unread,
  });
}

export function propsAdapter(
  chatData: TChat,
  activeChatId: number | null
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
    active: id === activeChatId,
    id,
    avatar,
    content,
    time: normalizeTime(time),
    title,
    unread,
  };
}
