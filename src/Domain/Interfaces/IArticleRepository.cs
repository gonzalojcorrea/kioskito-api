using Domain.Entities;

namespace Domain.Interfaces;

/// <summary>
/// Repository interface for managing articles.
/// </summary>
public interface IArticleRepository
{
    Task AddAsync(Article article, CancellationToken cancellationToken = default);
    Task<bool> ExistsByNameAsync(string name, CancellationToken cancellationToken = default);
    Task<bool> ExistsBySkuAsync(string sku, CancellationToken cancellationToken = default);
}
