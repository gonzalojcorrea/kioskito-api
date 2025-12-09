using MediatR;

namespace Application.Features.Consignments.Queries.GetConsignmentClosureDetail;

/// <summary>
/// Query para obtener el detalle de cierre de una consignación específica
/// con toda la información necesaria para realizar el control y cierre
/// </summary>
public record GetConsignmentClosureDetailQuery(Guid ConsignmentId) : IRequest<ConsignmentClosureDetailResponse>;
