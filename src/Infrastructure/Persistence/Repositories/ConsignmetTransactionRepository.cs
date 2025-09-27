using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence.Repositories.Common;

namespace Infrastructure.Persistence.Repositories;

public class ConsignmetTransactionRepository : RepositoryBase<ConsignmetTransaction>, IConsignmetTransactionRepository
{
    public ConsignmetTransactionRepository(AppDbContext context) : base(context) { }
}
