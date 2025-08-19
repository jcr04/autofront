import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagedResult } from '../../../shared/models/paged-result.model';
import { CreatePecaRequest, MovEstoqueDto, Peca } from '../../../shared/models/peca.model';
import { environment } from '../../../../environments/environment';
import { Categoria, Fabricante } from '../../../shared/models/lookup.model';

@Injectable({ providedIn: 'root' })
export class PecasApi {
  private readonly url = `${environment.apiUrl}/api/Pecas`;

  constructor(private http: HttpClient) {}

  getPaged(page = 1, pageSize = 20): Observable<PagedResult<Peca>> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('pageSize', String(pageSize));
    return this.http.get<PagedResult<Peca>>(`${this.url}/paged`, { params });
  }

  getById(id: number) {
    return this.http.get<Peca>(`${this.url}/${id}`);
  }

  create(dto: CreatePecaRequest) {
    return this.http.post<{ id: number }>(`${this.url}`, dto);
  }

  updatePreco(id: number, novoPreco: number) {
    return this.http.patch<void>(`${this.url}/${id}/preco`, novoPreco);
  }

  movimentarEstoque(id: number, dto: MovEstoqueDto) {
    return this.http.post<void>(`${this.url}/${id}/estoque`, dto);
  }

  delete(id: number) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${environment.apiUrl}/api/Categorias`);
  }
  getFabricantes(): Observable<Fabricante[]> {
    return this.http.get<Fabricante[]>(`${environment.apiUrl}/api/Fabricantes`);
  }

  createCategoria(nome: string) {
    return this.http.post<{ id: number }>(`${environment.apiUrl}/api/Categorias`, { nome });
  }
  createFabricante(nome: string) {
    return this.http.post<{ id: number }>(`${environment.apiUrl}/api/Fabricantes`, { nome });
  }
}
