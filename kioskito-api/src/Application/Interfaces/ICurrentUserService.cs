namespace Application.Interfaces;

/// <summary>
/// Service for getting the current authenticated user information.
/// </summary>
public interface ICurrentUserService
{
    /// <summary>
    /// Gets the current user ID from the JWT token.
    /// </summary>
    /// <returns>The user ID if authenticated, null otherwise.</returns>
    Guid? GetUserId();

    /// <summary>
    /// Gets the current user email from the JWT token.
    /// </summary>
    /// <returns>The user email if authenticated, null otherwise.</returns>
    string? GetUserEmail();

    /// <summary>
    /// Gets the current user role from the JWT token.
    /// </summary>
    /// <returns>The user role if authenticated, null otherwise.</returns>
    string? GetUserRole();

    /// <summary>
    /// Checks if the user is authenticated.
    /// </summary>
    /// <returns>True if user is authenticated, false otherwise.</returns>
    bool IsAuthenticated();
}
