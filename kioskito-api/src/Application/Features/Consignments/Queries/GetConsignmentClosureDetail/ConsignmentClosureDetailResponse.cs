namespace Application.Features.Consignments.Queries.GetConsignmentClosureDetail;

/// <summary>
/// Respuesta detallada para el cierre de consignación
/// </summary>
public record ConsignmentClosureDetailResponse
{
    public Guid ConsignmentId { get; init; }
    public Guid CustomerId { get; init; }
    public string CustomerName { get; init; }
    public string CustomerEmail { get; init; }
    public DateTime StartDate { get; init; }
    public decimal CurrentTotal { get; init; }
    public List<ConsignmentLineClosureDto> Lines { get; init; } = new();
    
    /// <summary>
    /// Totales calculados
    /// </summary>
    public ConsignmentClosureSummary Summary { get; init; }
}

/// <summary>
/// Línea de consignación con información para el cierre
/// </summary>
public record ConsignmentLineClosureDto
{
    public Guid LineId { get; init; }
    public Guid ArticleId { get; init; }
    public string ArticleName { get; init; }
    public string ArticleCode { get; init; }
    public int DeliveredQty { get; init; }
    public int CurrentSoldQty { get; init; }
    public int CurrentReturnedQty { get; init; }
    public int PendingQty { get; init; }  // DeliveredQty - SoldQty - ReturnedQty
    public decimal UnitPrice { get; init; }
    public decimal LineTotal { get; init; }
}

/// <summary>
/// Resumen de totales para el cierre
/// </summary>
public record ConsignmentClosureSummary
{
    public int TotalDelivered { get; init; }
    public int TotalSold { get; init; }
    public int TotalReturned { get; init; }
    public int TotalPending { get; init; }
    public decimal TotalSalesAmount { get; init; }
}
