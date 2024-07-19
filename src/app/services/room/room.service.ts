import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prostorija } from '../../models/prostorija';
import { Artikl } from '../../models/artikl';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private apiUrl = 'http://localhost:8080/api/rooms';

  constructor(private http: HttpClient) {}

  createRoom(idProstorija: Prostorija): Observable<Prostorija> {
    return this.http.post<Prostorija>(this.apiUrl, idProstorija);
  }

  deleteRoom(idProstorija: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idProstorija}`);
  }

  createArtikl(artikl: Artikl): Observable<Artikl> {
    return this.http.post<Artikl>(`${this.apiUrl}/artikl`, artikl);
  }

  deleteArtikl(roomId: number, artiklId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${roomId}/artikl/${artiklId}`
    );
  }

  getRoomsByInstitutionId(idInstitution: number): Observable<Prostorija[]> {
    return this.http.get<Prostorija[]>(
      `${this.apiUrl}/institution/${idInstitution}`
    );
  }

  getProstorijaById(idProstorija: number): Observable<Prostorija> {
    return this.http.get<Prostorija>(`${this.apiUrl}/${idProstorija}`);
  }
  updateProstorija(prostorija: Prostorija): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/${prostorija.idProstorija}`,
      prostorija
    );
  }
}
