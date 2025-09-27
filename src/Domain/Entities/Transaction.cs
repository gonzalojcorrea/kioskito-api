namespace Domain.Entities;

/// <summary>
/// Represents a transaction involving inventory, such as an entry or exit of stock.
/// </summary>
/// <remarks>A transaction records details about inventory changes, including the type of transaction, 
/// the quantity involved, the associated inventory item, and other metadata such as the user  who performed the
/// transaction and any additional notes.</remarks>
public class Transaction : BaseEntity
{
    public Guid InventoryId { get; set; }
    public Guid UserId { get; set; }
    public int Type { get; set; }
    public int Quantity { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow.AddHours(-3);
    public string? Note { get; set; }
    public decimal UnitCost { get; set; }

    // Navigation properties
    public virtual Inventory Inventory { get; set; }
    public virtual User User { get; set; }
}
