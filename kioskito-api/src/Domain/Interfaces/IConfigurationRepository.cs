using Domain.Entities;

namespace Domain.Interfaces;

/// <summary>
/// Defines the contract for accessing and managing system configuration settings.
/// </summary>
/// <remarks>
/// This repository is responsible for retrieving and updating global configuration
/// values used across the application, such as company name and address.
/// </remarks>
public interface IConfigurationRepository
{
    /// <summary>
    /// Retrieves the current system configuration.
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns>The configuration record, or <c>null</c> if none exists.</returns>
    Task<Configuration?> GetAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Updates an existing configuration record.
    /// </summary>
    /// <param name="config">The configuration entity to update.</param>
    /// <param name="cancellationToken"></param>
    Task UpdateAsync(Configuration config, CancellationToken cancellationToken = default);
}
