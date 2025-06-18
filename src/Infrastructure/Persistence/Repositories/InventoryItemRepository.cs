using Domain.Entities.Inventory;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class InventoryItemRepository : IInventoryItemRepository
{
    private readonly AppDbContext _context;

    public InventoryItemRepository(AppDbContext context) => _context = context;

    public async Task<InventoryItem?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        => await _context.InventoryItems.FindAsync(new object[] { id }, cancellationToken);

    public async Task<InventoryItem?> GetByProductCodeAsync(string productCode, CancellationToken cancellationToken = default)
        => await _context.InventoryItems
            .Include(i => i.StockMovements)
            .FirstOrDefaultAsync(i => i.ProductCode.ToUpper() == productCode.ToUpper(), cancellationToken);

    public async Task<IEnumerable<InventoryItem>> GetAllAsync(CancellationToken cancellationToken = default)
        => await _context.InventoryItems.ToListAsync(cancellationToken);

    public async Task AddAsync(InventoryItem item, CancellationToken cancellationToken = default)
        => await _context.InventoryItems.AddAsync(item, cancellationToken);
}
