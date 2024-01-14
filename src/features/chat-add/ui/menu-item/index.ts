import { MenuItem } from 'shared/ui/dropdown';

export class AddChatMenuItem extends MenuItem {
  constructor() {
    super({
      icon: 'plus',
      label: 'New Chat',
      style: 'accent',
      onClick: () => {
        alert('open modal window');
      },
    });
  }
}
