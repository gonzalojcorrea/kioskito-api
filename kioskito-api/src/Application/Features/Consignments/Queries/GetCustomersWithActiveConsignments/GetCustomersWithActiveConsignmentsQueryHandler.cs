using Application.Interfaces;
using Domain.Enums;
using MediatR;

namespace Application.Features.Consignments.Queries.GetCustomersWithActiveConsignments;

public class GetCustomersWithActiveConsignmentsQueryHandler
    : IRequestHandler<GetCustomersWithActiveConsignmentsQuery, List<CustomerWithActiveConsignmentsResponse>>
{
    private readonly IUnitOfWork _uow;

    public GetCustomersWithActiveConsignmentsQueryHandler(IUnitOfWork uow)
    {
        _uow = uow;
    }

    public async Task<List<CustomerWithActiveConsignmentsResponse>> Handle(
        GetCustomersWithActiveConsignmentsQuery request,
        CancellationToken cancellationToken)
    {
        // Obtener todas las consignaciones activas con sus detalles
        var activeConsignments = await _uow.Consignments.GetAllWithDetailsAsync(cancellationToken);
        var openConsignments = activeConsignments
            .Where(c => c.Status == ConsignmentStatus.OPEN)
            .ToList();

        // Agrupar por cliente
        var customerGroups = openConsignments
            .GroupBy(c => c.CustomerId)
            .Select(g => new CustomerWithActiveConsignmentsResponse
            {
                CustomerId = g.Key,
                CustomerName = g.First().Customer?.Name ?? "N/A",
                CustomerEmail = g.First().Customer?.Email ?? "N/A",
                CustomerPhone = g.First().Customer?.Phone ?? "N/A",
                ActiveConsignments = g.Select(c => new ActiveConsignmentSummary
                {
                    ConsignmentId = c.Id,
                    StartDate = c.StartDate,
                    Total = c.Total,
                    TotalItems = c.Lines.Count,
                    TotalQuantityDelivered = c.Lines.Sum(l => l.DeliveredQty)
                }).ToList()
            })
            .ToList();

        return customerGroups;
    }
}
