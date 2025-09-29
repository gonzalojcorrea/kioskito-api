namespace Domain.Entities;

/// <summary>
/// Represents the base class for all entities in the system, providing common properties for identification and
/// tracking creation and deletion timestamps.
/// </summary>
/// <remarks>This class is intended to be inherited by other entity classes to ensure consistent handling of
/// entity identifiers and lifecycle metadata. The <see cref="Id"/> property uniquely identifies the entity, while <see
/// cref="CreatedAt"/> and <see cref="DeletedAt"/> provide timestamps for creation and optional deletion.</remarks>
public abstract class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow.AddHours(-3);
    public DateTime? DeletedAt { get; set; }
}
