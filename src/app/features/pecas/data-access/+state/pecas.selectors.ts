import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, PecasState } from './pecas.reducer';

export const selectPecasState = createFeatureSelector<PecasState>('pecas');
const { selectAll } = adapter.getSelectors();

export const selectAllPecas = createSelector(selectPecasState, selectAll);
export const selectLoading = createSelector(selectPecasState, s => s.loading);
export const selectTotal = createSelector(selectPecasState, s => s.total);
export const selectPage = createSelector(selectPecasState, s => s.page);
export const selectPageSize = createSelector(selectPecasState, s => s.pageSize);
