
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  message?: string;
  user: AuthUser;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl =
    'http://localhost:3000/api/auth';

  login(
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/login`,
      { email, password },
      { withCredentials: true }
    );
  }

  register(
    name: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/register`,
      { name, email, password },
      { withCredentials: true }
    );
  }

  getCurrentUser(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(
      `${this.baseUrl}/me`,
      { withCredentials: true }
    );
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/logout`,
      {},
      { withCredentials: true }
    );
  }
}
