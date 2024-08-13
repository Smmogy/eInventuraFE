import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

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

  getUserData(): JwtPayload | null {
    if (this.getToken()) return jwtDecode(this.getToken() as string);
    else return null;
  }
  getEmailFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      return decodedToken.sub || null;
    }
    return null;
  }

  hasAdminRole(): boolean {
    const userData = this.getUserData();
    if (userData) {
      const isAdmin =
        userData.roles?.some((role) => role.authority === 'ADMIN') ?? false;
      return isAdmin;
    }
    return false;
  }

  public login(loginInfo: any): Observable<any> {
    return this.http.post(
      'http://ec2-13-60-82-45.eu-north-1.compute.amazonaws.com:8080/api/v1/auth/authenticate',
      loginInfo
    );
  }

  public register(registerInfo: any): Observable<any> {
    return this.http.post(
      'http://ec2-13-60-82-45.eu-north-1.compute.amazonaws.com:8080/api/v1/auth/register',
      registerInfo
    );
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
