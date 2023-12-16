import { DayMessages } from 'entites/message';
import { MainPage } from './main-page';
import { Bubble, BubbleOwn } from 'shared/ui/bubble';
import mockData from 'shared/mock-data/messages.json';

const chat = mockData.map(day => {
  const { date, messages } = day;

  const messageList = messages.map(message => {
    const { text, time, status } = message;
    const typedStatus = status as 'readed' | 'delivered';
    return status
      ? new BubbleOwn({ status: typedStatus, text, time })
      : new Bubble({ text, time });
  });

  return new DayMessages({
    date,
    messages: messageList,
  });
});

const mainPage = new MainPage({ chat });

export { mainPage };
