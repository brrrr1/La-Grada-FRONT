import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/login`, { username, password }).pipe(
      tap((res: any) => {
        this.setTokens(res.token, res.refreshToken);
      })
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/register`, data);
  }

  refreshToken(refreshToken: string): Observable<any> {
    return this.http.post(`${BASE_URL}/auth/refresh/token`, { refreshToken }).pipe(
      tap((res: any) => {
        this.setTokens(res.token, res.refreshToken);
      })
    );
  }

  logout(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${BASE_URL}/auth/logout`, {}, { headers }).pipe(
      tap(() => this.clearTokens())
    );
  }

  setTokens(token: string, refreshToken: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  clearTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  activateAccount(token: string): Observable<any> {
    return this.http.post(`${BASE_URL}/activate/account`, { token });
  }
}
