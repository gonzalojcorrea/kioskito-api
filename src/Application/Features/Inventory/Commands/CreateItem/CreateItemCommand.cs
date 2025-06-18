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
    : IRequest<CreateItemResponse>;

public class CreateItemResponse
{
    public Guid Id { get; set; }
    public string ProductCode { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public int Quantity { get; set; }
    public int MinQuantity { get; set; }
    public DateTime CreatedAt { get; set; }
}