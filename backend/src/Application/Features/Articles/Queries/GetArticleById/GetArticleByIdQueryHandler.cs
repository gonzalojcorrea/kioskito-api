using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Features.Articles.Queries.GetArticleById;

public class GetArticleByIdQueryHandler : IRequestHandler<GetArticleByIdQuery, Article?>
{
    private readonly IUnitOfWork _uow;
    public GetArticleByIdQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<Article?> Handle(GetArticleByIdQuery request, CancellationToken cancellationToken)
        => await _uow.Articles.GetByIdAsync(request.Id, cancellationToken);
}
