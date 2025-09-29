using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence.Repositories.Common;

namespace Infrastructure.Persistence.Repositories;

public class SalesOrderLineRepository : RepositoryBase<SalesOrderLine>, ISalesOrderLineRepository
{
    public SalesOrderLineRepository(AppDbContext context) : base(context) { }
}
