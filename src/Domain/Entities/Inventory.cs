namespace Domain.Entities;

/// <summary>
/// Represents the inventory record for a specific article, including stock levels, costs, and status.
/// </summary>
/// <remarks>This class is used to track the inventory details of an article, such as the current quantity, 
/// minimum stock threshold, and average cost. It also includes a reference to the associated article.</remarks>
public class Inventory : BaseEntity
{
    public Guid ArticleId { get; set; }
    public int Quantity { get; set; }
    public int MinStock { get; set; }
    public int Status { get; set; }
    public decimal AvgCost { get; set; }

    // Navigation properties
    public virtual Article Article { get; set; }
    public virtual ICollection<Transaction> Transactions { get; set; } = new List<Transaction>();
}
