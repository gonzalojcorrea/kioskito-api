using Domain.Entities.Consignments;
using Domain.Entities.Sales;

namespace Domain.Entities.Inventory;

/// <summary>
/// Represents an article with details such as name, description, SKU, and pricing information.
/// </summary>
/// <remarks>This class is used to store and manage information about an article, including its name, optional
/// description,  stock-keeping unit (SKU), and pricing details such as sale price and consignment price.  All
/// properties are nullable except for <see cref="Name"/>.</remarks>
public class Article : BaseEntity
{
    public string Name { get; set; }
    public string? Description { get; set; }
    public string? Sku { get; set; }
    public decimal? SalePrice { get; set; }
    public decimal? ConsignmentPrice { get; set; }

    // Navigation properties
    public virtual ICollection<Inventory> Inventories { get; set; } = new List<Inventory>();
    public virtual ICollection<SalesOrderLine> SalesOrderLines { get; set; } = new List<SalesOrderLine>();
    public virtual ICollection<ConsignmentLine> ConsignmentLines { get; set; } = new List<ConsignmentLine>();
}
