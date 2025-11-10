using Application.Common.Exceptions;
using Application.Interfaces;
using MediatR;

namespace Application.Features.Consignments.Commands.DeleteConsignment;

/// <summary>
/// Handler for deleting a consignment.
/// </summary>
public class DeleteConsignmentCommandHandler : IRequestHandler<DeleteConsignmentCommand, Unit>
{
    private readonly IUnitOfWork _uow;
    
    public DeleteConsignmentCommandHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<Unit> Handle(DeleteConsignmentCommand request, CancellationToken cancellationToken)
    {
        var consignment = await _uow.Consignments.GetByIdAsync(request.ConsignmentId, cancellationToken);
        
        if (consignment == null)
            throw new NotFoundException($"Consignación con Id '{request.ConsignmentId}' no encontrada.");

        _uow.Consignments.Remove(consignment);
        await _uow.CommitAsync(cancellationToken);

        return Unit.Value;
    }
}
