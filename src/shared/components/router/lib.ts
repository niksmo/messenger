import { type IBlock } from '../interfaces';

window.addEventListener(
  'load',
  () => {
    routeTo(location.pathname);
  },
  { once: true }
);

const pathMap = new Map<string, IBlock>();

export let routeTo: (path: string) => void;

export function registerPaths(pathEntries: Array<[string, IBlock]>): void {
  pathEntries.forEach(([path, block]) => pathMap.set(path, block));
}

export function routerProvider(app: IBlock): (path: string) => void {
  function route(path: string): void {
    const page = pathMap.get(path);
    if (page) {
      app.setProps({ page });
      page.dispatchDidMount();
    }
  }
  routeTo = route;
  return route;
}
