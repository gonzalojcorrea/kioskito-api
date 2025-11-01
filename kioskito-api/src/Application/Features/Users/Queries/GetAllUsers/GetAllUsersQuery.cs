using Application.Features.Users.Common;
using MediatR;

namespace Application.Features.Users.Queries.GetAllUsers;

public sealed record GetAllUsersQuery : IRequest<IReadOnlyList<UserResponse>>;
