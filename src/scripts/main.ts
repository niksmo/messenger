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
