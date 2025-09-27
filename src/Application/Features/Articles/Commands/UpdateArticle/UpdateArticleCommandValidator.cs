using FluentValidation;

namespace Application.Features.Articles.Commands.UpdateArticle;

public class UpdateArticleCommandValidator : AbstractValidator<UpdateArticleCommand>
{
    public UpdateArticleCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre es obligatorio")
            .MaximumLength(80);
        RuleFor(x => x.Description)
            .MaximumLength(250);
        RuleFor(x => x.Sku)
            .MaximumLength(40);
        RuleFor(x => x.SalePrice)
            .GreaterThanOrEqualTo(0).When(x => x.SalePrice.HasValue);
        RuleFor(x => x.ConsignmentPrice)
            .GreaterThanOrEqualTo(0).When(x => x.ConsignmentPrice.HasValue);
    }
}
