import { type IChangeAvatarState } from '../model';

export function makeState(file: File): IChangeAvatarState {
  return {
    objectURL: URL.createObjectURL(file),
    isImage: file.type.startsWith('image'),
    load: false,
    error: '',
  };
}
