using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence.Repositories.Common;

namespace Infrastructure.Persistence.Repositories;

public class ConsignmentLineRepository : RepositoryBase<ConsignmentLine>, IConsignmentLineRepository
{
    public ConsignmentLineRepository(AppDbContext context) : base(context) { }
}
