import '../styles/index.css';
import '../styles/pages/main.css';
import '../partials/components/sidebar/sidebar.css';
import '../partials/components/overlay/overlay.css';

import '../partials/components/sidebar/sidebar';

import {
  openOverlay,
  closeOverlay,
} from '../partials/components/overlay/overlay';

const CN_MENUS_OVERLAY = 'menus-overlay';
const CN_DROPDOWN = 'dropdown';
const VISIBLE = 'visible';

const menusOverlayEl = document.querySelector('.menus-overlay');

const addChatBtn = document.querySelector('.add-chat');
const menus = document.querySelectorAll('.dropdown');

function showMenu(evt: Event) {
  const tg = evt.currentTarget;

  if (tg && tg instanceof HTMLButtonElement) {
    const menu = tg.querySelector('.' + CN_DROPDOWN);
    openOverlay(CN_MENUS_OVERLAY);
    menu?.classList.add(CN_DROPDOWN + '_' + VISIBLE);
  }
}

function closeMenus(evt: Event) {
  menus.forEach(menu => {
    menu.classList.remove(CN_DROPDOWN + '_' + VISIBLE);
  });
  closeOverlay(evt);
}

addChatBtn?.addEventListener('click', showMenu);

menusOverlayEl?.addEventListener('click', closeMenus);
