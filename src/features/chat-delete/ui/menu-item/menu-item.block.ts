import { deleteChatController } from 'features/chat-delete/controller/chat-delete.controller';
import { Dialog } from 'shared/ui/dialog/dialog.block';
import { MenuItem } from 'shared/ui/dropdown/menu-item.block';

export class DeleteChatMenuItem extends MenuItem {
  constructor() {
    const dialog = new Dialog({
      isVisible: false,
      text: 'The chat will be deleted with all correspondence',
      buttonText: ['Back', 'Delete'],
      approveCb: () => {
        deleteChatController.deleteChat();
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
