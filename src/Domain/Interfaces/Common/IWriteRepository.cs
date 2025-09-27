using Domain.Entities;

namespace Domain.Interfaces.Common;

/// <summary>
/// Basic write operations.
/// </summary>
public interface IWriteRepository<T> where T : BaseEntity
{
    Task AddAsync(T entity, CancellationToken cancellationToken = default);
    Task AddRangeAsync(IEnumerable<T> entities, CancellationToken cancellationToken = default);
    void Update(T entity);
    void Remove(T entity);
}
