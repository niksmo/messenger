import { AppRouter } from 'shared/components/router';
import { ROUT_PATH } from 'shared/constants';

export function goToMain(): void {
  const router = AppRouter.instance();
  router.go(ROUT_PATH.MAIN, true);
}

export function goToLogin(): void {
  const router = AppRouter.instance();
  router.go(ROUT_PATH.SIGNIN, true);
}
