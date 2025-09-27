using Application.Common.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Features.Articles.Commands.RegisterArticle;

/// <summary>
/// Handler for registering a new article.
/// </summary>
public class RegisterArticleCommandHandler : IRequestHandler<RegisterArticleCommand, Guid>
{
    private readonly IUnitOfWork _uow;

    public RegisterArticleCommandHandler(IUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task<Guid> Handle(RegisterArticleCommand request, CancellationToken cancellationToken)
    {
        var name = request.Name.Trim();

        if (await _uow.Articles.ExistsByNameAsync(name, cancellationToken))
            throw new BadRequestException("Ya existe un artículo con el mismo nombre.");

        if (!string.IsNullOrWhiteSpace(request.Sku) && await _uow.Articles.ExistsBySkuAsync(request.Sku.Trim(), cancellationToken))
            throw new BadRequestException("Ya existe un artículo con el mismo SKU.");

        var article = new Article
        {
            Name = name,
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
            Sku = string.IsNullOrWhiteSpace(request.Sku) ? null : request.Sku.Trim(),
            SalePrice = request.SalePrice,
            ConsignmentPrice = request.ConsignmentPrice
        };

        await _uow.Articles.AddAsync(article, cancellationToken);
        await _uow.CommitAsync(cancellationToken);

        return article.Id;
    }
}
