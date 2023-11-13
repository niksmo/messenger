const settings = document.querySelector('.sidebar__settings');
const openSettingsBtn = document.querySelector('.open-settings');
const closeSettingsBtn = document.querySelector('.close-settings');

const CN_SETTINGS_VISIBLE = 'sidebar__settings_visible';

function toggleSettings() {
  settings?.classList.toggle(CN_SETTINGS_VISIBLE);
}

openSettingsBtn?.addEventListener('click', toggleSettings);
closeSettingsBtn?.addEventListener('click', toggleSettings);
