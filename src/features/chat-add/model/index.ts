interface IInputState {
  value: string;
  error: boolean;
  hint: string;
}

export interface IAddChatFormState {
  title: IInputState;
  load: boolean;
}

export interface IAddChatStoreSlice {
  addChat: IAddChatFormState;
}
