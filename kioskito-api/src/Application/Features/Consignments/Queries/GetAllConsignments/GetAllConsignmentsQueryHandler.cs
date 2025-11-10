using Application.Features.Consignments.Common;
using Application.Interfaces;
using Domain.Extensions;
using MediatR;

namespace Application.Features.Consignments.Queries.GetAllConsignments;

/// <summary>
/// Handler for getting all consignments.
/// </summary>
public class GetAllConsignmentsQueryHandler : IRequestHandler<GetAllConsignmentsQuery, IReadOnlyList<ConsignmentResponse>>
{
    private readonly IUnitOfWork _uow;
    
    public GetAllConsignmentsQueryHandler(IUnitOfWork uow) => _uow = uow;

    public async Task<IReadOnlyList<ConsignmentResponse>> Handle(GetAllConsignmentsQuery request, CancellationToken cancellationToken)
    {
        var consignments = await _uow.Consignments.GetAllWithDetailsAsync(cancellationToken);
        
        return consignments
            .Select(c => new ConsignmentResponse(
                c.Id,
                c.CustomerId,
                c.Customer?.Name ?? "Cliente desconocido",
                c.StartDate,
                c.EndDate,
                c.Status.GetDescription(),
                c.Total,
                c.Lines.Count
            ))
            .ToList();
    }
}
