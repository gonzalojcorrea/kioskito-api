using Domain.Enums;

namespace Domain.Entities;

/// <summary>
/// Represents a sales order placed by a customer, including details such as the customer, order date, associated
/// consignment, total amount, status, and the items included in the order.
/// </summary>
/// <remarks>A sales order is associated with a specific customer and may include multiple items. The <see
/// cref="Status"/> property indicates the current state of the order.</remarks>
public class SalesOrder : BaseEntity
{
    public Guid CustomerId { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow.AddHours(-3);
    public Guid ConsignmentId { get; set; }
    public decimal Total { get; set; }
    public SalesOrderStatus Status { get; set; }

    // Navigation properties
    public virtual Customer Customer { get; set; }
    public virtual Consignment Consignment { get; set; }
    public virtual ICollection<SalesOrderLine> Items { get; set; } = new List<SalesOrderLine>();
}
