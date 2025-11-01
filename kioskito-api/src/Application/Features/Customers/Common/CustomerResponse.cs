namespace Application.Features.Customers.Common;

/// <summary>
/// Represents a customer response with essential information.
/// </summary>
public sealed record CustomerResponse(
    Guid Id,
    string Name,
    string Email,
    string Phone,
    string Address,
    string Status
);
