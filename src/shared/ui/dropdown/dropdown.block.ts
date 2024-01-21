import { Block } from 'shared/components/block/block';
import {
  IconButton,
  type TIcon,
  type TStyle,
} from '../icon-button/icon-button.block';
import { Overlay } from './_overlay/dropdown-overlay.block';
import { Menu } from './_menu-container/dropdown-menu.block';
import type { MenuItem } from './menu-item.block';
import templateSpec from './dropdown.template.hbs';

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
