using Domain.Entities;
using System.Linq.Expressions;

namespace Domain.Interfaces.Common;

/// <summary>
/// Basic read operations.
/// </summary>
public interface IReadRepository<T> where T : BaseEntity
{
    Task<T?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<T>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<IReadOnlyList<T>> FindAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default);
}
