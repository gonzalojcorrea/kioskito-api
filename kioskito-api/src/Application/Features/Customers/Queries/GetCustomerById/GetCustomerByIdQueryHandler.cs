using Application.Features.Customers.Common;
using Application.Interfaces;
using MediatR;

namespace Application.Features.Customers.Queries.GetCustomerById;

public class GetCustomerByIdQueryHandler : IRequestHandler<GetCustomerByIdQuery, CustomerResponse?>
{
    private readonly IUnitOfWork _uow;
    public GetCustomerByIdQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<CustomerResponse?> Handle(GetCustomerByIdQuery request, CancellationToken cancellationToken)
    {
        var customer = await _uow.Customers.GetByIdAsync(request.Id, cancellationToken);
        
        if (customer is null) return null;
        
        return new CustomerResponse(
            customer.Id,
            customer.Name,
            customer.Email,
            customer.Phone,
            customer.Address,
            customer.DeletedAt.HasValue ? "Inactivo" : "Activo"
        );
    }
}
