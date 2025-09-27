using Domain.Entities;
using Domain.Interfaces.Common;

namespace Domain.Interfaces;

/// <summary>
/// Repository interface for managing articles.
/// </summary>
public interface IArticleRepository : IRepository<Article>
{
    Task<bool> ExistsByNameAsync(string name, CancellationToken cancellationToken = default);
    Task<bool> ExistsBySkuAsync(string sku, CancellationToken cancellationToken = default);
}
