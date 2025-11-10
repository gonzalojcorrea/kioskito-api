using Domain.Enums;
using MediatR;

namespace Application.Features.Consignments.Commands.UpdateConsignment;

/// <summary>
/// Command to update a consignment.
/// </summary>
public sealed record UpdateConsignmentCommand(
    Guid ConsignmentId,
    DateTime? EndDate,
    ConsignmentStatus Status
) : IRequest<Unit>;
