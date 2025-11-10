using MediatR;

namespace Application.Features.Consignments.Commands.CreateConsignment;

/// <summary>
/// Command to create a new consignment.
/// </summary>
public sealed record CreateConsignmentCommand(
    Guid CustomerId,
    IReadOnlyList<CreateConsignmentLineDto> Lines
) : IRequest<Guid>;
