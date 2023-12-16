import { Avatar } from 'shared/ui/avatar';
import { Bubble, BubbleOwn } from 'shared/ui/bubble';
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
  const { date, messages } = day;

  const bubbleList = messages.map(message => {
    const { text, time, status } = message;
    if (status) {
      return new BubbleOwn({ text, time, status });
    } else {
      return new Bubble({ text, time });
    }
  });

  return new DayMessages({ date, messages: bubbleList });
});

const chatWidget = new ChatWidget({ header, messages, sender });

export { chatWidget };
