using Application.Features.Inventories.Common;
using MediatR;

namespace Application.Features.Inventories.Queries.GetInventoryTransactions;

/// <summary>
/// Query to get all transactions for a specific inventory by its ID.
/// </summary>
public sealed record GetInventoryTransactionsQuery(Guid InventoryId) : IRequest<IReadOnlyList<TransactionResponse>>;
