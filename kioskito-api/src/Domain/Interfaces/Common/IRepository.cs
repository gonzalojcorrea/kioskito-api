using Domain.Entities;

namespace Domain.Interfaces.Common;

/// <summary>
/// Aggregate repository interface.
/// </summary>
public interface IRepository<T> : IReadRepository<T>, IWriteRepository<T> where T : BaseEntity { }
