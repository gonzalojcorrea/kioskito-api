using Application.Interfaces;
using Domain.Interfaces;
using Infrastructure.Configurations.Authentication;
using Infrastructure.Persistence;
using Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure;

/// <summary>
/// Extension methods for adding infrastructure services.
/// </summary>
public static class InfrastructureServices
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString, IConfiguration configuration)
    {
        // 1. EF Core + DbContext/UoW/Repos
        services.AddDbContext<AppDbContext>(opts =>
            opts.UseNpgsql(connectionString)
                .UseSnakeCaseNamingConvention());

        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IRoleRepository, RoleRepository>();
        services.AddScoped<IArticleRepository, ArticleRepository>();
        services.AddScoped<ICustomerRepository, CustomerRepository>();
        services.AddScoped<IInventoryRepository, InventoryRepository>();
        services.AddScoped<IConsignmentRepository, ConsignmentRepository>();
        services.AddScoped<IConsignmentLineRepository, ConsignmentLineRepository>();
        services.AddScoped<IConsignmetTransactionRepository, ConsignmetTransactionRepository>();
        services.AddScoped<ISalesOrderRepository, SalesOrderRepository>();
        services.AddScoped<ISalesOrderLineRepository, SalesOrderLineRepository>();
        services.AddScoped<ITransactionRepository, TransactionRepository>();

        // 2. JWT settings + generador
        services.Configure<JwtSettings>(
            s => configuration.GetSection(JwtSettings.SectionName).Bind(s));
        services.AddSingleton<IJwtService, JwtService>();

        // 3. Bind JwtSettings
        var section = configuration.GetSection(JwtSettings.SectionName);
        var jwt = section.Get<JwtSettings>();

        // 4. Configure Authentication & Authorization
        services.AddAuthenticationExtension(configuration, jwt);
        services.AddAuthorization();

        return services;
    }
}
