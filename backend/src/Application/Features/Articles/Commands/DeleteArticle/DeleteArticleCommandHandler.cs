using Application.Common.Exceptions;
using Application.Interfaces;
using MediatR;

namespace Application.Features.Articles.Commands.DeleteArticle;

public class DeleteArticleCommandHandler : IRequestHandler<DeleteArticleCommand, bool>
{
    private readonly IUnitOfWork _uow;
    public DeleteArticleCommandHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<bool> Handle(DeleteArticleCommand request, CancellationToken cancellationToken)
    {
        var article = await _uow.Articles.GetByIdAsync(request.Id, cancellationToken)
            ?? throw new NotFoundException("Artículo no encontrado");

        _uow.Articles.Remove(article);
        await _uow.CommitAsync(cancellationToken);
        return true;
    }
}
