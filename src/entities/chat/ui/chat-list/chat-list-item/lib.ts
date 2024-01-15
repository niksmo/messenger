export function normalizeTime(time: string): string {
  const date = new Date(time);

  return isNaN(date.valueOf()) ? '' : `${date.getHours()}:${date.getMinutes()}`;
}
