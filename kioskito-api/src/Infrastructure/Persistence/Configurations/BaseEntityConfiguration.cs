using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Configurations;

/// <summary>
/// Base configuration for entities inheriting from BaseEntity.
/// </summary>
public static class BaseEntityConfiguration
{
    /// <summary>
    /// Applies the base entity configuration to all entities inheriting from BaseEntity.
    /// </summary>
    /// <param name="modelBuilder"></param>
    public static void ApplyBaseEntityConfiguration(this ModelBuilder modelBuilder)
    {
        var baseEntityType = typeof(BaseEntity);

        foreach (var entityType in modelBuilder.Model.GetEntityTypes()
            .Where(t => baseEntityType.IsAssignableFrom(t.ClrType)))
        {
            var builder = modelBuilder.Entity(entityType.ClrType);

            // Configure global properties
            builder.Property(nameof(BaseEntity.Id))
                .ValueGeneratedOnAdd()
                .IsRequired();

            builder.Property(nameof(BaseEntity.CreatedAt))
                .ValueGeneratedOnAdd()
                .IsRequired();

            builder.Property(nameof(BaseEntity.DeletedAt))
                .IsRequired(false);
        }
    }
}
