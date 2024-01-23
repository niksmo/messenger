import { Link } from 'shared/components/router/link.block';
import { ROUTE_PATH } from 'shared/constants/routes';
import { IconButton } from 'shared/ui/icon-button/icon-button.block';

export class OpenSettingsButton extends Link {
  constructor() {
    super({
      href: ROUTE_PATH.SETTINGS,
      ariaHidden: true,
      children: new IconButton({
        type: 'button',
        style: 'primary',
        icon: 'gear',
        role: 'menu',
        ariaLabel: 'Show settings',
      }),
    });
  }
}
