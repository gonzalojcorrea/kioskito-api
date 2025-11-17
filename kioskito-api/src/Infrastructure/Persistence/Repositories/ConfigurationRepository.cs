using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

/// <summary>
/// Repository for managing system configuration settings.
/// </summary>
public class ConfigurationRepository : IConfigurationRepository
{
    private readonly AppDbContext _context;

    public ConfigurationRepository(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retrieves the system configuration record.
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<Configuration?> GetAsync(CancellationToken cancellationToken = default)
        => await _context.Configurations
            .FirstOrDefaultAsync(cancellationToken);

    /// <summary>
    /// Inserts a new configuration into the database.
    /// Typically used during initial setup.
    /// </summary>
    /// <param name="config"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task AddAsync(Configuration config, CancellationToken cancellationToken = default)
        => await _context.Configurations.AddAsync(config, cancellationToken);

    /// <summary>
    /// Updates an existing configuration record.
    /// </summary>
    /// <param name="config"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task UpdateAsync(Configuration config, CancellationToken cancellationToken = default)
    {
        _context.Configurations.Update(config);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
