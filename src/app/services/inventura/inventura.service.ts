import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Inventura,
  InventuraDetail,
  InventuraList,
} from '../../models/inventura';
import { CreateInventuraDTO } from '../../models/create-inventura-dto';

@Injectable({
  providedIn: 'root',
})
export class InventuraService {
  private apiUrl = 'http://localhost:8080/api/inventura';

  constructor(private http: HttpClient) {}

  createInventura(inventura: CreateInventuraDTO): Observable<Inventura> {
    return this.http.post<Inventura>(`${this.apiUrl}`, inventura);
  }

  getAllInventura(): Observable<Inventura[]> {
    return this.http.get<Inventura[]>(this.apiUrl);
  }

  getInventuraById(id: number): Observable<Inventura> {
    return this.http.get<Inventura>(`${this.apiUrl}/${id}`);
  }
  getInventuraDetailById(id: number): Observable<InventuraDetail> {
    return this.http.get<InventuraDetail>(`${this.apiUrl}/detail/${id}`);
  }

  getInventurasByUserId(userId: number): Observable<InventuraList[]> {
    return this.http.get<InventuraList[]>(`${this.apiUrl}/user/${userId}`);
  }
}
