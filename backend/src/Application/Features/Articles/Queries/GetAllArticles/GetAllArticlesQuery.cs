using Domain.Entities;
using MediatR;

namespace Application.Features.Articles.Queries.GetAllArticles;

public sealed record GetAllArticlesQuery : IRequest<IReadOnlyList<Article>>;
