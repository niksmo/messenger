import { type IChangeAvatarState } from '../model';

export function makeState(file: File): IChangeAvatarState {
  return {
    objectURL: URL.createObjectURL(file),
    load: false,
    error: '',
  };
}
