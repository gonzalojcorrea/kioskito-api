# Prompt para Frontend - Sistema de Cierre de Consignaciones

## Contexto del Proyecto
Este proyecto es una aplicación Angular (versión reciente) con Material Design para gestión de consignaciones de un kiosco/negocio. El backend expone los siguientes endpoints REST para el proceso de cierre de consignaciones:

## Endpoints Disponibles en el Backend

### 1. GET /api/consignments/closure/customers
Obtiene todos los clientes que tienen consignaciones activas (estado OPEN).

**Respuesta (200 OK):**
```typescript
interface CustomerWithActiveConsignments {
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  activeConsignments: ActiveConsignmentSummary[];
}

interface ActiveConsignmentSummary {
  consignmentId: string;
  startDate: string; // ISO 8601
  total: number;
  totalItems: number;
  totalQuantityDelivered: number;
}
```

### 2. GET /api/consignments/{id}/closure
Obtiene el detalle completo de una consignación específica para realizar el cierre.

**Parámetros:**
- `id` (path): GUID de la consignación

**Respuesta (200 OK):**
```typescript
interface ConsignmentClosureDetail {
  consignmentId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  startDate: string;
  currentTotal: number;
  lines: ConsignmentLineClosureDto[];
  summary: ConsignmentClosureSummary;
}

interface ConsignmentLineClosureDto {
  lineId: string;
  articleId: string;
  articleName: string;
  articleCode: string; // SKU
  deliveredQty: number;
  currentSoldQty: number;
  currentReturnedQty: number;
  pendingQty: number; // deliveredQty - soldQty - returnedQty
  unitPrice: number;
  lineTotal: number;
}

interface ConsignmentClosureSummary {
  totalDelivered: number;
  totalSold: number;
  totalReturned: number;
  totalPending: number;
  totalSalesAmount: number;
}
```

### 3. POST /api/consignments/closure
Procesa el cierre de una consignación con los datos actualizados.

**Request Body:**
```typescript
interface CloseConsignmentCommand {
  consignmentId: string;
  lines: CloseConsignmentLineDto[];
  createNewConsignmentForPending: boolean;
  notes?: string;
}

interface CloseConsignmentLineDto {
  lineId: string;
  soldQty: number;
  returnedQty: number;
}
```

**Respuesta (200 OK):**
```typescript
interface CloseConsignmentResponse {
  closedConsignmentId: string;
  salesOrderId?: string;
  newConsignmentId?: string;
  totalSalesAmount: number;
  totalItemsSold: number;
  totalItemsReturned: number;
  totalItemsMovedToNewConsignment: number;
  message: string;
}
```

## Requisitos de UI/UX

### Página Principal: Lista de Clientes con Consignaciones Activas

Crear una página/componente que:

1. **Vista de Lista de Clientes:**
   - Mostrar una tabla o tarjetas con los clientes que tienen consignaciones activas
   - Mostrar información del cliente: nombre, email, teléfono
   - Mostrar cantidad de consignaciones activas por cliente
   - Mostrar total acumulado de todas las consignaciones activas del cliente
   - Incluir un botón de acción "Ver Consignaciones" por cada cliente

2. **Expansión/Detalle de Consignaciones:**
   - Al hacer clic en un cliente, mostrar un panel expandible o modal con:
     - Lista de todas las consignaciones activas del cliente
     - Para cada consignación mostrar: fecha de inicio, cantidad de artículos, total
     - Botón "Cerrar Consignación" para cada una

### Página/Modal de Cierre de Consignación

Crear un componente para el proceso de cierre que:

1. **Información de la Consignación:**
   - Mostrar datos del cliente (nombre, email)
   - Mostrar fecha de inicio de la consignación
   - Mostrar resumen general (total entregado, total actual vendido/devuelto)

2. **Tabla de Artículos para Control:**
   - Tabla editable con las siguientes columnas:
     - SKU/Código del artículo
     - Nombre del artículo
     - Cantidad Entregada (solo lectura)
     - **Cantidad Vendida (input editable)**
     - **Cantidad Devuelta (input editable)**
     - Cantidad Pendiente (calculado automáticamente: entregado - vendido - devuelto)
     - Precio Unitario (solo lectura)
     - Subtotal Vendido (calculado: vendido × precio)
   
3. **Validaciones en Tiempo Real:**
   - Asegurar que `vendido + devuelto ? entregado` para cada línea
   - Mostrar mensajes de error si la validación falla
   - Deshabilitar el botón de guardar si hay errores
   - Calcular automáticamente los totales mientras el usuario edita

4. **Panel de Resumen:**
   - Total de artículos vendidos
   - Total de artículos devueltos
   - Total de artículos pendientes
   - **Monto Total a Cobrar** (destacado visualmente)

5. **Opciones de Cierre:**
   - Checkbox: "Crear nueva consignación con los artículos pendientes"
   - Campo de texto opcional: "Notas del cierre"

6. **Acciones:**
   - Botón "Cancelar" (volver sin guardar)
   - Botón "Cerrar Consignación y Cobrar" (enviar el comando de cierre)

### Flujo de Usuario

