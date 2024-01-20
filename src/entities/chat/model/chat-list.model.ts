export interface TLastMessage {
  user: {
    first_name: string;
    second_name: string;
    avatar: string | null;
    email: string;
    login: string;
    phone: string;
  };
  time: string;
  content: string;
}

export interface TChat {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: TLastMessage | null;
}

export type TActiveChat = Omit<TChat, 'last_message'>;

export interface TChatListState {
  chatList: {
    active: null | TActiveChat;
    chats: TChat[];
    load: boolean;
  };
}

export const chatListState: TChatListState = {
  chatList: {
    chats: [],
    active: null,
    load: true,
  },
};

export const CHAT_LIST_ACTIVE = 'chatList.active';
