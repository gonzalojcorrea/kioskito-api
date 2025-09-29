using MediatR;

namespace Application.Features.Customers.Commands.RegisterCustomer;

public sealed record RegisterCustomerCommand(
    string Name,
    string Email,
    string Phone,
    string Address
) : IRequest<Guid>;
