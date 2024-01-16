import { MenuItem } from 'shared/ui/dropdown';

export class RemoveChatUserMenuItem extends MenuItem {
  constructor() {
    super({
      icon: 'remove-contact',
      label: 'Remove User',
      style: 'primary',
      onClick: () => {
        alert('open modal window');
      },
    });
  }
}
