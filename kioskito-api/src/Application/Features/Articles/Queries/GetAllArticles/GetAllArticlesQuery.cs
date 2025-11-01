using Application.Features.Articles.Common;
using MediatR;

namespace Application.Features.Articles.Queries.GetAllArticles;

public sealed record GetAllArticlesQuery : IRequest<IReadOnlyList<ArticleResponse>>;
