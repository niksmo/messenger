import { Dropdown } from '../dropdown/dropdown';

new Dropdown('add-chat');

const settings = document.querySelector('.sidebar__settings');
const openSettingsBtn = document.getElementById('open-settings');
const closeSettingsBtn = document.getElementById('close-settings');

const CN_SETTINGS_VISIBLE = 'sidebar__settings_visible';

function toggleSettings() {
  settings?.classList.toggle(CN_SETTINGS_VISIBLE);
}

openSettingsBtn?.addEventListener('click', toggleSettings);
closeSettingsBtn?.addEventListener('click', toggleSettings);
