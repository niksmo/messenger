import { IconButton } from 'shared/ui/button';
import { Link } from 'shared/components/router';
import { ROUT_PATH } from 'shared/constants';
import { SearchBar } from 'features/search-contact';
import { addContactMenu } from 'features/add-contact';
import { ChatList, type IChatListItem, SideWidget } from '../ui';

import mockData from 'shared/mock-data/chat-list.json';

const chatListData = mockData as unknown as IChatListItem[];

const topBarButton = new IconButton({
  type: 'button',
  style: 'primary',
  icon: 'gear',
  role: 'menu',
  ariaLabel: 'Show settings',
});

const settingsButton = new Link({
  href: ROUT_PATH.SETTINGS,
  ariaHidden: true,
  children: topBarButton,
});

const search = new SearchBar({
  id: 'search',
  name: 'search',
  placeholder: 'Search',
});

const chatList = new ChatList({
  settingsButton,
  chatList: chatListData,
  search,
  addContact: addContactMenu,
});

const sideWidget = new SideWidget({ chatList });
export { sideWidget };
