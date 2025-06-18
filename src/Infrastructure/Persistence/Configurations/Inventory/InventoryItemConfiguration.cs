using Domain.Entities.Inventory;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations.Inventory;

public class InventoryItemConfiguration : IEntityTypeConfiguration<InventoryItem>
{
    public void Configure(EntityTypeBuilder<InventoryItem> builder)
    {
        // Primary key (inherited)
        builder.HasKey(x => x.Id);

        // Unique barcode
        builder.Property(x => x.ProductCode)
               .IsRequired()
               .HasMaxLength(50);
        builder.HasIndex(x => x.ProductCode)
               .IsUnique();

        builder.Property(x => x.Name)
               .IsRequired()
               .HasMaxLength(100);
        builder.Property(x => x.Description)
               .HasMaxLength(500);

        builder.Property(x => x.Quantity)
               .IsRequired();
        builder.Property(x => x.MinQuantity)
               .IsRequired(false);

        // Relationship: InventoryItem (1) → StockMovement (many)
        builder.HasMany(x => x.StockMovements)
               .WithOne(x => x.InventoryItem)
               .HasForeignKey(x => x.InventoryItemId);
    }
}
