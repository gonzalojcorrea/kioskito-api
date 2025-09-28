using Domain.Entities;
using MediatR;

namespace Application.Features.Customers.Queries.GetAllCustomers;

public sealed record GetAllCustomersQuery : IRequest<IReadOnlyList<Customer>>;
