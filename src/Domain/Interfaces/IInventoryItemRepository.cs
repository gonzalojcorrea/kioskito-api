using Domain.Entities.Inventory;

namespace Domain.Interfaces;

public interface IInventoryItemRepository
{
    /// <summary>
    /// Retrieves an inventory item by its ID.
    /// </summary>
    /// <param name="id">The ID of the inventory item.</param>
    /// <param name="cancellationToken">Cancellation token for the operation.</param>
    /// <returns>The inventory item if found, otherwise null.</returns>
    Task<InventoryItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves an inventory item by its product code.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task<InventoryItem?> GetByProductCodeAsync(string productCode, CancellationToken cancellationToken = default);

    /// <summary>
    /// Retrieves all inventory items.
    /// </summary>
    /// <param name="cancellationToken">Cancellation token for the operation.</param>
    /// <returns>A list of all inventory items.</returns>
    Task<IEnumerable<InventoryItem>> GetAllAsync(CancellationToken cancellationToken = default);

    /// <summary>
    /// Adds a new inventory item to the repository.
    /// </summary>
    /// <param name="item"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task AddAsync(InventoryItem item, CancellationToken cancellationToken = default);
}
