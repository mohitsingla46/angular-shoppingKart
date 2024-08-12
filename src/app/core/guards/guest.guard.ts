import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isLoggedIn } from '../utils/helpers';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (isLoggedIn()) {
    router.navigate(['home']);
  }
  return true;
};
