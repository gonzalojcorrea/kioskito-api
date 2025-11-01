import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inventory } from '../models/inventory.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = `${environment.apiUrl}/inventory`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Inventory[]> {
    return this.http.get<ApiResponse<Inventory[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getById(id: string): Observable<Inventory> {
    return this.http.get<ApiResponse<Inventory>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
