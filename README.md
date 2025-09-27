# Kioskito API

API para gestión de kiosco / consignaciones construida con .NET 8 (Clean Architecture + CQRS + MediatR + EF Core + JWT).

## Estructura de la solución
```
root
 ?? src
 ?   ?? API                -> Capa de presentación (endpoints REST, Swagger, autenticación)
 ?   ?? Application        -> Lógica de aplicación (CQRS: Commands/Queries, Validations, Interfaces)
 ?   ?? Domain             -> Entidades, enums, interfaces de dominio base
 ?   ?? Infrastructure     -> EF Core, Repositories, Migrations, JWT, Implementaciones
 ?? test
     ?? Application.Tests  -> Pruebas unitarias de la capa Application
```

### Capas
- `Domain`: Entidades puras y contratos (no depende de otras capas).
- `Application`: Usa MediatR para commands/queries. Define `IUnitOfWork`, validadores (FluentValidation) y excepciones.
- `Infrastructure`: Implementa persistencia (EF Core + PostgreSQL), repositorios, UoW, autenticación JWT.
- `API`: Expone endpoints (Auth, Articles, etc.) y configura DI + Middlewares.

## Principales patrones / librerías
- CQRS con MediatR
- Repositorio genérico + Repositorios específicos
- Unit of Work
- JWT Authentication (Bearer)
- FluentValidation
- EF Core (PostgreSQL, naming snake_case)

## Entidades principales
- Users / Roles (autenticación y autorización)
- Articles (catálogo de productos)
- Inventory / Transaction (movimientos y stock)
- Customer
- Consignment / ConsignmentLine / ConsignmetTransaction (gestión consignaciones)
- SalesOrder / SalesOrderLine (ventas)

## Modelo de datos
![Data Model](docs/images/data-model.png)

(Guarda la imagen anterior en `docs/images/data-model.png` para que se renderice.)

## Variables de entorno (appsettings.json)
Ejemplo de sección JWT:
```json
{
  "JwtSettings": {
    "SecretKey": "CAMBIAR_ESTA_CLAVE_SUPER_SECRETA",
    "Issuer": "kioskito-api",
    "Audience": "kioskito-clients",
    "ExpiresInMinutes": 60
  },
  "ConnectionStrings": {
    "DefaultConnection": "Host=postgres;Port=5432;Database=kioskito;Username=postgres;Password=postgres;"
  }
}
```

## Ejecutar con Docker
### 1. Crear archivo docker-compose.yml (si no existe)
Ejemplo mínimo:
```yaml
version: "3.9"
services:
  api:
    build: ./
    container_name: kioskito-api
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ConnectionStrings__DefaultConnection=Host=postgres;Port=5432;Database=kioskito;Username=postgres;Password=postgres;
      - JwtSettings__SecretKey=CAMBIAR_ESTA_CLAVE_SUPER_SECRETA
      - JwtSettings__Issuer=kioskito-api
      - JwtSettings__Audience=kioskito-clients
      - JwtSettings__ExpiresInMinutes=60
    ports:
      - "8080:8080"
      - "8081:8081"
    depends_on:
      - postgres
  postgres:
    image: postgres:16-alpine
    container_name: kioskito-db
    restart: always
    environment:
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_DB=kioskito
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

### 2. Construir y levantar
```bash
docker compose up --build
```

La API quedará disponible en:
- http://localhost:8080/swagger (documentación)

### 3. Aplicar migraciones (si no se generan automáticamente)
Dentro del contenedor (o local si tienes el SDK):
```bash
dotnet ef database update -p src/Infrastructure/Infrastructure.csproj -s src/API/API.csproj
```

## Flujo de Autenticación
1. Registrar usuario: POST `api/auth/sign-up` -> devuelve JWT.
2. Login: POST `api/auth/login` -> devuelve JWT.
3. Usar token en `Authorization: Bearer <token>` para endpoints protegidos (`Articles`, etc.).

## Endpoints principales (ejemplos)
- POST `api/auth/sign-up`
- POST `api/auth/login`
- POST `api/articles`
- GET `api/articles`
- GET `api/articles/{id}`
- PUT `api/articles/{id}`
- DELETE `api/articles/{id}`

## Tests
Ejecutar pruebas:
```bash
dotnet test
```

## Extensiones futuras
- Soft delete global filters
- Auditoría (CreatedBy / UpdatedAt)
- Integración con colas (RabbitMQ) para eventos de stock

---
> Ajusta claves y cadenas de conexión antes de producción.
