export type TIcon24 =
  | 'new-contact'
  | 'bucket'
  | 'media'
  | 'file'
  | 'profile'
  | 'lock'
  | 'close';

export interface IMenuItem {
  style: 'primary' | 'adverse';
  icon: TIcon24;
  label: string;
}
