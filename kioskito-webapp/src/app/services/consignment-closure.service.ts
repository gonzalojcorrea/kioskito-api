import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import {
  CustomerWithActiveConsignments,
  ConsignmentClosureDetail,
  CloseConsignmentCommand,
  CloseConsignmentResponse
} from '../models/consignment-closure.model';

/**
 * Servicio para gestionar el cierre de consignaciones
 */
@Injectable({ providedIn: 'root' })
export class ConsignmentClosureService {
  private apiUrl = `${environment.apiUrl}/consignments`;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los clientes que tienen consignaciones activas (estado OPEN)
   */
  getCustomersWithActiveConsignments(): Observable<CustomerWithActiveConsignments[]> {
    return this.http
      .get<ApiResponse<CustomerWithActiveConsignments[]>>(`${this.apiUrl}/closure/customers`)
      .pipe(map(response => response.data));
  }

  /**
   * Obtiene el detalle completo de una consignación específica para realizar el cierre
   * @param consignmentId GUID de la consignación
   */
  getConsignmentClosureDetail(consignmentId: string): Observable<ConsignmentClosureDetail> {
    return this.http
      .get<ApiResponse<ConsignmentClosureDetail>>(`${this.apiUrl}/${consignmentId}/closure`)
      .pipe(map(response => response.data));
  }

  /**
   * Procesa el cierre de una consignación con los datos actualizados
   * @param command Comando con los datos del cierre
   */
  closeConsignment(command: CloseConsignmentCommand): Observable<CloseConsignmentResponse> {
    return this.http
      .post<ApiResponse<CloseConsignmentResponse>>(`${this.apiUrl}/closure`, command)
      .pipe(map(response => response.data));
  }
}
