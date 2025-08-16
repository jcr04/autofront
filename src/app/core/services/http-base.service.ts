import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpBaseService {
  protected baseUrl = environment.apiUrl;
  constructor(protected http: HttpClient) {}
}
