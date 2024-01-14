export interface IChangeAvatarState {
  objectURL: string;
  error: string;
  load: boolean;
}

export interface IChangeAvatarSlice extends Record<string, unknown> {
  changeAvatar: IChangeAvatarState;
}
