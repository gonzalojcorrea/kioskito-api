using Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Infrastructure.Services;

/// <summary>
/// Implementation of ICurrentUserService that extracts user information from JWT token claims.
/// </summary>
public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    /// <summary>
    /// Gets the current user ID from the "sub" claim in the JWT token.
    /// </summary>
    public Guid? GetUserId()
    {
        var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)
                          ?? _httpContextAccessor.HttpContext?.User?.FindFirst("sub");

        if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out var userId))
        {
            return userId;
        }

        return null;
    }

    /// <summary>
    /// Gets the current user email from the "unique_name" claim in the JWT token.
    /// </summary>
    public string? GetUserEmail()
    {
        return _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Name)?.Value
               ?? _httpContextAccessor.HttpContext?.User?.FindFirst("unique_name")?.Value;
    }

    /// <summary>
    /// Gets the current user role from the "role" claim in the JWT token.
    /// </summary>
    public string? GetUserRole()
    {
        return _httpContextAccessor.HttpContext?.User?.FindFirst(ClaimTypes.Role)?.Value;
    }

    /// <summary>
    /// Checks if the user is authenticated by verifying if the identity exists and is authenticated.
    /// </summary>
    public bool IsAuthenticated()
    {
        return _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
    }
}
