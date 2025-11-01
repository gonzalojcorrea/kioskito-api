namespace Application.Features.Inventories.Common;

/// <summary>
/// Represents an inventory response with essential information.
/// </summary>
public sealed record InventoryResponse(
    Guid InventoryId,
    Guid ArticleId,
    string? Sku,
    string ArticleName,
    decimal LastPurchasePrice,
    decimal? SalePrice,
    decimal? ConsignmentPrice,
    int Quantity,
    string Status
);
