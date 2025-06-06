import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Inventura,
  InventuraDetail,
  InventuraDetailProstorija,
  InventuraList,
} from '../../models/inventura';
import { CreateInventuraDTO } from '../../models/create-inventura-dto';
import { Artikl, ArtiklPrisutan } from '../../models/artikl';
import { appConfig } from '../appconfig';

@Injectable({
  providedIn: 'root',
})
export class InventuraService {
  private apiUrl = appConfig.apiURL + 'inventura';

  constructor(private http: HttpClient) {}

  saveInventura(inventura: CreateInventuraDTO): Observable<Inventura> {
    return this.http.post<Inventura>(`${this.apiUrl}`, inventura);
  }

  getAllInventura(): Observable<InventuraList[]> {
    return this.http.get<InventuraList[]>(this.apiUrl);
  }

  getAllInventuraByStanje(): Observable<InventuraList[]> {
    return this.http.get<InventuraList[]>(`${this.apiUrl}/stanje`);
  }

  getInventuraById(id: number): Observable<Inventura> {
    return this.http.get<Inventura>(`${this.apiUrl}/${id}`);
  }
  getInventuraDetailById(id: number): Observable<InventuraDetail> {
    return this.http.get<InventuraDetail>(`${this.apiUrl}/detail/${id}`);
  }
  getInventuraDetailProstorijaById(
    inventuraId: number,
    prostorijaId: number
  ): Observable<InventuraDetailProstorija> {
    return this.http.get<InventuraDetailProstorija>(
      `${this.apiUrl}/detail/${inventuraId}/prostorija/${prostorijaId}`
    );
  }

  getGeneratedPdf(idInventura: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/pdf/${idInventura}`, {
      responseType: 'blob',
    });
  }

  getInventurasByUserId(userId: number): Observable<InventuraList[]> {
    return this.http.get<InventuraList[]>(`${this.apiUrl}/user/${userId}`);
  }

  getInventurasByUserIdByStanje(userId: number): Observable<InventuraList[]> {
    return this.http.get<InventuraList[]>(
      `${this.apiUrl}/stanje/user/${userId}`
    );
  }
  updateArticlePresence(artikl: ArtiklPrisutan): Observable<Artikl> {
    return this.http.post<Artikl>(
      `${this.apiUrl}/update-article-presence`,
      artikl
    );
  }
  deleteInventura(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  zavrsiInventuru(idInventura: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/zavrsi/${idInventura}`, {});
  }
}
