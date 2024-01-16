import { Block, type BlockProps } from 'shared/components/block';
import templateSpec from './menu.template.hbs';
import stylesModule from './styles.module.css';

const MENU_VISIBLE = 'menu_visible';

const POS = {
  left: 'menu_left',
  right: 'menu_right',
  top: 'menu_top',
  bottom: 'menu_bottom',
};

const POS_X = 'posX';
const POS_Y = 'posY';

type MenuProps = BlockProps<{
  menuList: Block[];
  overlay?: Block;
  posX: 'left' | 'right';
  posY: 'top' | 'bottom';
}>;

const styles = { ...stylesModule };

let curPosX: MenuProps['posX'];
let curPosY: MenuProps['posY'];
const visibleClass = styles[MENU_VISIBLE];

export class Menu extends Block<MenuProps> {
  constructor(props: MenuProps) {
    const { posX, posY } = props;
    curPosX = posX;
    curPosY = posY;
    super(props);
  }

  protected getTemplateHook(): TemplateSpecification {
    return templateSpec;
  }

  protected getStylesModuleHook(): CSSModuleClasses {
    const stPosX = styles[POS[curPosX]];
    const stPosY = styles[POS[curPosY]];

    if (stPosX && stPosY) {
      styles[POS_X] = stPosX;
      styles[POS_Y] = stPosY;
    }
    return styles;
  }

  protected _getListenersSelector(): string {
    return 'ul';
  }

  public toggle(): void {
    const menuEl = this.getContent().firstElementChild;
    if (menuEl instanceof HTMLElement && visibleClass) {
      menuEl.classList.toggle(visibleClass);
    }
  }

  public close(): void {
    const menuEl = this.getContent().firstElementChild;
    if (menuEl instanceof HTMLElement && visibleClass) {
      menuEl.classList.remove(visibleClass);
    }
  }
}
