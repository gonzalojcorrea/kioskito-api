using Application;
using Infrastructure;
using Infrastructure.Configurations.Filters;
using Infrastructure.Configurations.Middleware;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

/*
 * Program.cs
 * Punto de entrada de la API (.NET 8 - minimal hosting model).
 * Se registran servicios (DI), middlewares y se construye la tubería HTTP.
 */
var builder = WebApplication.CreateBuilder(args);

// -------------------------------------------------------------------------
// 1. CORS (Se permite todo para desarrollo; ajustar para producción)
// -------------------------------------------------------------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

// -------------------------------------------------------------------------
// 2. Swagger + JWT (documentación + botón Authorize)
// -------------------------------------------------------------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Kioskito API",
        Version = "v1",
        Description = "API para gestión de consignaciones, inventario y ventas."
    });
    c.EnableAnnotations();

    // Definición de esquema de seguridad (Bearer JWT)
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Introduce el token con el prefijo 'Bearer '. Ej: Bearer eyJhbGciOiJI..."
    });

    // Requisito global: agrega el candado en los endpoints protegidos
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            }, Array.Empty<string>()
        }
    });
});

// -------------------------------------------------------------------------
// 3. MVC / Controllers (Filtros + JSON Options + ModelState personalizado)
// -------------------------------------------------------------------------
builder.Services
    .AddControllers(options =>
    {
        // Envuelve respuestas exitosas en SuccessResponse<T>
        options.Filters.Add<SuccessResponseFilter>();
    })
    .ConfigureApiBehaviorOptions(options =>
    {
        // Dejamos a FluentValidation / lógica propia manejar los errores de modelo
        options.SuppressModelStateInvalidFilter = true;
    })
    .AddJsonOptions(options =>
    {
        // Evita ciclos de referencia en serialización (navegaciones EF)
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// -------------------------------------------------------------------------
// 4. Infrastructure (EF Core, Repos, JWT, UoW, etc.)
// -------------------------------------------------------------------------
var connection = builder.Configuration.GetConnectionString("Default");
if (string.IsNullOrWhiteSpace(connection))
    Console.WriteLine("[WARN] ConnectionStrings:Default no configurada.");

builder.Services.AddInfrastructure(connection, builder.Configuration);

// -------------------------------------------------------------------------
// 5. Application (CQRS/MediatR, FluentValidation, PasswordHasher, etc.)
// -------------------------------------------------------------------------
builder.Services.AddApplicationLayer();

// -------------------------------------------------------------------------
// 6. Construcción de la aplicación
// -------------------------------------------------------------------------
var app = builder.Build();

// -------------------------------------------------------------------------
// 7. Middlewares del pipeline HTTP
// -------------------------------------------------------------------------
// Swagger siempre habilitado (ajustar a solo Development si se requiere)
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Kioskito API v1");
});

// Manejo centralizado de excepciones -> convierte excepciones Controladas a ProblemDetails
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// -------------------------------------------------------------------------
// 8. Migraciones automáticas (Opcional - comentar/activar según estrategia DevOps)
// -------------------------------------------------------------------------
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.Run();
