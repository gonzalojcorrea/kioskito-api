using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Persistence.Repositories.Common;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

/// <summary>
/// Repository for managing articles.
/// </summary>
public class ArticleRepository : RepositoryBase<Article>, IArticleRepository
{
    public ArticleRepository(AppDbContext context) : base(context) { }

    public override async Task<IReadOnlyList<Article>> GetAllAsync(CancellationToken cancellationToken = default)
        => await _context.Articles
            .Include(a => a.Inventories)
                .ThenInclude(i => i.Transactions)
            .AsNoTracking()
            .ToListAsync(cancellationToken);

    public Task<bool> ExistsByNameAsync(string name, CancellationToken cancellationToken = default)
        => _context.Articles.AnyAsync(a => a.Name.ToUpper() == name.ToUpper(), cancellationToken);

    public Task<bool> ExistsBySkuAsync(string sku, CancellationToken cancellationToken = default)
        => _context.Articles.AnyAsync(a => a.Sku != null && a.Sku.ToUpper() == sku.ToUpper(), cancellationToken);
}
