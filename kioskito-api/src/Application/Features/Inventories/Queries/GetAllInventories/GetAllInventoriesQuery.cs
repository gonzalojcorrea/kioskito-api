using Application.Features.Inventories.Common;
using MediatR;

namespace Application.Features.Inventories.Queries.GetAllInventories;

public sealed record GetAllInventoriesQuery : IRequest<IReadOnlyList<InventoryResponse>>;
