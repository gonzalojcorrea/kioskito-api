using Application.Features.Consignments.Common;
using MediatR;

namespace Application.Features.Consignments.Queries.GetAllConsignments;

/// <summary>
/// Query to get all consignments.
/// </summary>
public sealed record GetAllConsignmentsQuery : IRequest<IReadOnlyList<ConsignmentResponse>>;
