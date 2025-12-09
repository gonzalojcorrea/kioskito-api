using Application.Common.Exceptions;
using Application.Interfaces;
using Domain.Enums;
using MediatR;

namespace Application.Features.Consignments.Queries.GetConsignmentClosureDetail;

public class GetConsignmentClosureDetailQueryHandler
    : IRequestHandler<GetConsignmentClosureDetailQuery, ConsignmentClosureDetailResponse>
{
    private readonly IUnitOfWork _uow;

    public GetConsignmentClosureDetailQueryHandler(IUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task<ConsignmentClosureDetailResponse> Handle(
        GetConsignmentClosureDetailQuery request,
        CancellationToken cancellationToken)
    {
        var consignment = await _uow.Consignments.GetByIdWithDetailsAsync(request.ConsignmentId, cancellationToken)
            ?? throw new NotFoundException("Consignación no encontrada");

        if (consignment.Status != ConsignmentStatus.OPEN)
            throw new BadRequestException("La consignación no está en estado OPEN y no puede ser cerrada");

        var lines = consignment.Lines.Select(line => new ConsignmentLineClosureDto
        {
            LineId = line.Id,
            ArticleId = line.ArticleId,
            ArticleName = line.Article?.Name ?? "N/A",
            ArticleCode = line.Article?.Sku ?? "N/A",
            DeliveredQty = line.DeliveredQty,
            CurrentSoldQty = line.SoldQty,
            CurrentReturnedQty = line.ReturnedQty,
            PendingQty = line.DeliveredQty - line.SoldQty - line.ReturnedQty,
            UnitPrice = line.UnitPrice,
            LineTotal = line.LineTotal
        }).ToList();

        var summary = new ConsignmentClosureSummary
        {
            TotalDelivered = lines.Sum(l => l.DeliveredQty),
            TotalSold = lines.Sum(l => l.CurrentSoldQty),
            TotalReturned = lines.Sum(l => l.CurrentReturnedQty),
            TotalPending = lines.Sum(l => l.PendingQty),
            TotalSalesAmount = lines.Sum(l => l.CurrentSoldQty * l.UnitPrice)
        };

        return new ConsignmentClosureDetailResponse
        {
            ConsignmentId = consignment.Id,
            CustomerId = consignment.CustomerId,
            CustomerName = consignment.Customer?.Name ?? "N/A",
            CustomerEmail = consignment.Customer?.Email ?? "N/A",
            StartDate = consignment.StartDate,
            CurrentTotal = consignment.Total,
            Lines = lines,
            Summary = summary
        };
    }
}
