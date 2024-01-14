import { Link } from 'shared/components/router';
import { ROUTE_PATH } from 'shared/constants';
import { IconButton } from 'shared/ui/button';

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
