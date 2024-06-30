import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

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

  getRoles() {
    if (this.getUserData()) {
    }
  }

  hasAdminRole(): boolean {
    if (this.getUserData()) {
      const role: boolean = this.getUserData()?.roles?.find(
        (role) => role.authority === 'ADMIN'
      )
        ? true
        : false;
      console.log(this.getUserData()?.roles);
      console.log(role);
      return role;
    }
    return false;
  }

  public login(loginInfo: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/v1/auth/authenticate',
      loginInfo
    );
  }

  public register(registerInfo: any): Observable<any> {
    return this.http.post(
      'http://localhost:8080/api/v1/auth/register',
      registerInfo
    );
  }
}
