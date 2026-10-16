import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Birthday, BirthdayInput } from '../models/birthday';

@Injectable({ providedIn: 'root' })
export class BirthdayData {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiBaseUrl}/birthdays`;

  getAll(): Observable<Birthday[]> {
    return this.http.get<Birthday[]>(this.url);
  }
  create(input: BirthdayInput): Observable<Birthday> {
    return this.http.post<Birthday>(this.url, input);
  }
  update(id: string, input: BirthdayInput): Observable<Birthday> {
    return this.http.put<Birthday>(`${this.url}/id/${encodeURIComponent(id)}`, input);
  }
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/id/${encodeURIComponent(id)}`);
  }
}
