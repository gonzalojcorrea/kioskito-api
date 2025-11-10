using MediatR;

namespace Application.Features.Consignments.Commands.DeleteConsignment;

/// <summary>
/// Command to delete a consignment.
/// </summary>
public sealed record DeleteConsignmentCommand(Guid ConsignmentId) : IRequest<Unit>;
