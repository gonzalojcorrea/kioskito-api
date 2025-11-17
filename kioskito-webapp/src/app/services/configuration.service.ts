import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/api-response.model';

export interface ConfigData {
  companyName: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private apiUrl = `${environment.apiUrl}/config`;

  constructor(private http: HttpClient) {}

  getConfig(): Observable<ApiResponse<ConfigData>> {
    return this.http.get<ApiResponse<ConfigData>>(this.apiUrl);
  }
}
