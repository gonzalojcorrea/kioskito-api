using MediatR;

namespace Application.Features.Consignments.Commands.CloseConsignment;

/// <summary>
/// Command para cerrar una consignación, registrar ventas y procesar artículos no vendidos
/// </summary>
public record CloseConsignmentCommand : IRequest<CloseConsignmentResponse>
{
    /// <summary>
    /// ID de la consignación a cerrar
    /// </summary>
    public Guid ConsignmentId { get; init; }

    /// <summary>
    /// Líneas con información actualizada de ventas y devoluciones
    /// </summary>
    public List<CloseConsignmentLineDto> Lines { get; init; } = new();

    /// <summary>
    /// Indica si se crea una nueva consignación con los artículos no vendidos ni devueltos
    /// </summary>
    public bool CreateNewConsignmentForPending { get; init; }

    /// <summary>
    /// Notas adicionales para el cierre
    /// </summary>
    public string? Notes { get; init; }
}

/// <summary>
/// DTO para actualizar línea de consignación al cierre
/// </summary>
public record CloseConsignmentLineDto
{
    public Guid LineId { get; init; }
    public int SoldQty { get; init; }
    public int ReturnedQty { get; init; }
}
