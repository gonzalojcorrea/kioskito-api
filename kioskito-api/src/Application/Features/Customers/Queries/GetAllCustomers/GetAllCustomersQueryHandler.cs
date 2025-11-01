using Application.Features.Customers.Common;
using Application.Interfaces;
using MediatR;

namespace Application.Features.Customers.Queries.GetAllCustomers;

public class GetAllCustomersQueryHandler : IRequestHandler<GetAllCustomersQuery, IReadOnlyList<CustomerResponse>>
{
    private readonly IUnitOfWork _uow;
    public GetAllCustomersQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<IReadOnlyList<CustomerResponse>> Handle(GetAllCustomersQuery request, CancellationToken cancellationToken)
    {
        var customers = await _uow.Customers.GetAllAsync(cancellationToken);
        
        return customers
            .Select(c => new CustomerResponse(
                c.Id,
                c.Name,
                c.Email,
                c.Phone,
                c.Address,
                c.DeletedAt.HasValue ? "Inactivo" : "Activo"
            ))
            .ToList();
    }
}
