import '../styles/index.css';
import '../styles/pages/main.css';
import '../partials/components/chat-list/chat-list.css';
import '../partials/components/settings/settings.css';
import '../partials/components/overlay/overlay.css';

import {
  openOverlay,
  closeOverlay,
} from '../partials/components/overlay/overlay';

const menusOverlayEl = document.querySelector('.menus-overlay');

const settings = document.querySelector('.side_type_settings');
const openSettingsBtn = document.querySelector('.chat-list__button_type_menu');
const closeSettingsBtn = document.querySelector(
  '.settings__button_type_backward'
);

function toggleSettings() {
  settings?.classList.toggle('side_hidden');
}

openSettingsBtn?.addEventListener('click', toggleSettings);
closeSettingsBtn?.addEventListener('click', toggleSettings);

menusOverlayEl?.addEventListener('click', closeOverlay);
