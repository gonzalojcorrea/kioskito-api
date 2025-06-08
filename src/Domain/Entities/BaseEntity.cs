namespace Domain.Entities;

/// <summary>
/// Base class for all entities.
/// </summary>
public abstract class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow.AddHours(-3);
    public DateTime? DeletedAt { get; set; }
}
