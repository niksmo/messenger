import { Plugin } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'node:path';
import { getNamePrefix } from './src/partials/components/avatar/getNamePrefix';
import type { IMenuItem } from './src/partials/components/dropdown/menu-item-type';
import type { INavItem } from './src/partials/components/settings/nav-item-type';
import type { IChatItem } from './src/partials/components/chat-list/chat-item-type';
import type { IMessagesByDay } from './src/partials/components/chat/chat-types';

import chatListData from './src/mock-data/chat-list.json';
import messagesData from './src/mock-data/messages.json';

interface IContext {
  viewer: { firstName: string; lastName: string; username: string };
  signin: { unauth: boolean };
  main: {
    menu: {
      addChat: IMenuItem[];
      chatOpt: IMenuItem[];
      message: IMenuItem[];
    };
    chatList: IChatItem[];
    settings: {
      nav: INavItem[];
    };
    chat: {
      user: { name: string; src?: string };
      messages: IMessagesByDay[];
    };
  };
}

const context: IContext = {
  viewer: {
    firstName: 'Dmitry',
    lastName: 'Antonovich',
    username: 'dimosky',
  },
  signin: {
    unauth: false,
  },
  main: {
    menu: {
      addChat: [
        {
          style: 'primary',
          icon: 'new-contact',
          label: 'New Contact',
        },
      ],
      chatOpt: [
        {
          style: 'adverse',
          icon: 'bucket',
          label: 'Delete Chat',
        },
      ],
      message: [
        {
          style: 'primary',
          icon: 'media',
          label: 'Photo Or Video',
        },
        {
          style: 'primary',
          icon: 'file',
          label: 'File',
        },
      ],
    },
    chatList: chatListData as IChatItem[],
    settings: {
      nav: [
        {
          href: '/edit-profile/',
          style: 'accent',
          icon: 'profile',
          label: 'Edit Profile',
        },
        {
          href: '/change-password/',
          style: 'accent',
          icon: 'lock',
          label: 'Change Password',
        },
        {
          style: 'negative',
          icon: 'close',
          label: 'Log Out',
        },
      ],
    },
    chat: {
      user: { name: chatListData[0].name, src: chatListData[0].src },
      messages: messagesData,
    },
  },
};

const hbsContext = context as unknown as Record<string, unknown>;

export const handlebarsPlugin = handlebars({
  partialDirectory: resolve('src/partials'),
  context: hbsContext,
  helpers: { getNamePrefix },
}) as unknown as Plugin;
