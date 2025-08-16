import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { CreatePecaRequest, MovEstoqueDto, Peca } from '../../../../shared/models/peca.model';

export const PecasActions = createActionGroup({
  source: 'Pecas',
  events: {
    'Load Paged': props<{ page: number; pageSize: number }>(),
    'Load Paged Success': props<{ items: Peca[]; total: number; page: number; pageSize: number }>(),
    'Load Paged Failure': props<{ error: any }>(),

    'Create': props<{ dto: CreatePecaRequest }>(),
    'Create Success': props<{ id: number }>(),
    'Create Failure': props<{ error: any }>(),

    'Update Preco': props<{ id: number; novoPreco: number }>(),
    'Update Preco Success': emptyProps(),
    'Update Preco Failure': props<{ error: any }>(),

    'Movimentar Estoque': props<{ id: number; dto: MovEstoqueDto }>(),
    'Movimentar Estoque Success': emptyProps(),
    'Movimentar Estoque Failure': props<{ error: any }>(),

    'Delete': props<{ id: number }>(),
    'Delete Success': emptyProps(),
    'Delete Failure': props<{ error: any }>(),
  }
});
