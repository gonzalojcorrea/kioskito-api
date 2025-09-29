using MediatR;

namespace Application.Features.Customers.Commands.UpdateCustomer;

public sealed record UpdateCustomerCommand(
    Guid Id,
    string Name,
    string Email,
    string Phone,
    string Address
) : IRequest<bool>;