1. Usuario entra a la página de cierre de consignaciones
2. Ve la lista de clientes con consignaciones activas
3. Selecciona un cliente
4. Ve las consignaciones activas de ese cliente
5. Hace clic en "Cerrar Consignación" para una específica
6. Se abre el formulario de cierre con los datos precargados
7. Usuario actualiza las cantidades vendidas/devueltas para cada artículo
8. El sistema calcula automáticamente pendientes y totales
9. Usuario decide si crea nueva consignación con pendientes
10. Usuario hace clic en "Cerrar Consignación y Cobrar"
11. Sistema muestra confirmación con el resultado (IDs generados, mensaje)
12. Usuario vuelve a la lista actualizada

## Requerimientos Técnicos

### Estructura de Archivos Sugerida
```
src/app/features/consignment-closure/
  ??? consignment-closure.routes.ts
  ??? customer-list/
  ?   ??? customer-list.component.ts
  ?   ??? customer-list.component.html
  ?   ??? customer-list.component.css
  ??? closure-form/
  ?   ??? closure-form.component.ts
  ?   ??? closure-form.component.html
  ?   ??? closure-form.component.css
  ??? shared/
      ??? consignment-closure.models.ts

src/app/services/
  ??? consignment-closure.service.ts
```

### Servicios Angular

Crear un servicio `ConsignmentClosureService` con métodos:
- `getCustomersWithActiveConsignments(): Observable<CustomerWithActiveConsignments[]>`
- `getConsignmentClosureDetail(consignmentId: string): Observable<ConsignmentClosureDetail>`
- `closeConsignment(command: CloseConsignmentCommand): Observable<CloseConsignmentResponse>`

### Componentes Material Design

Utilizar los siguientes componentes de Angular Material:
- `MatTableModule` para las tablas
- `MatCardModule` para las tarjetas de clientes
- `MatExpansionModule` para paneles expandibles (opcional)
- `MatDialogModule` si se prefiere usar modales
- `MatFormFieldModule`, `MatInputModule` para inputs
- `MatButtonModule` para botones
- `MatCheckboxModule` para el checkbox de nueva consignación
- `MatIconModule` para iconos
- `MatTooltipModule` para tooltips
- `MatSnackBarModule` para notificaciones de éxito/error

### Estilo Visual

- Usar paleta de colores consistente con el resto de la aplicación
- Destacar visualmente:
  - El **Monto Total a Cobrar** (fuente grande, color primario o acento)
  - Los campos editables (background diferente)
  - Errores de validación (rojo)
- Animaciones suaves en transiciones
- Diseño responsive (mobile-friendly)

### Manejo de Errores

- Mostrar mensajes de error del backend usando `MatSnackBar`
- Validar datos antes de enviar
- Manejar casos de error de red
- Mostrar loading spinners durante peticiones HTTP

### Confirmaciones

- Al cerrar consignación, mostrar un diálogo de confirmación con resumen:
  - Cliente
  - Total a cobrar
  - Cantidad de artículos vendidos/devueltos
  - Pregunta: "¿Está seguro de cerrar esta consignación?"

## Ejemplo de Código Base

### Service (consignment-closure.service.ts)
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import {
  CustomerWithActiveConsignments,
  ConsignmentClosureDetail,
  CloseConsignmentCommand,
  CloseConsignmentResponse
} from './models/consignment-closure.models';

@Injectable({ providedIn: 'root' })
export class ConsignmentClosureService {
  private apiUrl = `${environment.apiUrl}/consignments`;

  constructor(private http: HttpClient) {}

  getCustomersWithActiveConsignments(): Observable<CustomerWithActiveConsignments[]> {
    return this.http.get<ApiResponse<CustomerWithActiveConsignments[]>>(`${this.apiUrl}/closure/customers`).pipe(
      map(response => response.data)
    );
  }

  getConsignmentClosureDetail(consignmentId: string): Observable<ConsignmentClosureDetail> {
    return this.http.get<ApiResponse<ConsignmentClosureDetail>>(`${this.apiUrl}/${consignmentId}/closure`).pipe(
      map(response => response.data)
    );
  }

  closeConsignment(command: CloseConsignmentCommand): Observable<CloseConsignmentResponse> {
    return this.http.post<ApiResponse<CloseConsignmentResponse>>(`${this.apiUrl}/closure`, command).pipe(
      map(response => response.data)
    );
  }
}
```

## Entregables Esperados

Por favor, genera el código completo para:

1. **Models/Interfaces TypeScript** con todas las estructuras de datos necesarias
2. **Service** con las llamadas HTTP a los endpoints
3. **Componente de Lista de Clientes** con su HTML y CSS
4. **Componente de Formulario de Cierre** con su HTML, CSS y lógica de validación
5. **Routing** para navegar entre componentes
6. **Diálogo de Confirmación** (si aplica)

Asegúrate de:
- Usar Standalone Components (Angular moderno)
- Implementar Reactive Forms para el formulario de cierre
- Incluir comentarios en el código donde sea relevante
- Usar mejores prácticas de Angular y TypeScript
- Hacer el código limpio, mantenible y tipado correctamente
