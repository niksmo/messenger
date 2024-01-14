import { AppRouter } from 'shared/components/router';
import { ROUTE_PATH } from 'shared/constants';

export function goToMain(): void {
  const router = AppRouter.instance();
  router.go(ROUTE_PATH.MAIN, true);
}

export function goToLogin(): void {
  const router = AppRouter.instance();
  router.go(ROUTE_PATH.SIGNIN, true);
}
