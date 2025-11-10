using Domain.Entities;
using Domain.Interfaces.Common;

namespace Domain.Interfaces;

public interface IConsignmentRepository : IRepository<Consignment>
{
    Task<Consignment?> GetByIdWithDetailsAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<Consignment>> GetAllWithDetailsAsync(CancellationToken cancellationToken = default);
}
