import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { PecasApi } from '../pecas.api';
import { PecasActions } from './pecas.actions';

@Injectable()
export class PecasEffects {
  private readonly actions$ = inject(Actions);
  private readonly api = inject(PecasApi);
  private readonly snack = inject(MatSnackBar, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);

  private notify(msg: string) {
    if (isPlatformBrowser(this.platformId) && this.snack) {
      this.snack.open(msg, 'OK', { duration: 2000 });
    }
  }

  loadPaged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PecasActions.loadPaged),
      switchMap(({ page, pageSize }) =>
        this.api.getPaged(page, pageSize).pipe(
          map((result) => PecasActions.loadPagedSuccess({ 
            items: result.items, 
            total: result.total, 
            page: result.page, 
            pageSize: result.pageSize 
          })),
          catchError((error) => of(PecasActions.loadPagedFailure({ error })))
        )
      )
    )
  );

  create$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PecasActions.create),
      mergeMap(({ dto }) =>
        this.api.create(dto).pipe(
          map(({ id }) => PecasActions.createSuccess({ id })),
          catchError((error) => of(PecasActions.createFailure({ error })))
        )
      )
    )
  );

  createSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PecasActions.createSuccess),
        tap(() => this.notify('Peça criada!'))
      ),
    { dispatch: false }
  );

  updatePreco$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PecasActions.updatePreco),
      mergeMap(({ id, novoPreco }) =>
        this.api.updatePreco(id, novoPreco).pipe(
          map(() => PecasActions.updatePrecoSuccess()),
          catchError((error) => of(PecasActions.updatePrecoFailure({ error })))
        )
      )
    )
  );

  updatePrecoToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PecasActions.updatePrecoSuccess),
        tap(() => this.notify('Preço atualizado!'))
      ),
    { dispatch: false }
  );

  movimentarEstoque$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PecasActions.movimentarEstoque),
      mergeMap(({ id, dto }) =>
        this.api.movimentarEstoque(id, dto).pipe(
          map(() => PecasActions.movimentarEstoqueSuccess()),
          catchError((error) => of(PecasActions.movimentarEstoqueFailure({ error })))
        )
      )
    )
  );

  movimentarEstoqueToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PecasActions.movimentarEstoqueSuccess),
        tap(() => this.notify('Estoque movimentado!'))
      ),
    { dispatch: false }
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PecasActions.delete),
      mergeMap(({ id }) =>
        this.api.delete(id).pipe(
          map(() => PecasActions.deleteSuccess()),
          catchError((error) => of(PecasActions.deleteFailure({ error })))
        )
      )
    )
  );

  deleteToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PecasActions.deleteSuccess),
        tap(() => this.notify('Peça excluída!'))
      ),
    { dispatch: false }
  );
}
