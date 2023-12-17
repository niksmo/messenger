import { IconButton } from 'shared/ui/button';
import { ChatList, IChatListItem } from '../ui';
import { SideWidget } from '../ui';

import mockData from 'shared/mock-data/chat-list.json';
import { Settings } from '../ui/settings';

const chatListData = mockData as unknown as IChatListItem[];

const menuButton = new IconButton({
  type: 'button',
  style: 'primary',
  icon: 'menu',
});

const chatList = new ChatList({ menuButton, chatList: chatListData });

const settings = new Settings();

menuButton.setProps({
  onClick: settings.openSettings.bind(settings),
});

const sideWidget = new SideWidget({ chatList, settings });
export { sideWidget };
