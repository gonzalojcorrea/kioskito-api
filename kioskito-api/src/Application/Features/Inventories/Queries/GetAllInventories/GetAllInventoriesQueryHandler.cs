using Application.Features.Inventories.Common;
using Application.Interfaces;
using Domain.Enums;
using MediatR;

namespace Application.Features.Inventories.Queries.GetAllInventories;

public class GetAllInventoriesQueryHandler : IRequestHandler<GetAllInventoriesQuery, IReadOnlyList<InventoryResponse>>
{
    private readonly IUnitOfWork _uow;
    public GetAllInventoriesQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<IReadOnlyList<InventoryResponse>> Handle(GetAllInventoriesQuery request, CancellationToken cancellationToken)
    {
        var inventories = await _uow.Inventories.GetAllAsync(cancellationToken);
        
        return inventories
            .Select(i => new InventoryResponse(
                i.Id,
                i.ArticleId,
                i.Article?.Sku,
                i.Article?.Name ?? "Sin nombre",
                // Obtener el último precio de compra de las transacciones de tipo PURCHASE
                i.Transactions
                    .Where(t => t.Type == TransactionType.PURCHASE)
                    .OrderByDescending(t => t.Date)
                    .FirstOrDefault()?.UnitCost ?? 0,
                i.Article?.SalePrice,
                i.Article?.ConsignmentPrice,
                i.Quantity,
                MapInventoryStatus(i.Status)
            ))
            .ToList();
    }

    private static string MapInventoryStatus(InventoryStatus status)
    {
        return status switch
        {
            InventoryStatus.ACTIVE => "Activo",
            InventoryStatus.INACTIVE => "Inactivo",
            InventoryStatus.OUT_OF_STOCK => "Sin Stock",
            InventoryStatus.UNDER_STOCK => "Bajo Stock",
            _ => "Desconocido"
        };
    }
}
