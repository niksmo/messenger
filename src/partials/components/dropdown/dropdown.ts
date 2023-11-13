export class Dropdown {
  triggerEl: HTMLButtonElement | null;
  menuEl: HTMLUListElement | null;
  overlayEl: HTMLDivElement | null;

  constructor(triggerId: string) {
    this.triggerEl = null;
    this.menuEl = null;
    this.overlayEl = null;

    const tgElement = document.getElementById(triggerId);
    if (tgElement && tgElement instanceof HTMLButtonElement) {
      this.triggerEl = tgElement;
      this.menuEl = tgElement.querySelector('.menu');
      this.overlayEl = tgElement.querySelector('.overlay');
      this._addListeners();
    }
  }

  _addListeners() {
    if (this.triggerEl) {
      this.triggerEl.addEventListener('click', this._openMenu.bind(this));
    }

    if (this.overlayEl) {
      this.overlayEl.addEventListener('click', this._closeMenu.bind(this));
    }
  }

  _toggleMenu() {
    this.menuEl?.classList.toggle('menu_visible');
  }

  _toggleOverlay() {
    this.overlayEl?.classList.toggle('overlay_visible');
  }

  _openMenu() {
    this._toggleMenu();
    this._toggleOverlay();
  }

  _closeMenu(evt: Event) {
    this._toggleMenu();
    this._toggleOverlay();

    evt.stopPropagation();
  }
}
