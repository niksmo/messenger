export interface TMessage {
  id: number;
  time: string;
  user_id: number;
  content: string;
  type: 'message';
}
