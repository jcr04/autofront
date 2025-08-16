import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pecas', pathMatch: 'full' },
  {
    path: 'pecas',
    loadChildren: () =>
      import('./features/pecas/pecas.module').then(m => m.PecasModule),
  },
  { path: '**', redirectTo: 'pecas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
