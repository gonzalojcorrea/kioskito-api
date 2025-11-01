using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialData_Users : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Insertar roles iniciales
            var adminRoleId = Guid.NewGuid();
            var employeeRoleId = Guid.NewGuid();
            var managerRoleId = Guid.NewGuid();

            migrationBuilder.InsertData(
                table: "roles",
                columns: new[] { "id", "name", "description", "created_at", "deleted_at" },
                values: new object[,]
                {
                    { adminRoleId, "Admin", "Administrador del sistema con acceso completo", DateTime.UtcNow, null },
                    { employeeRoleId, "Employee", "Empleado con permisos básicos", DateTime.UtcNow, null },
                    { managerRoleId, "Manager", "Gerente con permisos de gestión", DateTime.UtcNow, null }
                });

            // Insertar usuarios iniciales
            // Nota: Las contraseñas hasheadas corresponden a "Password123!" usando BCrypt
            // En producción, cambiar estas contraseñas después del primer login
            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "id", "name", "last_name", "email", "password_hash", "role_id", "created_at", "deleted_at" },
                values: new object[,]
                {
                    { 
                        Guid.NewGuid(), 
                        "Admin", 
                        "Sistema", 
                        "admin@kioskito.com",
                        "AQAAAAIAAYagAAAAEFJkbGhrLRKEjklRY+XcXsHMYjheGPfHVdOtYMmCecdob+NV/kUm8HX0+1RZtrLDTQ==", // Password123!
                        adminRoleId, 
                        DateTime.UtcNow, 
                        null 
                    },
                    { 
                        Guid.NewGuid(), 
                        "Juan", 
                        "Pérez", 
                        "juan.perez@kioskito.com",
                        "AQAAAAIAAYagAAAAEFJkbGhrLRKEjklRY+XcXsHMYjheGPfHVdOtYMmCecdob+NV/kUm8HX0+1RZtrLDTQ==", // Password123!
                        employeeRoleId, 
                        DateTime.UtcNow, 
                        null 
                    },
                    { 
                        Guid.NewGuid(), 
                        "María", 
                        "González", 
                        "maria.gonzalez@kioskito.com",
                        "AQAAAAIAAYagAAAAEFJkbGhrLRKEjklRY+XcXsHMYjheGPfHVdOtYMmCecdob+NV/kUm8HX0+1RZtrLDTQ==", // Password123!
                        managerRoleId, 
                        DateTime.UtcNow, 
                        null 
                    }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Eliminar usuarios iniciales
            migrationBuilder.Sql("DELETE FROM users WHERE email IN ('admin@kioskito.com', 'juan.perez@kioskito.com', 'maria.gonzalez@kioskito.com')");
            
            // Eliminar roles iniciales
            migrationBuilder.Sql("DELETE FROM roles WHERE name IN ('Admin', 'Employee', 'Manager')");
        }
    }
}
