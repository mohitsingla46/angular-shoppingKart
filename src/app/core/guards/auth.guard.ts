import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isLoggedIn } from '../utils/helpers';
import { AppService } from '../services/app.services';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const appService = inject(AppService);

  const token = localStorage.getItem('token');
  if (!token) {
    router.navigate(['/']);
    return of(false);
  }

  return appService.profile().pipe(
    map((res: any) => {
      if (res.status === 200) {
        return true;
      }
      return false;
    }),
    catchError((error) => {
      router.navigate(['/']);
      return of(false);
    })
  );
};
