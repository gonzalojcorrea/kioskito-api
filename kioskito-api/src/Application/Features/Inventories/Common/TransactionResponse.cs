namespace Application.Features.Inventories.Common;

/// <summary>
/// Represents a transaction response with essential information.
/// </summary>
public sealed record TransactionResponse(
    Guid TransactionId,
    Guid InventoryId,
    Guid UserId,
    string UserName,
    string TransactionType,
    int Quantity,
    DateTime Date,
    string? Note,
    decimal UnitCost
);
