export interface TChangeAvatarState {
  objectURL: string;
  error: string;
  load: boolean;
}

export interface TChangeAvatarSlice {
  changeAvatar: TChangeAvatarState;
}
