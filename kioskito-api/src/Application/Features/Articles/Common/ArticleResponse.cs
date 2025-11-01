namespace Application.Features.Articles.Common;

/// <summary>
/// Represents an article response with essential information.
/// </summary>
public sealed record ArticleResponse(
    Guid Id,
    string Name,
    string? Sku,
    decimal LastPurchasePrice,
    decimal? SalePrice,
    decimal? ConsignmentPrice,
    string Status
);
