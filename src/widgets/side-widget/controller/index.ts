import { IconButton } from 'shared/ui/button';
import { ChatList, IChatListItem } from '../ui';
import { SideWidget } from '../ui';

import mockData from 'shared/mock-data/chat-list.json';
import { Settings } from '../ui/settings';
import { SearchBar } from 'features/search-contact';
import { editProfileLink } from 'features/edit-profile/ui/settings-link';
import { changePasswordLink } from 'features/change-password/ui/settings-link';
import { logoutLink } from 'features/logout/ui/settings-link';

const chatListData = mockData as unknown as IChatListItem[];

const menuButton = new IconButton({
  type: 'button',
  style: 'primary',
  icon: 'menu',
});

const search = new SearchBar({
  id: 'search',
  name: 'search',
  placeholder: 'Search',
});

const chatList = new ChatList({ menuButton, chatList: chatListData, search });

const settings = new Settings({
  navList: [editProfileLink, changePasswordLink, logoutLink],
});

menuButton.setProps({
  onClick: settings.openSettings.bind(settings),
});

const sideWidget = new SideWidget({ chatList, settings });
export { sideWidget };
