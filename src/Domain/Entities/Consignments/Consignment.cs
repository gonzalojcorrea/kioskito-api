using Domain.Entities.Sales;

namespace Domain.Entities.Consignments;

/// <summary>
/// Represents a consignment associated with a customer, including details such as start and end dates, status, total
/// amount, and related items.
/// </summary>
/// <remarks>A consignment is a collection of items or services associated with a specific customer.  It includes
/// information about the consignment's lifecycle, such as its start and end dates,  current status, and total value.
/// Navigation properties provide access to the associated customer  and the individual consignment lines.</remarks>
public class Consignment : BaseEntity
{
    public Guid CustomerId { get; set; }
    public DateTime StartDate { get; set; } = DateTime.UtcNow.AddHours(-3);
    public DateTime? EndDate { get; set; }
    public int Status { get; set; } // 1: Active, 2: Closed, 3: Cancelled
    public decimal Total { get; set; }

    // Navigation properties
    public virtual Customer Customer { get; set; }
    public virtual ICollection<ConsignmentLine> Lines { get; set; } = new List<ConsignmentLine>();
}
