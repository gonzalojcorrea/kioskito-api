namespace Application.Features.Consignments.Queries.GetCustomersWithActiveConsignments;

/// <summary>
/// Respuesta con información del cliente y sus consignaciones activas
/// </summary>
public record CustomerWithActiveConsignmentsResponse
{
    public Guid CustomerId { get; init; }
    public string CustomerName { get; init; }
    public string CustomerEmail { get; init; }
    public string CustomerPhone { get; init; }
    public List<ActiveConsignmentSummary> ActiveConsignments { get; init; } = new();
}

/// <summary>
/// Resumen de una consignación activa
/// </summary>
public record ActiveConsignmentSummary
{
    public Guid ConsignmentId { get; init; }
    public DateTime StartDate { get; init; }
    public decimal Total { get; init; }
    public int TotalItems { get; init; }
    public int TotalQuantityDelivered { get; init; }
}
