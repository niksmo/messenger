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
      this.triggerEl.addEventListener('click', this._toggleMenu.bind(this));
    }

    if (this.overlayEl) {
      this.overlayEl.addEventListener('click', this._toggleMenu.bind(this));
    }
  }

  _toggleMenu(evt: Event) {
    this.menuEl?.classList.toggle('menu_visible');
    this.overlayEl?.classList.toggle('overlay_visible');

    if (evt.target === this.overlayEl) {
      evt.stopPropagation();
    }
  }
}
