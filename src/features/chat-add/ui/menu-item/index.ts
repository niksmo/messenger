import { AppRouter } from 'shared/components/router';
import { ROUTE_PATH } from 'shared/constants';
import { MenuItem } from 'shared/ui/dropdown';

export class AddChatMenuItem extends MenuItem {
  constructor() {
    const router = AppRouter.instance();

    super({
      icon: 'plus',
      label: 'New Chat',
      style: 'accent',
      onClick: () => {
        router.go(ROUTE_PATH.ADD_CHAT);
      },
    });
  }
}
