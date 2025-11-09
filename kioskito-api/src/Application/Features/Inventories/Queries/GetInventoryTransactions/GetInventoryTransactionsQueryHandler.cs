using Application.Common.Exceptions;
using Application.Features.Inventories.Common;
using Application.Interfaces;
using Domain.Extensions;
using MediatR;

namespace Application.Features.Inventories.Queries.GetInventoryTransactions;

/// <summary>
/// Handler for getting all transactions of a specific inventory.
/// </summary>
public class GetInventoryTransactionsQueryHandler : IRequestHandler<GetInventoryTransactionsQuery, IReadOnlyList<TransactionResponse>>
{
    private readonly IUnitOfWork _uow;
    
    public GetInventoryTransactionsQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<IReadOnlyList<TransactionResponse>> Handle(GetInventoryTransactionsQuery request, CancellationToken cancellationToken)
    {
        // Obtener el inventario con sus transacciones y usuarios
        var inventory = await _uow.Inventories.GetByIdWithTransactionsAsync(request.InventoryId, cancellationToken);
        
        if (inventory == null)
            throw new NotFoundException($"Inventario con Id '{request.InventoryId}' no encontrado.");

        // Mapear las transacciones a la respuesta
        return inventory.Transactions
            .OrderByDescending(t => t.Date)
            .Select(t => new TransactionResponse(
                t.Id,
                t.InventoryId,
                t.UserId,
                t.User != null ? $"{t.User.Name} {t.User.LastName}" : "Usuario desconocido",
                t.Type.GetDescription(),
                t.Quantity,
                t.Date,
                t.Note,
                t.UnitCost
            ))
            .ToList();
    }
}
