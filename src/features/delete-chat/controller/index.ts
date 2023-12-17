import { IconButton } from 'shared/ui/button';
import { DropdownMenu, MenuItem } from 'shared/ui/dropdown';
import { Overlay } from 'shared/ui/overlay';

const deleteChatButton = new MenuItem({
  label: 'Delete Chat',
  icon: 'bucket',
  style: 'adverse',
});

const overlay = new Overlay();

const dropdownMenu = new DropdownMenu({
  menuList: [deleteChatButton],
  overlay: overlay,
  posX: 'right',
  posY: 'bottom',
});

const deleteChatMenu = new IconButton({
  icon: 'dots',
  style: 'accent',
  type: 'button',
  role: 'menu',
  ariaLabel: 'More actions',
  children: dropdownMenu,
});

deleteChatMenu.setProps({
  onClick() {
    dropdownMenu.toggle.call(dropdownMenu);
    overlay.toggle();
  },
});

export { deleteChatMenu };
