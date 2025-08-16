import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PecasPageComponent } from './pages/pecas-page/pecas-page.component';

const routes: Routes = [
  { path: '', component: PecasPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PecasRoutingModule {}
