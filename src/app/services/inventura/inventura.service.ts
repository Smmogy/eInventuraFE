import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventura } from '../../models/inventura';

@Injectable({
  providedIn: 'root',
})
export class InventuraService {
  private apiUrl = 'http://localhost:8080/api/inventura';

  constructor(private http: HttpClient) {}

  createInventura(inventura: Inventura): Observable<Inventura> {
    return this.http.post<Inventura>(this.apiUrl, inventura);
  }

  getAllInventura(): Observable<Inventura[]> {
    return this.http.get<Inventura[]>(this.apiUrl);
  }

  getInventuraById(id: number): Observable<Inventura> {
    return this.http.get<Inventura>(`${this.apiUrl}/${id}`);
  }
}
