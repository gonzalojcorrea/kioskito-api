using Domain.Entities.Consignments;

namespace Domain.Entities.Sales;

/// <summary>
/// Represents a sales order placed by a customer, including details such as the customer, order date, associated
/// consignment, total amount, status, and the items included in the order.
/// </summary>
/// <remarks>A sales order is associated with a specific customer and may include multiple items. The <see
/// cref="Status"/> property indicates the current state of the order, where: <list type="bullet"> <item><description>1:
/// Pending</description></item> <item><description>2: Completed</description></item> <item><description>3:
/// Cancelled</description></item> </list> The <see cref="OrderDate"/> property is initialized to the current UTC time
/// minus three hours by default.</remarks>
public class SalesOrder : BaseEntity
{
    public Guid CustomerId { get; set; }
    public DateTime OrderDate { get; set; } = DateTime.UtcNow.AddHours(-3);
    public Guid ConsignmentId { get; set; }
    public decimal Total { get; set; }
    public int Status { get; set; } // 1: Pending, 2: Completed, 3: Cancelled

    // Navigation properties
    public virtual Customer Customer { get; set; }
    public virtual Consignment Consignment { get; set; }
    public virtual ICollection<SalesOrderLine> Items { get; set; } = new List<SalesOrderLine>();
}
