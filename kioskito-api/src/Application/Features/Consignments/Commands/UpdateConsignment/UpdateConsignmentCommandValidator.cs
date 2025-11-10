using FluentValidation;

namespace Application.Features.Consignments.Commands.UpdateConsignment;

/// <summary>
/// Validator for UpdateConsignmentCommand.
/// </summary>
public class UpdateConsignmentCommandValidator : AbstractValidator<UpdateConsignmentCommand>
{
    public UpdateConsignmentCommandValidator()
    {
        RuleFor(x => x.ConsignmentId)
            .NotEmpty()
            .WithMessage("El ID de la consignación es requerido.");

        RuleFor(x => x.Status)
            .IsInEnum()
            .WithMessage("El estado de la consignación no es válido.");
    }
}
