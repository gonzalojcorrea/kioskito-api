using Application.Common.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Features.Customers.Commands.RegisterCustomer;

public class RegisterCustomerCommandHandler : IRequestHandler<RegisterCustomerCommand, Guid>
{
    private readonly IUnitOfWork _uow;
    public RegisterCustomerCommandHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<Guid> Handle(RegisterCustomerCommand request, CancellationToken cancellationToken)
    {
        var email = request.Email.Trim();

        var existing = await _uow.Customers.FindAsync(c => c.Email.ToUpper() == email.ToUpper(), cancellationToken);
        if (existing.Any())
            throw new BadRequestException("Ya existe un cliente con ese email.");

        var customer = new Customer
        {
            Name = request.Name.Trim(),
            Email = email,
            Phone = request.Phone.Trim(),
            Address = request.Address.Trim()
        };

        await _uow.Customers.AddAsync(customer, cancellationToken);
        await _uow.CommitAsync(cancellationToken);
        return customer.Id;
    }
}
