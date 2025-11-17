using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <summary>
    /// Inserts initial configuration values such as company name and address.
    /// </summary>
    public partial class InitialData_Configuration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "configurations",
                columns: new[] { "id", "company_name", "address", "created_at", "deleted_at" },
                values: new object[]
                {
                    Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    "Kioskito",
                    "Cauque 7475, Córdoba",
                    DateTime.UtcNow,
                    null
                }
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "DELETE FROM configurations WHERE id = '11111111-1111-1111-1111-111111111111';"
            );
        }
    }
}
