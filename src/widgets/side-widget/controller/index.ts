import { IconButton } from 'shared/ui/button';
import { SearchBar } from 'features/search-contact';
import { editProfileLink } from 'features/edit-profile';
import { changePasswordLink } from 'features/change-password';
import { logoutLink } from 'features/logout';
import { addContactMenu } from 'features/add-contact';
import { Settings } from '../ui';
import { ChatList, IChatListItem } from '../ui';
import { SideWidget } from '../ui';

import mockData from 'shared/mock-data/chat-list.json';

const chatListData = mockData as unknown as IChatListItem[];

const menuButton = new IconButton({
  type: 'button',
  style: 'primary',
  icon: 'menu',
  role: 'menu',
  ariaLabel: 'Show settings',
});

const search = new SearchBar({
  id: 'search',
  name: 'search',
  placeholder: 'Search',
});

const chatList = new ChatList({
  menuButton,
  chatList: chatListData,
  search,
  addContact: addContactMenu,
});

const settings = new Settings({
  navList: [editProfileLink, changePasswordLink, logoutLink],
});

menuButton.setProps({
  onClick: settings.openSettings.bind(settings),
});

const sideWidget = new SideWidget({ chatList, settings });
export { sideWidget };
