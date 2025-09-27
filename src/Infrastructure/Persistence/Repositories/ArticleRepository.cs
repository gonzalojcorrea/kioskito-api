using Domain.Entities;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

/// <summary>
/// Repository for managing articles.
/// </summary>
public class ArticleRepository : IArticleRepository
{
    private readonly AppDbContext _context;
    public ArticleRepository(AppDbContext context) => _context = context;

    public async Task AddAsync(Article article, CancellationToken cancellationToken = default)
        => await _context.Articles.AddAsync(article, cancellationToken);

    public Task<bool> ExistsByNameAsync(string name, CancellationToken cancellationToken = default)
        => _context.Articles.AnyAsync(a => a.Name.ToUpper() == name.ToUpper(), cancellationToken);

    public Task<bool> ExistsBySkuAsync(string sku, CancellationToken cancellationToken = default)
        => _context.Articles.AnyAsync(a => a.Sku != null && a.Sku.ToUpper() == sku.ToUpper(), cancellationToken);
}
