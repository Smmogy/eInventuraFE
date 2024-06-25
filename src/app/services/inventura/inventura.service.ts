import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventura } from '../../models/inventura';

@Injectable({
  providedIn: 'root',
})
export class InventuraService {
  constructor(private http: HttpClient) {}

  public createInventura(inventuraInfo: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/v1/inventura/saveInventura',
      inventuraInfo
    );
  }

  public getAllInventura(): Observable<Inventura[]> {
    return this.http.get<Inventura[]>(
      'http://localhost:8080/api/inventura/findAll'
    );
  }
}
