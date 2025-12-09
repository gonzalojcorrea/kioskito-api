using MediatR;

namespace Application.Features.Consignments.Queries.GetCustomersWithActiveConsignments;

/// <summary>
/// Query para obtener todos los clientes que tienen consignaciones activas (OPEN)
/// </summary>
public record GetCustomersWithActiveConsignmentsQuery : IRequest<List<CustomerWithActiveConsignmentsResponse>>;
