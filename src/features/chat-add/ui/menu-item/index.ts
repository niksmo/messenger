import { MenuItem } from 'shared/ui/dropdown';

export class AddChatMenuItem extends MenuItem {
  constructor() {
    super({
      icon: 'new-contact',
      label: 'New Chat',
      style: 'primary',
      onClick: () => {
        alert('open modal window');
      },
    });
  }
}
