using Domain.Entities;
using Domain.Interfaces.Common;

namespace Domain.Interfaces;

public interface IInventoryRepository : IRepository<Inventory>
{
    Task<Inventory?> GetByIdWithTransactionsAsync(Guid id, CancellationToken cancellationToken = default);
}
