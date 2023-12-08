import type { TIcon24 } from '../../../ui/icon/types';

export interface INavItem {
  style: 'accent' | 'negative';
  icon: TIcon24;
  label: string;
  href?: string;
}
