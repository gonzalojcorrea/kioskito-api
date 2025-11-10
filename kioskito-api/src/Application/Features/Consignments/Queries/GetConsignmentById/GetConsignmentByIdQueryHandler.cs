using Application.Common.Exceptions;
using Application.Features.Consignments.Common;
using Application.Interfaces;
using Domain.Extensions;
using MediatR;

namespace Application.Features.Consignments.Queries.GetConsignmentById;

/// <summary>
/// Handler for getting a consignment by ID with full details.
/// </summary>
public class GetConsignmentByIdQueryHandler : IRequestHandler<GetConsignmentByIdQuery, ConsignmentDetailResponse?>
{
    private readonly IUnitOfWork _uow;
    
    public GetConsignmentByIdQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<ConsignmentDetailResponse?> Handle(GetConsignmentByIdQuery request, CancellationToken cancellationToken)
    {
        var consignment = await _uow.Consignments.GetByIdWithDetailsAsync(request.ConsignmentId, cancellationToken);
        
        if (consignment == null)
            throw new NotFoundException($"Consignment with ID '{request.ConsignmentId}' not found.");

        var lines = consignment.Lines
            .Select(l => new ConsignmentLineDto(
                l.Id,
                l.ArticleId,
                l.Article?.Name ?? "Artículo desconocido",
                l.Article?.Sku,
                l.DeliveredQty,
                l.ReturnedQty,
                l.SoldQty,
                l.UnitPrice,
                l.LineTotal
            ))
            .ToList();

        return new ConsignmentDetailResponse(
            consignment.Id,
            consignment.CustomerId,
            consignment.Customer?.Name ?? "Cliente desconocido",
            consignment.Customer?.Email ?? "",
            consignment.Customer?.Phone ?? "",
            consignment.StartDate,
            consignment.EndDate,
            consignment.Status.GetDescription(),
            consignment.Total,
            lines
        );
    }
}
