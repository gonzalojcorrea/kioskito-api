using FluentValidation;

namespace Application.Features.Inventory.Commands.CreateItem;

public class CreateItemCommandValidation : AbstractValidator<CreateItemCommand>
{
    public CreateItemCommandValidation()
    {
        RuleFor(x => x.ProductCode)
            .NotEmpty().WithMessage("El código del producto es obligatorio.")
            .MaximumLength(50)
            .WithMessage("El código del producto no puede exceder los 50 caracteres.");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre del producto es obligatorio.")
            .MaximumLength(100)
            .WithMessage("El nombre del producto no puede exceder los 100 caracteres.");

        RuleFor(x => x.Description)
                .MaximumLength(500).WithMessage("La descripción no puede exceder 500 caracteres.")
                .When(x => x.Description is not null);

        RuleFor(x => x.Quantity)
            .GreaterThanOrEqualTo(0)
            .WithMessage("La cantidad debe ser mayor o igual a cero.");

        RuleFor(x => x.UnitPrice)
            .GreaterThanOrEqualTo(0).When(x => x.UnitPrice.HasValue)
            .WithMessage("El precio unitario debe ser mayor o igual a cero.");
    }
}
