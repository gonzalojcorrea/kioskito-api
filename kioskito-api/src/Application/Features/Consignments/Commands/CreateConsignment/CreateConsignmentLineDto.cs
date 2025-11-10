namespace Application.Features.Consignments.Commands.CreateConsignment;

/// <summary>
/// Represents a line item for creating a consignment.
/// </summary>
public sealed record CreateConsignmentLineDto(
    Guid ArticleId,
    int DeliveredQty,
    decimal UnitPrice
);
