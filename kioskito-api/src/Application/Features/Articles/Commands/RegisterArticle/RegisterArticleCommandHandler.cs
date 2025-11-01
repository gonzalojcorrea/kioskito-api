using Application.Common.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Features.Articles.Commands.RegisterArticle;

/// <summary>
/// Handler for registering a new article.
/// </summary>
public class RegisterArticleCommandHandler : IRequestHandler<RegisterArticleCommand, Guid>
{
    private readonly IUnitOfWork _uow;
    private readonly ICurrentUserService _currentUserService;

    public RegisterArticleCommandHandler(IUnitOfWork uow, ICurrentUserService currentUserService)
    {
        _uow = uow;
        _currentUserService = currentUserService;
    }

    public async Task<Guid> Handle(RegisterArticleCommand request, CancellationToken cancellationToken)
    {
        var name = request.Name.Trim();

        if (await _uow.Articles.ExistsByNameAsync(name, cancellationToken))
            throw new BadRequestException("Ya existe un artículo con el mismo nombre.");

        if (!string.IsNullOrWhiteSpace(request.Sku) && await _uow.Articles.ExistsBySkuAsync(request.Sku.Trim(), cancellationToken))
            throw new BadRequestException("Ya existe un artículo con el mismo SKU.");

        // Crear el artículo
        var article = new Article
        {
            Name = name,
            Description = string.IsNullOrWhiteSpace(request.Description) ? null : request.Description.Trim(),
            Sku = string.IsNullOrWhiteSpace(request.Sku) ? null : request.Sku.Trim(),
            SalePrice = request.SalePrice,
            ConsignmentPrice = request.ConsignmentPrice
        };

        await _uow.Articles.AddAsync(article, cancellationToken);
        
        // Determinar el estado del inventario basado en la cantidad inicial
        var inventoryStatus = request.InitialQuantity > 0 
            ? InventoryStatus.ACTIVE 
            : InventoryStatus.OUT_OF_STOCK;

        // Crear el inventario automáticamente
        var inventory = new Inventory
        {
            ArticleId = article.Id,
            Quantity = request.InitialQuantity,
            MinStock = request.MinStock, // Usar el valor del comando
            Status = inventoryStatus,
            AvgCost = request.UnitCost
        };

        await _uow.Inventories.AddAsync(inventory, cancellationToken);

        // Crear la primera transacción si la cantidad inicial es mayor a 0
        if (request.InitialQuantity > 0)
        {
            // Obtener el ID del usuario autenticado desde el token JWT
            var currentUserId = _currentUserService.GetUserId();
            
            // Si no hay usuario autenticado, usar el primer usuario del sistema (fallback)
            if (currentUserId == null)
            {
                var firstUser = (await _uow.Users.GetAllAsync(cancellationToken)).FirstOrDefault();
                
                if (firstUser == null)
                    throw new BadRequestException("No se encontró un usuario para registrar la transacción inicial.");
                
                currentUserId = firstUser.Id;
            }

            var transaction = new Transaction
            {
                InventoryId = inventory.Id,
                UserId = currentUserId.Value,
                Type = TransactionType.PURCHASE,
                Quantity = request.InitialQuantity,
                Date = DateTime.UtcNow,
                Note = "Alta de producto",
                UnitCost = request.UnitCost
            };

            await _uow.Transactions.AddAsync(transaction, cancellationToken);
        }

        await _uow.CommitAsync(cancellationToken);

        return article.Id;
    }
}
