export interface ILastMessage {
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

export interface IChatParams {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: ILastMessage | null;
}

export interface IChatListState {
  currentChat: null | number;
  chats: IChatParams[];
  load: boolean;
}

export interface IChatListSlice extends Record<string, unknown> {
  chatList: IChatListState;
}
