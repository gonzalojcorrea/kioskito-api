import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private apiUrl = 'http://localhost:3000/config';

  constructor(private http: HttpClient) {}

  getConfig(): Observable<{ companyName: string; address: string }> {
    return this.http.get<{ companyName: string; address: string }>(this.apiUrl);
  }
}
