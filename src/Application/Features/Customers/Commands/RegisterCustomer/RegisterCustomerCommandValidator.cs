using FluentValidation;

namespace Application.Features.Customers.Commands.RegisterCustomer;

public class RegisterCustomerCommandValidator : AbstractValidator<RegisterCustomerCommand>
{
    public RegisterCustomerCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(120);

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(150);

        RuleFor(x => x.Phone)
            .NotEmpty()
            .MaximumLength(40);

        RuleFor(x => x.Address)
            .NotEmpty()
            .MaximumLength(200);
    }
}
