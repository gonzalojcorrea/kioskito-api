using FluentValidation;

namespace Application.Features.Consignments.Commands.CreateConsignment;

/// <summary>
/// Validator for CreateConsignmentCommand.
/// </summary>
public class CreateConsignmentCommandValidator : AbstractValidator<CreateConsignmentCommand>
{
    public CreateConsignmentCommandValidator()
    {
        RuleFor(x => x.CustomerId)
            .NotEmpty()
            .WithMessage("El ID del cliente es requerido.");

        RuleFor(x => x.Lines)
            .NotEmpty()
            .WithMessage("Debe incluir al menos una línea de consignación.");

        RuleForEach(x => x.Lines).ChildRules(line =>
        {
            line.RuleFor(l => l.ArticleId)
                .NotEmpty()
                .WithMessage("El ID del artículo es requerido.");

            line.RuleFor(l => l.DeliveredQty)
                .GreaterThan(0)
                .WithMessage("La cantidad entregada debe ser mayor a 0.");

            line.RuleFor(l => l.UnitPrice)
                .GreaterThanOrEqualTo(0)
                .WithMessage("El precio unitario debe ser mayor o igual a 0.");
        });
    }
}
