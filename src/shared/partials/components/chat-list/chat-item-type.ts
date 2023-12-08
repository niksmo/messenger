export interface IChatItem {
  href: string;
  src?: string;
  name: string;
  time: string;
  status?: 'pending' | 'rejected' | 'delivered' | 'readed';
  message: string;
  unread?: number;
  isActive: boolean;
}
