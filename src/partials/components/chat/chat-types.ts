interface IMessage {
  text: string;
  time: string;
}

interface IOwnMessage extends IMessage {
  status: 'pending' | 'rejected' | 'delivered' | 'readed';
}

export interface IMessagesByDay {
  date: string;
  messages: (IMessage | IOwnMessage)[];
}
