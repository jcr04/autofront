export interface Peca {
  id: number;
  nome: string;
  codigo: string;
  quantidade: number;
  preco: number;
  categoriaNome?: string | null;
  fabricanteNome?: string | null;
  categoriaId?: number;   
  fabricanteId?: number;
}

export interface CreatePecaRequest {
  nome: string;
  codigo: string;
  quantidade: number;
  preco: number;
  categoriaId: number;
  fabricanteId: number;
}

export interface MovEstoqueDto {
  quantidade: number;
  tipo: 'Entrada' | 'Saida';
}
