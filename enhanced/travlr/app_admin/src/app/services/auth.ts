import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Account { id: string; name: string; email: string; }
interface AuthResponse { message?: string; user: Account; }
@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  user: Account | null = null;
  private base = `${environment.apiBaseUrl}/auth`;
  register(name: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.base}/register`, { name, email, password }, { withCredentials: true });
  }
  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.base}/login`, { email, password }, { withCredentials: true })
      .pipe(tap(result => this.user = result.user));
  }
  me() {
    return this.http.get<AuthResponse>(`${this.base}/me`, { withCredentials: true })
      .pipe(tap(result => this.user = result.user));
  }
  logout() {
    return this.http.post(`${this.base}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.user = null));
  }
}
