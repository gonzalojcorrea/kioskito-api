using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence.Repositories.Common;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class ConsignmentRepository : RepositoryBase<Consignment>, IConsignmentRepository
{
    public ConsignmentRepository(AppDbContext context) : base(context) { }

    public async Task<Consignment?> GetByIdWithDetailsAsync(Guid id, CancellationToken cancellationToken = default)
        => await _context.Consignments
            .Include(c => c.Customer)
            .Include(c => c.Lines)
                .ThenInclude(l => l.Article)
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id, cancellationToken);

    public async Task<IReadOnlyList<Consignment>> GetAllWithDetailsAsync(CancellationToken cancellationToken = default)
        => await _context.Consignments
            .Include(c => c.Customer)
            .Include(c => c.Lines)
                .ThenInclude(l => l.Article)
            .AsNoTracking()
            .ToListAsync(cancellationToken);
}
