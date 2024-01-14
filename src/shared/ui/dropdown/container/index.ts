import { Block } from 'shared/components/block';
import { Overlay } from 'shared/ui/overlay';
import { IconButton, type TIcon, type TStyle } from 'shared/ui/button';
import { DropdownMenu, type MenuItem } from '..';
import templateSpec from './container.template.hbs';

interface IProps {
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

export class DropdownMenuNew extends Block {
  constructor(props: IProps) {
    const { trigger, menuPos, menuList } = props;

    const overlay = new Overlay();

    const menu = new DropdownMenu({
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

  protected _getTemplateSpec(): TemplateSpecification {
    return templateSpec;
  }
}
