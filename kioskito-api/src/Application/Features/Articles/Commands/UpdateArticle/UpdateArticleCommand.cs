using MediatR;

namespace Application.Features.Articles.Commands.UpdateArticle;

public sealed record UpdateArticleCommand(
    Guid Id,
    string Name,
    string? Description,
    string? Sku,
    decimal? SalePrice,
    decimal? ConsignmentPrice
) : IRequest<bool>;
