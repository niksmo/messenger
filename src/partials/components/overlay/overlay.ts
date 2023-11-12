const CN_VISIBLE = 'overlay_visible';

function openOverlay(className: string) {
  const overlayEl = document.querySelector('.' + className);
  if (overlayEl && overlayEl instanceof HTMLDivElement) {
    overlayEl.classList.add(CN_VISIBLE);
  }
}

function closeOverlay(evt: Event) {
  if (evt.currentTarget && evt.currentTarget instanceof HTMLDivElement) {
    evt.currentTarget.classList.remove(CN_VISIBLE);
  }
}

export { openOverlay, closeOverlay };
