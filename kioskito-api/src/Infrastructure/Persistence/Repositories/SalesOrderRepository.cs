using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence.Repositories.Common;

namespace Infrastructure.Persistence.Repositories;

public class SalesOrderRepository : RepositoryBase<SalesOrder>, ISalesOrderRepository
{
    public SalesOrderRepository(AppDbContext context) : base(context) { }
}
