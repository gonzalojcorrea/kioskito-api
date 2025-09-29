using Application.Common.Exceptions;
using Application.Interfaces;
using MediatR;

namespace Application.Features.Articles.Commands.UpdateArticle;

public class UpdateArticleCommandHandler : IRequestHandler<UpdateArticleCommand, bool>
{
    private readonly IUnitOfWork _uow;
    public UpdateArticleCommandHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<bool> Handle(UpdateArticleCommand request, CancellationToken cancellationToken)
    {
        var article = await _uow.Articles.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new NotFoundException("Artículo no encontrado");

        var name = request.Name.Trim();

        // Validar duplicados (excluyendo el mismo registro)
        var all = await _uow.Articles.FindAsync(a => a.Name.ToUpper() == name.ToUpper() && a.Id != request.Id, cancellationToken);
        if (all.Any())
            throw new BadRequestException("Ya existe un artículo con el mismo nombre.");

        if (!string.IsNullOrWhiteSpace(request.Sku))
        {
            var skuDup = await _uow.Articles.FindAsync(a => a.Sku != null && a.Sku.ToUpper() == request.Sku!.Trim().ToUpper() && a.Id != request.Id, cancellationToken);
            if (skuDup.Any())
                throw new BadRequestException("Ya existe un artículo con el mismo SKU.");
        }

        article.Name = name;
        article.Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim();
        article.Sku = string.IsNullOrWhiteSpace(request.Sku) ? null : request.Sku.Trim();
        article.SalePrice = request.SalePrice;
        article.ConsignmentPrice = request.ConsignmentPrice;

        _uow.Articles.Update(article);
        await _uow.CommitAsync(cancellationToken);
        return true;
    }
}
