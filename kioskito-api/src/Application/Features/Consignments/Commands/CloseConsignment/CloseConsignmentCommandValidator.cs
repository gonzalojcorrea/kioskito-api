using FluentValidation;

namespace Application.Features.Consignments.Commands.CloseConsignment;

public class CloseConsignmentCommandValidator : AbstractValidator<CloseConsignmentCommand>
{
    public CloseConsignmentCommandValidator()
    {
        RuleFor(x => x.ConsignmentId)
            .NotEmpty().WithMessage("El ID de la consignación es requerido");

        RuleFor(x => x.Lines)
            .NotEmpty().WithMessage("Debe proporcionar al menos una línea para el cierre");

        RuleForEach(x => x.Lines).ChildRules(line =>
        {
            line.RuleFor(x => x.LineId)
                .NotEmpty().WithMessage("El ID de la línea es requerido");

            line.RuleFor(x => x.SoldQty)
                .GreaterThanOrEqualTo(0).WithMessage("La cantidad vendida no puede ser negativa");

            line.RuleFor(x => x.ReturnedQty)
                .GreaterThanOrEqualTo(0).WithMessage("La cantidad devuelta no puede ser negativa");
        });
    }
}
