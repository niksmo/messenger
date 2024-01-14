import { MenuItem } from 'shared/ui/dropdown';

export class DeleteChatMenuItem extends MenuItem {
  constructor() {
    super({
      icon: 'bucket',
      label: 'Delete Chat',
      style: 'adverse',
      onClick: () => {
        alert('open modal window');
      },
    });
  }
}
