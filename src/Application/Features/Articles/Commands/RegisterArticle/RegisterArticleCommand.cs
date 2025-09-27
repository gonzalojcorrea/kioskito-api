using MediatR;

namespace Application.Features.Articles.Commands.RegisterArticle;

/// <summary>
/// Command to register a new article.
/// </summary>
public sealed record RegisterArticleCommand(
    string Name,
    string? Description,
    string? Sku,
    decimal? SalePrice,
    decimal? ConsignmentPrice
) : IRequest<Guid>;
