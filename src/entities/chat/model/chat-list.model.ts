export interface IChatParams {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

export interface IChatListState {
  currentChat: null | number;
  chats: IChatParams[];
}

export interface IChatListSlice extends Record<string, unknown> {
  chatList: IChatListState;
}
