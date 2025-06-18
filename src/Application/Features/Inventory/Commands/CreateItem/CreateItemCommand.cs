using MediatR;

namespace Application.Features.Inventory.Commands.CreateItem;

public record CreateItemCommand
(
    string ProductCode,
    string Name,
    string? Description,
    int Quantity,
    int MinQuantity,
    decimal? UnitPrice
)
    : IRequest<string>;