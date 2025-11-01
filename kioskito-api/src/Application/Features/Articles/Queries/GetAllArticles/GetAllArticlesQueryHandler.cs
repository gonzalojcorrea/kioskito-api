using Application.Features.Articles.Common;
using Application.Interfaces;
using Domain.Enums;
using MediatR;

namespace Application.Features.Articles.Queries.GetAllArticles;

public class GetAllArticlesQueryHandler : IRequestHandler<GetAllArticlesQuery, IReadOnlyList<ArticleResponse>>
{
    private readonly IUnitOfWork _uow;
    public GetAllArticlesQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<IReadOnlyList<ArticleResponse>> Handle(GetAllArticlesQuery request, CancellationToken cancellationToken)
    {
        var articles = await _uow.Articles.GetAllAsync(cancellationToken);
        
        return articles
            .Select(a => new ArticleResponse(
                a.Id,
                a.Name,
                a.Sku,
                // Obtener el precio de costo de la última transacción de compra (PURCHASE)
                a.Inventories.FirstOrDefault()?.Transactions
                    .Where(t => t.Type == TransactionType.PURCHASE)
                    .OrderByDescending(t => t.Date)
                    .FirstOrDefault()?.UnitCost ?? 0,
                a.SalePrice,
                a.ConsignmentPrice,
                a.IsActive ? "Activo" : "Inactivo"
            ))
            .ToList();
    }
}
