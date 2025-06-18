using Application.Common.Exceptions;
using Application.Interfaces;
using Domain.Entities.Inventory;
using Domain.Entities.Inventory.Enums;
using MediatR;

namespace Application.Features.Inventory.Commands.CreateItem;

public class CreateItemCommandHandler : IRequestHandler<CreateItemCommand, string>
{
    private readonly IUnitOfWork _uof;

    public CreateItemCommandHandler(IUnitOfWork uof)
    {
        _uof = uof;
    }

    public async Task<string> Handle(CreateItemCommand request, CancellationToken cancellationToken)
    {
        if (await _uof.InventoryItems.GetByProductCodeAsync(request.ProductCode) is not null)
            throw new BadRequestException($"Un item con el código:'{request.ProductCode}' ya está registrado.");

        var item = new InventoryItem
        {
            ProductCode = request.ProductCode,
            Name = request.Name,
            Description = request.Description,
            Quantity = request.Quantity,
            MinQuantity = request.MinQuantity
        };

        var stockMovement = new StockMovement
        {
            InventoryItemId = item.Id,
            MovementTypeEnum = EMovementType.In,
            UnitPrice = request.UnitPrice.Value,
            Quantity = request.Quantity,
            MovementDate = DateTime.UtcNow,
            Reference = "Carga inicial.",
        };

        item.StockMovements.Add(stockMovement);

        await _uof.InventoryItems.AddAsync(item, cancellationToken);
        await _uof.CommitAsync(cancellationToken);

        return "Item creado correctamente.";
    }
}
