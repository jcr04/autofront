import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { PecasRoutingModule } from './pecas-routing.module';

import { PecasPageComponent } from './pages/pecas-page/pecas-page.component';
import { PecaListComponent } from './ui/peca-list/peca-list.component';
import { PrecoDialogComponent } from './ui/preco-dialog/preco-dialog.component';
import { EstoqueDialogComponent } from './ui/estoque-dialog/estoque-dialog.component';
import { DeleteDialogComponent } from './ui/delete-dialog/delete-dialog.component';
import { PecaFormDialogComponent } from './ui/peca-form-dialog/peca-form-dialog.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    PecasRoutingModule,
    PecasPageComponent,
    PecaListComponent,
    PrecoDialogComponent,
    EstoqueDialogComponent,
    DeleteDialogComponent,
    PecaFormDialogComponent,
  ],
})
export class PecasModule {}
