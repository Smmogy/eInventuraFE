import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artikl } from '../../models/artikl';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/rooms/articles';

  constructor(private http: HttpClient) {}

  createArticle(article: Artikl): Observable<Artikl> {
    return this.http.post<Artikl>(this.apiUrl, article);
  }

  getAllArticles(): Observable<Artikl[]> {
    return this.http.get<Artikl[]>(this.apiUrl);
  }

  getArticleById(id: number): Observable<Artikl> {
    return this.http.get<Artikl>(`${this.apiUrl}/${id}`);
  }

  getArticlesByRoomId(roomId: number): Observable<Artikl[]> {
    return this.http.get<Artikl[]>(`${this.apiUrl}/by-room/${roomId}`);
  }
}
