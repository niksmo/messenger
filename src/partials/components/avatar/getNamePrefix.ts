export function getNamePrefix(this: Record<string, string>) {
  if (this.name && typeof this.name === 'string' && this.name.length > 0) {
    return this.name[0].toUpperCase();
  }
}
