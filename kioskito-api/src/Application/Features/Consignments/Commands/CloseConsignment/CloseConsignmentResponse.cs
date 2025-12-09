namespace Application.Features.Consignments.Commands.CloseConsignment;

/// <summary>
/// Respuesta del comando de cierre de consignación
/// </summary>
public record CloseConsignmentResponse
{
    public Guid ClosedConsignmentId { get; init; }
    public Guid? SalesOrderId { get; init; }
    public Guid? NewConsignmentId { get; init; }
    public decimal TotalSalesAmount { get; init; }
    public int TotalItemsSold { get; init; }
    public int TotalItemsReturned { get; init; }
    public int TotalItemsMovedToNewConsignment { get; init; }
    public string Message { get; init; }
}
