import { Block } from 'shared/components/block';
import { IconButton, type TIcon, type TStyle } from 'shared/ui/button';
import { Overlay } from '../overlay';
import { Menu } from '../menu';
import type { MenuItem } from '../item';
import templateSpec from './container.template.hbs';

interface DropdownMenuProps {
  trigger: {
    icon: TIcon;
    style: TStyle;
  };
  menuPos: {
    posX: 'left' | 'right';
    posY: 'bottom' | 'top';
  };
  menuList: MenuItem[];
}

export class DropdownMenu extends Block {
  constructor(props: DropdownMenuProps) {
    const { trigger, menuPos, menuList } = props;

    const overlay = new Overlay();

    const menu = new Menu({
      ...menuPos,
      menuList,
      overlay,
    });

    const menuTrigger = new IconButton({
      ...trigger,
      type: 'button',
      role: 'menu',
      ariaLabel: 'More actions',
      children: menu,
    });

    menuTrigger.setProps({
      onClick() {
        menu.toggle();
        overlay.toggle();
      },
    });

    super({ menuTrigger });
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }
}
