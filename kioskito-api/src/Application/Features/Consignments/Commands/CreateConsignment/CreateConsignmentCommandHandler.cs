using Application.Common.Exceptions;
using Application.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;

namespace Application.Features.Consignments.Commands.CreateConsignment;

/// <summary>
/// Handler for creating a new consignment.
/// </summary>
public class CreateConsignmentCommandHandler : IRequestHandler<CreateConsignmentCommand, Guid>
{
    private readonly IUnitOfWork _uow;
    
    public CreateConsignmentCommandHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<Guid> Handle(CreateConsignmentCommand request, CancellationToken cancellationToken)
    {
        // Validar que el cliente exista
        var customer = await _uow.Customers.GetByIdAsync(request.CustomerId, cancellationToken);
        if (customer == null)
            throw new NotFoundException($"Cliente con Id '{request.CustomerId}' no encontrado.");

        // Validar que todos los artículos existan
        var articleIds = request.Lines.Select(l => l.ArticleId).Distinct().ToList();
        var articles = await _uow.Articles.GetAllAsync(cancellationToken);
        var existingArticleIds = articles.Select(a => a.Id).ToHashSet();

        foreach (var articleId in articleIds)
        {
            if (!existingArticleIds.Contains(articleId))
                throw new NotFoundException($"Artículo con Id '{articleId}' no encontrado.");
        }

        // Crear la consignación
        var consignment = new Consignment
        {
            CustomerId = request.CustomerId,
            StartDate = DateTime.UtcNow.AddHours(-3),
            Status = ConsignmentStatus.OPEN,
            Total = 0
        };

        await _uow.Consignments.AddAsync(consignment, cancellationToken);

        // Crear las líneas de consignación
        decimal total = 0;
        foreach (var lineDto in request.Lines)
        {
            var lineTotal = lineDto.DeliveredQty * lineDto.UnitPrice;
            
            var line = new ConsignmentLine
            {
                ConsignmentId = consignment.Id,
                ArticleId = lineDto.ArticleId,
                DeliveredQty = lineDto.DeliveredQty,
                ReturnedQty = 0,
                SoldQty = 0,
                UnitPrice = lineDto.UnitPrice,
                LineTotal = lineTotal
            };

            await _uow.ConsignmentLines.AddAsync(line, cancellationToken);
            total += lineTotal;
        }

        // Actualizar el total de la consignación
        consignment.Total = total;

        await _uow.CommitAsync(cancellationToken);

        return consignment.Id;
    }
}
