import { AppRouter } from 'shared/components/router';
import { Store } from 'shared/components/store/store';
import { ROUTE_PATH } from 'shared/constants';

export function goToMain(replace: boolean = true): void {
  const router = AppRouter.instance();
  router.go(ROUTE_PATH.MAIN, replace);
}

export function goToLogin(replace: boolean = true): void {
  const router = AppRouter.instance();
  router.go(ROUTE_PATH.SIGNIN, replace);
}

export function goToLoginWithUnauth(): void {
  const store = Store.instance();
  store.set('viewer.auth', false);
  goToLogin(false);
}
