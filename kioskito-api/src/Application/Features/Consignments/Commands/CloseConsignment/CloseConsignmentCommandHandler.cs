using Application.Common.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Features.Consignments.Commands.CloseConsignment;

public class CloseConsignmentCommandHandler : IRequestHandler<CloseConsignmentCommand, CloseConsignmentResponse>
{
    private readonly IUnitOfWork _uow;
    private readonly ICurrentUserService _currentUser;

    public CloseConsignmentCommandHandler(IUnitOfWork uow, ICurrentUserService currentUser)
    {
        _uow = uow;
        _currentUser = currentUser;
    }

    public async Task<CloseConsignmentResponse> Handle(CloseConsignmentCommand request, CancellationToken cancellationToken)
    {
        // 1. Obtener la consignación con todos los detalles
        var consignment = await _uow.Consignments.GetByIdWithDetailsAsync(request.ConsignmentId, cancellationToken)
            ?? throw new NotFoundException("Consignación no encontrada");

        if (consignment.Status != ConsignmentStatus.OPEN)
            throw new BadRequestException("La consignación no está en estado OPEN y no puede ser cerrada");

        // 2. Actualizar las cantidades vendidas y devueltas en cada línea
        int totalItemsSold = 0;
        int totalItemsReturned = 0;
        decimal totalSalesAmount = 0;

        foreach (var lineUpdate in request.Lines)
        {
            var line = consignment.Lines.FirstOrDefault(l => l.Id == lineUpdate.LineId)
                ?? throw new NotFoundException($"Línea de consignación {lineUpdate.LineId} no encontrada");

            // Validar que las cantidades sean correctas
            var totalAccounted = lineUpdate.SoldQty + lineUpdate.ReturnedQty;
            if (totalAccounted > line.DeliveredQty)
                throw new BadRequestException($"La suma de vendidos ({lineUpdate.SoldQty}) y devueltos ({lineUpdate.ReturnedQty}) " +
                    $"no puede ser mayor a la cantidad entregada ({line.DeliveredQty}) para el artículo {line.Article?.Name}");

            line.SoldQty = lineUpdate.SoldQty;
            line.ReturnedQty = lineUpdate.ReturnedQty;
            line.LineTotal = line.SoldQty * line.UnitPrice;

            totalItemsSold += line.SoldQty;
            totalItemsReturned += line.ReturnedQty;
            totalSalesAmount += line.LineTotal;

            // Actualizar inventario: devolver al stock los artículos devueltos
            if (line.ReturnedQty > 0)
            {
                var inventories = await _uow.Inventories.FindAsync(i => i.ArticleId == line.ArticleId, cancellationToken);
                var inventory = inventories.FirstOrDefault();

                if (inventory != null)
                {
                    inventory.Quantity += line.ReturnedQty;
                }
            }
        }

        // 3. Crear orden de venta si hay artículos vendidos
        Guid? salesOrderId = null;
        if (totalItemsSold > 0)
        {
            var salesOrder = new SalesOrder
            {
                CustomerId = consignment.CustomerId,
                ConsignmentId = consignment.Id,
                OrderDate = DateTime.UtcNow.AddHours(-3),
                Total = totalSalesAmount,
                Status = SalesOrderStatus.PAID,
                Items = consignment.Lines
                    .Where(l => l.SoldQty > 0)
                    .Select(l => new SalesOrderLine
                    {
                        ArticleId = l.ArticleId,
                        Quantity = l.SoldQty,
                        SalePrice = l.UnitPrice,
                        LineTotal = l.SoldQty * l.UnitPrice
                    }).ToList()
            };

            await _uow.SalesOrders.AddAsync(salesOrder, cancellationToken);
            salesOrderId = salesOrder.Id;
        }

        // 4. Crear nueva consignación con artículos pendientes (no vendidos ni devueltos)
        Guid? newConsignmentId = null;
        int totalItemsMovedToNewConsignment = 0;

        if (request.CreateNewConsignmentForPending)
        {
            var pendingLines = consignment.Lines
                .Select(l => new
                {
                    Line = l,
                    PendingQty = l.DeliveredQty - l.SoldQty - l.ReturnedQty
                })
                .Where(x => x.PendingQty > 0)
                .ToList();

            if (pendingLines.Any())
            {
                var newConsignment = new Consignment
                {
                    CustomerId = consignment.CustomerId,
                    StartDate = DateTime.UtcNow.AddHours(-3),
                    Status = ConsignmentStatus.OPEN,
                    Lines = pendingLines.Select(x => new ConsignmentLine
                    {
                        ArticleId = x.Line.ArticleId,
                        DeliveredQty = x.PendingQty,
                        ReturnedQty = 0,
                        SoldQty = 0,
                        UnitPrice = x.Line.UnitPrice,
                        LineTotal = 0
                    }).ToList()
                };

                newConsignment.Total = newConsignment.Lines.Sum(l => l.DeliveredQty * l.UnitPrice);

                await _uow.Consignments.AddAsync(newConsignment, cancellationToken);
                newConsignmentId = newConsignment.Id;
                totalItemsMovedToNewConsignment = pendingLines.Sum(x => x.PendingQty);
            }
        }
        else
        {
            // Si no se crea nueva consignación, devolver todos los pendientes al inventario
            foreach (var line in consignment.Lines)
            {
                var pendingQty = line.DeliveredQty - line.SoldQty - line.ReturnedQty;
                if (pendingQty > 0)
                {
                    var inventories = await _uow.Inventories
                        .FindAsync(i => i.ArticleId == line.ArticleId, cancellationToken);
                    var inventory = inventories.FirstOrDefault();

                    if (inventory != null)
                    {
                        inventory.Quantity += pendingQty;
                        totalItemsReturned += pendingQty;
                    }
                }
            }
        }

        // 5. Cerrar la consignación original
        consignment.Status = ConsignmentStatus.CLOSED;
        consignment.EndDate = DateTime.UtcNow.AddHours(-3);
        consignment.Total = totalSalesAmount;
        
        _uow.Consignments.Update(consignment);

        // 6. Guardar todos los cambios
        await _uow.CommitAsync(cancellationToken);

        // 7. Construir respuesta
        var message = $"Consignación cerrada exitosamente. ";
        if (salesOrderId.HasValue)
            message += $"Se creó la orden de venta con total ${totalSalesAmount:N2}. ";
        if (newConsignmentId.HasValue)
            message += $"Se creó una nueva consignación con {totalItemsMovedToNewConsignment} artículos pendientes. ";
        else if (totalItemsReturned > 0)
            message += $"Se devolvieron {totalItemsReturned} artículos al inventario.";

        return new CloseConsignmentResponse
        {
            ClosedConsignmentId = consignment.Id,
            SalesOrderId = salesOrderId,
            NewConsignmentId = newConsignmentId,
            TotalSalesAmount = totalSalesAmount,
            TotalItemsSold = totalItemsSold,
            TotalItemsReturned = totalItemsReturned,
            TotalItemsMovedToNewConsignment = totalItemsMovedToNewConsignment,
            Message = message
        };
    }
}
