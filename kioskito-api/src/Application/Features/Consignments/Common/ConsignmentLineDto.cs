namespace Application.Features.Consignments.Common;

/// <summary>
/// Represents a consignment line detail.
/// </summary>
public sealed record ConsignmentLineDto(
    Guid LineId,
    Guid ArticleId,
    string ArticleName,
    string? ArticleSku,
    int DeliveredQty,
    int ReturnedQty,
    int SoldQty,
    decimal UnitPrice,
    decimal LineTotal
);
