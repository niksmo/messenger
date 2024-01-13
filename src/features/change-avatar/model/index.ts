export interface IChangeAvatarState {
  objectURL: string;
  isImage: boolean;
  error: string;
  load: boolean;
}

export interface IChangeAvatarSlice extends Record<string, unknown> {
  changeAvatar: IChangeAvatarState;
}
