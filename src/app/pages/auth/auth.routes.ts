import { Routes } from '@angular/router';
import { guestGuard } from 'src/app/core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent : () => import('./login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'signup',
        canActivate: [guestGuard],
        loadComponent : () => import('./signup/signup.component').then(m => m.SignupComponent),
      }
    ]
  }
];
