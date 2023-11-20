import type { TIcon24 } from '../../../types/icon';

export interface INavItem {
  style: 'accent' | 'negative';
  icon: TIcon24;
  label: string;
  href?: string;
}
