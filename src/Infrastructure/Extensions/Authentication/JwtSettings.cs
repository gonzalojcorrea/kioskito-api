namespace Infrastructure.Configurations.Authentication;

/// <summary>
/// Configuration settings for JWT authentication.
/// </summary>
public class JwtSettings
{
    public const string SectionName = "JwtSettings";
    public required string SecretKey { get; init; }
    public required string Issuer { get; init; }
    public required string Audience { get; init; }
    public int ExpiresInMinutes { get; init; }
}
