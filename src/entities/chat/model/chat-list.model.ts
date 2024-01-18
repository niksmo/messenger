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

export interface TChatParams {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: TLastMessage | null;
}

export interface TChatListState {
  chatList: {
    currentChat: null | number;
    chats: TChatParams[];
    loaded: boolean;
  };
}

export const chatList: TChatListState = {
  chatList: {
    chats: [],
    currentChat: null,
    loaded: false,
  },
};
