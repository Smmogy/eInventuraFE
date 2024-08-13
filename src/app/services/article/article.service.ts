import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artikl, ArtiklPrisutan } from '../../models/artikl';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl =
    'http://ec2-13-60-82-45.eu-north-1.compute.amazonaws.com:8080/api/rooms/artikl';

  constructor(private http: HttpClient) {}

  createArticle(article: Artikl): Observable<Artikl> {
    return this.http.post<Artikl>(`${this.apiUrl}`, article);
  }

  updateArticle(article: Artikl): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${article.idArtikl}`, article);
  }

  deleteArtikl(artiklId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${artiklId}`);
  }
  getAllArticles(): Observable<Artikl[]> {
    return this.http.get<Artikl[]>(this.apiUrl);
  }

  getArticleById(id: number): Observable<Artikl> {
    return this.http.get<Artikl>(`${this.apiUrl}/${id}`);
  }

  getArticlesByRoomId(roomId: number): Observable<Artikl[]> {
    return this.http.get<Artikl[]>(`${this.apiUrl}/get/${roomId}`);
  }
}
