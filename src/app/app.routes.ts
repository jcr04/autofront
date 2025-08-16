import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'pecas', pathMatch: 'full' },
  {
    path: 'pecas',
    loadChildren: () =>
      import('./features/pecas/pecas.module').then(m => m.PecasModule),
  },
  { path: '**', redirectTo: 'pecas' },
];
