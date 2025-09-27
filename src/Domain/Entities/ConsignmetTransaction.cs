namespace Domain.Entities;

/// <summary>
/// Represents a transaction associated with a consignment, including details about the user, movement type, and
/// quantity.
/// </summary>
/// <remarks>This class is used to track individual transactions related to a consignment line, such as inventory
/// movements. It includes information about the user who performed the transaction, the type of movement, and the
/// quantity involved.</remarks>
public class ConsignmetTransaction : BaseEntity
{
    public Guid ConsignmentLineId { get; set; }
    public Guid UserId { get; set; }
    public int MovementType { get; set; }
    public int Quantity { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow.AddHours(-3);

    // Navigation properties
    public virtual ConsignmentLine ConsignmentLine { get; set; }
    public virtual User User { get; set; }
}
