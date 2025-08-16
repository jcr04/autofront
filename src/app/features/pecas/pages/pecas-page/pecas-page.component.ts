import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AsyncPipe, CommonModule } from '@angular/common';

import { PecaFormDialogComponent } from '../../ui/peca-form-dialog/peca-form-dialog.component';
import { PrecoDialogComponent } from '../../ui/preco-dialog/preco-dialog.component';
import { EstoqueDialogComponent } from '../../ui/estoque-dialog/estoque-dialog.component';
import { DeleteDialogComponent } from '../../ui/delete-dialog/delete-dialog.component';
import { PecasFacade } from '../../data-access/+state/pecas.facade';
import { PecaListComponent } from '../../ui/peca-list/peca-list.component';

@Component({
  standalone: true,
  selector: 'app-pecas-page',
  templateUrl: './pecas-page.component.html',
  styleUrls: ['./pecas-page.component.scss'],
  imports: [CommonModule, AsyncPipe, PecaListComponent],
})
export class PecasPageComponent implements OnInit {
  private readonly facade = inject(PecasFacade);
  private readonly dialog = inject(MatDialog);

  readonly pecas$ = this.facade.pecas$;
  readonly total$ = this.facade.total$;
  readonly loading$ = this.facade.loading$;
  readonly page$ = this.facade.page$;
  readonly pageSize$ = this.facade.pageSize$;

  ngOnInit(): void {
    this.facade.load(1, 20);
  }

  paginate(pageIndex: number, pageSize: number) {
    this.facade.load(pageIndex + 1, pageSize);
  }
  openCreate()  { this.dialog.open(PecaFormDialogComponent); }
  openPreco(id: number)   { this.dialog.open(PrecoDialogComponent,   { data: { id } }); }
  openEstoque(id: number) { this.dialog.open(EstoqueDialogComponent, { data: { id } }); }
  openDelete(id: number)  { this.dialog.open(DeleteDialogComponent,  { data: { id } }); }
}
