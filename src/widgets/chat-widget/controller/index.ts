import { Avatar } from 'shared/ui/avatar';
import { ChatHeader } from 'entites/chat';
import { DayMessages } from 'entites/message';
import { messageSender as sender } from 'features/send-message';
import { ChatWidget } from '../ui/chat-widget';

import data from 'shared/mock-data/messages.json';

const NAME = 'Bowie';

const avatar = new Avatar({
  name: NAME,
  src: 'https://avatars.mds.yandex.net/get-yapic/29310/vQv3RfIXGjDwGSUkUSsdqqXzc-1/islands-retina-middle',
});

const header = new ChatHeader({ avatar, username: NAME });

const messages = data.map(day => {
  const { date, messages: messageList } = day;
  return new DayMessages({ date, messageList });
});

const chatWidget = new ChatWidget({ header, messages, sender });

export { chatWidget };
