using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

/// <summary>
/// Configuration for the Inventory entity.
/// </summary>
public class InventoryConfiguration : IEntityTypeConfiguration<Inventory>
{
    public void Configure(EntityTypeBuilder<Inventory> builder)
    {
        // Primary key
        builder.HasKey(i => i.Id);

        builder.Property(i => i.ArticleId)
               .IsRequired();

        builder.Property(i => i.Quantity)
               .IsRequired();

        builder.Property(i => i.MinStock)
               .IsRequired();

        builder.Property(i => i.Status)
               .HasConversion<int>()
               .IsRequired();

        builder.Property(i => i.AvgCost)
               .HasPrecision(18,2)
               .IsRequired();

        // Relationships
        builder.HasMany(i => i.Transactions)
               .WithOne(t => t.Inventory)
               .HasForeignKey(t => t.InventoryId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
