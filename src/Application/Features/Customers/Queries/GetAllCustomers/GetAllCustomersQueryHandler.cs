using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Features.Customers.Queries.GetAllCustomers;

public class GetAllCustomersQueryHandler : IRequestHandler<GetAllCustomersQuery, IReadOnlyList<Customer>>
{
    private readonly IUnitOfWork _uow;
    public GetAllCustomersQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<IReadOnlyList<Customer>> Handle(GetAllCustomersQuery request, CancellationToken cancellationToken)
        => await _uow.Customers.GetAllAsync(cancellationToken);
}
