using Application.Features.Consignments.Common;
using MediatR;

namespace Application.Features.Consignments.Queries.GetConsignmentById;

/// <summary>
/// Query to get a consignment by its ID with full details.
/// </summary>
public sealed record GetConsignmentByIdQuery(Guid ConsignmentId) : IRequest<ConsignmentDetailResponse?>;
