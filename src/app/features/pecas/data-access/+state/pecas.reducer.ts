import { createReducer, on } from '@ngrx/store';
import { PecasActions } from './pecas.actions';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Peca } from '../../../../shared/models/peca.model';

export interface PecasState extends EntityState<Peca> {
  loading: boolean;
  total: number;
  page: number;
  pageSize: number;
}

export const adapter = createEntityAdapter<Peca>({ selectId: p => p.id });

export const initialState: PecasState = adapter.getInitialState({
  loading: false,
  total: 0,
  page: 1,
  pageSize: 20
});

export const pecasReducer = createReducer(
  initialState,
  on(PecasActions.loadPaged, (state, { page, pageSize }) => ({ ...state, loading: true, page, pageSize })),
  on(PecasActions.loadPagedSuccess, (state, { items, total, page, pageSize }) => {
    return adapter.setAll(items, { ...state, loading: false, total, page, pageSize });
  }),
  on(
    PecasActions.loadPagedFailure,
    PecasActions.createFailure,
    PecasActions.updatePrecoFailure,
    PecasActions.movimentarEstoqueFailure,
    PecasActions.deleteFailure,
    (state) => ({ ...state, loading: false })
  )
);
