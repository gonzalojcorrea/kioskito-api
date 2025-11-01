namespace Application.Features.Users.Common;

/// <summary>
/// Represents a user response with essential information.
/// </summary>
public sealed record UserResponse(
    Guid Id,
    string FullName,
    string Email,
    string Role,
    DateTime CreatedAt
);
