using Domain.Interfaces;

namespace Application.Interfaces;

/// <summary>
/// Unit of Work interface for managing transactions and repositories.
/// </summary>
public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IRoleRepository Roles { get; }
    IArticleRepository Articles { get; }
    ICustomerRepository Customers { get; }
    IInventoryRepository Inventories { get; }
    IConsignmentRepository Consignments { get; }
    IConsignmentLineRepository ConsignmentLines { get; }
    IConsignmetTransactionRepository ConsignmentTransactions { get; }
    ISalesOrderRepository SalesOrders { get; }
    ISalesOrderLineRepository SalesOrderLines { get; }
    ITransactionRepository Transactions { get; }
    IConfigurationRepository Configuration { get; }

    /// <summary>
    /// Saves all changes made in this context to the database.
    /// </summary>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    Task<int> CommitAsync(CancellationToken cancellationToken = default);
}
