import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Djelatnici } from '../../models/djelatnici';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DjelatniciService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getDjelatnici(): Observable<Djelatnici[]> {
    return this.http.get<Djelatnici[]>(this.apiUrl).pipe(
      map((data: Djelatnici[]) => {
        return data.map((djelatnik) => {
          return {
            ...djelatnik,
            name: `${djelatnik.firstname} ${djelatnik.lastname}`,
          };
        });
      })
    );
  }

  createDjelatnik(djelatnik: Djelatnici): Observable<Djelatnici> {
    return this.http.post<Djelatnici>(this.apiUrl, djelatnik);
  }

  deleteDjelatnik(djelatnikId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${djelatnikId}`);
  }

  getUserIdByEmail(email: string | null): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/findByEmail/${email}`);
  }
}
