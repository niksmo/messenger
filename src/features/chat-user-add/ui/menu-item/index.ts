import { MenuItem } from 'shared/ui/dropdown';

export class AddChatUserMenuItem extends MenuItem {
  constructor() {
    super({
      icon: 'new-contact',
      label: 'Add User',
      style: 'primary',
      onClick: () => {
        alert('open modal window');
      },
    });
  }
}
