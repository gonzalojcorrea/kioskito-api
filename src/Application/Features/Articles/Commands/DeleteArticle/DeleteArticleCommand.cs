using MediatR;

namespace Application.Features.Articles.Commands.DeleteArticle;

public sealed record DeleteArticleCommand(Guid Id) : IRequest<bool>;
