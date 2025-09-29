using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence.Repositories.Common;

namespace Infrastructure.Persistence.Repositories;

public class ConsignmentRepository : RepositoryBase<Consignment>, IConsignmentRepository
{
    public ConsignmentRepository(AppDbContext context) : base(context) { }
}
