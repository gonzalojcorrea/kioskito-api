using FluentValidation;

namespace Application.Features.Articles.Commands.RegisterArticle;

/// <summary>
/// Validator for RegisterArticleCommand.
/// </summary>
public class RegisterArticleCommandValidator : AbstractValidator<RegisterArticleCommand>
{
    public RegisterArticleCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre es obligatorio")
            .MaximumLength(80).WithMessage("El nombre no puede superar 80 caracteres");

        RuleFor(x => x.Description)
            .MaximumLength(250).WithMessage("La descripción no puede superar 250 caracteres");

        RuleFor(x => x.Sku)
            .MaximumLength(40).WithMessage("El SKU no puede superar 40 caracteres");

        RuleFor(x => x.SalePrice)
            .GreaterThanOrEqualTo(0).When(x => x.SalePrice.HasValue)
            .WithMessage("El precio de venta debe ser >= 0");

        RuleFor(x => x.ConsignmentPrice)
            .GreaterThanOrEqualTo(0).When(x => x.ConsignmentPrice.HasValue)
            .WithMessage("El precio de consignación debe ser >= 0");
    }
}
