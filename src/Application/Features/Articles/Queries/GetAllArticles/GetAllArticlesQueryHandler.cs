using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Features.Articles.Queries.GetAllArticles;

public class GetAllArticlesQueryHandler : IRequestHandler<GetAllArticlesQuery, IReadOnlyList<Article>>
{
    private readonly IUnitOfWork _uow;
    public GetAllArticlesQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<IReadOnlyList<Article>> Handle(GetAllArticlesQuery request, CancellationToken cancellationToken)
        => await _uow.Articles.GetAllAsync(cancellationToken);
}
