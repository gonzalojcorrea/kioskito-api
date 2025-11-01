using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence.Repositories.Common;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class InventoryRepository : RepositoryBase<Inventory>, IInventoryRepository
{
    public InventoryRepository(AppDbContext context) : base(context) { }

    public override async Task<IReadOnlyList<Inventory>> GetAllAsync(CancellationToken cancellationToken = default)
        => await _context.Inventories
            .Include(i => i.Article)
            .Include(i => i.Transactions)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
}
