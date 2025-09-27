using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence.Repositories.Common;

namespace Infrastructure.Persistence.Repositories;

public class InventoryRepository : RepositoryBase<Inventory>, IInventoryRepository
{
    public InventoryRepository(AppDbContext context) : base(context) { }
}
