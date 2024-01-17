import { Dialog } from 'shared/ui/dialog';
import { MenuItem } from 'shared/ui/dropdown';

export class DeleteChatMenuItem extends MenuItem {
  constructor() {
    const dialog = new Dialog({
      isVisible: false,
      text: 'The chat will be deleted with all correspondence',
      buttonText: ['Back', 'Delete'],
      approveCb: () => {
        alert('chat deleted');
        dialog.setProps({ isVisible: false });
        dialog.dispatchWillUnmount();
      },
    });

    super({
      icon: 'bucket',
      label: 'Delete Chat',
      style: 'adverse',
      onClick: () => {
        dialog.setProps({ isVisible: true });
        dialog.dispatchDidMount();
      },
    });
  }
}
