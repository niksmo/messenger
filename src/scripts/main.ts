import '../styles/index.css';
import '../styles/pages/main.css';
import '../partials/components/chat-list/chat-list.css';
import '../partials/components/settings/settings.css';
import '../partials/components/overlay/overlay.css';

import {
  openOverlay,
  closeOverlay,
} from '../partials/components/overlay/overlay';

const CN_MENUS_OVERLAY = 'menus-overlay';
const CN_DROPDOWN = 'dropdown';
const VISIBLE = 'visible';

const menusOverlayEl = document.querySelector('.menus-overlay');

const settings = document.querySelector('.side_type_settings');
const openSettingsBtn = document.querySelector('.open-settings');
const closeSettingsBtn = document.querySelector('.close-settings');
const addChatBtn = document.querySelector('.add-chat');
const menus = document.querySelectorAll('.dropdown');

function toggleSettings() {
  settings?.classList.toggle('side_hidden');
}

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

openSettingsBtn?.addEventListener('click', toggleSettings);
closeSettingsBtn?.addEventListener('click', toggleSettings);

addChatBtn?.addEventListener('click', showMenu);

menusOverlayEl?.addEventListener('click', closeMenus);
