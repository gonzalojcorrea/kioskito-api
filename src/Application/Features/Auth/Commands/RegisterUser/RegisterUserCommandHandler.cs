using Application.Common.Exceptions;
using Application.Interfaces;
using Domain.Entities.Auth;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Auth.Commands.RegisterUser;

/// <summary>
/// Command to register a new user.
/// </summary>
public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, string>
{
    private readonly IUnitOfWork _uof;
    private readonly IPasswordHasher<User> _passwordHasher;
    private readonly IJwtService _jwtTokenGenerator;

    public RegisterUserCommandHandler(
        IUnitOfWork uof,
        IPasswordHasher<User> passwordHasher,
        IJwtService jwtTokenGenerator)
    {
        _uof = uof;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<string> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var normalizedEmail = request.Email.Trim();

        // Validate the request (email uniqueness)
        if (await _uof.Users.GetByEmailAsync(normalizedEmail, cancellationToken) is not null)
            throw new BadRequestException("El email ingresado ya está en uso.");

        // Check if the role exists by Id
        var role = await _uof.Roles.GetByIdAsync(request.RoleId, cancellationToken)
            ?? throw new NotFoundException($"El rol '{request.RoleId}' no existe.");

        // Create a new user
        var user = new User
        {
            Name = request.Name.Trim(),
            LastName = request.LastName.Trim(),
            Email = normalizedEmail,
            RoleId = role.Id,
        };

        // Hash the password
        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

        // Add the user to the database
        await _uof.Users.AddAsync(user, cancellationToken);
        await _uof.CommitAsync(cancellationToken);

        // Generate a JWT token for the user
        return _jwtTokenGenerator.GenerateToken(user);
    }
}
