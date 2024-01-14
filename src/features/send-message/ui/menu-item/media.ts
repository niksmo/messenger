import { MenuItem } from 'shared/ui/dropdown';

export class AttachMediaMenuItem extends MenuItem {
  constructor() {
    super({
      label: 'Photo Or Video',
      icon: 'media',
      style: 'primary',
      onClick: () => {
        alert('attach media file modal window');
      },
    });
  }
}
