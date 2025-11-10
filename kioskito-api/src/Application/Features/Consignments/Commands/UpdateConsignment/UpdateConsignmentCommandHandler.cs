using Application.Common.Exceptions;
using Application.Interfaces;
using Domain.Enums;
using MediatR;

namespace Application.Features.Consignments.Commands.UpdateConsignment;

/// <summary>
/// Handler for updating a consignment.
/// </summary>
public class UpdateConsignmentCommandHandler : IRequestHandler<UpdateConsignmentCommand, Unit>
{
    private readonly IUnitOfWork _uow;
    
    public UpdateConsignmentCommandHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<Unit> Handle(UpdateConsignmentCommand request, CancellationToken cancellationToken)
    {
        var consignment = await _uow.Consignments.GetByIdAsync(request.ConsignmentId, cancellationToken);
        
        if (consignment == null)
            throw new NotFoundException($"Consignación con Id '{request.ConsignmentId}' no encontrada.");

        // Actualizar los campos
        consignment.EndDate = request.EndDate;
        consignment.Status = request.Status;

        // Si se está cerrando o cancelando la consignación, establecer la fecha de fin si no existe
        if ((request.Status == ConsignmentStatus.CLOSED || request.Status == ConsignmentStatus.CANCELLED) 
            && consignment.EndDate == null)
        {
            consignment.EndDate = DateTime.UtcNow.AddHours(-3);
        }

        _uow.Consignments.Update(consignment);
        await _uow.CommitAsync(cancellationToken);

        return Unit.Value;
    }
}
