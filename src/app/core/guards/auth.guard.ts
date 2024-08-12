import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isLoggedIn } from '../utils/helpers';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (!isLoggedIn()) {
    router.navigate(['auth']);
  }
  return true;
};
