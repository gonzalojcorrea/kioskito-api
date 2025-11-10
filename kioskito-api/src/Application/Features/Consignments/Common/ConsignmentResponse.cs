namespace Application.Features.Consignments.Common;

/// <summary>
/// Represents a consignment response with summary information.
/// </summary>
public sealed record ConsignmentResponse(
    Guid ConsignmentId,
    Guid CustomerId,
    string CustomerName,
    DateTime StartDate,
    DateTime? EndDate,
    string Status,
    decimal Total,
    int TotalLines
);
