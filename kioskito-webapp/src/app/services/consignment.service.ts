import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Consignment, ConsignmentDetail, CreateConsignmentCommand } from '../models/consignment.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsignmentService {
  private apiUrl = `${environment.apiUrl}/consignments`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Consignment[]> {
    return this.http.get<ApiResponse<Consignment[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getById(id: string): Observable<ConsignmentDetail> {
    return this.http.get<ApiResponse<ConsignmentDetail>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  create(consignment: CreateConsignmentCommand): Observable<string> {
    return this.http.post<ApiResponse<string>>(this.apiUrl, consignment).pipe(
      map(response => response.data)
    );
  }

  update(id: string, consignment: CreateConsignmentCommand): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.apiUrl}/${id}`, consignment).pipe(
      map(response => response.data)
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
