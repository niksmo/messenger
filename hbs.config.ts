import { Plugin } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'node:path';
import { getNamePrefix } from './src/partials/components/avatar/getNamePrefix';
import type { IMenuItem } from './src/partials/components/dropdown/menu-item-type';
import type { INavItem } from './src/partials/components/settings/nav-item-type';
import type { IChatItem } from './src/partials/components/chat-list/chat-item-type';

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
    chatList: [
      {
        href: '#0001',
        src: 'https://avatars.mds.yandex.net/get-yapic/29310/vQv3RfIXGjDwGSUkUSsdqqXzc-1/islands-retina-middle',
        name: 'Bowie',
        message:
          'Lorem ipsum dolor sit amet consecte adipisicing elit. Nihil quo vel quisquga aliquam nemo deserunt! Quis numquam cum exercitationem.',
        time: '11:46',
        unread: 5,
        isActive: true,
      },
      {
        href: '#0002',
        name: 'Jesica',
        message: 'Lorem ipsum dolor sit amet.',
        time: '15:32',
        status: 'readed',
        isActive: false,
      },
      {
        href: '#0003',
        name: 'Photo Club Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        message: 'Lorem ipsum dolor sit amet.',
        time: '21.10.23',
        status: 'delivered',
        isActive: false,
      },
      {
        href: '#0004',
        name: 'Photo Club Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        message: 'Lorem ipsum dolor sit amet.',
        time: 'Thu',
        status: 'delivered',
        isActive: false,
      },
    ],
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
  },
};

const hbsContext = context as unknown as Record<string, unknown>;

export const handlebarsPlugin = handlebars({
  partialDirectory: resolve('src/partials'),
  context: hbsContext,
  helpers: { getNamePrefix },
}) as unknown as Plugin;
