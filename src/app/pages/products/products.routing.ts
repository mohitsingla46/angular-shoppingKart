import { Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
      },
      {
        path: 'index',
        canActivate: [authGuard],
        loadComponent : () => import('./index/index.component').then(m => m.IndexComponent),
      },
      {
        path: 'create',
        canActivate: [authGuard],
        loadComponent : () => import('./create/create.component').then(m => m.CreateComponent),
      },
      {
        path: ':id/edit',
        canActivate: [authGuard],
        loadComponent : () => import('./edit/edit.component').then(m => m.EditComponent),
      }
    ]
  }
];
