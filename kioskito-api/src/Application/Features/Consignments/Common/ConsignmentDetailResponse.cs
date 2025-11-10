namespace Application.Features.Consignments.Common;

/// <summary>
/// Represents a detailed consignment response with all lines.
/// </summary>
public sealed record ConsignmentDetailResponse(
    Guid ConsignmentId,
    Guid CustomerId,
    string CustomerName,
    string CustomerEmail,
    string CustomerPhone,
    DateTime StartDate,
    DateTime? EndDate,
    string Status,
    decimal Total,
    IReadOnlyList<ConsignmentLineDto> Lines
);
