export function normalizeTime(time?: string): string {
  if (!time) {
    return '';
  }

  const date = new Date(time);
  return isNaN(date.valueOf()) ? '' : `${date.getHours()}:${date.getMinutes()}`;
}
