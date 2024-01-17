import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';
import { MenuItem } from 'shared/ui/dropdown/menu-item.block';

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
