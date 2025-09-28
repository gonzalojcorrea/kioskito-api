using Application.Common.Exceptions;
using Application.Interfaces;
using MediatR;

namespace Application.Features.Customers.Commands.UpdateCustomer;

public class UpdateCustomerCommandHandler : IRequestHandler<UpdateCustomerCommand, bool>
{
    private readonly IUnitOfWork _uow;
    public UpdateCustomerCommandHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<bool> Handle(UpdateCustomerCommand request, CancellationToken cancellationToken)
    {
        var customer = await _uow.Customers.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new NotFoundException("Cliente no encontrado");

        var email = request.Email.Trim();
        var duplicated = await _uow.Customers.FindAsync(c => c.Email.ToUpper() == email.ToUpper() && c.Id != request.Id, cancellationToken);
        if (duplicated.Any())
            throw new BadRequestException("Ya existe otro cliente con ese email.");

        customer.Name = request.Name.Trim();
        customer.Email = email;
        customer.Phone = request.Phone.Trim();
        customer.Address = request.Address.Trim();

        _uow.Customers.Update(customer);
        await _uow.CommitAsync(cancellationToken);
        return true;
    }
}
