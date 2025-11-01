using Application.Features.Customers.Common;
using MediatR;

namespace Application.Features.Customers.Queries.GetCustomerById;

public sealed record GetCustomerByIdQuery(Guid Id) : IRequest<CustomerResponse?>;
