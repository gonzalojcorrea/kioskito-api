using MediatR;

namespace Application.Features.Customers.Commands.DeleteCustomer;

public sealed record DeleteCustomerCommand(Guid Id) : IRequest<bool>;
