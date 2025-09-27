namespace Domain.Entities;

/// <summary>
/// Represents a line item within a consignment, detailing the associated article, quantities, and pricing information.
/// </summary>
/// <remarks>A <see cref="ConsignmentLine"/> is used to track the details of an individual item within a
/// consignment,  including the quantities delivered, returned, and sold, as well as the pricing and total value of the
/// line. It also provides navigation properties to related entities such as the associated <see cref="Consignment"/>, 
/// <see cref="Article"/>, and any related <see cref="ConsignmetTransaction"/> records.</remarks>
public class ConsignmentLine : BaseEntity
{
    public Guid ConsignmentId { get; set; }
    public Guid ArticleId { get; set; }
    public int DeliveredQty { get; set; }
    public int ReturnedQty { get; set; }
    public int SoldQty { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal LineTotal { get; set; }

    // Navigation properties
    public virtual Consignment? Consignment { get; set; }
    public virtual Article? Article { get; set; }
    public virtual ICollection<ConsignmetTransaction> Transactions { get; set; } = new List<ConsignmetTransaction>();
}
