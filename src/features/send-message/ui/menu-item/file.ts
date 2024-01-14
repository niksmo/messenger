import { MenuItem } from 'shared/ui/dropdown';

export class AttachFileMenuItem extends MenuItem {
  constructor() {
    super({
      icon: 'file',
      label: 'File',
      style: 'primary',
      onClick: () => {
        alert('attach file modal window');
      },
    });
  }
}
