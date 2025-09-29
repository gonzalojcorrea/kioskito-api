﻿using Application.Common.Exceptions;
using Application.Features.Auth.Commands.RegisterUser;
using Application.Interfaces;
using Domain.Entities;
using Domain.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Identity;
using Moq;

namespace Application.Tests.Features.Auth.Commands;

/// <summary>
/// Unit tests for RegisterUserCommandHandler.
/// </summary>
public class RegisterUserCommandHandlerTests
{
    private readonly Mock<IUnitOfWork> _uofMock;
    private readonly Mock<IUserRepository> _userRepoMock;
    private readonly Mock<IRoleRepository> _roleRepoMock;
    private readonly Mock<IPasswordHasher<User>> _hasherMock;
    private readonly Mock<IJwtService> _jwtMock;
    private readonly RegisterUserCommandHandler _handler;

    public RegisterUserCommandHandlerTests()
    {
        _uofMock = new Mock<IUnitOfWork>();
        _userRepoMock = new Mock<IUserRepository>();
        _roleRepoMock = new Mock<IRoleRepository>();
        _hasherMock = new Mock<IPasswordHasher<User>>();
        _jwtMock = new Mock<IJwtService>();

        _uofMock.Setup(u => u.Users).Returns(_userRepoMock.Object);
        _uofMock.Setup(u => u.Roles).Returns(_roleRepoMock.Object);
        _uofMock.Setup(u => u.CommitAsync(It.IsAny<CancellationToken>())).ReturnsAsync(1);

        _handler = new RegisterUserCommandHandler(_uofMock.Object, _hasherMock.Object, _jwtMock.Object);
    }

    /// <summary>
    /// Test to ensure that when a user with the same username already exists,
    /// </summary>
    /// <returns></returns>
    [Fact]
    public async Task Handle_WhenUsernameAlreadyExists_ThrowsBadRequestException()
    {
        // Arrange: command with duplicate username
        var cmd = new RegisterUserCommand("Test", "User", "user@mail.com", "pass123", Guid.NewGuid());
        _userRepoMock
            .Setup(r => r.GetByEmailAsync(cmd.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync(new User());

        // Act: handle the command
        Func<Task> act = () => _handler.Handle(cmd, CancellationToken.None);

        // Assert: check that a BadRequestException is thrown
        await act.Should()
            .ThrowAsync<BadRequestException>()
            .WithMessage("El email ingresado ya está en uso.");
    }

    /// <summary>
    /// Test to ensure that when a role does not exist,
    /// </summary>
    /// <returns></returns>
    [Fact]
    public async Task Handle_WhenRoleDoesNotExist_ThrowsNotFoundException()
    {
        // Arrange: command with unique username and non-existing role
        var roleId = Guid.NewGuid();
        var cmd = new RegisterUserCommand("Test", "User", "user@mail.com", "pass123", roleId);
        _userRepoMock
            .Setup(r => r.GetByEmailAsync(cmd.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync((User)null);
        _roleRepoMock
            .Setup(r => r.GetByIdAsync(cmd.RoleId, It.IsAny<CancellationToken>()))
            .ReturnsAsync((Role)null);

        // Act: handle the command
        Func<Task> act = () => _handler.Handle(cmd, CancellationToken.None);

        // Assert: check that a NotFoundException is thrown
        await act.Should()
            .ThrowAsync<NotFoundException>()
            .WithMessage($"El rol '{roleId}' no existe.");
    }

    /// <summary>
    /// Test to ensure that when a user is registered successfully,
    /// </summary>
    /// <returns></returns>
    [Fact]
    public async Task Handle_WhenValidRequest_ReturnsJwtToken()
    {
        // Arrange: command with unique username and existing role
        var roleId = Guid.NewGuid();
        var cmd = new RegisterUserCommand("Test", "User", "user@mail.com", "secret", roleId);
        var role = new Role { Id = roleId, Name = "User" };

        // Mock the user repository to return null for the username
        _userRepoMock
            .Setup(r => r.GetByEmailAsync(cmd.Email, It.IsAny<CancellationToken>()))
            .ReturnsAsync((User)null);
        _roleRepoMock
            .Setup(r => r.GetByIdAsync(cmd.RoleId, It.IsAny<CancellationToken>()))
            .ReturnsAsync(role);
        _hasherMock
            .Setup(h => h.HashPassword(It.IsAny<User>(), cmd.Password))
            .Returns("hashed-password");
        _jwtMock
            .Setup(j => j.GenerateToken(It.IsAny<User>()))
            .Returns("mocked-token");

        // Act: handle the command
        var token = await _handler.Handle(cmd, CancellationToken.None);

        // Assert: check that the user was added and the token was generated
        token.Should().Be("mocked-token");
        _userRepoMock.Verify(r => r.AddAsync(It.Is<User>(u =>
            u.Email == cmd.Email &&
            u.RoleId == role.Id &&
            u.PasswordHash == "hashed-password"
        ), It.IsAny<CancellationToken>()), Times.Once);
        _uofMock.Verify(u => u.CommitAsync(It.IsAny<CancellationToken>()), Times.Once);
    }
}
