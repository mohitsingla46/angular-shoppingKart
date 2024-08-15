import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isLoggedIn } from '../utils/helpers';
import { AppService } from '../services/app.services';
import { catchError, map, of } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const appService = inject(AppService);

  const token = localStorage.getItem('token');
  if (!token) {
    return of(true);
  }

  return appService.profile().pipe(
    map((res: any) => {
      if (res.status === 200) {
        router.navigate(['/home']);
        return false;
      }
      return true;
    }),
    catchError((error) => {
      return of(true);
    })
  );
};
