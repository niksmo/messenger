const C_VISIBLE = 'overlay_visible';

function openOverlay(evt: Event) {
  if (evt.currentTarget && evt.currentTarget instanceof HTMLDivElement) {
    evt.currentTarget.classList.add(C_VISIBLE);
  }
}

function closeOverlay(evt: Event) {
  if (evt.currentTarget && evt.currentTarget instanceof HTMLDivElement) {
    evt.currentTarget.classList.remove(C_VISIBLE);
  }
}

export { openOverlay, closeOverlay };
