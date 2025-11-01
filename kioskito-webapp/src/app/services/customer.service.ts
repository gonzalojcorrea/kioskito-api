import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../models/customer.model';
import { ApiResponse } from '../models/api-response.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CustomerService {
 private apiUrl = `${environment.apiUrl}/customers`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.http.get<ApiResponse<Customer[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  getById(id: string): Observable<Customer> {
    return this.http.get<ApiResponse<Customer>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  create(customer: Omit<Customer, 'id'>): Observable<string> {
    return this.http.post<ApiResponse<string>>(this.apiUrl, customer).pipe(
      map(response => response.data)
    );
  }

  update(id: string, customer: Customer): Observable<void> {
    return this.http.put<ApiResponse<void>>(`${this.apiUrl}/${id}`, customer).pipe(
      map(response => response.data)
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }
}
