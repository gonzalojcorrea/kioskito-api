using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Features.Customers.Queries.GetCustomerById;

public class GetCustomerByIdQueryHandler : IRequestHandler<GetCustomerByIdQuery, Customer?>
{
    private readonly IUnitOfWork _uow;
    public GetCustomerByIdQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<Customer?> Handle(GetCustomerByIdQuery request, CancellationToken cancellationToken)
        => await _uow.Customers.GetByIdAsync(request.Id, cancellationToken);
}
