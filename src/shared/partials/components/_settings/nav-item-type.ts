export type TIcon24 =
  | 'new-contact'
  | 'bucket'
  | 'media'
  | 'file'
  | 'profile'
  | 'lock'
  | 'close';

export interface INavItem {
  style: 'accent' | 'negative';
  icon: TIcon24;
  label: string;
  href?: string;
}
