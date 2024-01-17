import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';
import { MenuItem } from 'shared/ui/dropdown/menu-item.block';

export class AddChatUserMenuItem extends MenuItem {
  constructor() {
    super({
      icon: 'new-contact',
      label: 'Add User',
      style: 'primary',
      onClick: () => {
        const router = AppRouter.instance();
        router.go(ROUTE_PATH.ADD_USERS);
      },
    });
  }
}
