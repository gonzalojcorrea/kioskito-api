namespace Domain.Entities;

/// <summary>
/// Represents a role within the system, defining a set of permissions or responsibilities that can be assigned to one
/// or more users.
/// </summary>
/// <remarks>A role typically includes a name and an optional description to provide additional context. It is
/// associated with a collection of users who are assigned this role.</remarks>
public class Role : BaseEntity
{
    public string Name { get; set; }
    public string? Description { get; set; }

    // Navigation properties
    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
