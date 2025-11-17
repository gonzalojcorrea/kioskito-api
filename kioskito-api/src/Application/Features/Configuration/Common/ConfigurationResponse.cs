namespace Application.Features.Configuration.Common;

/// <summary>
/// Represents the global configuration of the system.
/// </summary>
public sealed record ConfigurationResponse(
    string CompanyName,
    string Address
);
