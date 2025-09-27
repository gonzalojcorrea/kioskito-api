using Domain.Entities.Consignments;

namespace Domain.Entities.Auth;

/// <summary>
/// Represents a user in the system, including personal details, authentication information, and role assignment.
/// </summary>
/// <remarks>This class is used to store and manage user-related data, such as name, email, and role association.
/// The <see cref="Role"/> property provides navigation to the user's assigned role, if any.</remarks>
public class User : BaseEntity
{
    public string Name { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public Guid? RoleId { get; set; }

    // Navigation properties
    public virtual Role? Role { get; set; }
    public virtual ICollection<ConsignmetTransaction> Transactions { get; set; } = new List<ConsignmetTransaction>();
    public virtual ICollection<ConsignmetTransaction> ConsignmetTransactions { get; set; } = new List<ConsignmetTransaction>();
}
