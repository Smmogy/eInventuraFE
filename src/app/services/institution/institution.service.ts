import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Institution } from '../../models/institution';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService {
  private apiUrl = 'http://localhost:8080/api/institution';

  constructor(private http: HttpClient) {}

  getInstitutions(): Observable<Institution[]> {
    return this.http.get<Institution[]>(this.apiUrl);
  }

  getInstitutionById(id: number): Observable<Institution> {
    return this.http.get<Institution>(`${this.apiUrl}/${id}`);
  }

  createInstitution(institution: Institution): Observable<Institution> {
    return this.http.post<Institution>(this.apiUrl, institution);
  }

  updateInstitution(institution: Institution): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${institution.idInstitution}`,
      institution
    );
  }

  deleteInstitution(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
