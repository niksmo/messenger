import { AppRouter } from 'shared/components/router/router';
import { ROUTE_PATH } from 'shared/constants/routes';
import { MenuItem } from 'shared/ui/dropdown/menu-item.block';

export class RemoveChatUserMenuItem extends MenuItem {
  constructor() {
    super({
      icon: 'remove-contact',
      label: 'Remove User',
      style: 'primary',
      onClick: () => {
        const router = AppRouter.instance();
        router.go(ROUTE_PATH.DELETE_USERS, false, { prev: location.pathname });
      },
    });
  }
}
