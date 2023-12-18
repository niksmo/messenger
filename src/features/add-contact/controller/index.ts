import { IconButton } from 'shared/ui/button';
import { DropdownMenu, MenuItem } from 'shared/ui/dropdown';
import { Overlay } from 'shared/ui/overlay';

const addContactButton = new MenuItem({
  label: 'New Contact',
  icon: 'new-contact',
  style: 'primary',
});

const overlay = new Overlay();

const dropdownMenu = new DropdownMenu({
  menuList: [addContactButton],
  overlay: overlay,
  posX: 'left',
  posY: 'bottom',
});

const addContactMenu = new IconButton({
  icon: 'add-chat',
  style: 'accent',
  type: 'button',
  role: 'menu',
  ariaLabel: 'More actions',
  children: dropdownMenu,
});

addContactMenu.setProps({
  onClick() {
    dropdownMenu.toggle.call(dropdownMenu);
    overlay.toggle();
  },
});

export { addContactMenu };
