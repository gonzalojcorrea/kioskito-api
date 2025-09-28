# Kioskito API - Despliegue con Docker Compose

## Estructura
```
deploy/
  docker-compose.yml   # Stack principal
  env/
    api.env            # Variables de entorno para la API
```

## Comandos
Iniciar (foreground):
```
docker compose -f deploy/docker-compose.yml up --build
```
Modo detach:
```
docker compose -f deploy/docker-compose.yml up -d --build
```
Detener:
```
docker compose -f deploy/docker-compose.yml down
```
Eliminar también volúmenes (datos DB):
```
docker compose -f deploy/docker-compose.yml down -v
```

## Variables (env/api.env)
- ConnectionStrings__Default
- JwtSettings__SecretKey
- JwtSettings__Issuer
- JwtSettings__Audience
- JwtSettings__ExpiresInMinutes

## Notas
1. La imagen se construye desde la raíz (context: ..).
2. El servicio `db` expone Postgres 16.
3. Ajusta credenciales y secretos antes de producción.
