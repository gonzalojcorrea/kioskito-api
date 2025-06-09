namespace Domain.Entities.Inventory;

public class InventoryItem : BaseEntity
{
    // Barcode, must be unique
    public string ProductCode { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int Quantity { get; set; }
    public int MinQuantity { get; set; }

    // Navigation properties
    public ICollection<StockMovement> StockMovements { get; set; }
}
