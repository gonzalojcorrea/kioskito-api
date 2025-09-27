using Domain.Entities.Inventory;

namespace Domain.Entities.Sales;

/// <summary>
/// Represents a line item in a sales order, including details about the article, quantity, and pricing.
/// </summary>
/// <remarks>This class is used to model individual items within a sales order. Each line item is associated with
/// a specific article and includes information such as the quantity ordered, the sale price per unit, and the total
/// price for the line.</remarks>
public class SalesOrderLine : BaseEntity
{
    public Guid SalesOrderId { get; set; }
    public Guid ArticleId { get; set; }
    public int Quantity { get; set; }
    public decimal SalePrice { get; set; }
    public decimal LineTotal { get; set; }

    // Navigation properties
    public virtual SalesOrder SalesOrder { get; set; }
    public virtual Article Article { get; set; }
}
