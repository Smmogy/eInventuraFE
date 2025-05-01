import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode'; // Correct default import
import { Observable } from 'rxjs';
import { appConfig } from '../appconfig';

interface CustomJwtPayload {
  sub?: string;
  exp?: number;
  roles?: { authority: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  private apiUrl = appConfig.apiURL + 'v1/auth';

  constructor(private http: HttpClient) {}

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getUserData(): CustomJwtPayload | null {
    const token = this.getToken();
    return token ? jwtDecode<CustomJwtPayload>(token) : null;
  }

  getEmailFromToken(): string | null {
    const userData = this.getUserData();
    return userData?.sub || null;
  }

  hasAdminRole(): boolean {
    const userData = this.getUserData();
    return userData?.roles?.some((role) => role.authority === 'ADMIN') ?? false;
  }

  public login(loginInfo: any): Observable<any> {
    return this.http.post(this.apiUrl + '/authenticate', loginInfo);
  }

  public register(registerInfo: any): Observable<any> {
    return this.http.post(this.apiUrl + '/register', registerInfo);
  }

  public logout(): void {
    this.clearToken();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
