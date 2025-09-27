using Domain.Entities;
using MediatR;

namespace Application.Features.Articles.Queries.GetArticleById;

public sealed record GetArticleByIdQuery(Guid Id) : IRequest<Article?>;
