using Application.Interfaces;
using Domain.Interfaces;

namespace Infrastructure.Persistence.Repositories;

/// <summary>
/// Unit of Work implementation for managing repositories.
/// </summary>
public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public IUserRepository Users { get; }
    public IRoleRepository Roles { get; }
    public IArticleRepository Articles { get; }
    public ICustomerRepository Customers { get; }
    public IInventoryRepository Inventories { get; }
    public IConsignmentRepository Consignments { get; }
    public IConsignmentLineRepository ConsignmentLines { get; }
    public IConsignmetTransactionRepository ConsignmentTransactions { get; }
    public ISalesOrderRepository SalesOrders { get; }
    public ISalesOrderLineRepository SalesOrderLines { get; }
    public ITransactionRepository Transactions { get; }
    public IConfigurationRepository Configuration { get; }

    /// <summary>
    /// Initializes a new instance of the <see cref="UnitOfWork"/> class with the specified context.
    /// </summary>
    public UnitOfWork(AppDbContext context)
    {
        _context = context;

        Users = new UserRepository(_context);
        Roles = new RoleRepository(_context);
        Articles = new ArticleRepository(_context);
        Customers = new CustomerRepository(_context);
        Inventories = new InventoryRepository(_context);
        Consignments = new ConsignmentRepository(_context);
        ConsignmentLines = new ConsignmentLineRepository(_context);
        ConsignmentTransactions = new ConsignmetTransactionRepository(_context);
        SalesOrders = new SalesOrderRepository(_context);
        SalesOrderLines = new SalesOrderLineRepository(_context);
        Transactions = new TransactionRepository(_context);
        Configuration = new ConfigurationRepository(_context);
    }

    /// <summary>
    /// Saves all changes made in this context to the database.
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public Task<int> CommitAsync(CancellationToken cancellationToken = default)
        => _context.SaveChangesAsync(cancellationToken);

    /// <summary>
    /// Disposes the Unit of Work and its resources.
    /// </summary>
    public void Dispose()
        => _context.Dispose();
}
