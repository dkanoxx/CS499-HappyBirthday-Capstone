import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
export interface Birthday {
  _id?: string;
  name: string;
  month: number;
  day: number;
  relationship: string;
  reminderEnabled: boolean;
  notes: string;
  daysUntil?: number;
  nextBirthday?: string;
}
@Injectable({ providedIn: 'root' })
export class BirthdayService {
  private http = inject(HttpClient);
  private url = `${environment.apiBaseUrl}/birthdays`;
  list() { return this.http.get<Birthday[]>(this.url, { withCredentials: true }); }
  create(data: Birthday) { return this.http.post<Birthday>(this.url, data, { withCredentials: true }); }
  update(id: string, data: Birthday) { return this.http.put<Birthday>(`${this.url}/id/${encodeURIComponent(id)}`, data, { withCredentials: true }); }
  remove(id: string) { return this.http.delete<void>(`${this.url}/id/${encodeURIComponent(id)}`, { withCredentials: true }); }
}
