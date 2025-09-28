using Application.Common.Exceptions;
using Application.Interfaces;
using MediatR;

namespace Application.Features.Customers.Commands.DeleteCustomer;

public class DeleteCustomerCommandHandler : IRequestHandler<DeleteCustomerCommand, bool>
{
    private readonly IUnitOfWork _uow;
    public DeleteCustomerCommandHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<bool> Handle(DeleteCustomerCommand request, CancellationToken cancellationToken)
    {
        var customer = await _uow.Customers.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new NotFoundException("Cliente no encontrado");

        _uow.Customers.Remove(customer);
        await _uow.CommitAsync(cancellationToken);
        return true;
    }
}
