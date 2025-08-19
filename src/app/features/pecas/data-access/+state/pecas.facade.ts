import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PecasActions } from './pecas.actions';
import {
  selectAllPecas,
  selectLoading,
  selectPage,
  selectPageSize,
  selectTotal,
} from './pecas.selectors';
import {
  CreatePecaRequest,
  MovEstoqueDto,
} from '../../../../shared/models/peca.model';

@Injectable({ providedIn: 'root' })
export class PecasFacade {
  private readonly store = inject(Store);

  readonly pecas$ = this.store.select(selectAllPecas);
  readonly loading$ = this.store.select(selectLoading);
  readonly total$ = this.store.select(selectTotal);
  readonly page$ = this.store.select(selectPage);
  readonly pageSize$ = this.store.select(selectPageSize);

  load(page = 1, pageSize = 20) {
    this.store.dispatch(PecasActions.loadPaged({ page, pageSize }));
  }
  create(dto: CreatePecaRequest) {
    this.store.dispatch(PecasActions.create({ dto }));
  }
  updatePreco(id: number, novoPreco: number) {
    this.store.dispatch(PecasActions.updatePreco({ id, novoPreco }));
  }
  movimentarEstoque(id: number, dto: MovEstoqueDto) {
    this.store.dispatch(PecasActions.movimentarEstoque({ id, dto }));
  }
  delete(id: number) {
    this.store.dispatch(PecasActions.delete({ id }));
  }
}
