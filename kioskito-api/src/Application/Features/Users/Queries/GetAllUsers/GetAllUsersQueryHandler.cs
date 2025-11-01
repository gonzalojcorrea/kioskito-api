using Application.Features.Users.Common;
using Application.Interfaces;
using MediatR;

namespace Application.Features.Users.Queries.GetAllUsers;

public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IReadOnlyList<UserResponse>>
{
    private readonly IUnitOfWork _uow;
    public GetAllUsersQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<IReadOnlyList<UserResponse>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
    {
        var users = await _uow.Users.GetAllAsync(cancellationToken);
        
        return users
            .Select(u => new UserResponse(
                u.Id,
                $"{u.Name} {u.LastName}",
                u.Email,
                u.Role?.Name ?? "Sin rol",
                u.CreatedAt
            ))
            .ToList();
    }
}
