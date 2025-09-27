using Domain.Entities.Consignments;

namespace Domain.Entities.Sales;

/// <summary>
/// Represents a customer with contact information and associated sales orders.
/// </summary>
/// <remarks>This class is used to store and manage customer details, including their name, email, phone number, 
/// and address. It also provides access to the customer's associated sales orders through the  <see cref="Sales"/>
/// property.</remarks>
public class Customer : BaseEntity
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }

    // Navigation properties
    public virtual ICollection<SalesOrder> Sales { get; set; } = new List<SalesOrder>();
    public virtual ICollection<Consignment> Consignments { get; set; } = new List<Consignment>();
}
