import { MainPage } from './main-page';
import { chatWidget } from 'widgets/chat-widget';
import { SideWidget } from 'widgets/side-widget';
import { ChatItem } from 'entites/chat/ui/list-item';
import data from 'shared/mock-data/chat-list.json';

const chatList = data.map(item => {
  return new ChatItem({
    active: false,
    message: item?.message!,
    name: item?.name!,
    time: item?.time!,
    imageSrc: item?.src,
    status: item?.status,
    unread: item?.unread,
  });
});

chatList[0]?.setProps({ active: true });

const sideWidget = new SideWidget({ chatList });

const mainPage = new MainPage({ chatWidget, sideWidget });

export { mainPage };
