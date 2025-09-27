﻿using Domain.Interfaces;

namespace Application.Interfaces;

/// <summary>
/// Unit of Work interface for managing transactions and repositories.
/// </summary>
public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IRoleRepository Roles { get; }

    /// <summary>
    /// Saves all changes made in this context to the database.
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task<int> CommitAsync(CancellationToken cancellationToken = default);
}
